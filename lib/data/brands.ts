
export type Brand = { slug: string; name: string };

export const BRANDS_REVALIDATE = 300;

export async function getBrands(): Promise<Brand[]> {
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
    return Array.isArray(data)
      ? data.filter(
          (b): b is Brand => typeof b?.slug === "string" && typeof b?.name === "string",
        )
      : [];
  } catch (err) {
    // A manager outage must not break the build or the rest of the site;
    // these pages just 404 until it answers again.
    console.error("[brands] could not load compliance brands:", err);
    return [];
  }
}

export async function getBrand(slug: string): Promise<Brand | undefined> {
  return (await getBrands()).find((b) => b.slug === slug);
}
