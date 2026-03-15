import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import User from "../../data/user.json";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ResumePDF from "../resume/ResumePdf";
import { fetchProjects, type Repo } from "../projects/FetchProjects";



const About: React.FC = () => {

    const [projects, setProjects] = useState<Repo[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to load projects:", error);
                setProjects([]);
            }
        };
        loadProjects();
    }, []);

    return (
        <section id="about" className="bg-[#f0f0f0] py-24 px-6 w-full">

            <div className="flex flex-col items-center justify-center mb-10 sm:mb-20 ">
                <span className="text-5xl cabinet font-bold text-neutral-900">About Me</span>
                <span className="text-lg cabinet font-light text-neutral-700">My Introduction</span>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-16 items-center">

                <div >

                    <h2 className="text-4xl md:text-5xl cabinet font-bold text-neutral-900 leading-tight">
                        Your Creative <br /> Developer Partner
                    </h2>

                    <div className="mt-6 space-y-3 text-neutral-600 ">
                        {User.about.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mt-8">
                        <a
                            href="#contact"
                            className="bg-neutral-900 text-white px-6 py-3 rounded-xl hover:bg-neutral-800 transition"
                        >
                            Hire Me
                        </a>

                        <div
                            className="active:scale-[0.98] hover:opacity-90 hover:scale-105 font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-800 px-6 py-3 rounded-xl flex items-center justify-center transition-all shadow-md group gap-2">
                            <Icon icon="mdi:file-document" width="20" />
                            <PDFDownloadLink
                                document={
                                    <ResumePDF
                                        projects={projects}
                                    />
                                }
                                fileName="Varoon-Kumar-Resume.pdf"
                            >
                                {({ loading }) =>
                                    loading ? "Preparing Resume..." : "Resume"
                                }
                            </PDFDownloadLink>
                        </div>

                    </div>



                </div>

                <div className="relative flex justify-center">

                    <div className="relative bg-neutral-200 rounded-2xl p-4">

                        <img
                            src="/img/me.webp"
                            alt="Varoon Kumar"
                            className="rounded-xl neutralscale-100 hover:neutralscale-0 hover:scale-105 transition-all duration-500 ease-in-out object-cover w-100 h-100"
                        />

                        <div className="absolute top-20 -left-2 md:-left-8  font-semibold  bg-white shadow-md px-4 py-2 rounded-lg flex items-center gap-2 text-sm animate-[bounce_1.5s_ease-in_infinite]">
                            <Icon icon="mdi:palette-outline" width={18} />
                            UI/UX Design
                        </div>

                        <div className="absolute top-50 -right-4 md:-right-10  font-semibold bg-white shadow-md px-4 py-2 rounded-lg flex items-center gap-2 text-sm animate-[bounce_1.5s_ease-in_infinite]">
                            <Icon icon="mdi:video-outline" width={18} />
                            Video Editing
                        </div>

                        <div className="absolute bottom-6 -left-2 md:-left-10 font-semibold bg-white shadow-md px-4 py-2 rounded-lg flex items-center gap-2 text-sm animate-[bounce_1.5s_ease-in_infinite]">
                            <Icon icon="mdi:web" width={18} />
                            Web Development
                        </div>


                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
