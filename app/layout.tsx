import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const googleSans = localFont({
  src: [
    {
      path: "./font/GoogleSans_17pt-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/GoogleSans_17pt-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font/GoogleSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./font/GoogleSans_17pt-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
});

export const metadata: Metadata = {
  title: "Web Dev Portfolio",
  description: "Created By using Next.js 13 and Aceternity UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${googleSans.className} antialiased`}>{children}</body>
    </html>
  );
}
