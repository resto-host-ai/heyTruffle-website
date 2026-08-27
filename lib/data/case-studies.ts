/** Plain data, deliberately NOT in a "use client" file — importing a named
 *  value export (not the default component) from a "use client" module into
 *  a Server Component resolved as undefined under Next's RSC bundling here,
 *  which is exactly the bug that broke CaseStudiesMarquee (a server
 *  component) importing CASES from CaseStudiesList.tsx. Both now import
 *  from here instead. */

export type CaseCard = {
  name: string;
  /** Headline number, always paired with `statLabel` so it never reads as a
   *  bare figure ("19K+ calls answered", not "19k+"). Values come from each
   *  study's own hero/measured numbers — keep them in sync with
   *  content/case-studies/<slug>.ts. */
  stat: string;
  statLabel: string;
  /** Real photo of the restaurant (dining room when available). */
  image: string;
  cuisine: string;
  location: string;
  operational: string;
  /** Number of locations (display badge). */
  locations: string;
  /** Detail-page slug (omit while the page doesn't exist yet). */
  slug?: string;
};

export const CASES: CaseCard[] = [
  {
    name: "Rreal Tacos",
    stat: "19K+",
    statLabel: "calls handled",
    image: "/images/case-rreal.webp",
    slug: "rreal-tacos",
    location: "Atlanta",
    operational: "Reservations",
    cuisine: "Mexican",
    locations: "12",
  },
  {
    name: "Aplós",
    stat: "3.2K+",
    statLabel: "calls handled",
    image: "/images/case-covers/aplos.webp",
    slug: "aplos",
    location: "Mississippi",
    operational: "Phone Orders",
    cuisine: "Mediterranean",
    locations: "4",
  },
  {
    name: "Baires Grill",
    stat: "7.5K+",
    statLabel: "calls handled",
    image: "/images/case-baires.webp",
    slug: "baires-grill",
    location: "Miami",
    operational: "Reservations",
    cuisine: "Steakhouse",
    locations: "9",
  },
  {
    name: "Mango's",
    stat: "2.2K+",
    statLabel: "calls handled",
    image: "/images/case-covers/mangos.webp",
    slug: "mangos-tropical-cafe",
    location: "Orlando",
    operational: "Reservations",
    cuisine: "Latin/Caribbean",
    locations: "1",
  },
  {
    name: "Kyochon",
    stat: "1.1K+",
    statLabel: "calls handled",
    image: "/images/case-covers/kyochon.webp",
    slug: "kyochon",
    location: "LA",
    operational: "Phone Orders",
    cuisine: "Korean Chicken",
    locations: "2",
  },
  {
    name: "Chelsea Corner",
    stat: "2.2K+",
    statLabel: "calls handled",
    image: "/images/case-covers/chelsea-corner.webp",
    slug: "chelsea-corner",
    location: "Dallas",
    operational: "Reservations",
    cuisine: "American",
    locations: "1",
  },
  {
    name: "La Cañita",
    stat: "884",
    statLabel: "calls handled",
    image: "/images/case-covers/la-canita.webp",
    slug: "la-canita",
    location: "Miami",
    operational: "Reservations",
    cuisine: "Cuban",
    locations: "2",
  },
  {
    name: "Rumba Cubana",
    stat: "4K+",
    statLabel: "calls handled",
    image: "/images/case-covers/rumba-cubana.webp",
    slug: "rumba-cubana",
    location: "New Jersey",
    operational: "Reservations",
    cuisine: "Cuban",
    locations: "6",
  },
  {
    name: "KYU",
    stat: "1.9K+",
    statLabel: "calls handled",
    image: "/images/case-covers/kyu.webp",
    slug: "kyu",
    location: "Miami",
    operational: "Reservations",
    cuisine: "Pan-Asian",
    locations: "3",
  },
];
