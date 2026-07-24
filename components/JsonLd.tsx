/**
 * Site-wide structured data (JSON-LD). Rendered once from the root layout.
 *
 * Mirrors the RestoHost setup, rebranded to heytruffle: a single @graph with
 * Organization, WebSite and SoftwareApplication nodes cross-referenced by @id.
 * Page-specific schema (FAQPage) lives with its own page.
 */
const SITE_URL = "https://heytruffle.ai";
const ORG_NAME = "heytruffle";
const ORG_LOGO = `${SITE_URL}/images/heytruffle-logo.svg`;

export default function SiteJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: ORG_NAME,
        url: SITE_URL,
        description:
          "Fully managed voice AI service that answers 100% of restaurant calls 24/7 in English and Spanish.",
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: ORG_LOGO,
          contentUrl: ORG_LOGO,
        },
        email: "info@heytruffle.com",
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: "info@heytruffle.com",
            contactType: "sales",
            areaServed: "US",
            availableLanguage: ["English", "Spanish"],
          },
        ],
        parentOrganization: {
          "@type": "Organization",
          name: "Resto Experience",
          url: "https://restoexperience.com",
        },
        // No `sameAs` — heytruffle has no public social profiles wired into the
        // site yet. Add verified profile URLs here once they exist.
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: ORG_NAME,
        description:
          "Voice AI that answers every restaurant call — reservations, orders and catering, 24/7.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: ORG_NAME,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "RestaurantManagementSoftware",
        operatingSystem: "Web/Cloud",
        description:
          "heytruffle is a fully managed voice AI host for restaurants: it answers every inbound call, books reservations, takes orders and closes catering inquiries around the clock in English and Spanish.",
        provider: { "@id": `${SITE_URL}/#organization` },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
