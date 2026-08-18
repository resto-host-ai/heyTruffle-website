import type { Metadata } from "next";
import LegalPage, {
  type LegalBlock,
  type LegalSection,
} from "@/components/layout/LegalPage";

const DESCRIPTION =
  "heytruffle's commitment to permission-based email: no unsolicited commercial messages, clear sender identification, and honored opt-outs.";

export const metadata: Metadata = {
  title: "Anti-Spam Policy — heytruffle",
  description: DESCRIPTION,
  alternates: { canonical: "/anti-spam/" },
};

const PREAMBLE: LegalBlock[] = [
  {
    type: "p",
    text: 'heytruffle is committed to permission-based communication. We do not send, and do not permit anyone acting on our behalf to send, unsolicited commercial email ("spam") — and we prohibit the promotion or advertisement of heytruffle, our websites, our domains, or our services through unsolicited messages of any kind.',
  },
];

const SECTIONS: LegalSection[] = [
  {
    number: "01",
    title: "No Unsolicited Messages",
    blocks: [
      {
        type: "p",
        text: "Neither heytruffle, nor our employees, contractors, affiliates, service providers, or partners may advertise or promote heytruffle or any heytruffle web property via unsolicited email, SMS, or any other unsolicited electronic message. Any third party found promoting our services through unsolicited messages is acting without our authorization, and we will act to stop it.",
      },
    ],
  },
  {
    number: "02",
    title: "Permission-Based Sending",
    blocks: [
      {
        type: "p",
        text: "We send commercial email only to recipients who have a direct business relationship with us or from whom we have an appropriate basis to communicate under applicable law. We do not purchase bulk email lists for indiscriminate sending, and we do not send to harvested or scraped address lists.",
      },
    ],
  },
  {
    number: "03",
    title: "Identification and Transparency",
    blocks: [
      {
        type: "p",
        text: "Every commercial email we send identifies heytruffle as the sender, uses accurate header and subject information, and includes a valid physical postal address, as required by the U.S. CAN-SPAM Act.",
      },
    ],
  },
  {
    number: "04",
    title: "Opt-Out and Suppression",
    blocks: [
      {
        type: "p",
        text: "Every commercial email we send includes a clear, functioning unsubscribe mechanism. Opt-out requests are honored promptly (and in all cases within the legally required window) and are applied across all of our sending domains and mailboxes through a shared suppression list. Once you opt out, you will not receive further commercial email from us unless you explicitly opt back in.",
      },
    ],
  },
  {
    number: "05",
    title: "Legal Compliance",
    blocks: [
      {
        type: "p",
        text: "Our email practices are designed to comply with applicable laws and regulations, including the U.S. CAN-SPAM Act, Canada's Anti-Spam Legislation (CASL), and the EU GDPR and ePrivacy rules where applicable. We also require that any email infrastructure or service provider we use enforces equivalent permission, identification, and opt-out standards.",
      },
    ],
  },
  {
    number: "06",
    title: "Our Sending Domains",
    blocks: [
      {
        type: "p",
        text: "For deliverability and security best practice, heytruffle sends operational and business email from dedicated sending domains that we own (for example, domains of the form heytruffle.com). All such domains are authenticated with SPF, DKIM, and DMARC, and redirect to this website. Mail claiming to be from heytruffle that fails authentication should be treated as spoofed and reported to us.",
      },
    ],
  },
  {
    number: "07",
    title: "Reporting Abuse",
    blocks: [
      {
        type: "p",
        text: "If you believe you have received unsolicited email promoting heytruffle, or spoofed mail claiming to be from us, please report it, including full message headers, to info@heytruffle.ai. We investigate every report and take corrective action, up to and including terminating any relationship with a party that violates this policy.",
      },
    ],
  },
  {
    number: "08",
    title: "Contact",
    blocks: [
      {
        type: "ul",
        items: [
          "heytruffle",
          "8 The Green, Dover, DE 19901, United States",
          "Phone: +1 (404) 477-4607",
          "Email: info@heytruffle.ai",
        ],
      },
    ],
  },
];

export default function AntiSpamPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Anti-Spam"
      titleAccent="Policy."
      intro="Our commitment to permission-based email — no unsolicited commercial messages, sent only to recipients we have a legitimate basis to reach."
      updated="Effective date · August 12, 2026"
      preamble={PREAMBLE}
      sections={SECTIONS}
    />
  );
}
