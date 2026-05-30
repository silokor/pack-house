import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <Link href="/products/mega-dream-ex" className="block group">
        <div className="relative w-full max-w-[1280px] mx-auto px-3 sm:px-5 py-3 sm:py-5">
          <div className="relative w-full aspect-[1280/960] sm:aspect-[1280/720] overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_40px_rgba(255,91,168,0.25)] transition-shadow">
            <Image
              src="/images/mega-dream-ex-banner.jpg"
              alt="긴급 재입고 — 메가드림 EX 일본어판 1인 10장 선착 판매"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
            />
          </div>
        </div>
      </Link>
    </section>
  );
}
