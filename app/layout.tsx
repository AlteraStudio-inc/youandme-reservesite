import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Bajon エル・バホン | 天神・日銀前の屋台",
  description:
    "福岡・天神、日本銀行福岡支店前の屋台 El Bajon（エル・バホン）。世界30か国以上を食べ歩いた店主が、タコス アル・パストールやジャークチキン、クレープ・サレなど旅先の味を屋台で。18:00頃〜23:00・不定休・雨天休業。",
  openGraph: {
    title: "El Bajon エル・バホン | 天神・日銀前の屋台",
    description: "The restaurant on the street — 世界の“うまいもの”を、天神の路上で。",
    images: ["/photos/stall-dusk.jpg"],
    locale: "ja_JP",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2a1f19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@500;700;800&family=Yuji+Boku&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
