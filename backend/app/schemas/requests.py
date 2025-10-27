from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field, HttpUrl

from app.models.models import CreativeType


class URLRequest(BaseModel):
    url: HttpUrl


class CreativeGenerateRequest(BaseModel):
    source_id: int
    objectives: List[str] = Field(default_factory=list)
    creative_types: List[CreativeType] = Field(default_factory=lambda: [CreativeType.TEXT, CreativeType.IMAGE])


class PostingRequest(BaseModel):
    creative_id: int
    account_ids: List[int]
    scheduled_at: Optional[datetime] = None


class SubscriptionCreateRequest(BaseModel):
    plan_id: int
    auto_renew: bool = True


class ConnectedAccountCreateRequest(BaseModel):
    platform: str
    access_token: str
    account_handle: str
    profile_metadata: dict = Field(default_factory=dict)
