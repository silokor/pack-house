import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://pack-house-pink.vercel.app";
const SITE_NAME = "Pack House";
const SITE_TITLE = "Pack House — 일본판 포켓몬카드 리셀 시세 · SV + MEGA 카탈로그";
const SITE_DESC =
  "일본판/한국판 포켓몬카드 SV1~SV11 전 시리즈 박스·팩 시세, 힛카드 리스트, 메가드림 ex 하이클래스팩 17,000원 단팩 판매. 메르카리·번개장터 실시간 시세 비교.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Pack House",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "포켓몬카드",
    "일본판 포켓몬카드",
    "한판 포켓몬카드",
    "포켓몬카드 리셀",
    "포켓몬카드 시세",
    "포켓몬카드 박스",
    "포켓몬카드 팩",
    "메가드림 ex",
    "메가드림 EX",
    "하이클래스팩",
    "샤이니 트레저 ex",
    "테라스탈 페스티벌 ex",
    "151",
    "스칼렛 바이올렛",
    "SV4a",
    "SV8a",
    "SV2a",
    "SV11 화이트 플레어",
    "SV11 블랙 볼트",
    "포켓몬카드 SAR",
    "포켓몬카드 MUR",
    "포켓몬카드 단팩",
    "포켓몬카드 박스 가격",
    "포켓몬카드 정가",
    "메르카리 포켓몬",
    "번개장터 포켓몬",
    "Pack House",
  ],
  authors: [{ name: "Pack House" }],
  creator: "Pack House",
  publisher: "Pack House",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FF5BA8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
  };
  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ko-KR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <Header />
        {children}
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <Script
          id="ld-site"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <Script
          src="https://api.ghpayments.kr/js/clientsideV2.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
