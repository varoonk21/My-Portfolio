import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

// @ts-ignore
import { motion, AnimatePresence } from "motion/react";

import { useDriveVideos, type VideoType } from '../../hooks/useDriveVideos';

// Sub-tab definitions
const VIDEO_SUB_TABS: { id: VideoType; label: string; icon: string }[] = [
    { id: "reels", label: "Reels", icon: "heroicons:film" },
    { id: "videos", label: "Videos", icon: "heroicons:play-circle" },
    { id: "motion", label: "Motion", icon: "heroicons:sparkles" },
];

export default function DriveProjects() {
    const [activeSubTab, setActiveSubTab] = useState<VideoType>("reels");

    // Call the custom hook - this will immediately return cached data if it has already been fetched!
    const { data, loading, error } = useDriveVideos();

    // Get the current list of videos for the selected tab
    const videos = data?.[activeSubTab] || [];

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
                <div className={`grid justify-items-center gap-6 w-full ${activeSubTab === "reels"
                    ? "grid-cols-1 sm:grid-cols-3 lg:grid-cols-5"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}>
                    {[...Array(activeSubTab === "reels" ? 5 : 6)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-full rounded-lg bg-neutral-200 dark:bg-white/10 animate-pulse ${activeSubTab === "reels" ? "aspect-9/16 max-w-[280px]" : "aspect-video"}`}
                        />
                    ))}
                </div>
            ) : error ? (
                <div className="flex flex-col items-center gap-3 py-16 text-neutral-500 dark:text-neutral-400">
                    <Icon icon="heroicons:exclamation-triangle" width="40" />
                    <p className="text-sm">Failed to load videos. Please check your API key or folder IDs.</p>
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
                        className={`grid justify-items-center gap-6 w-full ${activeSubTab === "reels"
                            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            }`}
                    >
                        {videos.map((video) => (
                            <div
                                key={video.id.videoId}
                                className={`relative mx-auto group rounded-lg overflow-hidden w-full shadow-md bg-black transition-all duration-300 ${activeSubTab === "reels" ? "aspect-9/16 max-w-[280px]" : "aspect-video"}`}
                            >
                                <iframe
                                    src={`https://drive.google.com/file/d/${video.id.videoId}/preview`}
                                    allowFullScreen
                                    className={activeSubTab === "reels"
                                        ? "absolute top-0 left-0 w-[200%] h-[200%] border-0 origin-top-left scale-50"
                                        : "absolute top-0 left-0 w-full h-full border-0 transform scale-[1.02]"
                                    }
                                ></iframe>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}