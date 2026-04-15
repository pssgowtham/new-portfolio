import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiClock, FiCalendar, FiTag } from "react-icons/fi";
import { getPost, getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Santosh Pasala`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-primary"
          style={{ color: "var(--text-muted)" }}
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                backgroundColor: "var(--glow-color)",
                color: "var(--color-primary-light)",
              }}
            >
              {post.category}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h1>

          <p
            className="text-lg mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.description}
          </p>

          <div
            className="flex items-center gap-4 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs flex items-center gap-1 px-3 py-1 rounded-full"
                style={{
                  color: "var(--text-muted)",
                  backgroundColor: "var(--bg-tertiary)",
                }}
              >
                <FiTag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none"
          style={{ color: "var(--text-secondary)" }}
        >
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-2xl font-bold mt-10 mb-4 font-[family-name:var(--font-heading)]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("# ")) {
              return (
                <h2
                  key={i}
                  className="text-3xl font-bold mt-10 mb-4 font-[family-name:var(--font-heading)]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {paragraph.replace("# ", "")}
                </h2>
              );
            }
            if (paragraph.match(/^\d+\./m)) {
              const items = paragraph.split("\n").filter((line) => line.trim());
              return (
                <ol key={i} className="list-decimal pl-6 space-y-1 my-4">
                  {items.map((item, j) => (
                    <li key={j} className="leading-relaxed">
                      {item.replace(/^\d+\.\s*/, "")}
                    </li>
                  ))}
                </ol>
              );
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n").filter((line) => line.trim());
              return (
                <ul key={i} className="list-disc pl-6 space-y-1 my-4">
                  {items.map((item, j) => (
                    <li key={j} className="leading-relaxed">
                      {item.replace(/^-\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="my-4 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
}
