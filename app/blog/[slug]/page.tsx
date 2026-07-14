import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPost, getPostSlugs, getAllPostMeta, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found — heytruffle" };
  return {
    title: `${post.title} — heytruffle`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = marked.parse(post.content, { async: false }) as string;

  // A few more recent posts to show at the foot of the article.
  const related = getAllPostMeta()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="flex-1">
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden bg-[#251f21] pb-12 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
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

        <div className="relative mx-auto max-w-[820px] px-6 md:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-cream/60">
            <span className="rounded-full bg-brand-orange/20 px-3 py-1 font-semibold text-[#f0b27a]">
              {post.category}
            </span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>·</span>
            <span>{post.readTime} read</span>
          </div>

          <h1 className="mt-6 font-serif text-4xl leading-tight text-cream md:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-6 max-w-[680px] text-base leading-relaxed text-cream/70 md:text-lg">
              {post.description}
            </p>
          )}
        </div>
      </section>

      {/* ---- Featured image ---- */}
      <div className="bg-cream">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <div className="relative aspect-[16/9] -translate-y-8 overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:-translate-y-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* ---- Body ---- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[720px] px-6 pb-20 md:px-10 md:pb-28">
          <article
            className="post-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      {/* ---- Related ---- */}
      {related.length > 0 && (
        <section className="bg-gradient-to-b from-cream to-[#ece8df]">
          <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
            <h2 className="font-serif text-2xl text-[#251f21] md:text-3xl">
              Keep reading
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-orange">
                      {p.category}
                    </span>
                    <h3 className="mt-3 font-serif text-lg leading-snug text-[#251f21] transition-colors group-hover:text-brand-orange">
                      {p.title}
                    </h3>
                    <p className="mt-auto pt-4 text-[11px] uppercase tracking-[0.12em] text-[#251f21]/40">
                      {formatDate(p.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
