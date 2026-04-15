"use client";

import { motion } from "framer-motion";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function FilterTabs({
  categories,
  activeCategory,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
          role="tab"
          aria-selected={activeCategory === category}
          style={{
            color:
              activeCategory === category ? "white" : "var(--text-secondary)",
            backgroundColor:
              activeCategory === category ? "transparent" : "transparent",
          }}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
}
