import type { Metadata } from "next";
import { TerminalShell } from "@/components/terminal/TerminalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `terminal — ${siteConfig.name}`,
  description:
    "An interactive terminal view of mehmet.tech. Browse projects, skills, writing and contact details with ls, cat, grep and friends.",
  alternates: {
    canonical: "https://mehmet.tech/terminal",
  },
  openGraph: {
    title: `terminal — ${siteConfig.name}`,
    description:
      "An interactive terminal view of mehmet.tech. Type 'help' to get started.",
    url: "https://mehmet.tech/terminal",
    siteName: "mehmet.tech",
    type: "website",
  },
};

export default function TerminalPage() {
  return <TerminalShell />;
}
