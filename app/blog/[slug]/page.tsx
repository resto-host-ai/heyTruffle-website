import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { NOISE } from "@/lib/noise";
import { BookDemoButton } from "@/components/BookDemoButton";
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
    <main className="bg-cream">
      {/* ---- Hero — dark warm field matching the case-study heroes ---- */}
      <section className="relative overflow-hidden bg-[#251f21] pb-12 pt-28 text-cream md:pb-16 md:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src="/images/fondo_casestudy.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#251f21]/80" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 85% at 100% 30%, rgba(239,114,0,0.5) 0%, rgba(239,114,0,0.12) 34%, transparent 62%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
            style={{ backgroundImage: NOISE }}
          />
        </div>

        <div className="relative mx-auto max-w-[820px] px-6 md:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-body text-[18px] font-normal leading-[110%] text-cream/80 transition-opacity hover:opacity-70"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="shrink-0"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            All articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-orange/20 px-4 py-1.5 font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-[#f0b27a]">
              {post.category}
            </span>
            <span className="font-body text-[15px] text-cream/70">
              {formatDate(post.date)}
            </span>
            <span aria-hidden className="text-cream/40">
              ·
            </span>
            <span className="font-body text-[15px] text-cream/70">
              {post.readTime} read
            </span>
          </div>

          <h1 className="mt-6 font-serif text-[32px] font-bold! leading-[115%] text-cream md:text-[48px] lg:text-[56px]">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-6 max-w-[680px] font-body text-[20px] font-normal leading-[140%] text-cream/80 md:text-[24px]">
              {post.description}
            </p>
          )}
        </div>
      </section>

      {/* ---- Featured image ---- */}
      <div className="bg-cream">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <div className="relative aspect-[16/9] -translate-y-8 overflow-hidden rounded-[25px] shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:-translate-y-12">
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
          <div className="mx-auto w-full px-6 py-20 lg:px-[73px] md:py-24">
            <h2 className="text-center font-serif text-[32px] font-bold! leading-[110%] text-[#251f21] md:text-[44px] lg:text-[52px]">
              Keep reading.
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[25px] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_22px_54px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 480px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="w-fit rounded-full bg-brand-orange/10 px-3.5 py-1.5 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-orange">
                      {p.category}
                    </span>
                    <h3 className="mt-4 font-serif text-[22px] font-bold! leading-[125%] text-[#251f21] transition-colors group-hover:text-brand-orange">
                      {p.title}
                    </h3>
                    <p className="mt-auto pt-6 font-body text-[14px] text-[#251f21]/45">
                      {formatDate(p.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Final CTA — mirrors the case-study / integration closing card ---- */}
      <section className="relative overflow-hidden bg-[#ece8df] pb-24 pt-4 md:pb-28">
        <div className="mx-auto w-full px-6 lg:px-[73px]">
          <div
            className="relative flex w-full flex-col items-center overflow-hidden rounded-[40px] px-6 py-20 text-center text-cream md:rounded-[67px] md:px-10 md:py-24"
            style={{
              background: [
                "radial-gradient(75% 95% at -8% 82%, rgba(239,114,0,0.5) 0%, rgba(239,114,0,0.12) 42%, transparent 68%)",
                "linear-gradient(180deg, #1a1620 0%, #201a1e 100%)",
              ].join(", "),
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
              style={{ backgroundImage: NOISE }}
            />
            <div className="relative flex w-full flex-col items-center">
              <h2 className="mx-auto max-w-[972px] font-serif text-[32px] font-bold! leading-[110%] md:text-[48px] lg:text-[56px]">
                Hear what heytruffle would capture for your restaurant.
              </h2>
              <p className="mx-auto mt-5 max-w-[560px] font-body text-[20px] font-normal leading-[140%] text-cream/80">
                Every reservation booked, every order taken, every catering
                inquiry closed.
              </p>
              <BookDemoButton className="mt-10 inline-flex items-center justify-center rounded-full bg-cream px-9 py-5 font-body text-[20px] font-bold leading-[110%] text-[#251f21] transition-all duration-300 btn-grad btn-grad-blue hover:text-cream hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(79,84,144,0.55)]">
                Get a Free Demo
              </BookDemoButton>
              <p className="mt-6 font-body text-[20px] font-normal leading-[110%] text-cream/80">
                Backed by real people.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
