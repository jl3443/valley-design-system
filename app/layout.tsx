import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valley Bank — Design System (captured)",
  description:
    "A code-first design system mirroring valley.com 1:1. Every token traced to a live getComputedStyle() reading.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Captured substitutes for Adobe Fonts (ivypresto-headline → Cormorant
            Garamond; Autor → DM Sans). Roboto unchanged — matches valley.com */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
