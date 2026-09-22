import type { Metadata } from "next";
import AssociationLandingPage from "@/components/associations/AssociationLandingPage";

/* NOTE — the source mockup (heytruffle_ira_page.html) had a "Coming up:
   Webinar with the Illinois Restaurant Association" block with a placeholder
   "#" registration link and bracketed "[CONFIRM TIME AND REGISTRATION LINK
   WITH THERESA CRISANTI]" text — the mockup's own dev notes said to get
   those from Theresa Crisanti or remove the block. Left out here rather than
   shipping a dead link; add it back once there's a real date/link. Also per
   the mockup notes: membership and offer terms for IRA are copied from the
   MRLA deal and not yet confirmed for IRA specifically. */
// Dedicated IRA event (was the shared discover-heytruffle event before).
const CALENDLY_URL =
  "https://calendly.com/d/dv93-mw4-bzj/discover-heytruffle-ira?utm_source=IRA&utm_medium=association&utm_campaign=discover_heytruffle&utm_content=ira_landing";

const DESCRIPTION =
  "heytruffle is here to grow your top line and bring in extra revenue with a fully managed AI Concierge. Exclusive offering for Illinois Restaurant Association members.";

export const metadata: Metadata = {
  title: "heytruffle for IRA members | AI Concierge for restaurant groups",
  description: DESCRIPTION,
  alternates: { canonical: "/ira/" },
  openGraph: {
    title: "heytruffle for IRA members",
    description: DESCRIPTION,
    url: "https://heytruffle.ai/ira/",
  },
};

export default function IraPage() {
  return (
    <AssociationLandingPage
      abbr="IRA"
      calendlyUrl={CALENDLY_URL}
      fullName="Illinois Restaurant Association"
      badgeSrc="/images/ira-badge.png"
      badgeWidth={385}
      badgeHeight={130}
      badgeDisplayHeight={62}
      badgeAlt="Illinois Restaurant Association logo"
      memberBarText="heytruffle is a member of the Illinois Restaurant Association. Illinois operators get a dedicated offering and a direct line to our founding team."
    />
  );
}
