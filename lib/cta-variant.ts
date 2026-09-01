import { cookies } from "next/headers";

const VARIANTS = {
  A: "Build your AI", // control — lo que está hoy
  B: "Hear it live", // variante — texto anterior
} as const;

export async function getCtaVariant() {
  const cookieStore = await cookies();
  const variant = cookieStore.get("tf_cta_variant")?.value === "B" ? "B" : "A";
  return { variant, label: VARIANTS[variant] } as const;
}
