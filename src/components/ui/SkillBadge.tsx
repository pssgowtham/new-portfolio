"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
      }}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium cursor-default transition-colors duration-200 font-[family-name:var(--font-mono)]"
      style={{
        backgroundColor: "var(--bg-tertiary)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-color)",
      }}
    >
      {name}
    </motion.span>
  );
}
