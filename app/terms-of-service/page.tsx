import type { Metadata } from "next";
import LegalPage, {
  type LegalBlock,
  type LegalSection,
} from "@/components/LegalPage";

const DESCRIPTION =
  "The terms that govern access to and use of heytruffle's AI-powered voice and messaging services for restaurants and hospitality businesses.";

export const metadata: Metadata = {
  title: "Terms of Service — heytruffle",
  description: DESCRIPTION,
  alternates: { canonical: "/terms-of-service/" },
};

const PREAMBLE: LegalBlock[] = [
  {
    type: "p",
    text: 'These Terms of Service ("Terms") govern access to and use of the AI-powered voice and messaging services provided by HeyTruffle ("heytruffle," "we," "us," or "our").',
  },
  {
    type: "p",
    text: 'By accessing or using the Services, you ("Customer," "you") agree to be bound by these Terms. If you do not agree, do not use the Services.',
  },
];

const SECTIONS: LegalSection[] = [
  {
    number: "01",
    title: "Services",
    blocks: [
      {
        type: "p",
        text: 'heytruffle provides AI-powered voice assistants and messaging tools for restaurants and hospitality businesses, including call handling, routing, SMS delivery, reservations, analytics, and related features (the "Services").',
      },
      {
        type: "p",
        text: "The Services are provided for business use only. End users (restaurant guests/callers) are not parties to these Terms.",
      },
    ],
  },
  {
    number: "02",
    title: "Eligibility & Authority",
    blocks: [
      {
        type: "p",
        text: "You represent that you are at least 18 years old and have the authority to bind the business on whose behalf you are using the Services.",
      },
    ],
  },
  {
    number: "03",
    title: "Customer Responsibilities",
    blocks: [
      { type: "p", text: "You are solely responsible for:" },
      {
        type: "ul",
        items: [
          "The accuracy and completeness of business information provided (menus, hours, policies, scripts).",
          "Compliance with all applicable laws related to your use of the Services, including TCPA, call-recording consent laws, and SMS regulations.",
          "Providing any required notices or disclosures to callers or message recipients.",
          "Reviewing AI outputs before relying on them for operational or legal decisions.",
        ],
      },
      {
        type: "p",
        text: "The Services do not provide legal, regulatory, or professional advice. heytruffle provides technology only and does not guarantee compliance outcomes.",
      },
    ],
  },
  {
    number: "04",
    title: "AI Disclaimer",
    blocks: [
      {
        type: "p",
        text: "The Services use artificial intelligence and automated systems. AI responses may be inaccurate, incomplete, or inappropriate in some cases. You acknowledge that:",
      },
      {
        type: "ul",
        items: [
          "AI outputs are not guaranteed to be correct.",
          "AI outputs are provided for informational purposes only and should be reviewed before use.",
          "You remain responsible for all business decisions made using the Services.",
          "heytruffle does not guarantee uninterrupted service, perfect accuracy, or specific results.",
        ],
      },
    ],
  },
  {
    number: "05",
    title: "Data, Privacy & Ownership",
    blocks: [
      {
        type: "note",
        lead: "Customer Data.",
        text: "You retain ownership of your business content and data you provide.",
      },
      {
        type: "note",
        lead: "End-User Data.",
        text: "When end users interact with the Services, heytruffle processes information on behalf of the Customer as a service provider/processor.",
      },
      {
        type: "note",
        lead: "Service Data.",
        text: "heytruffle may generate aggregated, de-identified, or operational data (e.g., analytics, performance metrics), which heytruffle owns and may use to operate and improve the Services.",
      },
      {
        type: "p",
        text: "Use of personal data is governed by the Privacy Policy, incorporated by reference.",
      },
    ],
  },
  {
    number: "06",
    title: "SMS & Messaging",
    blocks: [
      {
        type: "p",
        text: "The Services may send transactional SMS messages related to restaurant interactions.",
      },
      {
        type: "p",
        text: "We do not share mobile contact information or SMS opt-in data with third parties or affiliates for marketing or promotional purposes.",
      },
      {
        type: "p",
        text: "SMS data is used solely to provide and support the Services.",
      },
      {
        type: "p",
        text: "You are responsible for obtaining any required consent from end users.",
      },
      {
        type: "p",
        text: "Message and data rates may apply. Recipients may reply STOP to opt out or HELP for assistance at any time.",
      },
    ],
  },
  {
    number: "07",
    title: "Fees & Payment",
    blocks: [
      {
        type: "p",
        text: "Fees, billing terms, and payment methods are set forth in applicable order forms or service agreements. Failure to pay may result in suspension or termination of Services.",
      },
    ],
  },
  {
    number: "08",
    title: "Suspension & Termination",
    blocks: [
      {
        type: "p",
        text: "We may suspend or terminate access to the Services if you:",
      },
      {
        type: "ul",
        items: [
          "Violate these Terms,",
          "Fail to pay fees when due, or",
          "Use the Services in a manner that poses legal, security, or operational risk.",
        ],
      },
      {
        type: "p",
        text: "You may stop using the Services at any time, subject to any minimum term or payment obligations agreed in an order form. Termination does not relieve payment obligations accrued prior to termination.",
      },
    ],
  },
  {
    number: "09",
    title: "Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "heytruffle retains all rights to its software, models, workflows, and technology. No rights are granted except as expressly stated in these Terms.",
      },
    ],
  },
  {
    number: "10",
    title: "Warranties Disclaimer",
    blocks: [
      {
        type: "p",
        text: 'THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, heytruffle disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.',
      },
    ],
  },
  {
    number: "11",
    title: "Limitation of Liability",
    blocks: [
      { type: "p", text: "To the maximum extent permitted by law:" },
      {
        type: "ul",
        items: [
          "heytruffle will not be liable for indirect, incidental, special, or consequential damages.",
          "heytruffle's total liability shall not exceed the fees paid by you to heytruffle in the 12 months preceding the claim.",
        ],
      },
    ],
  },
  {
    number: "12",
    title: "Indemnification",
    blocks: [
      {
        type: "p",
        text: "You agree to indemnify and hold harmless heytruffle from third-party claims arising out of:",
      },
      {
        type: "ul",
        items: [
          "Your business operations,",
          "Your failure to comply with applicable laws, or",
          "Content or instructions you provide to the Services.",
        ],
      },
    ],
  },
  {
    number: "13",
    title: "Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by the laws of the State of Delaware, without regard to conflict-of-law principles. Exclusive venue shall be the state or federal courts located in Delaware.",
      },
    ],
  },
  {
    number: "14",
    title: "Changes to These Terms",
    blocks: [
      {
        type: "p",
        text: "We may update these Terms from time to time. Continued use of the Services after changes become effective constitutes acceptance of the revised Terms.",
      },
    ],
  },
  {
    number: "15",
    title: "Contact Information",
    blocks: [
      {
        type: "p",
        text: "HeyTruffle — a Resto Experience company. If you have questions about these Terms, reach us at:",
      },
      {
        type: "ul",
        items: [
          "Email: info@heytruffle.ai",
          "Phone: +1 (404) 482-2738",
        ],
      },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of"
      titleAccent="Service."
      intro="The terms that govern access to and use of heytruffle's AI-powered voice and messaging services."
      updated="Last updated · July 13, 2026"
      preamble={PREAMBLE}
      sections={SECTIONS}
    />
  );
}
