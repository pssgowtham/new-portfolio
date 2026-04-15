import { GitHubRepo } from "@/types";

const GITHUB_USERNAME = "pssgowtham";

export async function getRecentRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const repos: GitHubRepo[] = await res.json();
    return repos.filter((repo) => !repo.name.includes(".github.io"));
  } catch {
    return [];
  }
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    HTML: "#e34c26",
    CSS: "#563d7c",
    "C++": "#f34b7d",
    "C#": "#178600",
    Ruby: "#701516",
    Shell: "#89e051",
    Jupyter: "#DA5B0B",
  };
  return colors[language || ""] || "#8b949e";
}
