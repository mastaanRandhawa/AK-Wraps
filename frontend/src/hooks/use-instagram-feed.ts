import { useEffect, useState } from "react";
import type { InstagramFeed, InstagramPost } from "@/types/instagram";

const FEED_URL = `${import.meta.env.BASE_URL}instagram-feed.json`;

let cachedFeed: InstagramPost[] | null = null;
let cachePromise: Promise<InstagramPost[]> | null = null;

async function loadFeed(): Promise<InstagramPost[]> {
  if (cachedFeed) return cachedFeed;

  if (!cachePromise) {
    cachePromise = fetch(FEED_URL)
      .then(async (res) => {
        if (!res.ok) return [];
        const data = (await res.json()) as InstagramFeed;
        return data.posts ?? [];
      })
      .catch(() => [])
      .then((posts) => {
        cachedFeed = posts;
        return posts;
      });
  }

  return cachePromise;
}

export function useInstagramFeed(limit?: number) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    loadFeed().then((allPosts) => {
      if (!active) return;
      setPosts(limit ? allPosts.slice(0, limit) : allPosts);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [limit]);

  return { posts, loading };
}
