"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Player from "./Player";

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
  const fetchVideos = async () => {
    try {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
      const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
      
      const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=12&type=video`;

      const response = await fetch(URL, {
        headers: {
          // This tells Google the request is coming from your domain
          'Referer': 'https://varoon.site'  // Make sure this matches exactly
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('YouTube API Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };
  
  fetchVideos();
}, []);

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