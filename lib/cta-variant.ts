import { cookies } from "next/headers";

const VARIANTS = "Try it for free";

export async function getCtaVariant() {
  const cookieStore = await cookies();
  const variant = cookieStore.get("tf_cta_variant")?.value === "B" ? "B" : "A";
  return { variant, label: VARIANTS } as const;
}
