import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Mehmet Şirin Usanmaz — DevOps Team Lead",
  description:
    "Senior DevOps leader building scalable infrastructure, automation pipelines, and high-availability systems. Focused on reliability, security, and engineering culture.",
  metadataBase: new URL("https://mehmet.tech"),
  openGraph: {
    title: "Mehmet Şirin Usanmaz — DevOps Team Lead",
    description:
      "Senior DevOps leader building scalable infrastructure, automation pipelines, and high-availability systems.",
    url: "https://mehmet.tech",
    siteName: "mehmet.tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehmet Şirin Usanmaz — DevOps Team Lead",
    description:
      "Senior DevOps leader building scalable infrastructure, automation pipelines, and high-availability systems.",
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
      </body>
    </html>
  );
}
