import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage, { type LegalBlock, type LegalSection } from "@/components/layout/LegalPage";
import { getBrand } from "@/lib/data/brands";

/** A client's copy of one of our legal documents, titled with its name, at
 *  /{slug}/privacy-policy or /{slug}/terms-of-service (see lib/data/brands.ts). */
type Doc = { 
  path: string; 
  label: string;
  intro: string;
  updated: string;
  preamble: LegalBlock[];
  sections: LegalSection[];
};

export async function brandLegalMetadata(slug: string, doc: Doc): Promise<Metadata> {
  const brand = await getBrand(slug);
  if (!brand) return {};
  return {
    title: `${brand.name}: ${doc.label} — heytruffle`,
    description: `${doc.label} for the phone and SMS services heytruffle operates on behalf of ${brand.name}.`,
    alternates: { canonical: `/${brand.slug}/${doc.path}/` },
    // One copy per client of the same text: keep them out of search results.
    robots: { index: false, follow: true },
  };
}

export async function BrandLegalPage({ slug, doc }: { slug: string; doc: Doc }) {
  const brand = await getBrand(slug);
  if (!brand) notFound();

  const notice: LegalBlock = {
    type: "note",
    lead: `${brand.name}:`,
    text: `This ${doc.label} applies to the phone and SMS services that heytruffle operates on behalf of ${brand.name}. References below to the "Customer" or the "restaurant" refer to ${brand.name}.`,
  };

  return (
    <LegalPage
      eyebrow="Legal"
      title={`${brand.name}:`}
      titleAccent={`${doc.label}.`}
      intro={doc.intro}
      updated={doc.updated}
      preamble={[notice, ...doc.preamble]}
      sections={doc.sections}
    />
  );
}
