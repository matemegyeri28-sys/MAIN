from datetime import datetime, timedelta

from sqlmodel import select

from app.core.database import init_db, session_scope
from app.core.security import get_password_hash
from app.models.models import (
    ConnectedAccount,
    Subscription,
    SubscriptionPlan,
    SubscriptionStatus,
    User,
)


def seed() -> None:
    init_db()
    with session_scope() as session:
        user = session.exec(select(User)).first()
        if not user:
            user = User(
                email="founder@lumina.ai",
                full_name="Avery Stone",
                company="Lumina Labs",
                hashed_password=get_password_hash("demo1234"),
            )
            session.add(user)
            session.flush()
        elif not user.hashed_password:
            user.hashed_password = get_password_hash("demo1234")
        if not session.exec(select(SubscriptionPlan)).first():
            plans = [
                SubscriptionPlan(
                    name="Launch",
                    price_monthly=99,
                    price_yearly=999,
                    description="All the essentials for small teams",
                    features=[
                        "Unlimited URL ingests",
                        "AI creative generation",
                        "3 social connectors",
                    ],
                ),
                SubscriptionPlan(
                    name="Scale",
                    price_monthly=249,
                    price_yearly=2499,
                    description="Advanced automations for growing companies",
                    features=[
                        "Dynamic creative optimization",
                        "Unlimited connectors",
                        "Collaboration workspaces",
                    ],
                ),
                SubscriptionPlan(
                    name="Enterprise",
                    price_monthly=599,
                    price_yearly=5999,
                    description="Enterprise security, governance, and SLAs",
                    features=[
                        "SOC2 Type II",
                        "SSO & SCIM",
                        "Dedicated strategist",
                    ],
                ),
            ]
            for plan in plans:
                session.add(plan)
        plan = session.exec(select(SubscriptionPlan).order_by(SubscriptionPlan.price_monthly)).first()
        if plan and not session.exec(select(Subscription).where(Subscription.user_id == user.id)).first():
            trial_subscription = Subscription(
                user_id=user.id,
                plan_id=plan.id,
                status=SubscriptionStatus.TRIALING,
                started_at=datetime.utcnow(),
                ends_at=datetime.utcnow() + timedelta(days=14),
                auto_renew=False,
            )
            session.add(trial_subscription)
        if not session.exec(select(ConnectedAccount)).first():
            account = ConnectedAccount(
                user_id=user.id,
                platform="linkedin",
                access_token="demo-token",
                account_handle="@lumina-labs",
                profile_metadata={"type": "demo"},
            )
            session.add(account)


if __name__ == "__main__":
    seed()
    print("Seed data created.")
