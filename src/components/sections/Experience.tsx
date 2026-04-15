"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey"
        />

        {/* Timeline line (desktop only) */}
        <div className="relative">
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{ backgroundColor: "var(--border-color)" }}
          />

          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
