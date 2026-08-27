export type Faq = {
  id: string;
  question: string;
  /** Real 2-4 sentence answer — no blog copy embedded mid-sentence. */
  answer: string;
  /** Optional further-reading link, rendered as a separate "Read more". */
  readMore?: {
    label: string;
    /** Blog post slug — resolves to /blog/{slug}. */
    blogSlug: string;
  };
};

export const FAQS: readonly Faq[] = [
  {
    id: "features-to-look-for",
    question: "What features should I look for in a restaurant voice assistant?",
    answer:
      "Look for 24/7 availability, real integration with the POS and reservation systems you already run, and human oversight that reviews real calls and keeps improving the AI. heytruffle also answers in English and Spanish out of the box, so language never becomes the reason a call gets missed.",
    readMore: { label: "What are AI voice hosts", blogSlug: "what-are-ai-voice-hosts" },
  },
  {
    id: "simultaneous-orders",
    question: "How does voice AI handle multiple orders simultaneously?",
    answer:
      "Because heytruffle runs on cloud infrastructure instead of a single phone line, it can answer as many calls as come in at once — there's no busy signal. Each caller gets their own instance of the AI, so a rush of orders doesn't mean anyone gets put on hold.",
    readMore: {
      label: "Stop losing customers to missed calls",
      blogSlug: "stop-losing-customers-to-missed-calls",
    },
  },
  {
    id: "save-staff-time",
    question: "How can voice AI save time for my restaurant staff?",
    answer:
      "heytruffle takes routine calls — reservations, hours, menu questions, order status — off your team's plate so they can stay on the floor instead of the phone. Only conversations that genuinely need a person get escalated, and our team reviews call transcripts weekly to keep that handoff sharp.",
    readMore: {
      label: "How AI helps restaurant staff reduce workload and improve service",
      blogSlug: "how-ai-helps-restaurant-staff-reduce-workload-and-improve-service",
    },
  },
  {
    id: "essential-integrations",
    question: "What are the essential integrations for restaurant voice AI?",
    answer:
      "The integrations that matter most are your POS (Toast, Clover, Square and others), your reservation system (Resy, OpenTable, SevenRooms) and your ordering channels (Grubhub, DoorDash, Olo and more). heytruffle connects to all of these so a call turns into a synced order or booking, not just a note for a staff member to re-enter later.",
    readMore: {
      label: "Restaurant phone answering and ordering systems",
      blogSlug: "restaurant-phone-answering-ordering-system",
    },
  },
  {
    id: "measure-roi",
    question: "How can I measure the ROI of voice AI in my restaurant?",
    answer:
      "ROI comes down to three numbers: fewer missed calls, more of those calls converting into a booked table or a placed order, and hours of staff time freed from the phone. Our case studies track this directly — Rreal Tacos, for example, handles 19K+ calls a month with roughly 520 host hours back on the floor.",
    readMore: {
      label: "How restaurants can measure the real ROI of AI voice assistants",
      blogSlug: "how-restaurants-can-measure-the-real-roi-of-ai-voice-assistants",
    },
  },
  {
    id: "dining-experience",
    question:
      "How can an automated assistant improve the customer dining experience?",
    answer:
      "A guest who calls and immediately gets a reservation confirmed, a question answered, or an order taken has a smoother experience before they ever walk in. There's no hold music, no voicemail and no calling back later — heytruffle picks up on the first ring, every time.",
    readMore: {
      label: "Customer service in restaurants: strategies for a memorable dining experience",
      blogSlug:
        "customer-service-in-restaurants-strategies-for-a-memorable-dining-experience",
    },
  },
  {
    id: "convert-reservations",
    question:
      "Can AI tools help my restaurant convert inquiries into confirmed reservations?",
    answer:
      "Yes — heytruffle checks your live availability during the call and books directly into your reservation system, so an inquiry becomes a confirmed table without a staff member following up later. It also handles waitlist and cancellation-policy questions on the same call.",
    readMore: {
      label: "AI reservations for restaurants",
      blogSlug: "ai-reservations-for-restaurants",
    },
  },
  {
    id: "multi-unit-scaling",
    question:
      "What is the best voice AI solution for scalable deployment across multi-unit chains?",
    answer:
      "Every location gets its own AI host trained on that location's specific menu, hours and policies, so the experience stays consistent whether you run 3 locations or 30. Our team monitors calls and tunes each host weekly, which scales the same way regardless of how many units you add.",
    readMore: {
      label: "heytruffle AI vs. competitors: the best AI voice assistant for restaurants",
      blogSlug:
        "heytruffle-ai-vs-competitors-the-best-ai-voice-assistant-for-restaurants",
    },
  },
  {
    id: "menu-and-togo",
    question:
      "How does voice AI adapt to different restaurant menus and to-go orders?",
    answer:
      "The AI is custom-trained on your specific menu, including sizes, modifiers and daily specials, so it takes a real order instead of a generic one. To-go orders go directly into your POS, the same as an order taken at the counter, so your kitchen sees one ticket queue instead of two.",
    readMore: {
      label: "AI voice ordering for restaurants: boosting speed and efficiency",
      blogSlug: "ai-voice-ordering-for-restaurants-boosting-speed-and-efficiency",
    },
  },
  {
    id: "order-speed-accuracy",
    question: "How can AI improve order-taking speed and accuracy?",
    answer:
      "Because the AI pulls your live menu and POS data during the call, it captures modifiers, allergies and substitutions exactly as the guest says them — no mishearing, no rushed handwriting. Orders reach the kitchen the same way every time, which is what actually drives the accuracy gain, not just the speed.",
    readMore: {
      label: "Restaurant operations powered by AI",
      blogSlug: "restaurant-operations-powered-by-ai",
    },
  },
];
