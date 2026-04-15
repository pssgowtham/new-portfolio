"use client";

import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export default function Education() {
  return (
    <section id="education" className="py-24 px-4" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Education"
          subtitle="Academic background"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              variants={fadeInUp}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(99, 102, 241, 0.15)",
              }}
              className="p-6 rounded-xl transition-all duration-300"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <FiBookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold font-[family-name:var(--font-heading)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {edu.degree}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {edu.field}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {edu.location} &middot; {edu.duration}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
