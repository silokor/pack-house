import Link from "next/link";

const PINK = "#FF5BA8";
const YELLOW = "#FFD400";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-black/5">
      {/* 라이트 그라데이션 배경 */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 110% 70% at 50% 0%, rgba(255, 91, 168, 0.10), transparent 60%),
            radial-gradient(ellipse 80% 50% at 90% 25%, rgba(255, 212, 0, 0.08), transparent 60%),
            radial-gradient(ellipse 90% 60% at 10% 60%, rgba(255, 91, 168, 0.06), transparent 60%),
            linear-gradient(180deg, #fffafd 0%, #fffdfe 30%, #ffffff 55%, #fffdf8 100%)
          `,
        }}
      />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl" style={{ background: PINK }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl" style={{ background: YELLOW }} />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/10 text-[11px] tracking-widest text-black/70 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: PINK }} />
            JP CARD CATALOG · SV1 — SV11
          </div>

          <h1 className="text-[40px] sm:text-[64px] md:text-[80px] font-black leading-[1.05] tracking-tight mb-6 text-black">
            일본판 포켓몬,<br />
            <span style={{ color: PINK }}>한국에서</span> 가장 빠르게.
          </h1>

          <p className="text-[15px] sm:text-[18px] text-black/60 leading-relaxed mb-10 max-w-xl">
            25개 팩 · 4,000+ 카드 · Kream 박스 리셀가 · PSA10 추정.<br />
            <span className="text-black/40">번개장터 한판 검색 · Mercari 일판 시세까지 한 화면에.</span>
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#catalog"
              className="inline-flex items-center gap-2 text-black px-6 py-3.5 rounded-full font-black text-[14px] tracking-wider hover:scale-105 transition shadow-lg"
              style={{ background: PINK, color: "#fff" }}
            >
              팩 카탈로그 →
            </Link>
            <Link
              href="/products/mega-dream-ex"
              className="inline-flex items-center gap-2 bg-white border border-black/10 px-6 py-3.5 rounded-full font-bold text-[14px] hover:bg-black/[0.03] transition shadow-sm"
            >
              🔥 진행중 — 메가드림 ex
            </Link>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-14 max-w-md">
            <div>
              <div className="text-[28px] sm:text-[36px] font-black leading-none mb-1" style={{ color: PINK }}>25</div>
              <div className="text-[11px] text-black/40 tracking-widest">PACKS</div>
            </div>
            <div>
              <div className="text-[28px] sm:text-[36px] font-black leading-none mb-1" style={{ color: "#E6A800" }}>4K+</div>
              <div className="text-[11px] text-black/40 tracking-widest">CARDS</div>
            </div>
            <div>
              <div className="text-[28px] sm:text-[36px] font-black leading-none mb-1 text-black">2026</div>
              <div className="text-[11px] text-black/40 tracking-widest">UPDATED</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
