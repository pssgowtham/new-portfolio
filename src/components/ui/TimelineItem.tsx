"use client";

import { motion } from "framer-motion";
import { Experience } from "@/types";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export default function TimelineItem({ experience, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-start mb-12 last:mb-0">
      {/* Desktop: alternating layout */}
      <div className="hidden lg:flex w-full items-start">
        {/* Left content */}
        <div className={`w-[calc(50%-2rem)] ${isLeft ? "" : "order-3"}`}>
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.15)",
            }}
            className="p-6 rounded-xl transition-all duration-300"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3
                className="text-xl font-bold font-[family-name:var(--font-heading)]"
                style={{ color: "var(--text-primary)" }}
              >
                {experience.role}
              </h3>
            </div>
            <p className="text-primary font-semibold mb-1">
              {experience.company}
            </p>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              {experience.location} | {experience.duration}
            </p>
            <ul className="space-y-2 mb-4">
              {experience.highlights.slice(0, 4).map((highlight, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
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
          </motion.div>
        </div>

        {/* Center dot */}
        <div className="flex flex-col items-center mx-8 order-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent relative z-10 shadow-lg"
            style={{ boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)" }}
          />
        </div>

        {/* Right spacer */}
        <div className={`w-[calc(50%-2rem)] ${isLeft ? "order-3" : ""}`} />
      </div>

      {/* Mobile: stacked layout */}
      <div className="lg:hidden flex items-start w-full">
        <div className="flex flex-col items-center mr-4 mt-1">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0"
            style={{ boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          />
          <div
            className="w-0.5 flex-grow mt-2"
            style={{ backgroundColor: "var(--border-color)" }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-5 rounded-xl"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
          }}
        >
          <h3
            className="text-lg font-bold font-[family-name:var(--font-heading)]"
            style={{ color: "var(--text-primary)" }}
          >
            {experience.role}
          </h3>
          <p className="text-primary font-semibold text-sm">
            {experience.company}
          </p>
          <p
            className="text-xs mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            {experience.location} | {experience.duration}
          </p>
          <ul className="space-y-1.5 mb-3">
            {experience.highlights.slice(0, 3).map((highlight, i) => (
              <li
                key={i}
                className="text-xs leading-relaxed pl-3 relative before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:rounded-full before:bg-primary"
                style={{ color: "var(--text-secondary)" }}
              >
                {highlight}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] rounded-full font-[family-name:var(--font-mono)]"
                style={{
                  backgroundColor: "var(--glow-color)",
                  color: "var(--color-primary-light)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
