import { randomUUID } from "crypto";
import type { CreativeRequest, ExtractedAsset } from "@main/shared";

const toneMatrix: Record<string, string[]> = {
  text: ["confident", "playful", "inspiring"],
  image: ["vibrant", "minimal", "futuristic"],
  video: ["dynamic", "cinematic", "uplifting"]
};

const callToActions = [
  "Start your trial",
  "Book a live demo",
  "See how it works",
  "Claim your offer"
];

const audiences = [
  "Growth leaders",
  "Marketing teams",
  "Startup founders",
  "Enterprise CMOs"
];

const textTemplates = [
  ({ title, body }: { title?: string; body: string }) =>
    `${title ?? "Unlock growth"}: ${body.slice(0, 160)}...`,
  ({ title, body }: { title?: string; body: string }) =>
    `${title ?? "AI marketing"}—${body.slice(0, 140)}...`
];

const imageTemplates = [
  ({ title }: { title?: string }) =>
    `https://fakeimg.pl/1200x628/?text=${encodeURIComponent(title ?? "AI Campaign")}&font=bebas`,
  () => `https://picsum.photos/seed/${Math.random().toString(36).slice(2)}/1200/628`
];

const videoTemplates = [
  () => `https://example.com/video/${Math.random().toString(36).slice(2)}.mp4`
];

export interface GeneratedCreativePayload {
  id: string;
  type: "text" | "image" | "video";
  title: string;
  content: string;
  callToAction: string;
  tone: string;
  targetAudience: string;
}

const createTitle = (asset: ExtractedAsset, format: string) => {
  const base = asset.title ?? "AI-Powered Campaign";
  switch (format) {
    case "text":
      return `${base} – Instant Ads`;
    case "image":
      return `${base} Visual`;
    case "video":
      return `${base} Spotlight`;
    default:
      return base;
  }
};

export const generateCreatives = async (
  request: CreativeRequest,
  asset: ExtractedAsset
): Promise<GeneratedCreativePayload[]> => {
  const creatives: GeneratedCreativePayload[] = [];
  const formats = request.formats ?? ["text", "image"];

  for (const format of formats) {
    const id = randomUUID();
    const toneOptions = toneMatrix[format];
    const tone = toneOptions[Math.floor(Math.random() * toneOptions.length)];
    const callToAction = callToActions[Math.floor(Math.random() * callToActions.length)];
    const targetAudience = audiences[Math.floor(Math.random() * audiences.length)];

    let content = "";
    if (format === "text") {
      const template = textTemplates[Math.floor(Math.random() * textTemplates.length)];
      content = template({ title: asset.title ?? undefined, body: asset.body });
    } else if (format === "image") {
      const template = imageTemplates[Math.floor(Math.random() * imageTemplates.length)];
      content = template({ title: asset.title ?? undefined });
    } else if (format === "video") {
      const template = videoTemplates[Math.floor(Math.random() * videoTemplates.length)];
      content = template({});
    }

    creatives.push({
      id,
      type: format,
      title: createTitle(asset, format),
      content,
      callToAction,
      tone,
      targetAudience
    });
  }

  return creatives;
};
