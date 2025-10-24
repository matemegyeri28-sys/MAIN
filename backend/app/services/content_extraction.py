from __future__ import annotations

from datetime import datetime
from urllib.parse import urljoin

import httpx
from bs4 import BeautifulSoup

from app.core.database import session_scope
from app.models.models import ContentSource


class ContentExtractor:
    USER_AGENT = "Mozilla/5.0 (MarketingBot)"

    def __init__(self, user_id: int):
        self.user_id = user_id

    def fetch(self, url: str) -> ContentSource:
        headers = {"User-Agent": self.USER_AGENT}
        response = httpx.get(url, headers=headers, timeout=20)
        response.raise_for_status()
        html = response.text
        soup = BeautifulSoup(html, "html.parser")

        title = soup.title.string.strip() if soup.title and soup.title.string else None
        description = self._extract_meta(soup, "description")
        og_image = self._extract_meta(soup, "og:image")
        og_video = self._extract_meta(soup, "og:video")
        text_content = self._extract_text(soup)
        images = self._extract_images(soup, url)
        meta = {
            "og:title": self._extract_meta(soup, "og:title"),
            "og:site_name": self._extract_meta(soup, "og:site_name"),
            "og:type": self._extract_meta(soup, "og:type"),
        }

        with session_scope() as session:
            source = ContentSource(
                user_id=self.user_id,
                url=url,
                title=title,
                description=description,
                og_image=og_image,
                og_video=og_video,
                raw_html=html,
                extracted_text=text_content,
                extracted_images=images,
                meta=meta,
                last_fetched=datetime.utcnow(),
            )
            session.add(source)
            session.flush()
            session.refresh(source)
            return source

    @staticmethod
    def _extract_meta(soup: BeautifulSoup, name: str) -> str | None:
        meta_tag = soup.find("meta", attrs={"property": name}) or soup.find("meta", attrs={"name": name})
        if meta_tag and meta_tag.get("content"):
            return meta_tag["content"].strip()
        return None

    @staticmethod
    def _extract_text(soup: BeautifulSoup) -> str:
        for element in soup(["script", "style", "noscript", "iframe"]):
            element.extract()
        text = " ".join(soup.stripped_strings)
        return text[:10000]

    @staticmethod
    def _extract_images(soup: BeautifulSoup, base_url: str) -> list[str]:
        images: list[str] = []
        for img in soup.find_all("img"):
            src = img.get("src") or img.get("data-src")
            if not src:
                continue
            absolute = urljoin(base_url, src)
            if absolute not in images:
                images.append(absolute)
            if len(images) >= 10:
                break
        return images
