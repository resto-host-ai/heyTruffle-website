import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-07-09". */
  date: string;
  category: string;
  /** Human read-time label, e.g. "4 min". */
  readTime: string;
  /** Public path to the featured image. */
  image: string;
};

export type Post = PostMeta & {
  /** Raw markdown body (without the frontmatter block). */
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Parse a minimal frontmatter block. Each line is `key: value`; the value is
 * everything after the first colon, trimmed, with any surrounding quotes
 * stripped. Returns the metadata and the remaining markdown body.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const normalized = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(normalized);
  if (!match) return { data: {}, body: normalized };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, body: normalized.slice(match[0].length).trim() };
}

function readPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const { data, body } = parseFrontmatter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "",
    readTime: data.readTime ?? "",
    image: data.image ?? `/images/blog/${slug}.webp`,
    content: body,
  };
}

/** All post slugs (filenames without the `.md` extension). */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Every post, newest first. */
export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Metadata for every post, newest first (no body). */
export function getAllPostMeta(): PostMeta[] {
  return getAllPosts().map((post) => {
    const { content, ...meta } = post;
    void content;
    return meta;
  });
}

/** A single post, or null if the slug doesn't exist. */
export function getPost(slug: string): Post | null {
  try {
    return readPost(slug);
  } catch {
    return null;
  }
}

/** Format an ISO date as e.g. "July 9, 2026". */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
