import type { Metadata } from "next";
import AssociationLandingPage from "@/components/associations/AssociationLandingPage";

/* Per the source mockup's dev notes (heytruffle_frla_page.html): FRLA
   membership is confirmed, but the exact wording FRLA allows and whether a
   tier-specific badge applies still needs sign-off from Nicolette Hoffman /
   Lynne Hernandez at FRLA. Offer terms are copied from the MRLA deal and not
   yet confirmed for FRLA specifically. */
// Dedicated FRLA event (was the shared discover-heytruffle event before).
const CALENDLY_URL =
  "https://calendly.com/d/d324-kcn-y9j/discover-heytruffle-frla?utm_source=FRLA&utm_medium=association&utm_campaign=discover_heytruffle&utm_content=frla_landing";

const DESCRIPTION =
  "heytruffle is here to grow your top line and bring in extra revenue with a fully managed AI Concierge. Exclusive offering for Florida Restaurant and Lodging Association members.";

export const metadata: Metadata = {
  title: "heytruffle for FRLA members | AI Concierge for restaurant groups",
  description: DESCRIPTION,
  alternates: { canonical: "/frla/" },
  openGraph: {
    title: "heytruffle for FRLA members",
    description: DESCRIPTION,
    url: "https://heytruffle.ai/frla/",
  },
};

export default function FrlaPage() {
  return (
    <AssociationLandingPage
      abbr="FRLA"
      calendlyUrl={CALENDLY_URL}
      fullName="Florida Restaurant and Lodging Association"
      badgeSrc="/images/frla-badge.png"
      badgeWidth={282}
      badgeHeight={130}
      badgeDisplayHeight={62}
      badgeAlt="Florida Restaurant and Lodging Association logo"
      memberBarText="heytruffle is a member of the Florida Restaurant and Lodging Association. Florida operators get a dedicated offering and a direct line to our founding team."
    />
  );
}
