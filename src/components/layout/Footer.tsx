"use client";

import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { personalInfo } from "@/data/personal";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="py-12 px-4"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - branding */}
          <div className="text-center md:text-left">
            <p
              className="font-bold font-[family-name:var(--font-heading)] text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              {personalInfo.shortName}
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {personalInfo.title} &middot; {personalInfo.location}
            </p>
          </div>

          {/* Center - social links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary"
              style={{ color: "var(--text-muted)" }}
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary"
              style={{ color: "var(--text-muted)" }}
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary"
              style={{ color: "var(--text-muted)" }}
              aria-label="Email"
            >
              <FiMail className="w-5 h-5" />
            </a>
          </div>

          {/* Right - back to top */}
          <div className="flex items-center gap-4">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              &copy; {new Date().getFullYear()} {personalInfo.shortName}
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary"
              style={{ color: "var(--text-muted)" }}
              aria-label="Back to top"
            >
              <FiArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
