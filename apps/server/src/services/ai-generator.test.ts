import { describe, it, expect } from "vitest";
import { generateCreatives } from "./ai-generator.js";

const asset = {
  id: "asset-1",
  url: "https://example.com",
  title: "Example",
  description: "desc",
  body: "This is a long body of content that will be used to generate creatives.",
  images: [],
  videos: [],
  tags: [],
  campaignId: "camp-1",
  createdAt: new Date()
};

describe("generateCreatives", () => {
  it("creates creatives for requested formats", async () => {
    const result = await generateCreatives(
      {
        campaignId: "camp-1",
        extractedAssetId: "asset-1",
        workspaceId: "workspace-1",
        userId: "user-1",
        formats: ["text", "image"]
      },
      asset as any
    );

    expect(result).toHaveLength(2);
    expect(result[0].title).toBeTruthy();
    expect(result[0].callToAction).toBeTruthy();
  });
});
