"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Navbar() {
    const [hidden, setHidden] = useState(false);

    React.useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Achievements", href: "#achievements" },
        { name: "Contact", href: "#contact" }
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Navbar */}
            <motion.div
                variants={{
                    visible: { y: 0 },
                    hidden: { y: -100 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="hidden md:flex fixed top-4 left-0 right-0 z-50 justify-center px-4"
            >
                <nav className="relative flex items-center px-6 py-3 backdrop-blur-md border border-neutral-300 rounded-xl w-full max-w-3xl">
                    <div className="text-xl font-bold tracking-widest pr-4">
                        <a href="#home">VK</a>
                    </div>
                    <div className="h-6 w-px bg-neutral-400 mx-2"></div>
                    <ul className="flex items-center justify-center gap-6 flex-1">
                        {links.filter(link => link.name !== "Contact").map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="hover:text-neutral-500 text-neutral-900 font-semibold capitalize transition-colors"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="h-6 w-px bg-neutral-400 ml-2 mr-6"></div>
                    <button className="bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors group">
                        <a href="#contact" className="flex items-center gap-2 group-hover:scale-105 transition-transform">
                            Contact
                        </a>
                    </button>
                </nav>
            </motion.div>

            {/* Mobile Navbar Overlay Button */}
            <motion.div
                className="md:hidden fixed z-60 backdrop-blur-md border border-neutral-300 text-neutral-900 bg-white/70 shadow-2xl overflow-hidden"
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    closed: {
                        top: "16px",
                        right: "16px",
                        width: "56px",
                        height: "56px",
                        borderRadius: "22px"
                    },
                    open: {
                        top: "16px",
                        right: "16px",
                        width: "calc(100vw - 32px)",
                        height: "450px",
                        borderRadius: "24px"
                    }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.button
                            key="menu-btn"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => setIsOpen(true)}
                            className="absolute text-neutral-900 inset-0 w-full h-full flex items-center justify-center cursor-pointer"
                        >
                            <Icon icon="mdi:menu" width={28} />
                        </motion.button>
                    ) : (
                        <motion.div
                            key="menu-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className=" p-6 flex flex-col"
                        >
                            <div className="flex justify-end mb-4">
                                <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 -mt-2 cursor-pointer text-neutral-900 hover:text-white">
                                    <Icon icon="mdi:close" width={32} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-2 px-2 overflow-y-auto pb-4">
                                {links.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-neutral-900 text-lg font-bold cabinet tracking-wide flex items-center justify-between group py-1"
                                    >
                                        <span>{link.name}</span>
                                        <span className="text-neutral-900/30 text-2xl group-hover:text-neutral-900 transition-colors">+</span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}