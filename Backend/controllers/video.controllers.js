import GetVideo from "../services/video.services.js";

const VIDEO_FOLDERS = {
  reels: "1VKSN1uxb7uEQvL6v8UpWGe5XBSLx_GXR",
  videos: "15PO_yoYUhxM2kUA0unl5xR0kk5HBWQdC",
  motion: "1fe7cOMJQTvPbRILcd1RcGqYxXGZWplT5",
};

export const handleGetVideo = async (req, res) => {
  try {
    const [reels, videos, motion] = await Promise.all([
      GetVideo("reels", VIDEO_FOLDERS.reels),
      GetVideo("videos", VIDEO_FOLDERS.videos),
      GetVideo("motion", VIDEO_FOLDERS.motion),
    ]);
    return res.status(200).json({ reels, videos, motion });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
