"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const lines = [
  { prompt: "$ whoami", output: "Santosh Sai Gowtham Pasala" },
  { prompt: "$ cat role.txt", output: "AI Software Engineer" },
  { prompt: "$ ls skills/", output: "Python  React  LangChain  AWS  Docker  Next.js" },
  { prompt: "$ cat experience.txt", output: "4+ years | Geico, Deloitte, Virtutech" },
  { prompt: "$ echo $LOCATION", output: "San Jose, CA" },
];

export default function Terminal() {
  const shouldReduceMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<"prompt" | "output">("prompt");

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleLines(lines.length);
      return;
    }

    if (visibleLines >= lines.length) return;

    const currentLine = lines[visibleLines];
    const targetText =
      phase === "prompt" ? currentLine.prompt : currentLine.output;

    if (currentText.length < targetText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1));
      }, phase === "prompt" ? 50 : 30);
      return () => clearTimeout(timeout);
    }

    if (phase === "prompt") {
      const timeout = setTimeout(() => {
        setPhase("output");
        setCurrentText("");
      }, 300);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setPhase("prompt");
      setCurrentText("");
    }, 500);
    return () => clearTimeout(timeout);
  }, [visibleLines, currentText, phase, shouldReduceMotion]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span
          className="ml-2 text-xs font-[family-name:var(--font-mono)]"
          style={{ color: "var(--text-muted)" }}
        >
          terminal — santosh@macbook
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-[family-name:var(--font-mono)] text-sm leading-relaxed min-h-[220px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="mb-2">
            <span className="text-green-400">{line.prompt}</span>
            <div className="text-primary-light ml-2">{line.output}</div>
          </div>
        ))}

        {visibleLines < lines.length && (
          <div className="mb-2">
            {phase === "prompt" ? (
              <span className="text-green-400">
                {currentText}
                {showCursor && (
                  <span className="text-primary-light">|</span>
                )}
              </span>
            ) : (
              <>
                <span className="text-green-400">
                  {lines[visibleLines].prompt}
                </span>
                <div className="text-primary-light ml-2">
                  {currentText}
                  {showCursor && <span>|</span>}
                </div>
              </>
            )}
          </div>
        )}

        {visibleLines >= lines.length && (
          <span className="text-green-400">
            ${showCursor && <span className="text-primary-light"> |</span>}
          </span>
        )}
      </div>
    </motion.div>
  );
}
