import type { Metadata } from "next";
import CareersWizard from "@/components/careers/CareersWizard";

const META_DESCRIPTION =
  "Open roles at heytruffle: sales, engineering, design, and marketing positions on an AI-native team building voice AI for restaurants.";

export const metadata: Metadata = {
  title: "Careers — heytruffle",
  description: META_DESCRIPTION,
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <main className="mt-[80px] flex flex-1 flex-col bg-cream">
      <CareersWizard />
    </main>
  );
}
