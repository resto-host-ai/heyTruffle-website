/**
 * Voice host data — the 4 personalities from the RestoHost voice demo,
 * restyled for heytruffle. Conversation lines carry REAL audio timestamps
 * (start/end in seconds) derived from Whisper transcription of the mp3s in
 * /public/audio/. The transcript reveal + karaoke sync uses them directly.
 */

export type ConversationLine = {
  who: "host" | "caller";
  text: string;
  /** Audio time (seconds) at which this line BEGINS being spoken */
  start: number;
  /** Audio time (seconds) at which this line ENDS */
  end: number;
};

export type Host = {
  id: "jeff" | "nacho" | "margarita" | "mary";
  name: string;
  /** Flower avatar under /public/images */
  image: string;
  color: string;
  /** Two lines shown under the name in the grid */
  desc: [string, string];
  /** Subtitle lines under the name in the player sidebar */
  title: string[];
  deployedAt: string;
  voice: string;
  languages: string[];
  outcome: string[];
  /** Call metadata shown under the outcome, e.g. "Fri · 8:42 PM · +1 (404) 555-0142" */
  callMeta: string;
  audio: string;
  durationLabel: string;
  /** Karaoke timing nudge in seconds — positive lights up words EARLIER than
   * the char-proportional default. Use for hosts whose Whisper segment
   * boundaries trail the actual end of speech (slow / deliberate speakers). */
  karaokeBias?: number;
  conversation: ConversationLine[];
};

export const HOSTS: Host[] = [
  {
    id: "jeff",
    name: "Jeff",
    image: "/images/jeff.svg",
    color: "#251f21",
    desc: ["Crisp, polished,", "late-night ready"],
    title: ["Polished maître d'"],
    deployedAt: "Prime Cut Steakhouse",
    voice: "Crisp, polished, late-night ready",
    languages: ["English"],
    outcome: ["Resolved", "Pickup", "Private dining inquiry"],
    callMeta: "Wed · 11:08 PM · +1 (212) 555-0199",
    audio: "/audio/jeff.mp3",
    durationLabel: "1:52",
    // Jeff is deliberate / slow — his Whisper segment ends trail the actual
    // end of words by ~0.4s. Bump karaoke earlier to compensate.
    karaokeBias: 0.4,
    conversation: [
      { who: "host",   start:   0.00, end:   6.56, text: "Good evening. Thank you for calling Prime Cut Steakhouse. This is Jeff speaking. How may I assist you tonight?" },
      { who: "caller", start:   6.56, end:  16.56, text: "Good evening. This is Emma speaking. It's getting a bit late and we didn't have a chance to dine earlier. Could we still place a pickup order if the kitchen is open?" },
      { who: "host",   start:  16.56, end:  24.72, text: "Certainly, Emma. We are open until midnight and the kitchen accepts orders until 11:30 PM. So you still have about 20 minutes." },
      { who: "caller", start:  24.72, end:  31.92, text: "Oh, that's wonderful. The kitchen is still open at this hour. Prime Cut is definitely my favorite steakhouse." },
      { who: "host",   start:  31.92, end:  38.64, text: "Thank you. That's very kind. I can text you our Toast link for pickup so you can place your order right away. Does that work?" },
      { who: "caller", start:  38.64, end:  52.80, text: "That works perfectly. Thanks. I'll place the order as soon as I get the link. By the way, I want to do a birthday dinner in a pretty big private room you have in the back. Would that be available next week? I'm looking to host a small event." },
      { who: "host",   start:  52.80, end:  64.00, text: "Absolutely. Our private dining room seats up to 30 guests. I'll record your request and have one of our managers contact you shortly to discuss menus, decor and all the details. Does that sound good?" },
      { who: "caller", start:  64.00, end:  71.80, text: "Wonderful. I'd also like to surprise the guests of honor. Do you sell gift cards?" },
      { who: "host",   start:  71.80, end:  84.00, text: "Certainly. Our gift cards are fully digital, never expire and you may choose any amount between five and $500, adding a personal message if you wish. I'll include the purchase link with the room information." },
      { who: "caller", start:  84.00, end:  92.64, text: "Great. I've just received the link, so I'll go ahead and place my order now. Is there any parking available for pickup?" },
      { who: "host",   start:  92.64, end: 102.64, text: "There's a private lot half a block from the restaurant and for pickups, we reserve a few spaces right in front with a 15 minute limit. Plenty of time to collect your order comfortably." },
      { who: "caller", start: 102.64, end: 107.92, text: "Excellent. You've covered everything. Thanks for all the help, Jeff." },
      { who: "host",   start: 107.92, end: 113.52, text: "My pleasure, Emma. We look forward to serving you. Have a wonderful evening." },
    ],
  },
  {
    id: "nacho",
    name: "Nacho",
    image: "/images/nacho.svg",
    color: "#ef7200",
    desc: ["Warm, energetic,", "knows the menu cold"],
    title: ["Bilingual", "Switches ES↔EN naturally"],
    deployedAt: "Rreal Tacos",
    voice: "Warm, energetic, knows the menu cold",
    languages: ["English", "Spanish"],
    outcome: ["Resolved", "Reservation", "Bilingual menu help"],
    callMeta: "Tue · 12:42 PM · +1 (404) 555-0188",
    audio: "/audio/nacho.mp3",
    durationLabel: "1:20",
    conversation: [
      { who: "host",   start:  0.00, end:  4.72, text: "Hi, thanks for calling Rreal Tacos. This is Nacho. How can I help you today?" },
      { who: "caller", start:  4.72, end:  7.52, text: "Hi, I'd like to make a reservation if it's okay." },
      { who: "host",   start:  7.52, end: 11.52, text: "Sure thing. For what day and time were you thinking of coming in?" },
      { who: "caller", start: 11.52, end: 19.60, text: "Monday around 7 PM. We'll probably be five people — three adults and two kids. And do you have high chairs for babies?" },
      { who: "host",   start: 19.60, end: 24.00, text: "Yes, absolutely. We've got you covered. May I have a name for the booking?" },
      { who: "caller", start: 24.00, end: 25.92, text: "Yes, it's Michelle." },
      { who: "host",   start: 26.88, end: 36.16, text: "Great, Michelle. So five guests, Monday at 7, one high chair, locked in. I'm texting you a confirmation link right now so you'll have all the details. Is that okay?" },
      { who: "caller", start: 36.16, end: 40.32, text: "Sounds good. And Nacho, ¿me suena que eres Latino también?" },
      { who: "host",   start: 40.32, end: 44.64, text: "Claro que sí. ¿Necesitas algo más? ¿En qué te puedo ayudar?" },
      { who: "caller", start: 44.64, end: 48.56, text: "Sí, quería saber si tienen algunas opciones vegetarianas para mí." },
      { who: "host",   start: 48.56, end: 68.64, text: "Claro. Tenemos opciones vegetarianas súper sabrosas. Te puedo recomendar uno de mis platos preferidos: el veggie taco — lleva morrón, batata, choclo, cebolla y chimichurri. También podemos armarte un burrito bowl lleno de verduras." },
      { who: "caller", start: 68.64, end: 72.40, text: "Dale, buenísimo. Muchísimas gracias por tu ayuda, Nacho." },
      { who: "host",   start: 72.40, end: 80.08, text: "Un placer, Michelle. Te envío el link del menú para que puedas ver todas nuestras opciones. Nos vemos el lunes a las siete." },
    ],
  },
  {
    id: "margarita",
    name: "Margarita",
    image: "/images/margarita.svg",
    color: "#c0559e",
    desc: ["Cheerful, anticipatory,", "party energy"],
    title: ["Bubbly bilingual host"],
    deployedAt: "Luna's Bistro",
    voice: "Cheerful, anticipatory, party energy",
    languages: ["English", "Spanish"],
    outcome: ["Resolved", "Info shared", "Catering inquiry forwarded"],
    callMeta: "Thu · 6:35 PM · +1 (305) 555-0166",
    audio: "/audio/margarita.mp3",
    durationLabel: "1:48",
    conversation: [
      { who: "host",   start:   0.00, end:   4.64, text: "Hi, thanks for calling Luna's Bistro. This is Margarita. How can I help you tonight?" },
      { who: "caller", start:   4.64, end:  12.50, text: "Hey, I'm in town for a few days and a friend said you've got great live music. What's going on this week?" },
      { who: "host",   start:  12.50, end:  23.36, text: "Absolutely. We host live bands every evening and a DJ on Saturdays until 1:30 AM. I can text you the full schedule so you can pick the vibe you like. Sound good?" },
      { who: "caller", start:  23.36, end:  27.60, text: "Yes, please. What kind of music do you usually have?" },
      { who: "host",   start:  29.04, end:  36.32, text: "Mostly upbeat Latin — salsa, Cuban jazz, flamenco — and we sprinkle in the occasional reggaeton set. Always a party." },
      { who: "caller", start:  36.32, end:  41.60, text: "Oh, I love it. I'll need a drink before I hit the dance floor. Do you have a happy hour?" },
      { who: "host",   start:  41.60, end:  53.44, text: "We do. Monday through Thursday, 4 to 6 PM with 2-for-1 tapas and drink specials. I'll text the drinks menu right along with the music lineup." },
      { who: "caller", start:  54.48, end:  58.80, text: "You're awesome. By the way, what's the house specialty at the bar?" },
      { who: "host",   start:  58.80, end:  74.32, text: "You can't miss our signature Luna Margarita. It's Reposado tequila, fresh squeezed lime, agave, a splash of blood orange purée and a Tajín rim. No pre-mix, just pure ingredients. If you like a little kick, we muddle fresh jalapeño too." },
      { who: "caller", start:  74.32, end:  82.88, text: "That sounds amazing. One more thing — we might bring a group of 20 for a birthday next month. Do you handle catering or private events?" },
      { who: "host",   start:  84.24, end:  98.00, text: "Totally. We offer catering platters, live paella stations and full bar setups. If you'd like specifics, I can send a link to our events page. There you can drop your info and see photos from past parties. Your guests will adore it." },
      { who: "caller", start:  98.00, end: 102.32, text: "Awesome. That's exactly what we need. Thank you for all the information." },
      { who: "host",   start: 102.32, end: 108.08, text: "My pleasure. We can't wait to welcome you. Thanks for calling and see you soon." },
    ],
  },
  {
    id: "mary",
    name: "Mary",
    image: "/images/mary.svg",
    color: "#3773d7",
    desc: ["Soft, welcoming,", "wine-savvy"],
    title: ["Refined multilingual host"],
    deployedAt: "Lima Nikkei",
    voice: "Soft, welcoming, wine-savvy",
    languages: ["English", "Spanish", "Japanese"],
    outcome: ["Resolved", "Wait time", "Table preference"],
    callMeta: "Fri · 8:42 PM · +1 (404) 555-0142",
    audio: "/audio/mary.mp3",
    durationLabel: "1:36",
    conversation: [
      { who: "host",   start:  0.00, end:  3.84, text: "Hi, thanks for calling Lima Nikkei. This is Mary. How can I help you today?" },
      { who: "caller", start:  3.84, end:  7.68, text: "Hi, I just wanted to check the current wait time for a table." },
      { who: "host",   start:  7.68, end: 12.88, text: "Great question. Let me take a quick look. Right now the dining wait is about 20 minutes." },
      { who: "caller", start: 12.88, end: 24.80, text: "Great. It's kind of a special night, so I wanted to ask, how is the seating inside? What spot would you recommend if we're looking for something a bit more private and romantic?" },
      { who: "host",   start: 24.80, end: 34.80, text: "Absolutely. If it's a special night, I'd book one of our little tables in the back corner. They're cozy, have soft lighting, and feel really private. You'll love the vibe." },
      { who: "caller", start: 34.80, end: 41.50, text: "Perfect. That sounds great. Is there any kind of dress code? We're coming from the theater, a bit formal." },
      { who: "host",   start: 41.50, end: 49.00, text: "Business casual or smarter is totally fine. Coming straight from the theater, you'll look great." },
      { who: "caller", start: 49.00, end: 55.50, text: "Got it. One last thing — we have a lovely 2014 Sauvignon Blanc in the car. Is it okay if we bring it in?" },
      { who: "host",   start: 55.50, end: 64.00, text: "Absolutely. We do have a $36 corkage fee per bottle that covers opening, service, and glassware." },
      { who: "caller", start: 64.00, end: 68.50, text: "Great, seems fair. Any pairing suggestion from the menu to go with that Sauvignon Blanc?" },
      { who: "host",   start: 68.50, end: 84.00, text: "With a crisp Sauvignon Blanc, I'd start you with our Nikkei sashimi — yellowtail, hamachi, citrus leche de tigre — and then the grilled octopus anticucho. Both really highlight the wine's acidity and minerality." },
      { who: "caller", start: 84.00, end: 90.00, text: "Yes, that is perfect. Thank you. We'll head over in about 20 minutes." },
      { who: "host",   start: 90.00, end: 95.92, text: "Fantastic. We'll be waiting for you. Safe drive — we'll have that back corner table and Sauvignon ready for you." },
    ],
  },
];
