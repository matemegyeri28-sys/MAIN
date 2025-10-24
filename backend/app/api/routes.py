from __future__ import annotations

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select

from app.api.deps import get_current_user
from app.core.database import session_scope
from app.core.security import create_access_token, get_password_hash, verify_password
from app.models.models import (
    ConnectedAccount,
    ContentSource,
    CreativeAsset,
    PostJob,
    PostStatus,
    SubscriptionPlan,
    User,
)
from app.schemas.auth import TokenResponse, UserCreate, UserRead
from app.schemas.common import (
    ConnectedAccountRead,
    ContentSourceRead,
    CreativeAssetRead,
    DashboardSummary,
    PostJobRead,
    SubscriptionPlanRead,
    SubscriptionRead,
)
from app.schemas.requests import (
    ConnectedAccountCreateRequest,
    CreativeGenerateRequest,
    PostingRequest,
    SubscriptionCreateRequest,
    URLRequest,
)
from app.services.ad_generation import AdGenerator
from app.services.content_extraction import ContentExtractor
from app.services.posting import SocialPoster
from app.services.subscriptions import SubscriptionService

router = APIRouter()


@router.post("/auth/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate):
    with session_scope() as session:
        existing = session.exec(select(User).where(User.email == payload.email.lower())).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

        user = User(
            email=payload.email.lower(),
            full_name=payload.full_name.strip(),
            company=payload.company.strip() if payload.company else None,
            hashed_password=get_password_hash(payload.password),
        )
        session.add(user)
        session.flush()
        session.refresh(user)
        return user


@router.post("/auth/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    with session_scope() as session:
        user = session.exec(select(User).where(User.email == form_data.username.lower())).first()
        if not user or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    token = create_access_token(subject=user.id)
    return TokenResponse(access_token=token, token_type="bearer", user=user)


@router.get("/auth/me", response_model=UserRead)
def read_current_user(user: User = Depends(get_current_user)):
    return user


@router.post("/sources", response_model=ContentSourceRead)
def create_source(payload: URLRequest, user: User = Depends(get_current_user)):
    extractor = ContentExtractor(user_id=user.id)
    source = extractor.fetch(str(payload.url))
    return source


@router.get("/sources", response_model=list[ContentSourceRead])
def list_sources(user: User = Depends(get_current_user)):
    with session_scope() as session:
        sources = session.exec(select(ContentSource).where(ContentSource.user_id == user.id)).all()
        return list(sources)


@router.post("/creatives", response_model=list[CreativeAssetRead])
def generate_creatives(payload: CreativeGenerateRequest, user: User = Depends(get_current_user)):
    with session_scope() as session:
        source = session.get(ContentSource, payload.source_id)
        if not source:
            raise HTTPException(status_code=404, detail="Source not found")
    generator = AdGenerator(user_id=user.id)
    creatives = generator.generate(source, payload.objectives, payload.creative_types)
    return creatives


@router.get("/creatives", response_model=list[CreativeAssetRead])
def list_creatives(user: User = Depends(get_current_user)):
    with session_scope() as session:
        creatives = session.exec(select(CreativeAsset).where(CreativeAsset.user_id == user.id)).all()
        for creative in creatives:
            creative.source
        return list(creatives)


@router.post("/accounts", response_model=ConnectedAccountRead)
def add_connected_account(payload: ConnectedAccountCreateRequest, user: User = Depends(get_current_user)):
    with session_scope() as session:
        account = ConnectedAccount(
            user_id=user.id,
            platform=payload.platform,
            access_token=payload.access_token,
            account_handle=payload.account_handle,
            profile_metadata=payload.profile_metadata,
            active=True,
        )
        session.add(account)
        session.flush()
        session.refresh(account)
        return account


@router.get("/accounts", response_model=list[ConnectedAccountRead])
def list_connected_accounts(user: User = Depends(get_current_user)):
    with session_scope() as session:
        accounts = session.exec(select(ConnectedAccount).where(ConnectedAccount.user_id == user.id)).all()
        return list(accounts)


@router.post("/postings", response_model=list[PostJobRead])
def schedule_posting(
    payload: PostingRequest,
    background_tasks: BackgroundTasks,
    user: User = Depends(get_current_user),
):
    with session_scope() as session:
        creative = session.get(CreativeAsset, payload.creative_id)
        if not creative:
            raise HTTPException(status_code=404, detail="Creative not found")
        account_stmt = select(ConnectedAccount).where(ConnectedAccount.user_id == user.id).where(
            ConnectedAccount.id.in_(payload.account_ids)
        )
        accounts = session.exec(account_stmt).all()
    poster = SocialPoster(user_id=user.id, background_tasks=background_tasks)
    jobs = poster.schedule(creative, accounts, payload.scheduled_at)
    return jobs


@router.get("/postings", response_model=list[PostJobRead])
def list_postings(user: User = Depends(get_current_user)):
    with session_scope() as session:
        jobs = session.exec(
            select(PostJob).join(CreativeAsset).where(CreativeAsset.user_id == user.id)
        ).all()
        for job in jobs:
            job.account
            job.creative
        return list(jobs)


@router.get("/plans", response_model=list[SubscriptionPlanRead])
def list_plans():
    with session_scope() as session:
        plans = session.exec(select(SubscriptionPlan)).all()
        return list(plans)


@router.post("/subscriptions", response_model=SubscriptionRead)
def create_subscription(payload: SubscriptionCreateRequest, user: User = Depends(get_current_user)):
    service = SubscriptionService(user_id=user.id)
    try:
        subscription = service.create_subscription(plan_id=payload.plan_id, auto_renew=payload.auto_renew)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    return subscription


@router.get("/subscriptions/me", response_model=SubscriptionRead | None)
def get_subscription(user: User = Depends(get_current_user)):
    service = SubscriptionService(user_id=user.id)
    return service.get_active_subscription()


@router.get("/dashboard", response_model=DashboardSummary)
def dashboard_summary(user: User = Depends(get_current_user)):
    with session_scope() as session:
        sources = session.exec(select(ContentSource).where(ContentSource.user_id == user.id)).all()
        creatives = session.exec(select(CreativeAsset).where(CreativeAsset.user_id == user.id)).all()
        pending = session.exec(
            select(PostJob)
            .join(CreativeAsset)
            .where(CreativeAsset.user_id == user.id)
            .where(PostJob.status == PostStatus.PENDING)
        ).all()
        posted = session.exec(select(PostJob).join(CreativeAsset).where(CreativeAsset.user_id == user.id)).all()
    return DashboardSummary(
        total_sources=len(sources),
        total_creatives=len(creatives),
        pending_posts=len(pending),
        posted_this_month=len(posted),
    )
