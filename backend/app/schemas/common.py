from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

from app.models.models import CreativeType, PostStatus, SubscriptionStatus


class SubscriptionPlanRead(BaseModel):
    id: int
    name: str
    price_monthly: float
    price_yearly: float
    description: str
    features: List[str]

    model_config = {
        "from_attributes": True
    }


class ConnectedAccountRead(BaseModel):
    id: int
    platform: str
    account_handle: str
    active: bool
    profile_metadata: dict

    model_config = {
        "from_attributes": True
    }


class ContentSourceRead(BaseModel):
    id: int
    url: str
    title: Optional[str]
    description: Optional[str]
    og_image: Optional[str]
    og_video: Optional[str]
    extracted_text: Optional[str]
    extracted_images: List[str]
    meta: dict

    model_config = {
        "from_attributes": True
    }


class CreativeAssetRead(BaseModel):
    id: int
    type: CreativeType
    headline: str
    body: str
    call_to_action: Optional[str]
    media_url: Optional[str]
    context: dict
    source: ContentSourceRead

    model_config = {
        "from_attributes": True
    }


class PostJobRead(BaseModel):
    id: int
    status: PostStatus
    scheduled_at: datetime
    posted_at: Optional[datetime]
    delivery_report: dict
    account: ConnectedAccountRead
    creative: CreativeAssetRead

    model_config = {
        "from_attributes": True
    }


class SubscriptionRead(BaseModel):
    id: int
    status: SubscriptionStatus
    started_at: datetime
    ends_at: Optional[datetime]
    auto_renew: bool
    plan: SubscriptionPlanRead

    model_config = {
        "from_attributes": True
    }


class DashboardSummary(BaseModel):
    total_sources: int
    total_creatives: int
    pending_posts: int
    posted_this_month: int
