import { Metadata } from "next";
import Link from "next/link";
import { FiClock, FiTag, FiArrowLeft } from "react-icons/fi";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog | Santosh Sai Gowtham Pasala",
  description: "Thoughts on AI engineering, full-stack development, and building production systems.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-primary"
          style={{ color: "var(--text-muted)" }}
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1
          className="text-4xl font-bold font-[family-name:var(--font-heading)] mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Blog
        </h1>
        <p
          className="text-lg mb-12"
          style={{ color: "var(--text-secondary)" }}
        >
          Thoughts on AI engineering, full-stack development, and building
          production systems.
        </p>

        {posts.length === 0 ? (
          <div
            className="text-center py-20 rounded-xl"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <p
              className="text-lg font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Coming soon
            </p>
            <p style={{ color: "var(--text-muted)" }}>
              Blog posts are on the way. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 rounded-xl transition-all duration-300 hover:scale-[1.01]"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: "var(--glow-color)",
                      color: "var(--color-primary-light)",
                    }}
                  >
                    {post.category}
                  </span>
                  <span
                    className="text-xs flex items-center gap-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <FiClock className="w-3 h-3" />
                    {post.readingTime} min read
                  </span>
                </div>

                <h2
                  className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2 hover:text-primary transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.title}
                </h2>

                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs flex items-center gap-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <FiTag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {formatDate(post.date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
