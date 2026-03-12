import { useEffect, useState } from 'react';
import ProjectCard from '../cards/WebProjectCard';
import { Icon } from '@iconify/react';

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

export default function WebProjects() {
    const [projects, setProjects] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const userName = import.meta.env.VITE_GITHUB_USERNAME;
        const repoCount = import.meta.env.VITE_GITHUB_REPOS_FETCH_LIMIT || 20;
        fetch(`https://api.github.com/users/${userName}/repos?sort=created&direction=desc&per_page=${repoCount}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((repos: Repo[]) => {
                const filtered: Repo[] = [];
                for (const repo of repos) {
                    if (repo.topics?.includes('include'))
                        filtered.push(repo);
                    if (filtered.length === 6) break;
                }
                setProjects(filtered);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden bg-neutral-100 dark:bg-white/5 animate-pulse">
                        <div className="aspect-video w-full bg-neutral-200 dark:bg-white/10" />
                        <div className="p-6 space-y-3">
                            <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-white/10" />
                            <div className="h-6 w-3/4 rounded bg-neutral-200 dark:bg-white/10" />
                            <div className="h-4 w-full rounded bg-neutral-200 dark:bg-white/10" />
                            <div className="h-4 w-2/3 rounded bg-neutral-200 dark:bg-white/10" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center gap-3 py-16 text-neutral-500 dark:text-neutral-400">
                <Icon icon="heroicons:exclamation-triangle" width="40" />
                <p className="text-sm">Failed to load projects. Please try again later.</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 py-16 text-neutral-400">
                <Icon icon="heroicons:folder-open" width="40" />
                <p className="text-sm">No projects found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {projects.map((project, index) => (
                <ProjectCard key={project.name || index} project={project} />
            ))}
        </div>
    );
}
