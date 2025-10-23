const stopWords = new Set(['the','and','for','with','from','that','this','your','have','will','into','about','using','into','into']);

export function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractImages(html, baseUrl) {
  if (!html) return [];
  const urls = new Set();
  const regex = /<img[^>]*src=["']?([^"'> ]+)/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const src = match[1];
    if (!src) continue;
    if (src.startsWith('http://') || src.startsWith('https://')) {
      urls.add(src);
    } else if (src.startsWith('//')) {
      urls.add(`https:${src}`);
    } else if (baseUrl) {
      try {
        const resolved = new URL(src, baseUrl).href;
        urls.add(resolved);
      } catch {
        // ignore malformed
      }
    }
  }
  return Array.from(urls);
}

export function keywordSummary(text, limit = 8) {
  if (!text) return [];
  const counts = new Map();
  for (const raw of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (!raw || stopWords.has(raw) || raw.length < 4) continue;
    counts.set(raw, (counts.get(raw) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

export async function fetchContent(url) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  const html = await response.text();
  return {
    url,
    html,
    text: stripHtml(html),
    images: extractImages(html, url)
  };
}

export function createCreativeIdeas(text, images, options = {}) {
  const { headlineLength = 70, descriptionLength = 160 } = options;
  const summary = text.split('.').map((s) => s.trim()).filter(Boolean).slice(0, 3);
  const keywords = keywordSummary(text);
  const baseHeadline = summary[0] ?? 'Discover something new';
  const baseDescription = summary.slice(1).join(' ') || text.slice(0, 200);

  const headline = truncateSentence(baseHeadline, headlineLength);
  const description = truncateSentence(baseDescription, descriptionLength);

  return {
    headline,
    description,
    keywords,
    image: images[0] ?? null
  };
}

export function platformVariations(baseCreative, platforms) {
  const timestamp = Date.now();
  return platforms.map((platform, index) => {
    const tone = toneForPlatform(platform);
    return {
      id: `${platform}-${timestamp}-${index}`,
      platform,
      headline: adjustTone(baseCreative.headline, tone),
      description: adjustTone(baseCreative.description, tone),
      keywords: baseCreative.keywords,
      image: baseCreative.image,
      createdAt: new Date().toISOString()
    };
  });
}

function toneForPlatform(platform) {
  switch (platform) {
    case 'facebook':
      return 'friendly';
    case 'instagram':
      return 'lively';
    case 'linkedin':
      return 'professional';
    case 'twitter':
    case 'x':
      return 'concise';
    case 'tiktok':
      return 'playful';
    default:
      return 'neutral';
  }
}

function adjustTone(text, tone) {
  if (!text) return '';
  switch (tone) {
    case 'friendly':
      return `${text} — Join the community!`;
    case 'lively':
      return `🌈 ${text}`;
    case 'professional':
      return `${text} | Learn how leaders stay ahead.`;
    case 'concise':
      return truncateSentence(text, 120);
    case 'playful':
      return `${text} 🚀`;
    default:
      return text;
  }
}

export function planSchedule(creatives, start = Date.now()) {
  const schedule = [];
  let current = start;
  const interval = 1000 * 60 * 60 * 6; // every 6 hours
  for (const creative of creatives) {
    schedule.push({
      id: `${creative.id}-slot`,
      creativeId: creative.id,
      platform: creative.platform,
      scheduledFor: new Date(current).toISOString()
    });
    current += interval;
  }
  return schedule;
}

export function summarizeWorkspace({ campaigns, creatives, schedule }) {
  return {
    campaigns: campaigns.length,
    creatives: creatives.length,
    upcomingPosts: schedule.filter((item) => new Date(item.scheduledFor) > new Date()).length,
    lastUpdated: new Date().toISOString()
  };
}

function truncateSentence(text, limit) {
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1).trim()}\u2026`;
}
