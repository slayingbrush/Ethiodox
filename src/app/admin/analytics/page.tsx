import type { Metadata } from "next";
import AnalyticsPanel from "@/components/admin/AnalyticsPanel";

export const metadata: Metadata = {
  title: "Admin Analytics",
  description: "Traffic, sessions, and top content metrics for Ethiodox.",
};

export default function AdminAnalyticsPage() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnalyticsPanel />
      </div>
    </div>
  );
}
