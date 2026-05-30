import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Pack House — 일본판 포켓몬 카드 카탈로그",
  description: "SV1~SV11 일판/한판 카드 + 박스 리셀 시세를 한눈에",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="searchmon-dark min-h-full flex flex-col">
        {children}
        <Script
          src="https://api.ghpayments.kr/js/clientsideV2.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
