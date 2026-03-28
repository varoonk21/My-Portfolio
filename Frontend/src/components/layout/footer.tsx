import { useState, useEffect } from "react";
import User from "../../data/user.json";
// @ts-ignore
import { motion } from "motion/react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Initial setup function
    const updateTime = () => {
      const date = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
      });
      setTime(formatter.format(date));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#111111] text-white pt-24 pb-0 overflow-hidden font-sans border-t border-white/10">
      <div className="max-w-7xl px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start z-10 relative">
        {/* 4 Columns Area */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 w-full md:w-auto mb-16 md:mb-0"
        >
          {/* Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-1 font-semibold">Links</h4>
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm text-neutral-300 hover:text-white text-left transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm text-neutral-300 hover:text-white text-left transition-colors font-medium"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm text-neutral-300 hover:text-white text-left transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm text-neutral-300 hover:text-white text-left transition-colors font-medium"
            >
              Contact
            </button>
          </div>

          {/* Socials */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-1 font-semibold">Socials</h4>
            <a
              href={`mailto:${User.contact.email}`}
              className="text-sm text-neutral-300 hover:text-white transition-colors font-medium"
            >
              Email
            </a>
            <a
              href={User.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-neutral-300 hover:text-white transition-colors font-medium"
            >
              LinkedIn
            </a>
            <a
              href={User.contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-neutral-300 hover:text-white transition-colors font-medium"
            >
              Whatsapp
            </a>
            <a
              href={User.social.github.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-neutral-300 hover:text-white transition-colors font-medium"
            >
              Github
            </a>
          </div>

          {/* Local Time */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-1 font-semibold">Local Time</h4>
            <p className="text-sm text-neutral-300 font-medium whitespace-nowrap">{time || "Loading..."}</p>
          </div>

          {/* Version */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-1 font-semibold">Version</h4>
            <p className="text-sm text-neutral-300 font-medium whitespace-nowrap">2026 &copy; Edition</p>
          </div>
        </motion.div>
      </div>

      {/* Giant Text - VAROON */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full flex flex-col justify-center items-center mt-24 relative select-none cursor-default"
      >
        <motion.h6
          variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs text-neutral-400 uppercase tracking-widest mb-2 font-semibold"
        >
          Made with ❤️ and React by
        </motion.h6>
        <div className="overflow-hidden w-full flex justify-center items-center">
          <motion.h1
            variants={{ hidden: { y: "100%" }, visible: { y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-[24vw] md:text-[20vw] font-bold text-white leading-[0.8] tracking-tighter cabinet text-center w-full relative z-0"
          >
            VAROON
          </motion.h1>
        </div>
      </motion.div>
    </footer>
  );
}
