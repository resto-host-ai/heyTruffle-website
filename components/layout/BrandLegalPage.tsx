import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalHero } from "@/components/layout/LegalPage";
import { getBrand, type Brand } from "@/lib/data/brands";
import { renderMarkdown } from "@/lib/blog";

/** A client's Privacy Policy or Terms of Service at /{slug}/privacy-policy or
 *  /{slug}/terms-of-service: one of the templates in lib/legal/brand-templates
 *  with its [Variables] filled from the manager (see lib/data/brands.ts). */
type Doc = {
  /** Path segment, e.g. "privacy-policy". */
  path: "privacy-policy" | "terms-of-service";
  /** "Privacy Policy" — used in the title. */
  label: string;
  intro: string;
  template: string;
};

// Same canonical origin the rest of the site declares; the [Terms URL] /
// [Privacy Policy URL] variables point at this client's other page there.
const SITE_URL = (process.env.SITE_URL || "https://heytruffle.ai").replace(/\/+$/, "");

const pageUrl = (slug: string, path: Doc["path"]) => `${SITE_URL}/${slug}/${path}/`;

/** "2026-10-21" → "October 21, 2026" (UTC, so the day never shifts). */
function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** Values come from people typing in the manager: escape HTML, and markdown
 *  syntax in free text, so a name with "*" or "<" renders literally. URLs and
 *  emails keep their characters so they still autolink. */
const escapeHtml = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (v: string) => escapeHtml(v).replace(/([\\`*_[\]|#])/g, "\\$1");

/** Fill every [Variable] of a template. Throws on one we don't know, so a
 *  template edit can't ship a page with a raw placeholder in it. */
export function fillTemplate(template: string, brand: Brand): string {
  const values: Record<string, string> = {
    "Company Legal Name": escapeText(brand.legalName),
    "Brand Name": escapeText(brand.brandName),
    "Short Form Name": escapeText(brand.shortFormName),
    Date: formatDate(brand.date),
    "Brand Website URL": escapeHtml(brand.websiteUrl),
    "Terms URL": pageUrl(brand.slug, "terms-of-service"),
    "Privacy Policy URL": pageUrl(brand.slug, "privacy-policy"),
    "Brand Contact Email": escapeHtml(brand.contactEmail),
    "Brand Phone": escapeText(brand.phone),
    "Brand Address or Website": escapeText(brand.addressOrWebsite),
  };
  return template.replace(/\[([A-Z][A-Za-z ]+)\]/g, (match, name: string) => {
    if (!(name in values)) throw new Error(`Unknown template variable ${match}`);
    return values[name];
  });
}

export async function brandLegalMetadata(slug: string, doc: Doc): Promise<Metadata> {
  const brand = await getBrand(slug);
  if (!brand) return {};
  return {
    title: `${brand.brandName}: ${doc.label} — heytruffle`,
    description: `${doc.label} for the phone and text services heytruffle provides to ${brand.brandName}, operated by ${brand.legalName}.`,
    alternates: { canonical: `/${brand.slug}/${doc.path}/` },
    // One copy per client of the same template: keep them out of search.
    robots: { index: false, follow: true },
  };
}

export async function BrandLegalPage({ slug, doc }: { slug: string; doc: Doc }) {
  const brand = await getBrand(slug);
  if (!brand) notFound();

  const html = renderMarkdown(fillTemplate(doc.template, brand));

  return (
    <main className="flex-1">
      <LegalHero eyebrow="Legal" title={`${brand.brandName}:`} titleAccent={`${doc.label}.`} intro={doc.intro} />
      <section className="bg-cream">
        <div
          className="legal-md mx-auto max-w-[820px] px-6 py-16 md:px-10 md:py-24"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
    </main>
  );
}
