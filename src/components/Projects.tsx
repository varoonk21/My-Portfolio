import { useEffect, useState } from 'react'
import ProjectCard from './cards/ProjectCard'
export default function Projects() {
    type Repo = {
        name: string;
        html_url: string;
        description: string;
        topics: string[];
        fork: boolean;
        created_at: string;
        updated_at: string;
        full_name: string;
        homepage: string;
    };
    const [projects, setProjects] = useState<Repo[]>([]);
    useEffect(() => {
        const userName = import.meta.env.VITE_GITHUB_USERNAME;
        const repoCount = import.meta.env.VITE_GITHUB_REPOS_FETCH_LIMIT || 20;
        fetch(`https://api.github.com/users/${userName}/repos?sort=created&direction=desc&per_page=${repoCount}`)
            .then(res => {
                if (!res.ok)
                    throw new Error('Something went Wrong!')
                return res.json();
            })
            .then(repos => {
                const filtered = [];
                for (const repo of repos) {
                    if (repo.topics?.includes('include'))
                        filtered.push(repo)


                    if (filtered.length === 3) break;
                }
                setProjects(filtered);
                console.log(filtered);

            })
            .catch(err => console.log(err))
    }, []);

    return (
        <section className="w-full bg-white text-neutral-800 dark:bg-[#1e1e1e] dark:text-white md:px-16 py-20 px-6" id='projects'>
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="flex flex-col items-center mb-12 sm:mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight relative text-neutral-800 dark:text-white">
                        Featured Projects
                    </h2>
                    <p className="mt-5 text-gray-600 dark:text-gray-300 max-w-3xl text-center md:text-lg">
                        A showcase of my recent work, personal projects, and open-source contributions.
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
                    {projects.map((project, index) => <ProjectCard key={project.name || index} project={project} />)}
                </div>
            </div>
        </section>
    )
}