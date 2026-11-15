import type { Metadata } from "next";
import { ContentPage } from "@/components/shared";
import { pageMeta } from "@/lib/seo";
import { brand } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${brand.name} collects and protects your information.`,
  path: "/privacy",
});


export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      description="We respect your privacy and handle personal data responsibly."
      body={[
        "Contact and booking details are used only to process rentals and provide customer support.",
        "A full privacy policy will be published here before public launch.",
      ]}
    />
  );
}
