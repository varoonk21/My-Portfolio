"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import experiencesData from "../data/experiences.json";

interface ExperienceItem {
    id: string | number;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location: string;
    isCurrentRole?: boolean;
    bullets: string[];
    skills: string[];
}

const experiences = experiencesData as ExperienceItem[];

function formatDate(dateStr: string) {
    if (!dateStr || dateStr.toLowerCase() === "present") return "Present";
    const [year, month] = dateStr.split("-");
    const d = new Date(Number(year), Number(month) - 1);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const lineHeight = useTransform(
        scrollYProgress,
        [0.15, 0.9],
        ["0%", "100%"]
    );

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative bg-[#f0f0f0] py-12 md:py-24 px-4 sm:px-6 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10 md:mb-16 flex flex-col items-center relative z-20">
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-neutral-500 border border-neutral-200 bg-white/50 px-4 py-1.5 rounded-full uppercase shadow-sm">
                        Career Journey
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 md:mt-5 text-neutral-900 tracking-tight">
                        Experience
                    </h2>
                    <p className="mt-3 md:mt-4 text-neutral-500 font-medium text-sm md:text-base max-w-md mx-auto">
                        A timeline of my professional journey.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative pt-4">

                    <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-0 w-[2px] bg-neutral-200 z-0" />

                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-4 w-[2px] bg-neutral-500 origin-top z-0"
                    />

                    <div className="relative z-10 space-y-8 md:space-y-6">
                        {experiences.map((exp, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: isLeft ? -60 : 60, }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    transition={{ duration: 2, ease: "easeOut" }}

                                    className={`relative flex w-full items-start ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                                >

                                    <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 top-7 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-neutral-800 border-[3px] md:border-4 border-[#f0f0f0] shadow-md z-20 box-content" />

                                    {/* Card Container */}
                                    <div className={`w-full md:w-1/2 pl-[56px] sm:pl-[64px] md:pl-0 pt-0 ${isLeft ? "md:pr-10 lg:pr-14" : "md:pl-10 lg:pl-14"}`}>
                                        <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-lg transition-all duration-300 relative group">

                                            <div className={`hidden md:block absolute top-[40px] w-10 lg:w-14 h-[2px] bg-neutral-200 group-hover:bg-neutral-300 transition-colors duration-300 z-0 ${isLeft ? "right-0 translate-x-full" : "left-0 -translate-x-full"}`} />

                                            {/* Content */}
                                            <div className="relative z-10 flex flex-col xl:flex-row xl:items-start justify-between gap-3 mb-2">
                                                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                                                    {exp.company}
                                                </h3>
                                                {exp.isCurrentRole && (
                                                    <div className="inline-flex w-fit items-center gap-2 px-3 py-1 bg-neutral-100 text-neutral-700 text-[10px] sm:text-xs font-bold uppercase rounded-md border border-neutral-200">
                                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                                        Current Role
                                                    </div>
                                                )}
                                            </div>

                                            <p className="text-blue-600 dark:text-blue-500 font-semibold text-sm sm:text-base mb-3">
                                                {exp.position}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-2.5 text-[11px] sm:text-[13px] text-neutral-500 uppercase tracking-widest font-semibold">
                                                <span>{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                                                <span className="hidden sm:inline text-neutral-300">•</span>
                                                <span>{exp.location}</span>
                                            </div>

                                            <div className="h-px w-full bg-neutral-100 my-5" />

                                            <ul className="space-y-3 text-sm sm:text-[15px] text-neutral-600">
                                                {exp.bullets.map((bullet, i) => (
                                                    <li key={i} className="flex gap-3 items-start relative">
                                                        <span className="min-w-[6px] h-[6px] bg-neutral-300 group-hover:bg-blue-400 transition-colors rounded-full mt-[8px]"></span>
                                                        <span className="leading-relaxed">{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex flex-wrap gap-2 mt-6">
                                                {exp.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-3 py-1.5 bg-neutral-50 text-neutral-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md border border-neutral-200 hover:bg-white hover:border-neutral-400 hover:text-neutral-900 transition-all duration-200"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* END DOT */}
                    <div className="relative w-full h-24 md:h-32 mt-4 md:mt-2 z-10">
                        <div className="absolute left-[24px] md:left-1/2 -bottom-4 -translate-x-1/2 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-4 border-[#f0f0f0] bg-neutral-800 z-10 box-content mt-[-2px]"></div>
                        <p className="absolute left-[56px] sm:left-[64px] md:left-1/2 md:-translate-x-1/2 -bottom-4 sm:-bottom-10  text-[11px] md:text-xs tracking-[0.2em] font-bold text-neutral-400 uppercase whitespace-nowrap">
                            The Journey Continues…
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}