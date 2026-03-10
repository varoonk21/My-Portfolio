import React from "react";
import { Icon } from "@iconify/react";
import User from "../data/user.json";


const About: React.FC = () => {
    return (
        <section id="about" className="bg-gray-100 py-24 px-6 w-full">
            
            <div className="flex flex-col items-center justify-center mb-20">
                <span className="text-4xl font-bold text-gray-900">About Me</span>
                <span className="text-md font-light text-gray-900">My Introduction</span>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-16 items-center">

                <div >

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Your Creative <br /> Developer Partner
                    </h2>

                    <div className="mt-6 space-y-3 text-gray-600 ">
                        {User.about.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mt-8">
                        <a
                            href="#contact"
                            className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
                        >
                            Hire Me
                        </a>

                        <a
                            href="#projects"
                            className="text-black border border-gray-800 hover:text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
                        >
                            Latest Projects
                        </a>
                    </div>



                </div>

                <div className="relative flex justify-center">

                    <div className="relative bg-gray-200 rounded-2xl p-4">

                        <img
                            src="/img/me.webp"
                            alt="Varoon Kumar"
                            className="rounded-xl grayscale-100 hover:grayscale-0 hover:scale-105 transition-all duration-500 ease-in-out object-cover w-100 h-100"
                        />

                        <div className="absolute top-20 -left-8 bg-white shadow-md px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                            <Icon icon="mdi:palette-outline" width={18} />
                            UI/UX Design
                        </div>

                        <div className="absolute bottom-6 -left-10 bg-white shadow-md px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                            <Icon icon="mdi:web" width={18} />
                            Web Development
                        </div>

                        <div className="absolute top-50 -right-10 bg-white shadow-md px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                            <Icon icon="mdi:video-outline" width={18} />
                            Video Editing
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default About;