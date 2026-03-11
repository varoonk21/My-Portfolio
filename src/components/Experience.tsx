"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import experiences from "../data/experiences.json";

function formatDate(dateStr: string): string {
    if (!dateStr) return "Present";
    const [year, month] = dateStr.split("-");
    const d = new Date(Number(year), Number(month) - 1);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function TimelineCard({
    exp,
    index,
}: {
    exp: (typeof experiences)[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentScrollY = window.scrollY;
                const scrollingDown = currentScrollY >= lastScrollY.current;
                lastScrollY.current = currentScrollY;

                if (scrollingDown && entry.isIntersecting) {
                    setVisible(true);
                } else if (!scrollingDown && !entry.isIntersecting) {
                    setVisible(false);
                }
            },
            { threshold: 0.2 }
        );

        const el = cardRef.current;
        if (el) observer.observe(el);
        return () => {
            if (el) observer.unobserve(el);
        };
    }, []);

    const isLeft = index % 2 === 0;

    return (
        <div
            ref={cardRef}
            className={`relative flex w-full items-center mb-16 justify-end md:${isLeft ? "justify-start" : "justify-end"}`}
        >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={visible ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className={`w-5 h-5 rounded-full border-4 border-neutral-100 shadow-lg ${
                        exp.isCurrentRole ? "bg-neutral-800" : "bg-neutral-500"
                    }`}
                />
            </div>

            {/* Card */}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        key={`exp-card-${index}`}
                        initial={{
                            opacity: 0,
                            x: isLeft ? -60 : 60,
                            y: 20,
                        }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{
                            opacity: 0,
                            x: isLeft ? -40 : 40,
                            y: -10,
                        }}
                        transition={{
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-3rem)] group relative bg-white border border-neutral-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 ml-auto md:ml-0 ${
                            isLeft ? "md:mr-auto" : "md:ml-auto"
                        }`}
                    >
                        {/* Connector line from card to dot */}
                        <div
                            className={`absolute top-1/2 -translate-y-1/2 h-px w-10 bg-neutral-300 -left-10 md:${
                                isLeft ? "left-auto -right-10" : "-left-10"
                            }`}
                        />

                        {/* Current role badge */}
                        {exp.isCurrentRole && (
                            <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 bg-neutral-900 text-white text-xs font-semibold rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Current Role
                            </div>
                        )}

                        {/* Header */}
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                                {exp.company}
                            </h3>
                            <p className="text-neutral-600 font-medium mt-0.5">{exp.position}</p>
                            <div className="flex flex-wrap items-center gap-x-2 mt-2 text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                                <span>{formatDate(exp.startDate)}</span>
                                <span>→</span>
                                <span>{formatDate(exp.endDate)}</span>
                                <span className="text-neutral-300">·</span>
                                <span>{exp.location}</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-neutral-100 mb-4" />

                        {/* Bullets */}
                        <ul className="space-y-2 mb-5">
                            {Array.isArray(exp.bullets) &&
                                exp.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-2 text-neutral-600 text-sm leading-relaxed">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                                        {bullet}
                                    </li>
                                ))}
                        </ul>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-lg border border-neutral-200 hover:bg-neutral-800 hover:text-white hover:border-neutral-800 transition-colors duration-200"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // The animated fill line
    const lineHeight = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative z-20 bg-neutral-100 py-24 px-4 md:px-12 overflow-hidden"
        >
            <div className="max-w-5xl mx-auto">

                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <span className="text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase">
                        Career Journey
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-3 text-neutral-900">
                        Experience
                    </h2>
                    <p className="mt-4 text-neutral-500 max-w-md mx-auto text-sm">
                        A timeline of my professional journey — scroll down to explore, scroll up to revisit.
                    </p>
                </motion.div>

                {/* Timeline container */}
                <div className="relative">

                    {/* Static grey background line */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-neutral-200" />

                    {/* Animated fill line */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 w-px overflow-hidden" style={{ height: "100%" }}>
                        <motion.div
                            className="w-full bg-neutral-800 origin-top"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Cards */}
                    {experiences.map((exp, index) => (
                        <TimelineCard key={exp.id} exp={exp} index={index} />
                    ))}

                    {/* End cap */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="relative flex flex-col md:items-center mt-4 md:mt-8 ml-0 md:ml-0"
                    >
                        {/* Dot container */}
                        <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-px h-8 bg-neutral-800" />
                            <div className="w-4 h-4 rounded-full bg-neutral-800 border-4 border-neutral-100 shadow-md" />
                        </div>
                        {/* Text */}
                        <p className="pl-6 md:pl-0 mt-12 mb-4 md:mt-16 text-xs uppercase tracking-widest text-neutral-400 font-semibold text-left md:text-center">
                            The Journey Continues…
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}