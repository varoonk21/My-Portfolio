import React, { useEffect, useState, forwardRef } from 'react';
import user from "../data/user.json";
import skills from "../data/skills.json";
import experience from "../data/experiences.json";
import {fetchProjects, type  Repo } from "./projects/FetchProjects";
import formatDate from "../utils/formatDate";
import achievements from "../data/achievements.json";


interface Achievement {
    id: number;
    type: string;
    name: string;
    place?: string;
    time?: string;
    KeyAchievement?: string[];
}

interface Skill {
    name: string;
    icon: string;
}

interface Experience {
    id: string;
    position: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    isCurrentRole?: boolean;
    bullets?: string[];
}

interface User {
    name: string;
    title: string;
    contact: {
        email: string;
        phone: string;
        website: string;
    };
    social: {
        linkedin: string;
        github: {
            userName: string;
            url: string;
            reposFetchLimit: number;
        };
    };
    summary: string;
}

const ResumeGenerator = forwardRef<HTMLDivElement>((props, ref) => {

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

    const education: Achievement[] = (achievements as Achievement[]).filter((a: Achievement) => a.type === "Education");
    const certifications: Achievement[] = (achievements as Achievement[]).filter((a: Achievement) => a.type !== "Education");

    const getHref = (link: string | undefined | { url?: string }): string => {
        if (!link) return "#";
        if (typeof link === "object" && link.url) return link.url;
        if (typeof link === "string") {
            return link.startsWith("http") ? link : `https://${link}`;
        }
        return "#";
    };

    return (
        <div ref={ref} id="resume" className="w-[210mm] h-auto font-[Inter] bg-white p-6 shadow-lg print:shadow-none print:m-0 print:w-full print:min-h-full text-black text-[11px] leading-relaxed">


            <header className="text-center mb-4">
                <h1 className="m-0 text-2xl font-bold tracking-wide">
                    {user.name}
                </h1>
                <div className="text-gray-700 font-medium text-sm mb-1">{user.title}</div>

                <div className="text-indigo-800 font-medium text-[12px]">
                    <a href={`mailto:${user.contact.email}`} className="underline">{user.contact.email}</a>
                    {" "}•{" "}
                    <a href={`tel:${user.contact.phone}`} className="underline">{user.contact.phone}</a>


                    <div>
                        <a href={getHref(user.social.linkedin)} target="_blank" rel="noopener noreferrer" className="underline">
                            {user.social.linkedin}
                        </a>
                        {" "}•{" "}
                        <a href={getHref(user.social.github)} target="_blank" rel="noopener noreferrer" className="underline">
                            {user.social.github.userName}
                        </a>
                        {" "}•{" "}
                        <a href={getHref(user.contact.website)} target="_blank" rel="noopener noreferrer" className="underline">
                            {user.contact.website}
                        </a>

                    </div>
                </div>
            </header>

            <main className="content">

                <section className="mt-3 mb-3">
                    <h2 className="border-b-2 text-sm pb-0.5 font-bold uppercase tracking-wider mb-2.5">Summary</h2>
                    <p className="text-justify">{user.summary}</p>
                </section>

                <section className="mt-3 mb-3">
                    <h2 className="border-b-2 border-black pb-0.5 text-sm font-bold uppercase tracking-wider mb-2.5">Skills</h2>
                    <div className="text-justify">
                        {(skills as Skill[]).map((skill: Skill, index: number) => (
                            <span key={index}>
                                {skill.name}{index !== skills.length - 1 && " • "}
                            </span>
                        ))}
                    </div>
                </section>


                {experience && experience.length > 0 && (
                    <section className="mt-3 mb-3">
                        <h2 className="border-b-2 border-black pb-0.5 text-sm font-bold uppercase tracking-wider mb-2.5">Work Experience</h2>
                        {(experience as Experience[]).map((exp: Experience) => (
                            <div key={exp.id} className="mb-2.5">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <span className="text-black font-bold text-[12px]">{exp.position}</span>
                                    {(exp.startDate || exp.endDate) && (
                                        <span className="whitespace-nowrap font-semibold text-[10px]">
                                            {exp.startDate} – {exp.isCurrentRole ? "Present" : exp.endDate}
                                        </span>
                                    )}
                                </div>

                                {exp.company && (
                                    <div className="italic mb-1 font-medium">
                                        {exp.company} {exp.location ? `| ${exp.location}` : ''}
                                    </div>
                                )}

                                {exp.bullets && exp.bullets.length > 0 && (
                                    <ul className="list-disc ml-8 mt-2 space-y-0.5">
                                        {exp.bullets.map((bullet: string, index: number) => <li key={index} className="pl-1">{bullet}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {projects && projects.length > 0 && (
                    <section className="mt-4 mb-3">
                        <h2 className="border-b-2 border-black pb-0.5 text-sm font-bold uppercase tracking-wider mb-2">Projects</h2>
                        {projects.map((project: Repo) => (
                            <div key={project.name} className="mb-2.5">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <a
                                        href={getHref(project.homepage || project.html_url)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`font-bold text-[12px] text-black ${!project.homepage && !project.html_url ? 'cursor-default' : 'cursor-pointer underline'}`}
                                    >
                                        {project.name.replaceAll('-', ' ')}
                                    </a>
                                    {(project.created_at || project.updated_at) && (
                                        <span className="whitespace-nowrap font-semibold text-[10px]">
                                            {formatDate(project.created_at, project.updated_at)}
                                        </span>
                                    )}
                                </div>

                                <div className="italic mb-1 font-medium">
                                    <span className="font-semibold not-italic">Technologies: </span> {project.topics.filter((t: string) => t !== 'include').slice(0, 4).map((tech: string, index: number) => (
                                        <span key={tech}>
                                            {tech.replaceAll('-', ' ')}{index !== tech.length - 1 && " , "}
                                        </span>
                                    ))}
                                </div>


                                {/* {project.bullets && project.bullets.length > 0 && (
                                    <ul className="list-disc ml-8 mt-2 space-y-0.5">
                                        {project.bullets.map((bullet, index) => <li key={index} className="pl-1">{bullet}</li>)}
                                    </ul>
                                )} */}

                                <div className="ml-8 mt-2 space-y-0.5 text-justify">
                                    {project.description}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {education.length > 0 && (
                    <section className="mt-3">
                        <h2 className="border-b-2 border-black pb-0.5 text-sm font-bold uppercase tracking-wider mb-2.5">
                            Education
                        </h2>

                        {education.map((edu: Achievement) => (
                            <div key={edu.id} className="mb-2">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <strong className="text-[12px] text-black">
                                        {edu.name}
                                    </strong>

                                    <span className="whitespace-nowrap font-semibold text-[10px]">
                                        {edu.time}
                                    </span>
                                </div>

                                <div className="italic mb-1 font-medium">
                                    {edu.place}
                                </div>

                                <ul className="list-disc ml-8 mt-2 space-y-0.5">
                                    {edu.KeyAchievement?.map((bullet: string, index: number) => <li key={index} className="pl-1">{bullet}</li>)}
                                </ul>

                            </div>
                        ))}
                    </section>
                )}

                <section className="mt-3">
                    <h2 className="border-b-2 border-black pb-0.5 text-sm font-bold uppercase tracking-wider mb-1.5">
                        Certifications
                    </h2>

                    <ul className="list-disc ml-4 space-y-0.5">
                        {certifications.map((achievement: Achievement) => (
                            <li key={achievement.id} className="pl-1">
                                <span className="font-semibold">{achievement.name}</span>

                                {achievement.place && ` — ${achievement.place}`}

                                {achievement.time && (
                                    <span className="text-gray-600 ml-1">
                                        ({achievement.time})
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
});

export default ResumeGenerator;