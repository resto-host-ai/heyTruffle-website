/**
 * Split out of lib/blog.ts so client components (e.g. app/blog/BlogGrid.tsx)
 * can import PostMeta/formatDate without pulling in node:fs — a client
 * bundle can't include that, and Next has no way to tree-shake it out of a
 * module that imports it at the top level, even for an unrelated export.
 */

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
