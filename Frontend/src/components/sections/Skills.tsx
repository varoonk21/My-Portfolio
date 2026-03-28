import React from "react";
import { Icon } from "@iconify/react";
import skills from "../../data/skills.json";

type Skill = {
  name: string;
  icon: string;
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="bg-[#f0f0f0] py-24 px-6">
      <div className="max-w-dvw mx-auto text-center">
        <h2 className="text-5xl cabinet font-bold text-neutral-900">Skills & Tools</h2>

        <p className="mt-4 cabinet text-lg text-neutral-700 max-w-3xl mx-auto ">
          Technologies and creative tools I use to build modern web experiences and digital content.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 mt-10">
          {skills.map((skill: Skill) => (
            <div
              key={skill.name}
              className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <Icon icon={skill.icon} width="40" />

              <p className="text-sm font-medium text-neutral-700">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
