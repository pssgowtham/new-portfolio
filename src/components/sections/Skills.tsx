"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillBadge from "@/components/ui/SkillBadge";
import { skillCategories } from "@/data/skills";
import { staggerContainer, fadeInUp, staggerFast } from "@/lib/animations";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={fadeInUp}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <h3
                className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-primary"
              >
                {category.name}
              </h3>
              <motion.div
                variants={staggerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
