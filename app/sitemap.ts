import type { MetadataRoute } from "next";
import { INTEGRATIONS } from "@/lib/integrations";
import { getAllPostMeta } from "@/lib/blog";
import { CASE_STUDY_SLUGS } from "@/content/case-studies";
import { COMPETITORS } from "@/lib/data/compare";

const SITE = "https://heytruffle.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/case-study/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/compare/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/testimonials/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/roi-calculator/`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/privacy-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms-of-service/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/anti-spam/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
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

  const comparisons: MetadataRoute.Sitemap = COMPETITORS.map((c) => ({
    url: `${SITE}/compare/${c.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const posts: MetadataRoute.Sitemap = getAllPostMeta().map((p) => ({
    url: `${SITE}/blog/${p.slug}/`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...caseStudies, ...integrations, ...comparisons, ...posts];
}
