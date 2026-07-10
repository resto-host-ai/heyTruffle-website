export type Region = "us-northeast" | "us-midwest" | "us-west" | "us-south";
export type TurnaroundBucket = "30-60" | "60-90" | "90+";
export type CallTopic = "orders" | "reservations" | "hours" | "waitlist";
export type CallsBucket = "0-20" | "20-50" | "50-100" | "100+";
export type SpendBucket = "25-40" | "40-70" | "70+";

export const REGION_LABELS: Record<Region, string> = {
  "us-northeast": "Northeast region",
  "us-midwest": "Midwest region",
  "us-west": "West region",
  "us-south": "South region",
};
export const TURNAROUND_LABELS: Record<TurnaroundBucket, string> = {
  "30-60": "30–60 min",
  "60-90": "60–90 min",
  "90+": "+90 min",
};
export const CALL_TOPIC_LABELS: Record<CallTopic, string> = {
  orders: "Orders",
  reservations: "Reservations",
  hours: "Operating hours",
  waitlist: "Waitlist",
};
export const CALLS_LABELS: Record<CallsBucket, string> = {
  "0-20": "0–20 calls / day",
  "20-50": "20–50 calls / day",
  "50-100": "50–100 calls / day",
  "100+": "100+ calls / day",
};
export const SPEND_LABELS: Record<SpendBucket, string> = {
  "25-40": "$25–40",
  "40-70": "$40–70",
  "70+": "$70+",
};

export type FormState = {
  region?: Region;
  locations?: number;
  turnaround?: TurnaroundBucket;
  callTopic?: CallTopic;
  callsPerDay?: CallsBucket;
  spendPerGuest?: SpendBucket;
  firstName: string;
  email: string;
  company: string;
  honeypot: string;
};

export const INITIAL: FormState = {
  firstName: "",
  email: "",
  company: "",
  honeypot: "",
};

export const TOTAL_STEPS = 7;
