import { useState, useEffect } from 'react';

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

// Map each sub-tab to a folder ID
const VIDEO_FOLDERS: Record<VideoType, string> = {
    reels: "1VKSN1uxb7uEQvL6v8UpWGe5XBSLx_GXR",
    videos: "15PO_yoYUhxM2kUA0unl5xR0kk5HBWQdC",
    motion: "1fe7cOMJQTvPbRILcd1RcGqYxXGZWplT5",
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

        const API_KEY = import.meta.env.VITE_DRIVE_API_KEY;

        const fetchAllVideos = async () => {
            setLoading(true);
            try {
                if (!API_KEY) throw new Error("Missing Drive API key.");

                const fetchCategory = async (type: VideoType, folderId: string) => {
                    if (!folderId) return [];
                    const URL = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,thumbnailLink,webViewLink)&key=${API_KEY}`;

                    const response = await fetch(URL);
                    const json = await response.json();

                    if (!response.ok) {
                        throw new Error(json?.error?.message || `Failed to fetch ${type}`);
                    }

                    return (json.files || []).map((file: any) => ({
                        id: { videoId: file.id },
                        snippet: { title: file.name },
                        type,
                    }));
                };

                // Fetch all 3 categories in parallel for maximum speed
                const [reels, videos, motion] = await Promise.all([
                    fetchCategory('reels', VIDEO_FOLDERS.reels),
                    fetchCategory('videos', VIDEO_FOLDERS.videos),
                    fetchCategory('motion', VIDEO_FOLDERS.motion)
                ]);

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
            fetchingPromise.then(() => {
                setData(videoCache);
                setLoading(false);
            }).catch(() => {
                setError(true);
                setLoading(false);
            });
        }
    }, []);

    return { data, loading, error };
}
