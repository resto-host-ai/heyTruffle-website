import type { Metadata } from "next";
import CareersWizard from "@/components/careers/CareersWizard";
import { ROLES } from "@/lib/data/careers";

const META_DESCRIPTION =
  "Open roles at heytruffle: sales, engineering, design, and marketing positions on an AI-native team building voice AI for restaurants.";

export const metadata: Metadata = {
  title: "Careers — heytruffle",
  description: META_DESCRIPTION,
  alternates: { canonical: "/careers/" },
};

const SITE_URL = "https://heytruffle.ai";

/** One schema.org JobPosting per real role — skips the "Don't see your role
 *  here" catch-all, which isn't an actual listing. Powers Google for Jobs
 *  rich results and gives AI answer engines an explicit, structured read on
 *  what's actually open, independent of the accordion UI. */
function buildJobPostingsJsonLd() {
  const datePosted = new Date().toISOString();
  const validThrough = new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const postings = ROLES.filter((r) => r.id !== "open").map((role) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.name,
    description: [role.ident, ...role.bullets].join(" "),
    identifier: {
      "@type": "PropertyValue",
      name: "heytruffle",
      value: role.id,
    },
    datePosted,
    validThrough,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "heytruffle",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/images/heytruffle-logo.svg`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Béccar, Buenos Aires",
        addressCountry: "AR",
      },
    },
    directApply: true,
    url: `${SITE_URL}/careers/#${role.id}`,
  }));

  return postings;
}

export default function CareersPage() {
  const jobPostings = buildJobPostingsJsonLd();

  return (
    <main className="mt-[80px] flex flex-1 flex-col bg-cream">
      {jobPostings.map((posting) => (
        <script
          key={posting.identifier.value}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(posting) }}
        />
      ))}
      <CareersWizard />
    </main>
  );
}
