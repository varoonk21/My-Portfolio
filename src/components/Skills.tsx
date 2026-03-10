import React from "react";
import { Icon } from "@iconify/react";
import skills from "../data/skills.json";

type Skill = {
    name: string;
    icon: string;
};

const Skills: React.FC = () => {
    return (
        <section id="skills" className="bg-neutral-100 py-24 px-6">
            <div className="max-w-6xl text-center">

                {/* Title */}
                <h2 className="text-4xl font-semibold text-gray-900">
                    Skills & Tools
                </h2>

                <p className="mt-4 text-gray-600 max-w-3xl ">
                    Technologies and creative tools I use to build modern web experiences and digital content.
                </p>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">

                    {skills.map((skill: Skill) => (
                        <div
                            key={skill.name}
                            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            <Icon icon={skill.icon} width="40" />

                            <p className="text-sm font-medium text-gray-700">
                                {skill.name}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Skills;