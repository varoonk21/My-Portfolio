"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Player from "./Player";

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
        const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

        if (!API_KEY || !CHANNEL_ID) {
          throw new Error("Missing YouTube API key or Channel ID in environment variables.");
        }

        const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=12&type=video`;

        const response = await fetch(URL);
        const data = await response.json();

        if (!response.ok) {
          const message = data?.error?.message || `HTTP error! status: ${response.status}`;
          throw new Error(message);
        }

        if (!data.items || data.items.length === 0) {
          throw new Error("No videos found for this channel.");
        }

        setVideos(data.items);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <p className="text-red-500 text-lg font-semibold mb-2">Failed to load videos</p>
        <p className="text-gray-400 text-sm max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My YouTube Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id.videoId}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Player videoId={video.id.videoId} />

            <div className="p-4">
              <h3 className="font-semibold text-lg">{video.snippet.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;