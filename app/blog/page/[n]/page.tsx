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
    // Older posts than page 1's, so the description isn't just the site's
    // repeated forever — kept generic since exact post titles shift as new
    // ones publish and push the older ones down a page.
    description: `More heytruffle blog posts on AI voice hosts and restaurant operations — page ${n}.`,
    alternates: { canonical: `/blog/page/${n}/` },
    // Pagination pages add nothing worth ranking on their own and were
    // showing up as Google sitelinks ahead of Pricing/demo/comparisons.
    // noindex removes them from the index; follow keeps post discovery
    // flowing through them. No canonical-to-page-1 here — Google handles
    // that inconsistently for true pagination and it risks losing posts
    // from discovery entirely.
    robots: { index: false, follow: true },
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
