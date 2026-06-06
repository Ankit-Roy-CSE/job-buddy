import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "JobBuddy — AI-Powered Job Hunting Assistant",
  description:
    "Find jobs, research companies, and prepare for interviews with AI. JobBuddy discovers relevant jobs, scores them against your profile, and coaches you through every step.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans text-text-primary">
        {children}
      </body>
    </html>
  );
}
