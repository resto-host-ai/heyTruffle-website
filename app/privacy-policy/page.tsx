import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import {
  PRIVACY_DESCRIPTION,
  PRIVACY_INTRO,
  PRIVACY_PREAMBLE,
  PRIVACY_SECTIONS,
  PRIVACY_UPDATED,
} from "@/lib/legal/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy — heytruffle",
  description: PRIVACY_DESCRIPTION,
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      titleAccent="Policy."
      intro={PRIVACY_INTRO}
      updated={PRIVACY_UPDATED}
      preamble={PRIVACY_PREAMBLE}
      sections={PRIVACY_SECTIONS}
    />
  );
}
