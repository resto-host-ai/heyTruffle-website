export type Role = {
  id: string;
  name: string;
  vac: string;
  wide?: boolean;
  bullets: readonly string[];
  ident: string;
};

export const ROLES: readonly Role[] = [
  {
    id: "bdr",
    name: "Business Development Representative",
    vac: "3 openings",
    bullets: [
      "You're the commercial engine of the team. Nothing enters the pipeline without going through you.",
      "You own every lead that comes in through our generation channels and lead magnets, from first contact to booked meeting.",
      "You talk every day with restaurant owners and managers across the United States. Heavy on sales skill and tact: half the job is reading the person on the other end of the line.",
      "It's the role that teaches you to sell in this industry fastest, and next year's account managers and sales executives will come out of it.",
    ],
    ident:
      "If talking to strangers comes naturally to you, and you can take five no's to get to one yes, this is your place.",
  },
  {
    id: "am",
    name: "Account Manager, US Accounts",
    vac: "2 openings",
    bullets: [
      "You'll manage between 10 and 20 accounts: restaurant chains across the US and Latin America, whose teams will know you by name.",
      "It's a role built on communication before process. Empathy, understanding where each client is and what's really worrying them, often before they say it.",
      "The other half is analytical: you build, understand, and present the performance reports for your accounts, and you can defend what they say.",
      "You lead new feature requests together with the product team. You understand the pain point, translate it into something engineering can build, and see the rollout through.",
      "Over time you'll take full ownership: adjusting the assistants yourself, without depending on anyone else.",
    ],
    ident:
      "If you're expressive, good at reading people, and it bothers you when a number doesn't add up, that combination is rare and it's exactly what we're looking for.",
  },
  {
    id: "ae",
    name: "Sales Executive, US Market",
    vac: "2 openings",
    bullets: [
      "You're the closer. You take the meetings the team brings in and turn them into clients.",
      "You build the business case for each chain: how many calls they're losing today, what that's worth in dollars, and what changes with us.",
      "You negotiate in English with people who negotiate for a living. Price, integrations, and the legitimate fear of an AI talking to their customers.",
      "It's the role with the clearest number in the company, and uncapped variable pay. If you sell, it shows.",
    ],
    ident:
      "If you've already closed B2B deals and you like work that measures itself, you'll be comfortable here.",
  },
  {
    id: "gtm",
    name: "GTM Engineer",
    vac: "1 opening",
    bullets: [
      "You build the commercial machine: the lists, the sequences, the reports, and the experiments. Everything that gets the sales team hitting the right accounts with the right message.",
      "We're looking for someone with B2B experience who wants to experiment. We have no limits on what we're willing to try.",
      "Creativity and data in the same person. You come up with something unusual, build it in two days, measure it, and kill it without drama if it doesn't work.",
      "It's a technical role that lives inside the commercial team. You'll see the effect of what you build on the pipeline the same week.",
    ],
    ident:
      "If you're the type who automates anything you'd hate doing twice, and you also want to understand why people buy and why they don't, you'll enjoy this role.",
  },
  {
    id: "design",
    name: "AI Designer",
    vac: "1 opening",
    bullets: [
      "You're joining HeyTruffle's design team. We want someone who takes ownership of the AI tools for content: editing, images, and video.",
      "You produce with AI the volume that would have taken a team of three two years ago: landing pages, campaign creative, short video, sales material, brand assets.",
      "We're looking for judgment before tools. AI accelerates someone with an eye and exposes someone without one.",
      "You'll defend design decisions, even against the CEO. You're expected to.",
    ],
    ident:
      "If you have a portfolio, opinions of your own, and you already use generative tools every day without it showing in the output, we want to see your work.",
  },
  {
    id: "swe",
    name: "Software Engineer",
    vac: "1 opening",
    bullets: [
      "You'll build our integrations with the biggest platforms in restaurant tech: UberEats, OpenTable, Toast, and the POS system of every chain that comes on board.",
      "You're joining an engineering team with real production experience, you won't be building this alone. What gets built now gets built with several seasoned perspectives in the room.",
      "An offensive mindset: we ship three to four features a quarter. We value speed and actually understanding the code, not just having it work by accident.",
      "We need people comfortable using AI coding tools every day, with real cloud expertise.",
      "We value engineers who understand how LLMs actually work under the hood and who've already built a product from scratch. Almost everything is still left to build, and we're looking for a leader's mindset to build it.",
    ],
    ident:
      "If you want to be part of a high-performing engineering team shipping features and writing code all day, this is your place.",
  },
  {
    id: "seo",
    name: "SEO & Brand Positioning",
    vac: "1 opening",
    bullets: [
      "Our problem is that almost nobody in the United States knows this category exists yet. You're going to name it, with strong brand positioning, the way you've already done somewhere else.",
      "B2B marketing, not B2C: you understand how to sell something expensive and technical to someone busy, and you can get into the technical details of the product to properly research the market and the category.",
      "It's the one channel that compounds: what you write this month keeps bringing in clients two years from now. Everything else stops the day you stop pushing it.",
      "Technical SEO and writing in the same person, for the US market.",
      "And you use AI for all of it: market research, positioning, content generation at a volume that used to take an entire team.",
    ],
    ident:
      "If you've already built strong brand positioning in the United States, you know how to read a Search Console, and you care about how what you publish looks, this role is entirely yours.",
  },
  {
    id: "fde",
    name: "Forward Deployed Engineer",
    vac: "1 opening",
    bullets: [
      "You sit between our clients and the product. You listen to real conversations between the agents and the callers, and find where the experience breaks.",
      "In practice, you're a prompt engineer: you understand exactly how prompting works across different LLMs, and you use advanced tools and guardrails to get it into production, not just a playground.",
      "You need real skill communicating with clients: you'll be on the call explaining something technical in plain terms, every week.",
      "You build your own MVPs and iterate fast: you test a hypothesis with a real client instead of waiting for product to schedule it.",
      "The requests from the biggest clients, the ones that don't fit the roadmap but still need solving, are yours.",
      "If you've worked in food service, that counts for a lot. Understanding what's happening on the floor on a busy night completely changes how you solve this.",
    ],
    ident:
      "You're half prompt engineer, half the face of the product to the client: as comfortable tuning a prompt as explaining it to someone who has no idea what an LLM is.",
  },
  {
    id: "talent",
    name: "Talent Acquisition Partner",
    vac: "1 opening",
    bullets: [
      "You'll build the team that builds everything else. It's the hire that makes every other hire possible.",
      "And you'll be our face out in the world: events, job fairs, universities, technical communities. Right now nobody knows us in the Argentine talent market, and you're the one who changes that.",
      "True full cycle: you define the role with the hiring manager before posting it, you source, you interview, and you close.",
      "You'll be able to tell a department head that their search is poorly defined. More than able: you're expected to.",
    ],
    ident:
      "If you love the craft of finding people, and you're also comfortable standing up and speaking to a room full of strangers, those are the two halves of this role.",
  },
  {
    id: "open",
    name: "Don't see your role here",
    vac: "always open",
    wide: true,
    bullets: [
      "If none of the nine roles above is yours, but you still think you could change something here, this is your position.",
      "This isn't a resume dump. If someone exceptional shows up for a function we don't have today, we create the role.",
      "Real example: we're not looking for a Head of Finance. If one writes to us and makes the case, we'll interview them and build the role.",
      "You'll talk to Lucas, the founder, even if the role doesn't exist today. And if it's not the right moment, we'll give you an actual date to talk again.",
    ],
    ident:
      "If you're clearly excellent at something hard to categorize, or you come from another industry and see something here that we don't, write to us.",
  },
];

export type Field =
  | {
      k: string;
      label: string;
      type: "text" | "email" | "tel";
      ph?: string;
      req?: boolean;
      opt?: boolean;
      note?: string;
    }
  | {
      k: string;
      label: string;
      type: "select";
      options: readonly string[];
      req?: boolean;
      opt?: boolean;
      note?: string;
    };

export type Step =
  | { type: "intro" }
  | {
      type: "fields";
      eyebrow?: string;
      title: string;
      sub?: string;
      fields: readonly Field[];
    }
  | {
      type: "choice";
      eyebrow: string;
      k: string;
      title: string;
      sub?: string;
      opts: readonly { t: string; s?: string }[];
    }
  | {
      type: "line";
      eyebrow: string;
      k: string;
      max: number;
      min: number;
      title: string;
      sub?: string;
      ph?: string;
    }
  | {
      type: "roles";
      eyebrow: string;
      k: string;
      max: number;
      title: string;
      sub?: string;
    }
  | {
      type: "text";
      eyebrow: string;
      k: string;
      min: number;
      cls?: "one" | "mid" | "big";
      title: string;
      sub?: string;
      warn?: string;
      ph?: string;
    }
  | { type: "result" };

export const STEPS: readonly Step[] = [
  { type: "intro" },

  {
    type: "fields",
    eyebrow: "1 of 9",
    title: "Let's start with the basics",
    sub: "None of this leaves the team.",
    fields: [
      { k: "fullName", label: "Full name", type: "text", req: true },
      { k: "email", label: "Email", type: "email", req: true },
      { k: "phone", label: "Phone", type: "tel", ph: "+54 9 11 ... or +1 555 ...", req: true },
    ],
  },

  {
    type: "choice",
    eyebrow: "2 of 9",
    k: "seniority",
    title: "Where are you in your career?",
    sub: "Answer based on real years of experience, not whatever title you were given.",
    opts: [
      { t: "Junior", s: "0 to 2 years of experience." },
      { t: "Semi-senior", s: "3 to 5 years." },
      { t: "Senior", s: "More than 5 years." },
      { t: "Leadership roles", s: "I've led teams or departments." },
    ],
  },

  {
    type: "line",
    eyebrow: "3 of 9",
    k: "strongestSkill",
    max: 140,
    min: 15,
    title: "In one line: what's your strongest skill?",
    sub: "The one you'd say first, without downplaying it.",
    ph: "E.g.: I get people who don't want to take my call to listen anyway.",
  },

  {
    type: "roles",
    eyebrow: "4 of 9",
    k: "interestedRoles",
    max: 3,
    title: "Which ones interest you?",
    sub: "Click any of them to read again what the role means. Pick up to three with the circle on the left.",
  },

  {
    type: "text",
    eyebrow: "5 of 9",
    k: "aiExperience",
    cls: "big",
    min: 50,
    title: "What have you built with AI?",
    sub: "Not which tools you use: what you built, and what changed because you built it.",
    warn: "No fluff. Whoever reads this will spot it in a second, because we use these tools all day ourselves. And if you haven't built anything yet, tell us why: that answer is useful too and doesn't rule anyone out.",
    ph: "What you built, with what, and what changed. If something failed, tell us that too. If you haven't built anything, tell us why.",
  },

  {
    type: "text",
    eyebrow: "6 of 9",
    k: "startupExperience",
    cls: "mid",
    min: 30,
    title: "Have you worked at a startup?",
    sub: "If yes, tell us a bit: how many people, what you ended up doing that wasn't in your job description. If not, tell us what you imagine it's like.",
    ph: "Two or three lines.",
  },

  {
    type: "text",
    eyebrow: "7 of 9",
    k: "likesDislikes",
    cls: "mid",
    min: 40,
    title: "Of the places you've worked: what did you like, and what didn't you?",
    sub: "Both. The second one tells us more than the first, so don't sugarcoat it.",
    ph: "What made you stay, and what made you leave or want to.",
  },

  {
    type: "choice",
    eyebrow: "8 of 9",
    k: "englishLevel",
    title:
      "English: a 45-minute Zoom with an American COO who talks fast and interrupts you.",
    sub: "Be honest. Some of the roles need this and some don't, so overstating it here only wastes your time.",
    opts: [
      { t: "I run the meeting, no second thoughts." },
      { t: "I hold my own. I might miss a nuance, but it doesn't fall apart." },
      { t: "I understand everything but struggle to speak fluently." },
      { t: "I'm not there yet." },
    ],
  },

  {
    type: "fields",
    eyebrow: "9 of 9",
    title: "Last few details",
    sub: "Your resume is optional. If you'd rather just leave us your LinkedIn, that's enough.",
    fields: [
      {
        k: "studies",
        label: "Where are you at with your studies?",
        type: "select",
        note: "Junior roles are for people who've already graduated, or who are in their last semester. If you have more than that left, write to us when you're finishing up and we'll keep you in mind.",
        options: [
          "I've already graduated",
          "I'm in my last semester",
          "I still have more than a semester left",
          "I didn't do a university degree",
        ],
      },
      {
        k: "degree",
        label: "Degree and university",
        opt: true,
        type: "text",
        ph: "E.g.: Industrial Engineering, ITBA",
      },
      {
        k: "officeAvailability",
        label: "The office is in Béccar, in the northern part of Buenos Aires.",
        type: "select",
        note: "Two days a week in the office is required. If that doesn't work for you right now, we'd rather tell you upfront than in your fourth interview.",
        options: [
          "I live nearby, not a problem",
          "It's convenient for me, two days a week isn't a problem",
          "It's far, but I can make it two days a week",
          "I can't make it two days a week",
        ],
      },
      { k: "linkedin", label: "LinkedIn", type: "text", ph: "linkedin.com/in/...", req: true },
      {
        k: "resumeUrl",
        label: "Link to your resume or portfolio (Drive, Notion, PDF, Behance)",
        opt: true,
        type: "text",
      },
      {
        k: "howFound",
        label: "How did you find us?",
        type: "select",
        options: [
          "Someone forwarded it to me on WhatsApp",
          "LinkedIn",
          "A friend or someone on the team",
          "Instagram",
          "Telegram",
          "My university's job board",
          "Get on Board or another job board",
          "Other",
        ],
      },
      {
        k: "referredBy",
        label: "If someone on the team sent it to you, who?",
        opt: true,
        type: "text",
      },
    ],
  },

  { type: "result" },
];
