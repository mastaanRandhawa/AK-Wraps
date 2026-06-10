export interface InstagramPost {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
}

export interface InstagramFeed {
  fetchedAt: string | null;
  posts: InstagramPost[];
}
