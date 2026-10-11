import type { Metadata } from "next";
import { AboutExperience } from "@/components/cirrus/about-experience";

export const metadata: Metadata = {
  title: "About us — QMS Pad",
  description:
    "QMS Pad is built for the laboratory bench: seventeen modules, four quality areas, and a system teams can run without a manual.",
};

export default function AboutPage() {
  return <AboutExperience />;
}
