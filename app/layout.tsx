import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "you&me curry | スパイス居酒屋 - 福岡 春吉",
  description:
    "福岡・春吉のスパイス居酒屋 you&me curry。ジャークチキン、タコスなど本格スパイス料理とお酒を楽しめる夜の空間。18:00〜24:00 火曜定休。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+JP:wght@300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
