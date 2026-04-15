"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiChevronDown } from "react-icons/fi";
import ShareButtons from "./ShareButtons";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(99, 102, 241, 0.15)",
      }}
      transition={{ duration: 0.3 }}
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="text-xl font-bold font-[family-name:var(--font-heading)] mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h3>
            <p className="text-sm text-primary font-medium">
              {project.subtitle}
            </p>
          </div>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary"
                style={{ color: "var(--text-muted)" }}
                aria-label={`View ${project.title} on GitHub`}
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary"
                style={{ color: "var(--text-muted)" }}
                aria-label={`View live demo of ${project.title}`}
              >
                <FiExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs rounded-full font-[family-name:var(--font-mono)]"
              style={{
                backgroundColor: "var(--glow-color)",
                color: "var(--color-primary-light)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Case study expand */}
        {project.caseStudy && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors mb-2"
            >
              {isExpanded ? "Hide" : "Read"} Case Study
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiChevronDown className="w-4 h-4" />
              </motion.span>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="pt-4 mt-2 text-sm leading-relaxed"
                    style={{
                      color: "var(--text-secondary)",
                      borderTop: "1px solid var(--border-color)",
                    }}
                  >
                    {project.caseStudy}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Share */}
        <div
          className="flex items-center justify-between pt-4 mt-4"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <div className="flex gap-1">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  color: "var(--text-muted)",
                  backgroundColor: "var(--bg-tertiary)",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
          <ShareButtons title={project.title} />
        </div>
      </div>
    </motion.article>
  );
}
