import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPostMeta, formatDate } from "@/lib/blog";

const DESCRIPTION =
  "Insights on AI voice hosts, restaurant revenue recovery, and modern hospitality operations from the heytruffle team.";

export const metadata: Metadata = {
  title: "Blog — heytruffle",
  description: DESCRIPTION,
  alternates: { canonical: "/blog/" },
};

function ArrowUpRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function BlogPage() {
  const posts = getAllPostMeta();
  const [featured, ...rest] = posts;

  return (
    <main className="flex-1">
      {/* ---- Hero + posts share one warm cream field, mirroring Case Studies ---- */}
      <section className="relative overflow-hidden bg-cream pb-24 pt-32 md:pb-32 md:pt-40">
        {/* Warm orange (#EF7200) glow from the top-right and bottom-left corners */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "radial-gradient(60% 65% at 100% 0%, rgba(239,114,0,0.7) 0%, rgba(239,114,0,0.16) 36%, transparent 64%)",
              "radial-gradient(60% 65% at 0% 100%, rgba(239,114,0,0.7) 0%, rgba(239,114,0,0.16) 36%, transparent 64%)",
            ].join(", "),
          }}
        />

        <div className="relative mx-auto w-full px-6 lg:px-[73px]">
          <h1 className="mx-auto max-w-[1085px] text-center font-serif text-[40px] font-bold! leading-[110%] text-[#251f21] md:text-[52px] lg:text-[64px]">
            Ideas from the <span className="text-brand-orange">floor.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[820px] text-center font-body text-[20px] font-normal leading-[140%] text-[#251f21] md:text-[26px]">
            Insights on AI voice hosts, recovered revenue, and the operations
            behind restaurants that never miss a call.
          </p>

          {/* ---- Featured ---- */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-14 grid grid-cols-1 gap-0 overflow-hidden rounded-[25px] bg-white shadow-[0_18px_44px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_28px_70px_rgba(0,0,0,0.14)] md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-brand-orange/10 px-4 py-1.5 font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-orange">
                    {featured.category}
                  </span>
                  <span className="font-body text-[15px] text-[#251f21]/50">
                    {featured.readTime} read
                  </span>
                </div>
                <h2 className="mt-6 font-serif text-[28px] font-bold! leading-[120%] text-[#251f21] transition-colors group-hover:text-brand-orange md:text-[40px]">
                  {featured.title}
                </h2>
                <p className="mt-5 line-clamp-3 font-body text-[18px] font-normal leading-[140%] text-[#251f21]/70 md:text-[20px]">
                  {featured.description}
                </p>
                <div className="mt-7 flex items-center justify-between">
                  <span className="font-body text-[15px] text-[#251f21]/50">
                    {formatDate(featured.date)}
                  </span>
                  <span className="inline-flex items-center gap-2 font-body text-[18px] text-[#251f21] underline underline-offset-4 transition-opacity group-hover:opacity-70">
                    Read more
                    <ArrowUpRight />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* ---- Grid ---- */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-[25px] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_22px_54px_rgba(0,0,0,0.12)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
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
        </div>
      </section>
    </main>
  );
}
