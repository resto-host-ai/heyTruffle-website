import type { MetadataRoute } from "next";
import { INTEGRATIONS } from "@/lib/integrations";
import { getAllPostMeta } from "@/lib/blog";
import { CASE_STUDY_SLUGS } from "@/content/case-studies";

const SITE = "https://heytruffle.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/case-study/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/testimonials/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/roi-calculator/`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/privacy-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms-of-service/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDY_SLUGS.map((slug) => ({
    url: `${SITE}/case-study/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const integrations: MetadataRoute.Sitemap = INTEGRATIONS.map((i) => ({
    url: `${SITE}/integrations/${i.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPostMeta().map((p) => ({
    url: `${SITE}/blog/${p.slug}/`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Paged blog index (page 1 is /blog/ itself; 9 grid cards per page).
  const blogPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, Math.ceil((getAllPostMeta().length - 1) / 9) - 1) },
    (_, i) => ({
      url: `${SITE}/blog/page/${i + 2}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    }),
  );

  return [...staticPages, ...caseStudies, ...integrations, ...posts, ...blogPages];
}
