from __future__ import annotations

from datetime import datetime
from typing import Iterable

from fastapi import BackgroundTasks

from app.core.database import session_scope
from app.models.models import ConnectedAccount, CreativeAsset, PostJob, PostStatus


class SocialPoster:
    def __init__(self, user_id: int, background_tasks: BackgroundTasks):
        self.user_id = user_id
        self.background_tasks = background_tasks

    def schedule(self, creative: CreativeAsset, accounts: Iterable[ConnectedAccount], scheduled_at: datetime | None) -> list[PostJob]:
        jobs: list[PostJob] = []
        for account in accounts:
            with session_scope() as session:
                job = PostJob(
                    creative_id=creative.id,
                    account_id=account.id,
                    scheduled_at=scheduled_at or datetime.utcnow(),
                )
                session.add(job)
                session.flush()
                session.refresh(job)
                jobs.append(job)
                self.background_tasks.add_task(self._simulate_post, job.id)
        return jobs

    @staticmethod
    def _simulate_post(job_id: int) -> None:
        from app.core.database import session_scope

        with session_scope() as session:
            job = session.get(PostJob, job_id)
            if not job:
                return
            job.status = PostStatus.POSTED
            job.posted_at = datetime.utcnow()
            job.delivery_report = {"message": "Posted via simulated connector"}
            session.add(job)
