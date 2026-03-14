import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ethiodox — Learn the Ethiopian Orthodox Faith",
    template: "%s | Ethiodox",
  },
  description:
    "Learn the Ethiopian Orthodox Tewahedo faith with clarity, depth, and reverence. Structured lessons, prayers, liturgy, saints, and apologetics.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PageViewTracker />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
