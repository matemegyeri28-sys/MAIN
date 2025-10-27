from __future__ import annotations

import random
from typing import Iterable, List

from sqlmodel import select

from app.core.database import session_scope
from app.models.models import ContentSource, CreativeAsset, CreativeType


TONE_OPTIONS = [
    "Bold",
    "Friendly",
    "Professional",
    "Playful",
    "Luxury",
]

CTA_OPTIONS = [
    "Start your free trial",
    "Book a demo",
    "Shop now",
    "Learn more",
    "Join the waitlist",
]


class MockAIEngine:
    """A deterministic yet varied generator emulating AI output."""

    def __init__(self, tone: str | None = None):
        self.tone = tone or random.choice(TONE_OPTIONS)

    def generate_headline(self, title: str, objectives: Iterable[str]) -> str:
        objective_phrase = ", ".join(objectives) if objectives else "drive engagement"
        return f"{self.tone} take on {title or 'your story'} to {objective_phrase}"

    def generate_body(self, description: str | None, text: str | None) -> str:
        excerpt = (description or "")[:120] or (text or "")[:120]
        return f"{excerpt}... Crafted in a {self.tone.lower()} voice that resonates with modern audiences."

    def generate_cta(self) -> str:
        return random.choice(CTA_OPTIONS)

    def generate_image_prompt(self, title: str | None, objectives: Iterable[str]) -> str:
        return f"Create a {self.tone.lower()} hero illustration about {title or 'the brand'} highlighting {' and '.join(objectives) or 'innovation'}"

    def generate_video_script(self, title: str | None, description: str | None) -> str:
        return (
            f"Scene 1: Quick hook introducing {title or 'your product'}\n"
            f"Scene 2: Showcase benefits - {description[:80] if description else 'Highlight unique value'}\n"
            "Scene 3: Closing call-to-action with upbeat music."
        )


class AdGenerator:
    def __init__(self, user_id: int):
        self.user_id = user_id

    def generate(self, source: ContentSource, objectives: List[str], creative_types: List[CreativeType]) -> List[CreativeAsset]:
        engine = MockAIEngine()
        creative_ids: List[int] = []
        for creative_type in creative_types:
            if creative_type == CreativeType.TEXT:
                creative_ids.append(
                    self._create_creative(
                        source,
                        CreativeType.TEXT,
                        headline=engine.generate_headline(source.title or "Untitled", objectives),
                        body=engine.generate_body(source.description, source.extracted_text),
                        call_to_action=engine.generate_cta(),
                        context={"objectives": objectives, "tone": engine.tone},
                    )
                )
            elif creative_type == CreativeType.IMAGE:
                creative_ids.append(
                    self._create_creative(
                        source,
                        CreativeType.IMAGE,
                        headline=engine.generate_headline(source.title or "Brand Spotlight", objectives),
                        body=engine.generate_image_prompt(source.title, objectives),
                        call_to_action=engine.generate_cta(),
                        context={"objectives": objectives, "tone": engine.tone, "type": "image_prompt"},
                    )
                )
            elif creative_type == CreativeType.VIDEO:
                creative_ids.append(
                    self._create_creative(
                        source,
                        CreativeType.VIDEO,
                        headline=engine.generate_headline(source.title or "Product Story", objectives),
                        body=engine.generate_video_script(source.title, source.description),
                        call_to_action=engine.generate_cta(),
                        context={"objectives": objectives, "tone": engine.tone, "type": "video_script"},
                    )
                )
        with session_scope() as session:
            stmt = select(CreativeAsset).where(CreativeAsset.id.in_(creative_ids))
            creatives = session.exec(stmt).all()
            for creative in creatives:
                creative.source
            return list(creatives)

    def _create_creative(
        self,
        source: ContentSource,
        creative_type: CreativeType,
        headline: str,
        body: str,
        call_to_action: str,
        context: dict,
    ) -> int:
        with session_scope() as session:
            creative = CreativeAsset(
                user_id=self.user_id,
                source_id=source.id,
                type=creative_type,
                headline=headline,
                body=body,
                call_to_action=call_to_action,
                context=context,
            )
            session.add(creative)
            session.flush()
            return creative.id
