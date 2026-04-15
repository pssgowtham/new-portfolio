"use client";

import { useState, useCallback, useEffect } from "react";
import { FiTwitter, FiLinkedin, FiLink, FiCheck } from "react-icons/fi";
import { copyToClipboard } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url || "");

  useEffect(() => {
    if (!url) {
      setShareUrl(window.location.href);
    }
  }, [url]);

  const handleCopyLink = useCallback(async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex items-center gap-2">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary"
        style={{ color: "var(--text-muted)" }}
        aria-label="Share on Twitter"
      >
        <FiTwitter className="w-4 h-4" />
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary"
        style={{ color: "var(--text-muted)" }}
        aria-label="Share on LinkedIn"
      >
        <FiLinkedin className="w-4 h-4" />
      </a>
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-lg transition-colors hover:bg-primary/10 hover:text-primary"
        style={{ color: "var(--text-muted)" }}
        aria-label="Copy link"
      >
        {copied ? (
          <FiCheck className="w-4 h-4 text-green-500" />
        ) : (
          <FiLink className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
