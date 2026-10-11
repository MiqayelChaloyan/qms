import type { Metadata } from "next";
import { ContactExperience } from "@/components/cirrus/contact-experience";

export const metadata: Metadata = {
  title: "Contact us — QMS Pad",
  description:
    "Send a message to QMS Pad, or visit Invopad LLC at 4125 Fairway Drive, STE 145, Carrollton TX 75010.",
};

export default function ContactPage() {
  return <ContactExperience />;
}
