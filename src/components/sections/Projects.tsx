"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import FilterTabs from "@/components/ui/FilterTabs";
import { projects, projectCategories } from "@/data/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory));

  return (
    <section id="projects" className="py-24 px-4" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="Featured work and case studies"
        />

        <FilterTabs
          categories={projectCategories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <p
            className="text-center py-12 text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            No projects found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
