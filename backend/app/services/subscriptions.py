from __future__ import annotations

from datetime import datetime, timedelta

from sqlmodel import select

from app.core.database import session_scope
from app.models.models import Subscription, SubscriptionPlan, SubscriptionStatus


class SubscriptionService:
    TRIAL_DAYS = 14

    def __init__(self, user_id: int):
        self.user_id = user_id

    def create_subscription(self, plan_id: int, auto_renew: bool) -> Subscription:
        with session_scope() as session:
            plan = session.get(SubscriptionPlan, plan_id)
            if not plan:
                raise ValueError("Plan not found")

            active_subscriptions = session.exec(
                select(Subscription)
                .where(Subscription.user_id == self.user_id)
                .where(Subscription.status.in_([SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING]))
            ).all()
            for subscription in active_subscriptions:
                subscription.status = SubscriptionStatus.CANCELED
                subscription.ends_at = datetime.utcnow()
                subscription.auto_renew = False

            status = SubscriptionStatus.ACTIVE if auto_renew else SubscriptionStatus.TRIALING
            ends_at = None if status == SubscriptionStatus.ACTIVE else datetime.utcnow() + timedelta(days=self.TRIAL_DAYS)

            subscription = Subscription(
                user_id=self.user_id,
                plan_id=plan_id,
                status=status,
                started_at=datetime.utcnow(),
                ends_at=ends_at,
                auto_renew=auto_renew,
            )
            session.add(subscription)
            session.flush()
            session.refresh(subscription)
            subscription.plan  # ensure relationship is loaded before session closes
            return subscription

    def get_active_subscription(self) -> Subscription | None:
        with session_scope() as session:
            stmt = (
                select(Subscription)
                .where(Subscription.user_id == self.user_id)
                .where(Subscription.status.in_([SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING]))
                .order_by(Subscription.started_at.desc())
            )
            subscription = session.exec(stmt).first()
            if subscription:
                subscription.plan
            return subscription
