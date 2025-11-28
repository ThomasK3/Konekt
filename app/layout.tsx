import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  title: "Konekt - Event Management Platform",
  description: "Profesionální platforma pro organizátory eventů. Real-time analytics, attendee intelligence a long-term community engagement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className="antialiased bg-bg-primary text-text-primary">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
