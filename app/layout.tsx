import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Konekt - Propojujeme studenty a mentory",
  description: "Platforma pro networking studentů a mentorů z českého startup ekosystému",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
