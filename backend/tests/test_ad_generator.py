from app.core.database import init_db, session_scope
from app.models.models import ContentSource, CreativeType
from app.services.ad_generation import AdGenerator


def test_ad_generator_creates_requested_types(tmp_path):
    init_db()
    with session_scope() as session:
        source = ContentSource(user_id=1, url="https://example.com", title="Example", description="Desc")
        session.add(source)
        session.flush()
        session.refresh(source)
        source_id = source.id

    generator = AdGenerator(user_id=1)
    with session_scope() as session:
        source = session.get(ContentSource, source_id)
    creatives = generator.generate(source, objectives=["increase signups"], creative_types=[CreativeType.TEXT, CreativeType.IMAGE])
    assert len(creatives) == 2
    assert {creative.type for creative in creatives} == {CreativeType.TEXT, CreativeType.IMAGE}
