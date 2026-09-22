import type { Metadata } from "next";
import AssociationLandingPage from "@/components/associations/AssociationLandingPage";

const CALENDLY_URL =
  "https://calendly.com/d/dtqn-973-ryc/discover-heytruffle?utm_source=MRLA&utm_medium=partner&utm_campaign=discover_heytruffle";

const DESCRIPTION =
  "heytruffle is here to grow your top line and bring in extra revenue with a fully managed AI Concierge. Exclusive offering for Michigan Restaurant and Lodging Association members.";

export const metadata: Metadata = {
  title: "heytruffle for MRLA members | AI Concierge for restaurant groups",
  description: DESCRIPTION,
  alternates: { canonical: "/mrla/" },
  openGraph: {
    title: "heytruffle for MRLA members",
    description: DESCRIPTION,
    url: "https://heytruffle.ai/mrla/",
  },
};

export default function MrlaPage() {
  return (
    <AssociationLandingPage
      abbr="MRLA"
      calendlyUrl={CALENDLY_URL}
      fullName="Michigan Restaurant and Lodging Association"
      badgeSrc="/images/mrla-badge.png"
      badgeWidth={294}
      badgeHeight={435}
      badgeDisplayHeight={76}
      badgeAlt="Proud Member of the Michigan Restaurant and Lodging Association"
      memberBarText="heytruffle is a Proud Member of the Michigan Restaurant and Lodging Association. Michigan operators get a dedicated offering and a direct line to our founding team."
    />
  );
}
