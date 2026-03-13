import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Player from "../Player";

// @ts-ignore
import { motion, AnimatePresence } from "motion/react";

type VideoType = "reels" | "videos" | "motion";

type VideoItem = {
    id: { videoId: string };
    snippet: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: { medium: { url: string } };
        channelTitle?: string;
    };
    type: VideoType;
};

// Sub-tab definitions
const VIDEO_SUB_TABS: { id: VideoType; label: string; icon: string }[] = [
    { id: "reels", label: "Reels", icon: "heroicons:film" },
    { id: "videos", label: "Videos", icon: "heroicons:play-circle" },
    { id: "motion", label: "Motion", icon: "heroicons:sparkles" },
];

// Map each sub-tab to a playlist ID
const VIDEO_PLAYLISTS: Record<VideoType, string> = {
    reels: "",   // Replace with your Reels playlist ID
    videos: "",   // Replace with your Long Videos playlist ID
    motion: "", // Replace with your Motion Graphics playlist ID
};

export default function VideoProjects() {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeSubTab, setActiveSubTab] = useState<VideoType>("reels");

    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

    // Fetch videos for the active playlist
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                setError(false);

                const playlistId = VIDEO_PLAYLISTS[activeSubTab];
                const URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=${playlistId}&key=${API_KEY}`;

                const response = await fetch(URL);
                if (!response.ok) throw new Error("Failed to fetch playlist videos");
                const data = await response.json();

                const vids: VideoItem[] = (data.items || []).map((item: any) => ({
                    id: { videoId: item.snippet.resourceId.videoId },
                    snippet: item.snippet,
                    type: activeSubTab,
                }));

                setVideos(vids);
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [activeSubTab, API_KEY]);

    return (
        <div className="w-full">
            {/* Sub-tabs */}
            <div className="flex gap-1 mb-8 bg-neutral-100 dark:bg-white/5 p-1 rounded-xl w-fit">
                {VIDEO_SUB_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
              ${activeSubTab === tab.id
                                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
                            }`}
                    >
                        <Icon icon={tab.icon} width="15" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden bg-neutral-100 dark:bg-white/5 animate-pulse">
                            <div className="aspect-video w-full bg-neutral-200 dark:bg-white/10" />
                            <div className="p-4 space-y-2">
                                <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-white/10" />
                                <div className="h-3 w-1/3 rounded bg-neutral-200 dark:bg-white/10" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="flex flex-col items-center gap-3 py-16 text-neutral-500 dark:text-neutral-400">
                    <Icon icon="heroicons:exclamation-triangle" width="40" />
                    <p className="text-sm">Failed to load videos. Please check your API key or playlist IDs.</p>
                </div>
            ) : videos.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-20 text-neutral-400 dark:text-neutral-500">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center">
                        <Icon icon="heroicons:video-camera-slash" width="28" />
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-neutral-600 dark:text-neutral-300">No {activeSubTab} yet</p>
                        <p className="text-sm mt-1">Videos in this category will appear here once added.</p>
                    </div>
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSubTab}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                    >
                        {videos.map((video) => (
                            <div
                                key={video.id.videoId}
                                className="group rounded-2xl overflow-hidden bg-white dark:bg-[#222222] border border-neutral-100 dark:border-white/5 shadow-sm hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1.5"
                            >
                                <Player videoId={video.id.videoId} />
                                <div className="p-4">
                                    <h3 className="font-semibold text-sm text-neutral-800 dark:text-white line-clamp-2 group-hover:text-neutral-900 dark:group-hover:text-blue-400 transition-colors">
                                        {video.snippet.title}
                                    </h3>
                                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1.5">
                                        {new Date(video.snippet.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}