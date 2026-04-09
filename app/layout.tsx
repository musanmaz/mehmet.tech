import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "Mehmet Sirin Usanmaz — DevOps Team Lead",
  description:
    "DevOps Team Lead building scalable infrastructure and leading engineering teams. Focused on reliability, automation, and observability.",
  metadataBase: new URL("https://mehmet.tech"),
  alternates: {
    canonical: "https://mehmet.tech",
  },
  openGraph: {
    title: "Mehmet Sirin Usanmaz — DevOps Team Lead",
    description:
      "DevOps Team Lead building scalable infrastructure and leading engineering teams.",
    url: "https://mehmet.tech",
    siteName: "mehmet.tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehmet Sirin Usanmaz — DevOps Team Lead",
    description:
      "DevOps Team Lead building scalable infrastructure and leading engineering teams.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
