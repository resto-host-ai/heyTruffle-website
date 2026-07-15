import type { Metadata } from "next";
import CaseStudiesList from "@/components/CaseStudiesList";

export const metadata: Metadata = {
  title: "Case Studies — heytruffle",
  description:
    "Explore how restaurants are capturing more reservations, orders and catering with HeyTruffle. Filter by operational need, cuisine or location.",
  alternates: { canonical: "/case-study/" },
};

export default function CaseStudiesPage() {
  return <CaseStudiesList />;
}
