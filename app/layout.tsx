import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Providers from "./provider";
import { getUserProfileAction } from "@/lib/neon.actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const profile = await getUserProfileAction();
    if (profile) {
      return {
        title: {
          default: `${profile.name} — Software Engineer`,
          template: `%s | ${profile.name}`,
        },
        description: profile.subheadline || profile.about,
        openGraph: {
          title: `${profile.name} — Software Engineer`,
          description: profile.subheadline || profile.about,
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: `${profile.name} — Software Engineer`,
          description: profile.subheadline || profile.about,
        },
      };
    }
  } catch {
    // Fallback to static metadata
  }

  return {
    title: {
      default: "Dwi Luthfianto — Software Engineer",
      template: "%s | Dwi Luthfianto",
    },
    description: "Software Engineer & Product Builder",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={
              process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ||
              "https://cloud.umami.is/script.js"
            }
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy='afterInteractive'
          />
        )}
      </body>
    </html>
  );
}
