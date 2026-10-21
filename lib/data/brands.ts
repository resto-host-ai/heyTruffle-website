
import { cache } from "react";

/** One client's template variables, as GET /organization/legal-brands returns
 *  them (manager: OrganizationService.findLegalBrands). */
export type Brand = {
  slug: string;
  brandName: string;
  legalName: string;
  shortFormName: string;
  /** YYYY-MM-DD */
  date: string;
  websiteUrl: string;
  contactEmail: string;
  phone: string;
  addressOrWebsite: string;
};

const BRAND_FIELDS = [
  "slug", "brandName", "legalName", "shortFormName", "date",
  "websiteUrl", "contactEmail", "phone", "addressOrWebsite",
] as const;

const isBrand = (b: unknown): b is Brand =>
  typeof b === "object" &&
  b !== null &&
  BRAND_FIELDS.every((k) => typeof (b as Record<string, unknown>)[k] === "string" && (b as Record<string, string>)[k].trim() !== "");

export const BRANDS_REVALIDATE = 300;

// cache(): generateMetadata and the page read the list in the same render.
// Fetched separately, a stale-while-revalidate refresh landing in between can
// give the <title> the old list (→ the 404's metadata) and the body the new one.
export const getBrands = cache(async (): Promise<Brand[]> => {
  const base = process.env.MANAGER_API_URL;
  const key = process.env.WEBSITE_API_KEY;
  if (!base || !key) return [];

  try {
    const res = await fetch(`${base.replace(/\/+$/, "")}/organization/legal-brands`, {
      headers: { "x-website-key": key },
      next: { revalidate: BRANDS_REVALIDATE },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: unknown = await res.json();
    // Only complete entries: a page must never render an empty [Variable].
    return Array.isArray(data) ? data.filter(isBrand) : [];
  } catch (err) {
    // A manager outage must not break the build or the rest of the site;
    // these pages just 404 until it answers again.
    console.error("[brands] could not load compliance brands:", err);
    return [];
  }
});

export async function getBrand(slug: string): Promise<Brand | undefined> {
  return (await getBrands()).find((b) => b.slug === slug);
}
