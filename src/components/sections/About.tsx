"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FiBriefcase, FiAward, FiMapPin, FiCode } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { personalInfo } from "@/data/personal";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const stats = [
  { icon: FiBriefcase, label: "Years Experience", value: 4, suffix: "+" },
  { icon: FiCode, label: "Companies", value: 3, suffix: "" },
  { icon: FiAward, label: "Degrees", value: 2, suffix: "" },
  { icon: FiMapPin, label: "Location", value: 0, suffix: "", text: "San Jose, CA" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || target === 0) return;
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me better"
        />

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Photo — takes 2 of 5 columns */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden relative">
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
                  />
                </div>
                <div
                  className="absolute -bottom-3 -right-3 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl -z-10"
                  style={{
                    border: "2px solid var(--color-primary)",
                    opacity: 0.3,
                  }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Content — takes 3 of 5 columns */}
          <ScrollReveal direction="right" className="lg:col-span-3">
            <div>
              <p
                className="text-base sm:text-lg leading-relaxed mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {personalInfo.about}
              </p>

              {/* Stats */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="p-4 rounded-xl text-center"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <stat.icon
                      className="w-6 h-6 mx-auto mb-2 text-primary"
                    />
                    <div
                      className="text-2xl font-bold font-[family-name:var(--font-heading)]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {stat.text ? (
                        stat.text
                      ) : (
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      )}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
