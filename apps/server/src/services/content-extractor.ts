import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";

export interface ExtractedContent {
  title?: string;
  description?: string;
  body: string;
  images: string[];
  videos: string[];
  ogImage?: string;
  ogVideo?: string;
}

const removeScripts = ($: cheerio.CheerioAPI) => {
  ["script", "style", "noscript"].forEach((tag) => {
    $(tag).remove();
  });
};

const collectImages = ($: cheerio.CheerioAPI, baseUrl: string) => {
  const images = new Set<string>();
  $("img").each((_, el) => {
    const src = $(el).attr("src");
    if (src) {
      images.add(new URL(src, baseUrl).toString());
    }
  });
  return Array.from(images);
};

const collectVideos = ($: cheerio.CheerioAPI, baseUrl: string) => {
  const videos = new Set<string>();
  $("video source").each((_, el) => {
    const src = $(el).attr("src");
    if (src) {
      videos.add(new URL(src, baseUrl).toString());
    }
  });
  $("iframe").each((_, el) => {
    const src = $(el).attr("src");
    if (src && /youtube|vimeo/.test(src)) {
      videos.add(new URL(src, baseUrl).toString());
    }
  });
  return Array.from(videos);
};

const extractText = (dom: JSDOM) => {
  const doc = dom.window.document;
  const main = doc.querySelector("main") ?? doc.body;
  return main.textContent?.replace(/\s+/g, " ").trim() ?? "";
};

export const extractFromUrl = async (url: string): Promise<ExtractedContent> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch url ${url}: ${response.status}`);
  }
  const html = await response.text();
  const $ = cheerio.load(html);
  removeScripts($);

  const title = $("title").first().text();
  const description = $('meta[name="description"]').attr("content") ?? undefined;
  const ogImage = $('meta[property="og:image"]').attr("content") ?? undefined;
  const ogVideo = $('meta[property="og:video"]').attr("content") ?? undefined;
  const images = collectImages($, url);
  const videos = collectVideos($, url);
  if (ogImage) images.unshift(ogImage);
  if (ogVideo) videos.unshift(ogVideo);

  const dom = new JSDOM($.html());
  const body = extractText(dom);

  return {
    title: title || undefined,
    description,
    body,
    images,
    videos,
    ogImage,
    ogVideo
  };
};
