export function SkeletonCard() {
  return (
    <div
      className="rounded-xl p-6 animate-pulse"
      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
    >
      <div
        className="h-5 rounded w-3/4 mb-4"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      />
      <div
        className="h-4 rounded w-full mb-2"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      />
      <div
        className="h-4 rounded w-5/6 mb-4"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-6 w-16 rounded-full"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          />
        ))}
      </div>
    </div>
  );
}

export function SkeletonLine({ width = "w-full" }: { width?: string }) {
  return (
    <div
      className={`h-4 rounded animate-pulse ${width}`}
      style={{ backgroundColor: "var(--bg-tertiary)" }}
    />
  );
}
