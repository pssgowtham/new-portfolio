"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="text-center mb-16"
    >
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      <motion.div
        className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      {subtitle && (
        <p
          className="mt-4 text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
