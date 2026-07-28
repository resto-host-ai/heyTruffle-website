import type { Metadata } from "next";
import BlogIndex from "./BlogIndex";

const DESCRIPTION =
  "Insights on AI voice hosts, restaurant revenue recovery, and modern hospitality operations from the heytruffle team.";

export const metadata: Metadata = {
  title: "Blog — heytruffle",
  description: DESCRIPTION,
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  return <BlogIndex page={1} />;
}
