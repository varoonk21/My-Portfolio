import { useState } from 'react';
// @ts-ignore
import { motion, AnimatePresence } from 'motion/react';
import WebProjects from '../projects/WebProjects';
import VideoProjects from '../projects/VideoProjects';
import DriveProjects from '../projects/DriveProjects';
type MainTab = 'web' | 'video';

const MAIN_TABS: { id: MainTab; label: string }[] = [
    { id: 'web', label: 'Web' },
    { id: 'video', label: 'Video' },
];

const TAB_DESCRIPTIONS: Record<MainTab, { heading: string; sub: string }> = {
    web: {
        heading: 'Featured Projects',
        sub: 'A showcase of my recent web projects, personal work, and open-source contributions.',
    },
    video: {
        heading: 'Video Portfolio',
        sub: 'Crafting cinematic experiences and digital narratives. Explore my curated selection of high-impact video productions and motion graphics.',
    },

};

export default function Projects() {
    const [activeTab, setActiveTab] = useState<MainTab>('web');

    return (
        <section
            className="w-full bg-white text-neutral-800 dark:bg-[#1e1e1e] dark:text-white md:px-16 py-18 px-6"
            id="projects"
        >
            <div className="max-w-full flex flex-col">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab + '-header'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mb-10"
                    >
                        <h2 className="text-4xl md:text-5xl cabinet font-extrabold tracking-tight text-neutral-800 dark:text-white">
                            {TAB_DESCRIPTIONS[activeTab].heading}
                        </h2>
                        <p className="mt-4 cabinet text-lg text-neutral-700 max-w-2xl leading-relaxed">
                            {TAB_DESCRIPTIONS[activeTab].sub}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Main Tab Bar */}
                <div className="flex items-end gap-8 border-b border-neutral-200 dark:border-white/10 mb-6">
                    {MAIN_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative pb-3.5 text-md font-semibold tracking-wide transition-colors duration-200 cursor-pointer
                                ${activeTab === tab.id
                                    ? 'text-neutral-900 dark:text-white'
                                    : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.span
                                    layoutId="active-tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-neutral-900 dark:bg-white"
                                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Panels */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.25 }}
                    >
                        {activeTab === 'web' && <WebProjects />}
                        {activeTab === 'video' && <DriveProjects />}
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
}