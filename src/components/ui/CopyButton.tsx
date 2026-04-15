"use client";

import { useState, useCallback } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { copyToClipboard } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ text, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-primary ${className}`}
      aria-label={`Copy ${label || text} to clipboard`}
      style={{ color: "var(--text-secondary)" }}
    >
      {label && <span>{label}</span>}
      {copied ? (
        <FiCheck className="w-4 h-4 text-green-500" />
      ) : (
        <FiCopy className="w-4 h-4" />
      )}
    </button>
  );
}
