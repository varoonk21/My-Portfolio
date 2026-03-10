"use client";

import { motion } from "framer-motion";
import experiences from "../data/experiences.json"

export default function Experience() {
    return (
        <section id="experience" className="relative z-20 bg-neutral-100 py-24 px-4 md:px-12 ">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-center"
                >
                    Experience
                </motion.h2>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex flex-col md:flex-row gap-8 md:gap-16 border-l-2 border-neutral-800 pl-8 md:pl-12 relative"
                        >
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-neutral-500 rounded-full" />

                            <div className="md:w-1/3">
                                <h3 className="text-2xl font-bold">{exp.company}</h3>
                                <p className="text-neutral-800 mt-1">{exp.position}</p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-neutral-500 uppercase tracking-widest">
                                    <span>{exp.startDate}</span>
                                    <span>•</span>
                                    <span>{exp.location}</span>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <p className="text-neutral-900 text-lg leading-relaxed mb-6">
                                    {exp.bullets}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-neutral-700 text-white text-sm font-semibold rounded-md border border-white/5">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}