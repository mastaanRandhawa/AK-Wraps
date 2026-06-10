/**
 * Fetches recent Instagram media via the Instagram Graph API and writes
 * frontend/public/instagram-feed.json for the static site build.
 *
 * Requires INSTAGRAM_ACCESS_TOKEN (long-lived token from a Business/Creator account).
 * @see docs/INSTAGRAM_SETUP.md
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "../frontend/public/instagram-feed.json");

const FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
].join(",");

const MAX_POSTS = 12;

async function fetchJson(url) {
  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body?.error?.message ?? `HTTP ${res.status}`);
  }
  return body;
}

function pickImageUrl(item) {
  if (item.media_type === "VIDEO") {
    return item.thumbnail_url ?? item.media_url ?? null;
  }
  return item.media_url ?? item.thumbnail_url ?? null;
}

async function normalizeMediaItem(item, token) {
  const imageUrl = pickImageUrl(item);
  if (imageUrl) {
    return {
      id: item.id,
      caption: item.caption ?? "",
      mediaType: item.media_type,
      imageUrl,
      permalink: item.permalink,
      timestamp: item.timestamp,
    };
  }

  if (item.media_type !== "CAROUSEL_ALBUM") return null;

  const childrenUrl = new URL(
    `https://graph.instagram.com/v21.0/${item.id}/children`,
  );
  childrenUrl.searchParams.set("fields", "media_type,media_url,thumbnail_url");
  childrenUrl.searchParams.set("access_token", token);

  const children = await fetchJson(childrenUrl);
  const first = children.data?.find((child) => pickImageUrl(child));
  const childImage = first ? pickImageUrl(first) : null;
  if (!childImage) return null;

  return {
    id: item.id,
    caption: item.caption ?? "",
    mediaType: item.media_type,
    imageUrl: childImage,
    permalink: item.permalink,
    timestamp: item.timestamp,
  };
}

async function fetchInstagramFeed(token) {
  const url = new URL("https://graph.instagram.com/v21.0/me/media");
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("limit", String(MAX_POSTS));
  url.searchParams.set("access_token", token);

  const payload = await fetchJson(url);
  const items = await Promise.all(
    (payload.data ?? []).map((item) => normalizeMediaItem(item, token)),
  );

  return {
    fetchedAt: new Date().toISOString(),
    posts: items.filter(Boolean),
  };
}

function readExistingFeed() {
  if (!existsSync(outputPath)) {
    return { fetchedAt: null, posts: [] };
  }
  try {
    return JSON.parse(readFileSync(outputPath, "utf8"));
  } catch {
    return { fetchedAt: null, posts: [] };
  }
}

async function main() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

  if (!token) {
    console.warn(
      "INSTAGRAM_ACCESS_TOKEN not set — keeping existing instagram-feed.json",
    );
    const existing = readExistingFeed();
    writeFileSync(outputPath, `${JSON.stringify(existing, null, 2)}\n`);
    return;
  }

  try {
    const feed = await fetchInstagramFeed(token);
    writeFileSync(outputPath, `${JSON.stringify(feed, null, 2)}\n`);
    console.log(`Wrote ${feed.posts.length} Instagram post(s) to ${outputPath}`);
  } catch (err) {
    console.error("Instagram fetch failed:", err.message);
    const existing = readExistingFeed();
    writeFileSync(outputPath, `${JSON.stringify(existing, null, 2)}\n`);
    process.exitCode = 1;
  }
}

main();
