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

export default function BlogPage() {
  const posts = getAllPostMeta();
  const [featured, ...rest] = posts;

  return (
    <main className="flex-1">
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden bg-[#251f21] pb-16 pt-32 md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
          }}
        >
          <Image
            src="/images/background_gradient.webp"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            Blog
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-cream md:text-6xl">
            Ideas from the <span className="text-[#d592f3]">floor.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-base leading-relaxed text-cream/70 md:text-lg">
            Insights on AI voice hosts, recovered revenue, and the operations
            behind restaurants that never miss a call.
          </p>
        </div>
      </section>

      {/* ---- Posts ---- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-24">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 gap-8 overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:py-12 md:pr-12">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-[#251f21]/45">
                  <span className="rounded-full bg-brand-orange/10 px-3 py-1 font-semibold text-brand-orange">
                    {featured.category}
                  </span>
                  <span>{featured.readTime} read</span>
                </div>
                <h2 className="mt-5 font-serif text-2xl leading-tight text-[#251f21] transition-colors group-hover:text-brand-orange md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#251f21]/70 md:text-base">
                  {featured.description}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.12em] text-[#251f21]/45">
                  {formatDate(featured.date)}
                </p>
              </div>
            </Link>
          )}

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[#251f21]/45">
                    <span className="rounded-full bg-brand-orange/10 px-2.5 py-1 font-semibold text-brand-orange">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg leading-snug text-[#251f21] transition-colors group-hover:text-brand-orange">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#251f21]/65">
                    {post.description}
                  </p>
                  <p className="mt-auto pt-6 text-[11px] uppercase tracking-[0.12em] text-[#251f21]/40">
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
