/**
 * Input validation for the careers form. Two concerns, kept separate:
 *
 * 1. Shape — a name field should only contain what a name can contain, a
 *    phone field only what a phone number can contain, etc. Rejects the
 *    field, doesn't just clean it, so someone typing garbage gets told why
 *    instead of having it silently mangled.
 * 2. Safety — every text value gets HTML-angle-bracket and control
 *    characters stripped before it ever reaches state, closing the
 *    injection vector at the source rather than trying to sanitize/escape
 *    it later (this data ends up in a spreadsheet and a ClickUp task, both
 *    of which render it as rich text somewhere downstream).
 */

/** Strips `<`/`>` and control characters (keeping tab/newline/carriage
 *  return) from any text value on the way into state. Walks code points
 *  instead of using a regex with hex escapes for control-character ranges —
 *  those are easy to mistranscribe into literal control bytes, which is
 *  exactly the kind of thing this function exists to strip. */
export function sanitizeText(raw: string): string {
  let out = "";
  for (const ch of raw) {
    const code = ch.codePointAt(0) ?? 0;
    if (code === 9 || code === 10 || code === 13) {
      out += ch; // tab, LF, CR — allowed
      continue;
    }
    if (code < 32 || code === 127) continue; // other control characters
    if (ch === "<" || ch === ">") continue;
    out += ch;
  }
  return out;
}

const NAME_PATTERN = /^[\p{L}][\p{L}\p{M}'’.\-\s]{1,79}$/u;

/** Ratio of *distinct* letters to total letters, case-insensitive. Real
 *  names repeat letters ("Anna", "Mississippi") but still draw from a
 *  reasonably varied set; keyboard-mashing ("akakakkkakakaka") cycles two
 *  or three keys over and over and reads very differently by this measure. */
function letterDiversityRatio(value: string): number {
  const letters = (value.toLowerCase().match(/\p{L}/gu) || []) as string[];
  if (letters.length === 0) return 0;
  return new Set(letters).size / letters.length;
}

/** Letters (any script, incl. accents), spaces, hyphens, apostrophes and
 *  periods only — no digits, no symbols — plus a diversity check so
 *  keyboard-mashing doesn't slip through just because it's letters-only.
 *  2-80 characters. */
export function isValidName(value: string): boolean {
  const v = value.trim();
  if (!NAME_PATTERN.test(v) || /\d/.test(v)) return false;
  return letterDiversityRatio(v) >= 0.35;
}

// Deliberately not exhaustive — this blocks the disposable/throwaway
// providers people actually use to dodge a signup, not every possible one.
// The goal is filtering obvious junk, not building a live reputation
// service.
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "10minutemail.com",
  "10minutemail.net",
  "temp-mail.org",
  "tempmail.com",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "sharklasers.com",
  "throwawaymail.com",
  "maildrop.cc",
  "fakeinbox.com",
  "mailnesia.com",
  "dispostable.com",
  "mintemail.com",
  "moakt.com",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Common gTLDs plus the ccTLDs for countries this hiring effort actually
// spans (US and broad Latin America, per the role descriptions) — not
// exhaustive, but enough to catch an invented TLD like ".asd" without
// needing a live registry lookup. A real applicant from an uncovered
// country writes to us and we add their TLD; that's a one-line fix.
const VALID_TLDS = new Set([
  "com", "net", "org", "edu", "gov", "mil", "int",
  "io", "co", "ai", "app", "dev", "tech", "info", "biz", "me", "us",
  "ar", "mx", "br", "cl", "pe", "uy", "py", "bo", "ve", "ec", "cr",
  "pa", "do", "gt", "hn", "sv", "ni",
  "uk", "ca", "de", "fr", "es", "it", "nl", "pt", "se", "no", "dk", "fi",
  "pl", "ie", "ch", "at", "be",
  "cn", "jp", "kr", "in", "au", "nz", "za", "il", "ru",
]);

/** Valid email shape, a real (allowlisted) top-level domain, and not a known
 *  disposable/temporary provider — "prestadores validados" means real,
 *  reachable inboxes, not a made-up domain or a 10-minute throwaway used to
 *  get past the form. */
export function isValidEmail(value: string): boolean {
  const v = value.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(v)) return false;
  const domain = v.split("@")[1];
  if (!domain || DISPOSABLE_EMAIL_DOMAINS.has(domain)) return false;
  const tld = domain.split(".").pop() || "";
  return VALID_TLDS.has(tld);
}

/** International phone numbers: digits with an optional leading +, and
 *  spaces/dashes/dots/parentheses as separators only (no letters, no other
 *  symbols). 7-15 digits covers every real national number length (E.164's
 *  own ceiling is 15). Doesn't validate against a specific country — the
 *  whole point is these can be from anywhere. */
export function isValidPhone(value: string): boolean {
  const v = value.trim();
  if (!/^\+?[0-9\s().-]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return false;
  if (/^(\d)\1+$/.test(digits)) return false; // one digit repeated ("1111111111")
  // A simple run of consecutive ascending or descending digits
  // ("1234567890", "9876543210") isn't a real number either.
  const ascending = "01234567890123456789";
  const descending = "98765432109876543210";
  if (ascending.includes(digits) || descending.includes(digits)) return false;
  return true;
}

/** Loose on purpose: a bare handle ("jane-smith-123") is as valid as a full
 *  URL, since that's genuinely what people paste here. Just needs to look
 *  like it's actually pointing at LinkedIn, not be empty junk. */
export function isValidLinkedIn(value: string): boolean {
  const v = value.trim().toLowerCase();
  if (v.length < 3) return false;
  if (v.includes(" ")) return false;
  return v.includes("linkedin.com/") || /^[a-z0-9-]{3,}$/.test(v);
}

/** Generic "is this actually prose, not garbage" check for the open-ended
 *  text/textarea answers — not aiming to judge quality, just to reject the
 *  obvious non-answers (all-caps key mashing, a single repeated character,
 *  a wall of digits/symbols where a sentence should be). */
export function isPlausibleFreeText(value: string, min: number): boolean {
  const v = value.trim();
  if (v.length < min) return false;
  if (/^(.)\1+$/.test(v)) return false; // one character repeated
  const letters = (v.match(/\p{L}/gu) || []).length;
  if (letters / v.length < 0.4) return false; // at least 40% actual letters
  // A real answer this long is a sentence or two, not one run-on token —
  // catches no-spaces keyboard mashing ("alkqjwekjqlwjelkqjwelqlwekj...")
  // that still passes the letter-ratio check above because it's all
  // letters, just not words.
  const words = v.split(/\s+/).filter(Boolean);
  return words.length >= 2;
}
