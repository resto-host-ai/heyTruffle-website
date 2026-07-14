export const RESOLUTION = [
  { label: "Solved",           value: 63.1, color: "#5BB87A" },
  { label: "Partially Solved", value: 25.6, color: "#E8A24D" },
  { label: "By Pass",          value: 11.3, color: "#D9534F" },
];

export const CONVERSIONS = [
  { label: "RESERVATION",       op: 60.6, ah: 5.0 },
  { label: "CSF",               op: 14.5, ah: 0   },
  { label: "PRIVATE EVENTS",    op: 9.0,  ah: 0.5 },
  { label: "MENU",              op: 3.7,  ah: 0   },
  { label: "CUSTOMER SUPPORT",  op: 2.9,  ah: 0   },
  { label: "ONLINE MENU",       op: 2.0,  ah: 0.1 },
  { label: "PICKUP",            op: 0.8,  ah: 0   },
  { label: "DELIVERY",          op: 0.4,  ah: 0   },
  { label: "DELIVERY & PICKUP", op: 0.4,  ah: 0   },
];

export const CALLS_PER_DAY = [
  62, 78, 70, 88, 92, 65, 73, 50, 58, 95,
  80, 70, 88, 60, 76, 90, 55, 80, 65, 86,
  70, 95, 82, 105, 75, 88, 60, 90, 70, 25,
];

export const CALLS_PER_HOUR = [
  4, 6, 4, 6, 8, 12, 25, 50, 80, 120,
  150, 180, 210, 195, 165, 140, 130, 145, 175, 215,
  195, 145, 80, 30,
];

export const C = {
  pageBg:     "#F4F4F0",
  cardBg:     "#FFFFFF",
  tileBg:     "#FAFAFA",
  border:     "rgba(0,0,0,0.08)",
  borderSoft: "rgba(0,0,0,0.05)",
  text:       "#1a1a26",
  textMute:   "#5a5a66",
  textDim:    "#888",
  green:      "#5BB87A",
  orange:     "#E8A24D",
  red:        "#D9534F",
  magenta:    "#A53A82",
  magentaLine:"#B33A82",
  afterHours: "#D89B5C",
} as const;
