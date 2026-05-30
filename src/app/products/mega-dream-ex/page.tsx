import type { Metadata } from "next";
import MegaDreamLanding from "@/components/product/MegaDreamLanding";
import { product } from "@/data/megaDreamEx";

export const metadata: Metadata = {
  title: `${product.title} | Pack House`,
  description:
    "일본판 포켓몬카드 하이클래스팩 MEGA 드림 ex 1팩 17,000원. 메가팬텀 SAR, 피카츄 SAR, 메가망나뇽 MUR까지 — 힛카드 실시간 시세표 제공.",
  openGraph: {
    title: product.title,
    description: "일본판 하이클래스팩 MEGA 드림 ex 1팩 — 17,000원",
    type: "website",
  },
};

export default function Page() {
  return <MegaDreamLanding />;
}
