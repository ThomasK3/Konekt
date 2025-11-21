import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
    <html lang="cs" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('konekt-theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
