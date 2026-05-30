import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#0a0a0c] to-[#0a0a14]" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/15 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[var(--accent-2)]/10 blur-3xl" />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-widest text-white/70 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            JP CARD CATALOG · SV1 — SV11
          </div>

          <h1 className="text-[40px] sm:text-[64px] md:text-[80px] font-black leading-[1.05] tracking-tight mb-6">
            일본판 포켓몬,<br />
            <span className="text-[var(--accent)]">한국에서</span> 가장 빠르게.
          </h1>

          <p className="text-[15px] sm:text-[18px] text-white/60 leading-relaxed mb-10 max-w-xl">
            25개 팩 · 4,000+ 카드 · Kream 박스 리셀가 · PSA10 추정.<br />
            <span className="text-white/40">번개장터 한판 검색 · Mercari 일판 시세까지 한 화면에.</span>
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#catalog"
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-black px-6 py-3.5 rounded-full font-black text-[14px] tracking-wider hover:scale-105 transition"
            >
              팩 카탈로그 →
            </Link>
            <Link
              href="/products/mega-dream-ex"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3.5 rounded-full font-bold text-[14px] hover:bg-white/10 transition"
            >
              🔥 진행중 — 메가드림 ex
            </Link>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-14 max-w-md">
            <div>
              <div className="text-[28px] sm:text-[36px] font-black text-[var(--accent)] leading-none mb-1">25</div>
              <div className="text-[11px] text-white/40 tracking-widest">PACKS</div>
            </div>
            <div>
              <div className="text-[28px] sm:text-[36px] font-black text-[var(--accent-2)] leading-none mb-1">4K+</div>
              <div className="text-[11px] text-white/40 tracking-widest">CARDS</div>
            </div>
            <div>
              <div className="text-[28px] sm:text-[36px] font-black leading-none mb-1">2026</div>
              <div className="text-[11px] text-white/40 tracking-widest">UPDATED</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
