"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatDate, type PostMeta } from "@/lib/postMeta";

const PAGE_SIZE = 9;

/**
 * Client-side pager: page state lives in useState, not a route or query
 * param, so there's no /blog/page/N/ for Google to pick up as a thin
 * sitelink (that was the whole problem before). Only the active page's
 * posts — and their images — ever mount; the rest never touch the network
 * until clicked. Every post still gets its own canonical URL via
 * sitemap.xml regardless of which page it's on, so this doesn't affect
 * indexing of individual posts.
 */
export default function BlogGrid({ posts }: { posts: PostMeta[] }) {
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const [page, setPage] = useState(1);

  const goTo = (n: number) => {
    setPage(Math.min(totalPages, Math.max(1, n)));
    // Scrolling the grid itself into view lands right at its top edge,
    // which sits under the fixed 80px header. The page has nothing above
    // this section (Header is `fixed`, out of flow), so the top of the
    // document IS the top of the blog section — scroll there instead.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visiblePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group flex flex-col overflow-hidden rounded-[25px] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_22px_54px_rgba(0,0,0,0.12)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-orange/10 px-3.5 py-1.5 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-orange">
                  {post.category}
                </span>
                <span className="font-body text-[14px] text-[#251f21]/50">
                  {post.readTime}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-[22px] font-bold! leading-[125%] text-[#251f21] transition-colors group-hover:text-brand-orange">
                {post.title}
              </h3>
              <p className="mt-3 line-clamp-3 font-body text-[16px] font-normal leading-[140%] text-[#251f21]/65">
                {post.description}
              </p>
              <p className="mt-auto pt-6 font-body text-[14px] text-[#251f21]/45">
                {formatDate(post.date)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ---- Pager — buttons, not links: no route/query param exists for
          any page but the first. ---- */}
      {totalPages > 1 && (
        <nav
          aria-label="Blog pages"
          className="mt-14 flex items-center justify-center gap-2.5"
        >
          {page > 1 && (
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              aria-label="Previous page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#251f21]/25 text-[#251f21] transition-colors hover:border-[#251f21]/60"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
            n === page ? (
              <span
                key={n}
                aria-current="page"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange font-body text-[16px] font-bold text-white"
              >
                {n}
              </span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => goTo(n)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#251f21]/25 font-body text-[16px] text-[#251f21] transition-colors hover:border-[#251f21]/60"
              >
                {n}
              </button>
            ),
          )}
          {page < totalPages && (
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#251f21]/25 text-[#251f21] transition-colors hover:border-[#251f21]/60"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}
        </nav>
      )}
    </div>
  );
}
