import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1
          className="text-8xl font-bold font-[family-name:var(--font-heading)] mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          404
        </h1>
        <h2
          className="text-2xl font-semibold mb-4 font-[family-name:var(--font-heading)]"
          style={{ color: "var(--text-primary)" }}
        >
          Page Not Found
        </h2>
        <p
          className="text-lg mb-8 max-w-md mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
