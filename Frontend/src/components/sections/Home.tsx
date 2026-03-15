"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import User from "../../data/user.json";

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    element?.scrollIntoView();
  };

  return (
    <section id="home" className="relative h-screen max-h-dvh w-full overflow-hidden flex items-center justify-center">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/video/abstract-glass.mp4" type="video/mp4" />
      </video>

      {/* Intro Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowVideo(false)}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              title="Close video"
            >
              <Icon icon="mdi:close" width="24" />
            </button>

            {/* Video Container */}
            <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://drive.google.com/file/d/1knMGz0V2I4HzD7sekM9juYbs4GucYtj8/preview"
                className="absolute inset-0 w-full h-full"
                allow="autoplay"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <div />
      {/* Left Social Bar */}
      <div className="absolute left-2 md:left-6 bottom-10 flex flex-col items-center gap-6 text-neutral-900 sm:flex">

        <button
          className="hidden sm:block animate-bounce hover:scale-110 transition"
          onClick={() => setShowVideo(true)}
          title="Play intro video"
        >
          <Icon icon="mdi:play-circle" width="28" className="text-neutral-900" />
        </button>

        <div className="w-px hidden sm:block h-56 bg-neutral-700" />



        <a href={User.social.linkedin} className="hover:scale-110 transition">
          <Icon icon="mdi:linkedin" width="24" />
        </a>

        <a href={User.social.github.url} className="hover:scale-105 transition">
          <Icon icon="mdi:github" width="24" />
        </a>

        <a href={User.contact.whatsapp} className="hover:scale-105 transition">
          <Icon icon="mdi:whatsapp" width="24" />
        </a>

      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl cabinet text-neutral-900 mb-4"
        >
          Hi! I'm Varoon Kumar
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl cabinet lg:text-8xl font-semibold md:font-normal text-neutral-900 leading-tight"
        >
          Frontend Developer <br />
          & Video Editor
        </motion.h1>

      </div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 text-neutral-700 text-sm px-1 py-3 rounded-2xl border border-neutral-700"
        onClick={() => scrollToSection('#about')}
      >
        <Icon icon="mdi:arrow-down" width="18" />

      </motion.div>

      <div className="absolute bottom-8 right-6 sm:right-10 cabinet text-neutral-700 text-md ">
        <i> Scroll down</i>
      </div>

    </section>
  );
}
