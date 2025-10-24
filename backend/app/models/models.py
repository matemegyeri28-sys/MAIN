from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel


class CreativeType(str, Enum):
    TEXT = "text"
    IMAGE = "image"
    VIDEO = "video"


class SubscriptionStatus(str, Enum):
    ACTIVE = "active"
    CANCELED = "canceled"
    TRIALING = "trialing"
    PAST_DUE = "past_due"


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    full_name: str
    company: Optional[str] = None
    hashed_password: Optional[str] = None

    subscriptions: List["Subscription"] = Relationship(back_populates="user")
    accounts: List["ConnectedAccount"] = Relationship(back_populates="user")
    sources: List["ContentSource"] = Relationship(back_populates="user")
    creatives: List["CreativeAsset"] = Relationship(back_populates="user")


class SubscriptionPlan(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    price_monthly: float
    price_yearly: float
    description: str
    features: List[str] = Field(sa_column=Column(JSON))

    subscriptions: List["Subscription"] = Relationship(back_populates="plan")


class Subscription(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    plan_id: int = Field(foreign_key="subscriptionplan.id")
    status: SubscriptionStatus = Field(default=SubscriptionStatus.TRIALING)
    started_at: datetime = Field(default_factory=datetime.utcnow)
    ends_at: Optional[datetime] = None
    external_reference: Optional[str] = None
    auto_renew: bool = True

    user: User = Relationship(back_populates="subscriptions")
    plan: SubscriptionPlan = Relationship(back_populates="subscriptions")


class ConnectedAccount(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    platform: str
    access_token: str
    account_handle: str
    profile_metadata: dict = Field(default_factory=dict, sa_column=Column(JSON))
    active: bool = Field(default=True)

    user: User = Relationship(back_populates="accounts")
    post_jobs: List["PostJob"] = Relationship(back_populates="account")


class ContentSource(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    url: str
    title: Optional[str] = None
    description: Optional[str] = None
    og_image: Optional[str] = None
    og_video: Optional[str] = None
    raw_html: Optional[str] = None
    extracted_text: Optional[str] = None
    extracted_images: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    meta: dict = Field(default_factory=dict, sa_column=Column(JSON))
    last_fetched: Optional[datetime] = None

    user: User = Relationship(back_populates="sources")
    creatives: List["CreativeAsset"] = Relationship(back_populates="source")


class CreativeAsset(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    source_id: int = Field(foreign_key="contentsource.id")
    type: CreativeType
    headline: str
    body: str
    call_to_action: Optional[str] = None
    media_url: Optional[str] = None
    context: dict = Field(default_factory=dict, sa_column=Column(JSON))

    user: User = Relationship(back_populates="creatives")
    source: ContentSource = Relationship(back_populates="creatives")
    post_jobs: List["PostJob"] = Relationship(back_populates="creative")


class PostStatus(str, Enum):
    PENDING = "pending"
    POSTED = "posted"
    FAILED = "failed"


class PostJob(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    creative_id: int = Field(foreign_key="creativeasset.id")
    account_id: int = Field(foreign_key="connectedaccount.id")
    scheduled_at: datetime = Field(default_factory=datetime.utcnow)
    status: PostStatus = Field(default=PostStatus.PENDING)
    posted_at: Optional[datetime] = None
    delivery_report: dict = Field(default_factory=dict, sa_column=Column(JSON))

    creative: CreativeAsset = Relationship(back_populates="post_jobs")
    account: ConnectedAccount = Relationship(back_populates="post_jobs")
