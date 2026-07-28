import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import BlogIndex, { POSTS_PER_PAGE } from "../../BlogIndex";
import { getAllPostMeta } from "@/lib/blog";

/* The newest post is always the featured card, so the paged grid covers the
   rest. Page 1 lives at /blog/ — /blog/page/1/ redirects there so the same
   content never exists under two URLs. */

function totalPages() {
  return Math.max(1, Math.ceil((getAllPostMeta().length - 1) / POSTS_PER_PAGE));
}

export function generateStaticParams() {
  return Array.from({ length: totalPages() - 1 }, (_, i) => ({
    n: String(i + 2),
  }));
}

// Out-of-range page numbers 404 without an on-demand render.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  return {
    title: `Blog — Page ${n} — heytruffle`,
    alternates: { canonical: `/blog/page/${n}/` },
  };
}

export default async function BlogPagedPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const page = Number(n);
  if (page === 1) redirect("/blog/");
  if (!Number.isInteger(page) || page < 1 || page > totalPages()) notFound();
  return <BlogIndex page={page} />;
}
