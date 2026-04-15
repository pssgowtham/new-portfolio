"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiStar, FiGitBranch } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { GitHubRepo } from "@/types";
import { getLanguageColor } from "@/lib/github";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { personalInfo } from "@/data/personal";

export default function GitHubActivity() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/pssgowtham/repos?sort=updated&per_page=6&type=owner`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (res.ok) {
          const data = await res.json();
          setRepos(data.filter((r: GitHubRepo) => !r.name.includes(".github.io")));
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="GitHub Activity"
          subtitle="Recent open source work"
        />

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : repos.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.map((repo) => (
              <motion.a
                key={repo.id}
                variants={fadeInUp}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.15)",
                }}
                className="block p-5 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FiGithub
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <h3
                    className="font-semibold text-sm truncate font-[family-name:var(--font-mono)] hover:text-primary transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {repo.name}
                  </h3>
                </div>
                {repo.description && (
                  <p
                    className="text-xs mb-4 line-clamp-2 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <FiStar className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      <FiGitBranch className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>
        ) : (
          <p className="text-center" style={{ color: "var(--text-muted)" }}>
            Unable to load GitHub activity.
          </p>
        )}

        <div className="text-center mt-8">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary"
            style={{
              color: "var(--text-secondary)",
              border: "1px solid var(--border-color)",
            }}
          >
            <FiGithub className="w-4 h-4" />
            View All Repositories
          </a>
        </div>
      </div>
    </section>
  );
}
