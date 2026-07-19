import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond, Dancing_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://namitathapa.stories"),
  title: {
    default: "Namita Thapa — Immersive Storyteller & Creative Writer",
    template: "%s · Namita Thapa",
  },
  description:
    "Namita Thapa crafts immersive narratives, fiction, poetry, and creative non-fiction that transport readers to other worlds. Stories that come alive.",
  keywords: [
    "Namita Thapa",
    "immersive storyteller",
    "creative writer",
    "fiction",
    "poetry",
    "Perth writer",
    "Kathmandu writer",
  ],
  authors: [{ name: "Namita Thapa" }],
  openGraph: {
    title: "Namita Thapa — Immersive Storyteller & Creative Writer",
    description:
      "Stories that come alive. Immersive narratives, fiction, and poetry by Namita Thapa.",
    type: "website",
    locale: "en_AU",
    siteName: "Namita Thapa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namita Thapa — Immersive Storyteller & Creative Writer",
    description: "Stories that come alive.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${dancing.variable} h-full`}
    >
      <body className="min-h-full flex flex-col paper-bg antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
