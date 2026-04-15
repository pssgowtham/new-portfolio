"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowDown,
} from "react-icons/fi";
import Terminal from "@/components/ui/Terminal";
import { personalInfo } from "@/data/personal";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedRole(personalInfo.roles[0]);
      return;
    }

    const currentRole = personalInfo.roles[roleIndex];

    if (!isDeleting && displayedRole.length < currentRole.length) {
      const timeout = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && displayedRole === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedRole.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayedRole(displayedRole.slice(0, -1));
      }, 40);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % personalInfo.roles.length);
    }
  }, [displayedRole, isDeleting, roleIndex, shouldReduceMotion]);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="text-primary font-[family-name:var(--font-mono)] text-sm mb-4"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-4 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {personalInfo.name.split(" ").slice(0, -1).join(" ")}
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {personalInfo.name.split(" ").slice(-1)}
              </span>
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="text-xl sm:text-2xl mb-6 h-8 font-[family-name:var(--font-heading)]"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>{displayedRole}</span>
              <span className="animate-pulse text-primary ml-0.5">|</span>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {personalInfo.summary}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center gap-2"
              >
                View My Work
                <FiArrowDown className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.resumeUrl}
                download
                className="px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-all hover:bg-primary/10"
                style={{
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <FiDownload className="w-4 h-4" />
                Download Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4"
            >
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all hover:bg-primary/10 hover:text-primary hover:scale-110"
                style={{ color: "var(--text-muted)" }}
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all hover:bg-primary/10 hover:text-primary hover:scale-110"
                style={{ color: "var(--text-muted)" }}
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 rounded-full transition-all hover:bg-primary/10 hover:text-primary hover:scale-110"
                style={{ color: "var(--text-muted)" }}
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Profile photo */}
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden relative z-10 ring-4 ring-primary/30">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 256px, 288px"
                />
              </div>
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-30 -z-10 scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                }}
              />
            </div>

            {/* Terminal */}
            <Terminal />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: "2px solid var(--border-color)" }}
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
