"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import User from "../data/user.json";

export default function Hero() {

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
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source src="/video/abstract-glass.mp4" type="video/mp4" />
      </video>



      <div />
      {/* Left Social Bar */}
      <div className="absolute left-2 md:left-6 bottom-10 flex flex-col items-center gap-6 text-neutral-900 sm:flex">

        <div className="hidden md:block h-px w-56 bg-neutral-700"></div>
        <div className="w-px hidden md:block h-56 bg-neutral-700" />



        <a href={User.social.linkedin} className="hover:scale-110 transition">
          <Icon icon="mdi:linkedin" width="22" />
        </a>

        <a href={User.social.github.url} className="hover:scale-105 transition">
          <Icon icon="mdi:github" width="22" />
        </a>

        <a href={User.contact.whatsapp} className="hover:scale-105 transition">
          <Icon icon="mdi:whatsapp" width="22" />
        </a>

      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-neutral-900 mb-4"
        >
          Hi! I'm Varoon Kumar
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl   lg:text-8xl font-semibold text-neutral-900 leading-tight"
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

      <div className="absolute bottom-8 right-6 sm:right-10 text-neutral-700 text-md ">
        <i> Scroll down</i>
      </div>

    </section>
  );
}
