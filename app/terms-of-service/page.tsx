import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import {
  TERMS_DESCRIPTION,
  TERMS_INTRO,
  TERMS_PREAMBLE,
  TERMS_SECTIONS,
  TERMS_UPDATED,
} from "@/lib/legal/terms-of-service";

export const metadata: Metadata = {
  title: "Terms of Service — heytruffle",
  description: TERMS_DESCRIPTION,
  alternates: { canonical: "/terms-of-service/" },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of"
      titleAccent="Service."
      intro={TERMS_INTRO}
      updated={TERMS_UPDATED}
      preamble={TERMS_PREAMBLE}
      sections={TERMS_SECTIONS}
    />
  );
}
