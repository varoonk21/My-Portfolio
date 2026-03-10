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
        { name: "Achievements", href: "#achievements" }
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
        >
            <nav className="relative flex items-center px-6 py-3  backdrop-blur-md border border-neutral-300 rounded-xl w-full max-w-3xl">

                <div className="text-xl font-bold tracking-widest pr-6">
                    <a href="#home">VK</a>
                </div>

                <div className="h-6 w-px bg-gray-200 mx-2"></div>

                <ul className="hidden md:flex items-center justify-center gap-8 flex-1">
                    {links.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="hover:text-neutral-900 text-neutral-800 font-semibold capitalize transition-colors"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:block h-6 w-px bg-gray-200 ml-2 mr-6"></div>

                <button className="hidden md:block bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <a href="#contact" className="flex items-center gap-2">
                        Contact
                    </a>
                </button>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    {isOpen ? (
                        <Icon icon="mdi:close" width={24} />
                    ) : (
                        <Icon icon="mdi:menu" width={24} />
                    )}
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-xl md:hidden"
                        >
                            <ul className="flex flex-col gap-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>

            </nav>
        </motion.div>
    );
}