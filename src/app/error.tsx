"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1
          className="text-6xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Oops!
        </h1>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Something went wrong
        </h2>
        <p
          className="text-base mb-8 max-w-md mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
