import type { Metadata } from "next";
import Script from "next/script";
import MegaDreamLanding from "@/components/product/MegaDreamLanding";
import { product } from "@/data/megaDreamEx";

const URL_PATH = "/products/mega-dream-ex";

export const metadata: Metadata = {
  title: `${product.title} 17,000원 — 메가팬텀 SAR · 피카츄 SAR · 메가망나뇽 MUR`,
  description:
    "일본판 포켓몬카드 하이클래스팩 MEGA 드림 ex 1팩 17,000원. 메가팬텀 SAR, 피카츄 SAR, 메가망나뇽 MUR, 메가뮤츠 ex 등 힛카드 풀리스트 + 실시간 메르카리 시세 비교. 박스·번들 할인 진행 중.",
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: `${product.title} 17,000원`,
    description: "일본판 하이클래스팩 MEGA 드림 ex 1팩 — 17,000원. 메가팬텀 SAR · 피카츄 SAR · 메가망나뇽 MUR.",
    url: URL_PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${product.title} 17,000원`,
    description: "일본판 하이클래스팩 MEGA 드림 ex 1팩 — 17,000원.",
  },
  keywords: [
    "메가드림 ex",
    "메가드림 EX",
    "메가드림이엑스",
    "포켓몬카드 일본판",
    "하이클래스팩",
    "메가팬텀 SAR",
    "피카츄 SAR",
    "메가망나뇽 MUR",
    "메가뮤츠 ex",
    "포켓몬카드 단팩",
    "Pack House",
  ],
};

const productLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  description:
    "일본판 포켓몬카드 하이클래스팩 MEGA 드림 ex 1팩. 메가팬텀 SAR, 피카츄 SAR, 메가망나뇽 MUR 등 힛카드 다수.",
  brand: { "@type": "Brand", name: "포켓몬카드 일본판" },
  category: "Trading Cards",
  offers: {
    "@type": "Offer",
    priceCurrency: "KRW",
    price: product.priceKRW,
    availability: "https://schema.org/InStock",
    url: `https://pack-house-pink.vercel.app${URL_PATH}`,
  },
};

export default function Page() {
  return (
    <>
      <Script
        id="ld-product-mega-dream-ex"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <MegaDreamLanding />
    </>
  );
}
