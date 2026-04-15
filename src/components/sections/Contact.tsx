"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiDownload,
} from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CopyButton from "@/components/ui/CopyButton";
import Toast from "@/components/ui/Toast";
import { personalInfo } from "@/data/personal";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    copyable: true,
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
    copyable: true,
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: personalInfo.location,
    href: null,
    copyable: false,
  },
];

const socialLinks = [
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: personalInfo.linkedin,
  },
  {
    icon: FiGithub,
    label: "GitHub",
    href: personalInfo.github,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("https://formspree.io/f/placeholder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setToastMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setToastMessage("Failed to send. Please email directly.");
      }
    } catch {
      setToastMessage("Failed to send. Please email directly.");
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
    }
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Get in Touch"
          subtitle="Let's build something great together"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ScrollReveal direction="left">
            <div>
              <p
                className="text-lg mb-8 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                I&apos;m always open to new opportunities, collaborations, and
                conversations. Whether you have a project in mind or just want
                to connect, feel free to reach out.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4 mb-8"
              >
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    variants={fadeInUp}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs uppercase tracking-wider mb-0.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {info.label}
                      </p>
                      <div className="flex items-center gap-2">
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm font-medium hover:text-primary transition-colors truncate"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {info.value}
                          </span>
                        )}
                        {info.copyable && <CopyButton text={info.value} />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social links */}
              <div className="flex gap-3 mb-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary"
                    style={{
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Resume download */}
              <a
                href={personalInfo.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <FiDownload className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-xl"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none focus:ring-2 focus:ring-primary/50"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-color)",
                    }}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}
