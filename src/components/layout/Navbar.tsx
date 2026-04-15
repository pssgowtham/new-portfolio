"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { personalInfo } from "@/data/personal";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isHome = pathname === "/";
  const isBlog = pathname.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver on home page
  useEffect(() => {
    if (!isHome) {
      setActiveSection(isBlog ? "/blog" : "");
      return;
    }

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, isBlog]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);

    if (href.startsWith("#")) {
      if (isHome) {
        // On home page — just scroll
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        // On another page — navigate to home with hash
        router.push(`/${href}`);
      }
    }
    // For non-hash links (like /blog), let default navigation happen
  };

  const isLinkActive = (href: string) => {
    if (href === "/blog") return isBlog;
    return activeSection === href;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          isScrolled ? "backdrop-blur-xl shadow-lg" : ""
        }`}
        style={{
          backgroundColor: isScrolled ? "var(--nav-bg)" : "transparent",
          borderBottom: isScrolled
            ? "1px solid var(--border-color)"
            : "1px solid transparent",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (isHome) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  router.push("/");
                }
              }}
              className="flex items-center gap-2 group"
            >
              <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold font-[family-name:var(--font-heading)]">
                {personalInfo.initials}
              </span>
              <span
                className="hidden sm:block font-semibold font-[family-name:var(--font-heading)] group-hover:text-primary transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {personalInfo.shortName}
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href.startsWith("#") ? (isHome ? link.href : `/${link.href}`) : link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }
                    }}
                    className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:text-primary"
                    style={{
                      color: active
                        ? "var(--color-primary)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </a>
                );
              })}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 rounded-lg"
                style={{ color: "var(--text-primary)" }}
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu — rendered outside motion.nav to avoid transform stacking context */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-16 z-50 md:hidden backdrop-blur-xl shadow-lg"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => {
                const active = isLinkActive(link.href);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href.startsWith("#") ? (isHome ? link.href : `/${link.href}`) : link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      } else {
                        setIsMobileOpen(false);
                      }
                    }}
                    className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                    style={{
                      color: active
                        ? "var(--color-primary)"
                        : "var(--text-secondary)",
                      backgroundColor: active ? "var(--glow-color)" : "transparent",
                    }}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
