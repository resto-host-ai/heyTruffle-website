import type { Metadata } from "next";
import { BrandLegalPage, brandLegalMetadata } from "@/components/layout/BrandLegalPage";
import { getBrands } from "@/lib/data/brands";
import { BRAND_PRIVACY_TEMPLATE } from "@/lib/legal/brand-templates";

// A client's Privacy Policy, linked from its Twilio A2P campaign.
// Brands the manager adds later are rendered on first request (dynamicParams
// defaults to true); every page re-checks the manager at most every 5 min.
export const revalidate = 300;

const DOC = {
  path: "privacy-policy",
  label: "Privacy Policy",
  intro: "",
  template: BRAND_PRIVACY_TEMPLATE,
} as const;

export async function generateStaticParams() {
  return (await getBrands()).map((b) => ({ brand: b.slug }));
}

type Props = { params: Promise<{ brand: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  return brandLegalMetadata(brand, DOC);
}

export default async function Page({ params }: Props) {
  const { brand } = await params;
  return <BrandLegalPage slug={brand} doc={DOC} />;
}
