import fs from "fs";
import path from "path";
import { readingTime } from "./utils";

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  published: boolean;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  readingTime: number;
}

export interface BlogPostFull extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(fileContent: string): {
  frontmatter: BlogFrontmatter;
  content: string;
} {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return {
      frontmatter: {
        title: "",
        description: "",
        date: "",
        tags: [],
        category: "",
        published: false,
      },
      content: fileContent,
    };
  }

  const frontmatterStr = match[1];
  const content = match[2].trim();

  const frontmatter: Record<string, unknown> = {};
  for (const line of frontmatterStr.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    if (typeof value === "string" && value.startsWith("[")) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        // leave as string
      }
    }
    if (value === "true") value = true;
    if (value === "false") value = false;

    frontmatter[key] = value;
  }

  return { frontmatter: frontmatter as unknown as BlogFrontmatter, content };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(BLOG_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { frontmatter, content } = parseFrontmatter(raw);

      if (!frontmatter.published) return null;

      return {
        slug,
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
        tags: frontmatter.tags || [],
        category: frontmatter.category || "General",
        readingTime: readingTime(content),
      };
    })
    .filter(Boolean) as BlogPostMeta[];

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string): BlogPostFull | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, content } = parseFrontmatter(raw);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    tags: frontmatter.tags || [],
    category: frontmatter.category || "General",
    readingTime: readingTime(content),
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
