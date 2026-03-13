export type Repo = {
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

export const fetchProjects = async (limit?: number): Promise<Repo[]> => {
  const userName = import.meta.env.VITE_GITHUB_USERNAME;
  const repoCount = limit || import.meta.env.VITE_GITHUB_REPOS_FETCH_LIMIT || 20;

  try {
    const response = await fetch(
      `https://api.github.com/users/${userName}/repos?sort=created&direction=desc&per_page=${repoCount}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repos");
    }

    const repos: Repo[] = await response.json();

    // Filter by topic 'include' and take first 6
    const filtered: Repo[] = [];
    for (const repo of repos) {
      if (repo.topics?.includes("include")) filtered.push(repo);
      if (filtered.length === 6) break;
    }

    return filtered;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};