import type { Metadata } from "next";
import LegalPage, {
  type LegalBlock,
  type LegalSection,
} from "@/components/LegalPage";

const DESCRIPTION =
  "How heytruffle collects, uses, discloses, and safeguards information when you use our AI-powered voice and messaging services for restaurants.";

export const metadata: Metadata = {
  title: "Privacy Policy — heytruffle",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy/" },
};

const PREAMBLE: LegalBlock[] = [
  {
    type: "p",
    text: 'This Privacy Policy explains how HeyTruffle ("heytruffle," "we," "us," or "our") collects, uses, discloses, and safeguards information when you visit our websites, use our services, or interact with our AI-powered voice and messaging technology (collectively, the "Services").',
  },
  {
    type: "p",
    text: 'heytruffle provides AI-powered voice assistants for restaurants and hospitality businesses (our "Customers"). When you call or text a restaurant that uses our technology, we may process information about you on behalf of that restaurant.',
  },
  {
    type: "p",
    text: "If you do not agree with this Privacy Policy, please do not use the Services.",
  },
];

const SECTIONS: LegalSection[] = [
  {
    number: "01",
    title: "Scope and Roles (B2B / B2B2C)",
    blocks: [
      { type: "p", text: "This Privacy Policy covers information we process from:" },
      {
        type: "ul",
        items: [
          "Customer representatives (e.g., owners, managers, employees) who use heytruffle for business purposes.",
          "End users (restaurant guests, callers, or texters) who interact with a restaurant's phone line or messaging flows powered by heytruffle.",
        ],
      },
      { type: "h", text: "Service Provider / Processor Notice" },
      {
        type: "p",
        text: "In many cases, heytruffle processes end-user information as a service provider or processor on behalf of the restaurant Customer. The restaurant Customer determines what information is collected and how it is used for its business purposes. If you are an end user and wish to exercise privacy rights related to a restaurant's use of your information, you should contact that restaurant directly. heytruffle will assist its Customers as required by law and contract.",
      },
      {
        type: "p",
        text: "If you are a Customer, our agreement with you (and any applicable data processing addendum) governs how we process personal data on your behalf.",
      },
    ],
  },
  {
    number: "02",
    title: "Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We collect information in the following ways: (a) information you provide, (b) information collected automatically, and (c) information from integrations and third parties.",
      },
      { type: "h", text: "A. Information You Provide to Us (Customer-Side)" },
      {
        type: "ul",
        items: [
          "Account and contact information: name, email address, phone number, company name, role or title.",
          "Billing and payment information: billing contact details; payment and bank/ACH information may be processed by third-party payment processors (we generally do not store full payment card details).",
          "Support communications: emails, messages, call logs, recordings, or troubleshooting information provided in connection with customer support.",
          "Customer content: menus, hours, policies, brand scripts, reservation rules, FAQs, and other materials provided to configure the AI assistant.",
        ],
      },
      { type: "h", text: "B. Information Collected Automatically (Website / Product Telemetry)" },
      {
        type: "ul",
        items: [
          "Device and usage data: IP address, browser type, device identifiers, operating system, referral URLs, pages viewed, interactions with our website, and approximate location derived from IP address.",
          "Cookies and similar technologies: see Section 08 below.",
        ],
      },
      { type: "h", text: "C. Voice, Call, Messaging, and Interaction Data (End-User + Operational Data)" },
      {
        type: "p",
        text: "When you call or interact with a restaurant using our technology, we may process:",
      },
      {
        type: "ul",
        items: [
          "Call metadata: calling and called phone numbers, date and time of calls, call duration, routing or transfer events, and system logs.",
          "Audio and transcripts: the spoken content of calls and AI-generated transcripts, depending on Customer configuration.",
          "Message data (SMS/MMS): phone numbers, message content, delivery status, timestamps, and link interactions.",
          "Reservation or request information: name, party size, date/time, special requests, or other information you provide to complete a reservation or inquiry.",
          "Derived operational insights: intent classification, reason for call, resolution outcomes, and performance analytics.",
        ],
      },
      {
        type: "note",
        lead: "Call recording notice:",
        text: "Some implementations may record calls. Customers control whether call recording is enabled and are responsible for ensuring that appropriate notice and consent language is provided where required by law. heytruffle may provide configurable prompts to support compliance.",
      },
      { type: "h", text: "D. Information from Integrations and Third Parties" },
      {
        type: "p",
        text: "We may receive information through integrations enabled by a Customer, such as reservation systems, online ordering or POS platforms, messaging and telephony providers, and analytics tools. This information is used solely to provide the requested functionality.",
      },
    ],
  },
  {
    number: "03",
    title: "Sensitive Information and What We Do Not Collect",
    blocks: [
      {
        type: "p",
        text: "Please do not provide sensitive personal information during calls or messages unless a restaurant explicitly requests it for a supported workflow. Sensitive information includes, for example, Social Security numbers, government ID numbers, full payment card numbers, CVV codes, or medical information.",
      },
      {
        type: "note",
        lead: "Biometric information:",
        text: "heytruffle does not create voiceprints or biometric templates for the purpose of uniquely identifying individuals. Our Services analyze speech to generate responses and transcripts but are not designed to establish biometric identity.",
      },
      {
        type: "note",
        lead: "Precise geolocation:",
        text: "We do not intentionally collect precise geolocation data. Any location information is limited to approximate location derived from IP address for security and analytics purposes.",
      },
    ],
  },
  {
    number: "04",
    title: "How We Use Information",
    blocks: [
      { type: "p", text: "We use information to:" },
      {
        type: "ul",
        items: [
          "Provide the Services (answer calls, route or transfer calls, send SMS links, complete reservations or inquiries).",
          "Operate, maintain, and secure the Services (fraud prevention, abuse detection, incident response, debugging, authentication).",
          "Improve and develop the Services (quality assurance, analytics, feature development, and model performance evaluation).",
          "Support Customers (onboarding, customer support, reporting, and account management).",
          "Comply with legal obligations and enforce our agreements.",
        ],
      },
      { type: "h", text: "AI Training and Improvement" },
      {
        type: "p",
        text: "We may use certain interaction data (including transcripts and, where enabled, audio) to improve our models and service performance. Where feasible, we apply safeguards such as access controls, data minimization, and the use of aggregated or de-identified data. Customers may have additional controls as set forth in their agreements with us.",
      },
    ],
  },
  {
    number: "05",
    title: "How We Disclose Information",
    blocks: [
      { type: "p", text: "We may disclose information in the following circumstances:" },
      { type: "h", text: "A. Service Providers" },
      {
        type: "p",
        text: "We may share information with trusted service providers and subprocessors that support the operation of our Services, including cloud hosting, telephony and messaging delivery, analytics, customer support, payment processing, and security services. These providers are authorized to use the information only as necessary to perform services for us.",
      },
      { type: "h", text: "B. Customers" },
      {
        type: "p",
        text: "When you interact with a restaurant using our technology, we may provide your interaction data (such as transcripts, reservation details, or call logs) to that restaurant to fulfill your request and support its operations.",
      },
      { type: "h", text: "C. Legal and Safety Reasons" },
      {
        type: "p",
        text: "We may disclose information to comply with law or legal process, protect the rights, property, or safety of heytruffle, our Customers, end users, or the public, or to investigate fraud, abuse, or security incidents.",
      },
      { type: "h", text: "D. Business Transfers" },
      {
        type: "p",
        text: "Information may be transferred in connection with a merger, acquisition, financing, reorganization, bankruptcy, or sale of assets.",
      },
      { type: "h", text: "E. Aggregated or De-Identified Data" },
      {
        type: "p",
        text: "We may share aggregated or de-identified information that cannot reasonably be used to identify you.",
      },
    ],
  },
  {
    number: "06",
    title: "SMS Privacy and Data Sharing",
    blocks: [
      {
        type: "p",
        text: "heytruffle uses SMS messaging primarily to support restaurant interactions, such as sending reservation links, confirmations, support forms, or other information requested by the user.",
      },
      {
        type: "note",
        text: "We do not share mobile contact information with third parties or affiliates for marketing or promotional purposes.",
      },
      {
        type: "p",
        text: "Information may be shared solely with service providers and subprocessors that support the delivery of our Services (such as messaging delivery, telephony infrastructure, and customer support), and only as necessary to operate the Services.",
      },
      {
        type: "note",
        text: "All other categories of data sharing explicitly exclude text messaging originator opt-in data and consent. This information will not be shared with any third parties.",
      },
      {
        type: "p",
        text: "Users may opt out of SMS messages at any time by replying STOP, and may reply HELP for additional information. We honor opt-out requests as required by law.",
      },
    ],
  },
  {
    number: "07",
    title: "Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain information for as long as reasonably necessary to provide and improve the Services, comply with legal obligations, resolve disputes, and enforce agreements. Retention periods vary based on data type, Customer configuration, and legal requirements. Certain information may be retained longer where required by law or for legitimate business purposes.",
      },
    ],
  },
  {
    number: "08",
    title: "Cookies and Similar Technologies",
    blocks: [
      {
        type: "p",
        text: "We use cookies and similar technologies to operate our website and understand usage. These may include essential cookies, analytics cookies, and preference cookies. You can control cookies through your browser settings. Disabling cookies may affect certain site functionality.",
      },
    ],
  },
  {
    number: "09",
    title: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "The Services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided information to us, please contact us.",
      },
    ],
  },
  {
    number: "10",
    title: "U.S. State Privacy Rights",
    blocks: [
      {
        type: "p",
        text: "Depending on your state of residence, you may have rights to access, correct, delete, or obtain a copy of your personal information, or to opt out of certain processing activities. Where heytruffle processes information on behalf of a restaurant Customer, that Customer may be responsible for responding to your request, and we will assist as required.",
      },
    ],
  },
  {
    number: "11",
    title: "How to Exercise Privacy Rights",
    blocks: [
      {
        type: "p",
        text: "To submit a privacy request, email info@heytruffle.ai and include your name, the phone number or email associated with the interaction (if applicable), your state of residence, and the nature of your request. We may need to verify your identity before responding.",
      },
    ],
  },
  {
    number: "12",
    title: "Do Not Track / Global Privacy Control",
    blocks: [
      {
        type: "p",
        text: 'Our Services do not currently respond to "Do Not Track" signals. Where required by law, we will honor legally recognized opt-out preference signals, such as the Global Privacy Control (GPC), to the extent applicable.',
      },
    ],
  },
  {
    number: "13",
    title: "International Processing",
    blocks: [
      {
        type: "p",
        text: "heytruffle is U.S.-based. Our service providers may process information in the United States or other jurisdictions. By using the Services, you understand that information may be processed outside your state of residence.",
      },
    ],
  },
  {
    number: "14",
    title: "Changes to This Policy",
    blocks: [
      {
        type: "p",
        text: 'We may update this Privacy Policy from time to time. Material changes will be reflected by updating the "Last Updated" date and posting the revised policy.',
      },
    ],
  },
  {
    number: "15",
    title: "Contact Us",
    blocks: [
      {
        type: "p",
        text: "HeyTruffle — a Resto Experience company. If you have questions about this Privacy Policy, reach us at:",
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

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      titleAccent="Policy."
      intro="How we collect, use, and protect information when you interact with heytruffle's AI-powered voice and messaging services."
      updated="Last updated · July 13, 2026"
      preamble={PREAMBLE}
      sections={SECTIONS}
    />
  );
}
