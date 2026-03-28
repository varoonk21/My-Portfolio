import { useState, useEffect } from "react";

export type VideoType = "reels" | "videos" | "motion";

export type VideoItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    description?: string;
    publishedAt?: string;
    thumbnails?: { medium: { url: string } };
    channelTitle?: string;
  };
  type: VideoType;
};

// Global cache to persist data across component mounts
let videoCache: Record<VideoType, VideoItem[]> | null = null;
let fetchingPromise: Promise<void> | null = null;

export function useDriveVideos() {
  const [data, setData] = useState<Record<VideoType, VideoItem[]> | null>(videoCache);
  const [loading, setLoading] = useState(!videoCache);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If data is already cached, no need to fetch again
    if (videoCache) {
      setData(videoCache);
      setLoading(false);
      return;
    }

    const fetchAllVideos = async () => {
      setLoading(true);
      try {
        const fetchCategory = async () => {
          const URL = `${import.meta.env.VITE_BACKEND_URL}/api/video`;

          const response = await fetch(URL);
          const json = await response.json();

          if (!response.ok) {
            throw new Error(json?.error?.message || `Failed to fetch Videos`);
          }

          return json;
        };

        // Fetch all 3 categories in parallel for maximum speed
        const { reels, videos, motion } = await fetchCategory();

        videoCache = { reels, videos, motion };
        setData(videoCache);
      } catch (err) {
        console.error("Error fetching drive videos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    // If a fetch is already in progress, wait for it to finish
    if (!fetchingPromise) {
      fetchingPromise = fetchAllVideos();
    } else {
      fetchingPromise
        .then(() => {
          setData(videoCache);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, []);

  return { data, loading, error };
}
