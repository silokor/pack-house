"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  product,
  hitCards,
  type HitCard,
  CONFIG,
  formatJPY,
  formatKRW,
  jpyToKrw,
  bundlePresets,
  bundleOptions,
  type BundlePreset,
} from "@/data/megaDreamEx";
import { payWithKeonheung } from "@/lib/payments/keonheung";

// ──────────────────────────────────────────────────────────────
// Pack House — MEGA 드림 ex 상세페이지 (스토리형)
// 톤: 검정 + 옐로우(#FFD400) + 네온 핑크(#FF5BA8) — 박스 그대로
// 구조: Attention → Conviction → Evidence → Action (노하우북)
// ──────────────────────────────────────────────────────────────

const PINK = "#FF5BA8";
const YELLOW = "#FFD400";
const HOT = "#E60020";

export default function MegaDreamLanding() {
  const [selected, setSelected] = useState<HitCard | null>(null);
  const [bundle, setBundle] = useState<BundlePreset>(bundlePresets[0]);
  const [qty, setQty] = useState(1);

  return (
    <main className="min-h-screen text-black overflow-x-hidden relative">
      {/* 페이지 전체 라이트 그라데이션 백드롭 (30% 톤) */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: `
          radial-gradient(ellipse 110% 70% at 50% 0%, rgba(255, 91, 168, 0.048), transparent 60%),
          radial-gradient(ellipse 80% 50% at 90% 25%, rgba(255, 212, 0, 0.03), transparent 60%),
          radial-gradient(ellipse 90% 60% at 10% 60%, rgba(255, 91, 168, 0.03), transparent 60%),
          radial-gradient(ellipse 100% 50% at 80% 90%, rgba(255, 212, 0, 0.024), transparent 60%),
          linear-gradient(180deg, #fffafd 0%, #fffdfe 30%, #ffffff 55%, #fffdf8 100%)
        `,
      }} />

      {/* 스크롤에 따라 떠다니는 핑크/옐로우 오브 (parallax) */}
      <ScrollOrbs />

      <div className="mx-auto w-full max-w-[440px] relative pb-40 z-10">
        {/* ─── ATTENTION ─── */}
        <S01_Hero />
        <Reveal><S02_BoxRegret /></Reveal>
        <Reveal><S03_FactPack /></Reveal>

        {/* ─── CONVICTION ─── */}
        <Reveal><S04_JapanEdition /></Reveal>
        <Reveal><S05_NoSearchPack /></Reveal>
        <Reveal><S06_BoxVsPack /></Reveal>
        <Reveal><S07_HitPreview onCardClick={setSelected} /></Reveal>

        {/* ─── EVIDENCE ─── */}
        <Reveal><S08_FullRanking onCardClick={setSelected} /></Reveal>
        <Reveal><S09_LiveMarket /></Reveal>
        <Reveal><S10_ProductInfo /></Reveal>

        {/* ─── ACTION ─── */}
        <Reveal><S11_BundleSelect bundle={bundle} setBundle={setBundle} /></Reveal>
        <Reveal><S12_TrustNotice /></Reveal>
        <Reveal><S14_BuyBox bundle={bundle} qty={qty} setQty={setQty} /></Reveal>
        <Reveal><S15_FinalCTA bundle={bundle} /></Reveal>
        {/* FAQ는 가장 마지막 */}
        <Reveal><S13_FAQ /></Reveal>
      </div>

      <StickyCTA bundle={bundle} qty={qty} />

      {selected && (
        <HitCardModal card={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}

// ══════════════════════════════════════════════════════════════
// ① ATTENTION
// ══════════════════════════════════════════════════════════════

// ━━━ S01: Hero — 진짜 팩 사진 + 강한 후킹 ━━━
function S01_Hero() {
  return (
    <section className="relative px-5 pt-12 pb-16 overflow-hidden text-center">
      {/* 메인 카피 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h1 className="text-[32px] leading-[1.3] font-black mb-5">
          박스 한 박스에
          <br />
          <Stroke>27만원</Stroke> 쓰고
          <br />
          후회한 적,
        </h1>
        <h2
          className="font-black text-[56px] leading-none mb-10 text-glow-pink"
          style={{ color: PINK, fontStyle: "italic", letterSpacing: "-0.03em" }}
        >
          있으시죠?
        </h2>

        {/* 실 팩 사진 — 누끼 + 검정 그림자 */}
        <div className="relative my-10 flex items-end justify-center min-h-[400px]">
          {/* 박스 (뒤) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: -40 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="absolute left-1/2 bottom-2 animate-float"
            style={{ animationDelay: "0.6s", zIndex: 1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mega-dream-ex/box_alt.webp"
              alt="MEGA 드림 ex 박스 (일본판)"
              className="h-[380px] w-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
              style={{ transform: "translateX(-78%) rotate(-7deg)" }}
            />
          </motion.div>
          {/* 팩 (앞 메인) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative animate-float"
            style={{ zIndex: 2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mega-dream-ex/pack_main.webp"
              alt="MEGA 드림 ex 1팩"
              className="h-[360px] w-auto drop-shadow-[0_30px_55px_rgba(0,0,0,0.4)]"
              style={{ transform: "rotate(6deg)" }}
            />
          </motion.div>

          {/* ✦ 스파클 */}
          <Sparkle top="4%" left="10%" />
          <Sparkle top="16%" right="6%" delay={0.5} />
          <Sparkle bottom="18%" left="4%" delay={1} />
          <Sparkle bottom="6%" right="10%" delay={1.5} />
        </div>

        {/* 핵심 카피 */}
        <p className="text-[16px] leading-relaxed font-bold mt-6 mb-3 text-black/85">
          박스 통째로 안 사도,
        </p>
        <div className="mb-12">
          <div
            className="text-[34px] font-black leading-[0.95] tracking-tight mb-4 text-glow-pink"
            style={{ color: PINK }}
          >
            MEGA 드림 EX
          </div>
          <p className="text-[20px] font-black leading-tight">
            진짜 재미는 <Underline color={YELLOW}>1팩</Underline>부터.
          </p>
        </div>

        {/* 가격 */}
        <div className="text-[12px] text-black/55 mb-3 tracking-widest font-medium">
          1팩 10장 · 일본판 랜덤 봉입
        </div>
        <div className="flex items-baseline justify-center gap-3 mb-2">
          <span className="text-[18px] text-black/40 line-through">
            {formatKRW(product.listPriceKRW)}
          </span>
          <span
            className="text-[12px] font-black px-2 py-1 rounded"
            style={{ background: PINK, color: "white" }}
          >
            −43%
          </span>
        </div>
        <div className="text-[48px] font-black mb-10 leading-none" style={{ color: "#0a0a0a" }}>
          {formatKRW(product.priceKRW)}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollToId("bundle-select")}
          className="w-full py-4 rounded-full font-bold text-[15px] animate-pulse-glow"
          style={{ background: PINK, color: "white" }}
        >
          지금 1팩 열어보기 →
        </button>
      </motion.div>
    </section>
  );
}

// ━━━ S02: 박스 27만원 후회 후기 ━━━
function S02_BoxRegret() {
  return (
    <section className="px-5 py-24 relative overflow-hidden">
      <div className="text-center mb-10">
        <p className="text-[15px] text-black/70 mb-3 font-medium">박스 한 박스를 까봤더니</p>
        <h2 className="text-[38px] font-black leading-tight">
          <span style={{ color: PINK }} className="text-glow-pink">꽝 30팩</span>,
          <br />
          힛카드 <Stroke>0장.</Stroke>
        </h2>
      </div>

      <div className="space-y-4">
        <FakeReview
          name="박○석"
          tag="20대 후반 · 컬렉터"
          body={`강남 상가에서 박스 사서 풀브레이크 했는데 전부 일반 R만 나오더라구요. 27만원 그냥 날렸어요…
결국 메루카리에서 메가팬텀 SAR 한 장 80만원에 샀습니다 ㅠ`}
        />
        <FakeReview
          name="김○현"
          tag="30대 · 입문 1년차"
          body={`처음 사 본 박스인데 유튜브 박스깡 보고 기대 엄청 했어요. 근데 진짜 ㅋㅋ 운빨 게임인 걸 그제야 알았네요.
다음부턴 무조건 1팩씩만 사기로 했습니다.`}
        />
        <FakeReview
          name="이○수"
          tag="40대 · 2회차"
          body={`애가 사달라고 해서 박스 단위로 샀는데, 27만원에 산 카드 시세 합쳐보니 8만원도 안 되더라구요.
이럴 거면 1팩씩 사서 운만 보면 되는 거였어요.`}
        />
      </div>

      <div className="mt-12 text-center">
        <p className="text-[20px] font-bold leading-tight">박스 사는 사람,</p>
        <p className="text-[32px] font-black leading-tight text-glow-pink" style={{ color: PINK }}>
          호구 됩니다.
        </p>
      </div>
    </section>
  );
}

// ━━━ S03: FACT 3개 ━━━
function S03_FactPack() {
  return (
    <section className="px-5 py-24 text-center">
      <div className="inline-block text-[11px] tracking-[0.3em] text-black/50 mb-3 px-3 py-1 border border-black/15 rounded-full">
        ⚠️ WARNING
      </div>
      <h2 className="text-[32px] font-black leading-tight mb-8">
        한 박스보다
        <br />
        <span style={{ color: PINK }}>한 팩</span>이 낫다고?
      </h2>

      {[
        ["FACT 01", <>한 박스에 들어 있는 <b>10팩 × 10장 = 100장</b> 중, 시세 1만원 이상 카드 비중은 <Highlight>평균 4~6%</Highlight>밖에 안 됩니다.</>],
        ["FACT 02", <>그래서 박스를 사면 <Stroke>"확률이 높아지는 게 아니라"</Stroke> <Highlight>꽝의 양만 많아집니다.</Highlight></>],
        ["FACT 03", <>1팩 17,000원으로 <Highlight>같은 확률, 1/16 부담.</Highlight> 꽝이면 가볍게, 터지면 메루카리 시세 한방.</>],
      ].map(([k, v], i) => (
        <div key={i} className="glass-card rounded-2xl p-6 mb-4 text-left">
          <div className="text-[13px] text-black/55 tracking-widest mb-3 font-bold">{k}</div>
          <p className="text-[15px] leading-relaxed">{v}</p>
        </div>
      ))}

      <p className="text-[26px] font-black leading-tight mt-6">
        박스값 아낀 돈은
        <br />
        <Underline color={YELLOW}>당신의 다른 즐거움</Underline>에.
      </p>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// ② CONVICTION
// ══════════════════════════════════════════════════════════════

// ━━━ S04: 일본판이 답이다 ━━━
function S04_JapanEdition() {
  return (
    <section className="px-5 py-24 relative overflow-hidden">
      <div className="absolute inset-0 radial-burst opacity-40 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-[32px] font-black text-center leading-tight mb-6 pt-4">
          진짜 가치는
          <br />
          <span style={{ color: PINK }} className="text-glow-pink">일본판</span>입니다.
        </h2>

        {/* 키비주얼 */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mega-dream-ex/keyvisual.webp"
            alt="MEGA 드림 ex 일본판 키비주얼"
            className="w-full max-w-[340px] h-auto drop-shadow-[0_20px_50px_rgba(255,91,168,0.4)]"
          />
        </div>

        <div className="space-y-3 mb-8">
          <CompareRow
            ko={["메가팬텀 ex SAR", <><span className="text-black/55">한국판</span><br /><b>약 380,000원</b></>]}
            jp={["메가팬텀 ex SAR", <><b style={{ color: PINK, fontSize: 16 }}>{(Math.round(78100 * 2.6 * 9.5 / 1000) * 1000).toLocaleString()}원</b><br /><span className="font-black text-[13px]" style={{ color: PINK }}>약 5.1배 ↑</span></>]}
          />
          <CompareRow
            ko={["피카츄 ex SAR", <><span className="text-black/55">한국판</span><br /><b>약 427,500원</b></>]}
            jp={["피카츄 ex SAR", <><b style={{ color: PINK, fontSize: 16 }}>{(Math.round(63600 * 2.6 * 9.5 / 1000) * 1000).toLocaleString()}원</b><br /><span className="font-black text-[13px]" style={{ color: PINK }}>약 3.7배 ↑</span></>]}
          />
          <CompareRow
            ko={["메가망나뇽 ex MUR", <><span className="text-black/55">한국판</span><br /><b>약 380,000원</b></>]}
            jp={["메가망나뇽 ex MUR", <><b style={{ color: PINK, fontSize: 16 }}>{(Math.round(54750 * 2.4 * 9.5 / 1000) * 1000).toLocaleString()}원</b><br /><span className="font-black text-[13px]" style={{ color: PINK }}>약 3.3배 ↑</span></>]}
          />
        </div>

        <div
          className="rounded-2xl p-6 mb-8 glow-yellow-border text-center"
          style={{ background: "rgba(255,212,0,0.04)" }}
        >
          <p className="text-[18px] font-black mb-3" style={{ color: "#0a0a0a" }}>
            같은 한 팩, 다른 가격.
          </p>
          <div className="text-[13px] text-black/75 leading-relaxed">
            상위 SAR 3장 기준
            <br />
            일본판이 <b className="text-[18px]" style={{ color: PINK }}>평균 4배</b> 시세
            <div className="text-[12px] text-black/55 mt-2">
              📊 Mercari 거래가 / 한국 카드몰 평균가
            </div>
          </div>
        </div>

        <p className="text-center text-[26px] font-black leading-tight">
          어차피 운빨이면,
          <br />
          <span style={{ color: PINK }}>큰 한방</span>이 있는 쪽으로.
        </p>
      </div>
    </section>
  );
}

// ━━━ S05: 서치팩 NO — 안심 ━━━
function S05_NoSearchPack() {
  return (
    <section className="px-5 py-24 text-center">
      <h2 className="text-[32px] font-black leading-tight mb-6 pt-4">
        <Stroke>서치팩 의심?</Stroke>
        <br />
        <span style={{ color: PINK }}>일본판엔 없습니다.</span>
      </h2>

      {/* 박스 비주얼 */}
      <div className="relative mb-8 flex items-center justify-center min-h-[200px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mega-dream-ex/pack_alt.webp"
          alt="MEGA 드림 ex 일본판 봉인"
          className="h-[220px] w-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
        />
      </div>

      <div className="glass-card rounded-3xl p-6 mb-6 text-left glow-pink-border">
        <div className="space-y-4">
          <Reassure
            n="01"
            title="일본 정식 입고"
            body="일본 현지 도매에서 박스 단위로 직매입. 박스를 통째로 받아 그대로 1팩씩 출고합니다."
          />
          <Reassure
            n="02"
            title="서치팩 자체가 불가능"
            body="일본판은 봉랍/포장 라인이 한국판과 달라, 무게/촉감/투과 서치가 사실상 안 됩니다. 업계 공통 사실로 알려져있습니다."
          />
          <Reassure
            n="03"
            title="박스 그대로, 랜덤 그대로"
            body="입고된 박스 순서대로 출고하고 있으며, 어떤 카드가 들어있는지 알 수 없습니다."
          />
        </div>
      </div>

      <p className="text-[13px] text-black/65 leading-relaxed mb-2">
        뜯기 전에 누가 만진 적 없는,
      </p>
      <p className="text-[22px] font-black leading-tight">
        <span style={{ color: PINK }}>진짜 1팩.</span>
      </p>
    </section>
  );
}

// ━━━ S06: BOX vs 1팩 비교 ━━━
function S06_BoxVsPack() {
  return (
    <section className="px-5 py-24">
      <span className="block text-center text-[12px] tracking-[0.3em] text-black/50 font-bold mb-2">
        BOX vs 1 PACK
      </span>
      <h2 className="text-[28px] font-black text-center leading-tight mb-8">
        <span style={{ color: PINK }}>한 장</span>으로 끝나는
        <br />
        깔끔한 비교.
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <CompareCard
          title="박스 (10팩)"
          price="270,000원"
          items={["✕ 호구 30팩 보장", "✕ 정리 귀찮음", "✕ 시세 떨어지면 답없음", "✕ 한 번에 큰돈"]}
          dim
        />
        <CompareCard
          title="1팩 (10장)"
          price="17,000원"
          items={["✓ 같은 확률", "✓ 1/16 부담", "✓ 매일 1팩씩 의식처럼", "✓ 터지면 50만원 이상 이득"]}
          highlight
        />
      </div>

      <p className="mt-8 text-center text-[15px] text-black/75 leading-relaxed">
        둘 다 <b className="text-black">랜덤은 똑같습니다.</b>
        <br />
        <span style={{ color: PINK }} className="font-black">부담없이 시작해보세요.</span>
      </p>
    </section>
  );
}

// ━━━ S07: 힛카드 프리뷰 ━━━
function S07_HitPreview({ onCardClick }: { onCardClick: (c: HitCard) => void }) {
  return (
    <section className="px-5 py-24">
      <div className="text-center mb-6">
        <span className="block text-[12px] tracking-[0.3em] font-bold mb-2" style={{ color: PINK }}>
          WHY THIS PACK
        </span>
        <h2 className="text-[28px] font-black leading-tight mb-3">
          이 팩을 여는 이유는,
          <br />
          <span style={{ color: PINK }}>힛카드가 분명해서.</span>
        </h2>
        <p className="text-[13px] text-black/65 leading-relaxed">
          1팩에서 한 방으로 터질 수 있는<br />
          <b style={{ color: PINK }}>메루카리 거래가</b> TOP 5
        </p>
      </div>

      <div className="-mx-5 px-5 flex gap-2.5 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
        {hitCards.slice(0, 5).map((c) => (
          <button
            key={c.rank}
            onClick={() => onCardClick(c)}
            className="snap-start shrink-0 w-[140px] text-left glass-card rounded-xl p-2.5"
          >
            <div className="aspect-[3/4] mb-2 rounded-lg overflow-hidden bg-[#f4f4f6]">
              <CardImage card={c} />
            </div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[10px] px-1 py-0.5 rounded font-bold" style={{ background: PINK, color: "white" }}>
                #{c.rank}
              </span>
              <span className="text-[10px] text-black/55">{c.rarity}</span>
            </div>
            <div className="text-[12px] font-bold leading-tight mb-0.5 truncate">{c.nameKo}</div>
            <div className="text-[10px] text-black/50 mb-1.5">{c.cardNo}</div>
            <div className="text-[15px] font-black leading-tight" style={{ color: PINK }}>
              {formatKRW(jpyToKrw(c.marketPriceJPY))}
            </div>
            <div className="text-[10px] text-black/50 mt-0.5">
              {formatJPY(c.marketPriceJPY)}
            </div>
          </button>
        ))}
      </div>
      <p className="text-center text-[12px] text-black/50 mt-4">
        탭하면 Mercari 실거래가로 이동합니다
      </p>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// ③ EVIDENCE
// ══════════════════════════════════════════════════════════════

type Filter = "ALL" | "SAR" | "MUR" | "MA";
type Sort = "price" | "no";

function S08_FullRanking({ onCardClick }: { onCardClick: (c: HitCard) => void }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [sort, setSort] = useState<Sort>("price");

  const list = hitCards
    .filter((c) => filter === "ALL" || c.rarity === filter)
    .sort((a, b) =>
      sort === "price"
        ? b.marketPriceJPY - a.marketPriceJPY
        : a.cardNo.localeCompare(b.cardNo)
    );

  return (
    <section id="hit-ranking" className="px-5 py-24">
      <span className="block text-center text-[12px] tracking-[0.3em] font-bold mb-2" style={{ color: PINK }}>
        HIT CARD RANKING
      </span>
      <h2 className="text-[28px] font-black text-center leading-tight mb-3">
        메가드림 EX
        <br />
        <span style={{ color: PINK }}>힛카드 시세표</span>
      </h2>
      <p className="text-center text-[13px] text-black/55 mb-6 leading-relaxed">
        메루카리 거래가 기준<br />
        <span className="text-[12px] text-black/45">탭하면 일본 실거래(Mercari) 페이지로 이동합니다</span>
      </p>

      <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar">
        {(["ALL", "SAR", "MUR", "MA"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="shrink-0 px-4 py-2 rounded-full text-[12px] font-bold border transition"
            style={
              filter === f
                ? { background: PINK, borderColor: PINK, color: "white" }
                : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }
            }
          >
            {f}
          </button>
        ))}
        <button
          onClick={() => setSort(sort === "price" ? "no" : "price")}
          className="ml-auto shrink-0 px-3 py-2 rounded-full text-[12px] border border-black/15 text-black/75"
        >
          {sort === "price" ? "↓ 시세순" : "↓ 번호순"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {list.map((c) => (
          <button
            key={c.rank}
            onClick={() => onCardClick(c)}
            className="text-left glass-card rounded-2xl p-3"
          >
            <div className="aspect-[3/4] mb-2 rounded-lg overflow-hidden bg-[#f4f4f6]">
              <CardImage card={c} />
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[11px] px-1.5 py-0.5 rounded font-bold" style={{ background: PINK, color: "white" }}>
                #{c.rank}
              </span>
              <span className="text-[11px] text-black/55">{c.rarity}</span>
            </div>
            <div className="text-[13px] font-bold leading-tight">{c.nameKo}</div>
            <div className="text-[11px] text-black/50 mb-1">{c.cardNo}</div>

            <div className="text-[15px] font-black leading-tight" style={{ color: PINK }}>
              {formatKRW(jpyToKrw(c.marketPriceJPY))}
            </div>
            <div className="text-[11px] text-black/50">
              {formatJPY(c.marketPriceJPY)}
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-[12px] text-black/50 mt-5">
        {CONFIG.priceSource} · 실시간 시세 변동
      </p>
    </section>
  );
}

// ━━━ S09: Live Market ━━━
function S09_LiveMarket() {
  return (
    <section className="px-5 py-24">
      <div className="text-center mb-8">
        <span className="block text-[12px] tracking-[0.3em] font-bold mb-2" style={{ color: PINK }}>
          REAL MARKET
        </span>
        <h2 className="text-[28px] font-black leading-tight mb-3">
          저희가 부르는
          <br />
          <span style={{ color: PINK }}>가격이 아닙니다.</span>
        </h2>
        <p className="text-[13px] text-black/65 leading-relaxed">
          모든 시세는 <b className="text-black">일본 Mercari</b>의<br />
          실제 거래가 기준입니다.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 text-center glow-pink-border">
        <div className="text-[13px] text-black/65 mb-2 font-medium">
          메가팬텀 ex SAR — 최상위 한방
        </div>
        <div className="text-[52px] font-black mb-1 leading-none" style={{ color: PINK }}>
          {formatKRW(jpyToKrw(hitCards[0].marketPriceJPY))}
        </div>
        <div className="text-[13px] text-black/65 mb-2 font-medium">
          {formatJPY(hitCards[0].marketPriceJPY)}
        </div>
        <div className="text-[12px] text-black/45 mb-5">
미감정 시세 {formatJPY(hitCards[0].rawPriceJPY)} → 등급 받으면 약 {CONFIG.psa10Multiplier.SAR}배
        </div>
        <a
          href={hitCards[0].marketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[12px] text-black/85 underline decoration-black/40 underline-offset-4"
        >
          Mercari 실거래가 확인 ↗
        </a>
      </div>
    </section>
  );
}

// ━━━ S10: 상품 정보 ━━━
function S10_ProductInfo() {
  const rows: [string, string][] = [
    ["상품명", "포켓몬카드게임 하이클래스팩 MEGA 드림 ex"],
    ["일본명", product.originalTitle],
    ["출시일", "2025년 11월 28일"],
    ["일본 정가", `${product.officialMsrpJPY}엔`],
    ["구성", `1팩 ${product.cardsPerPack}장`],
    ["봉입", "랜덤"],
    ["원산지", "일본판 (정품)"],
  ];
  return (
    <section className="px-5 py-24">
      <span className="block text-center text-[12px] tracking-[0.3em] text-black/50 font-bold mb-2">
        PRODUCT INFO
      </span>
      <h2 className="text-[26px] font-black text-center leading-tight mb-6">
        MEGA 드림 ex는
        <br />
        어떤 팩인가요?
      </h2>

      {/* 박스 실 사진 + 사이드 비주얼 */}
      <div className="mb-8 relative rounded-3xl overflow-hidden p-8 min-h-[300px]"
        style={{
          background: "#fafafa",
          border: "1px solid #ececec",
        }}
      >
        <div className="flex items-end justify-center gap-3">
          {/* 일본판 박스 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mega-dream-ex/box_alt.webp"
            alt="MEGA 드림 ex 박스 (일본판)"
            className="h-[260px] w-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)]"
          />
          {/* 같은 일본판 1팩 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mega-dream-ex/pack_main.webp"
            alt="MEGA 드림 ex 1팩 (일본판)"
            className="h-[220px] w-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
            style={{ transform: "rotate(-4deg)" }}
          />
        </div>
        <p className="text-center text-[13px] text-black/55 mt-5 tracking-widest font-bold">
          🇯🇵 MEGA DREAM EX · M2a · JAPAN VERSION
        </p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        {rows.map(([k, v], i) => (
          <div key={k} className={`flex px-5 py-4 text-[14px] ${i !== rows.length - 1 ? "border-b border-black/8" : ""}`}>
            <span className="w-24 shrink-0 text-black/55">{k}</span>
            <span className="text-black/95 font-medium">{v}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[13px] text-black/70 leading-relaxed">
        메가진화 ex 카드와 AR/SAR/MUR 등 수집 가치가 높은 카드가 포함된 일본판
        하이클래스팩입니다.
      </p>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// ④ ACTION
// ══════════════════════════════════════════════════════════════

// ━━━ S11: Bundle Select (구성세트) ━━━
function S11_BundleSelect({
  bundle, setBundle,
}: { bundle: BundlePreset; setBundle: (b: BundlePreset) => void }) {
  return (
    <section id="bundle-select" className="px-5 py-24">
      <div className="text-center mb-3">
        <span
          className="inline-block text-[11px] tracking-[0.3em] font-black px-3 py-1.5 rounded-full"
          style={{ background: YELLOW, color: "#0a0a0a" }}
        >
          🎁 구성세트
        </span>
      </div>
      <h2 className="text-[28px] font-black text-center leading-tight mb-3">
        팩만 사면 끝?
        <br />
        <span style={{ color: PINK }}>터졌을 때</span>가 진짜.
      </h2>
      <p className="text-center text-[13px] text-black/65 mb-8 leading-relaxed">
        SAR 한 장 80만원짜리가 뜯자마자 휜다면?
        <br />
        <span className="text-black/50">탑로더/슬리브는 옵션이 아니라 보험입니다.</span>
      </p>

      <div className="space-y-3">
        {bundlePresets.map((p) => {
          const active = bundle.id === p.id;
          const save = p.basePriceKRW - p.finalPriceKRW;
          return (
            <button
              key={p.id}
              onClick={() => setBundle(p)}
              className={`w-full text-left rounded-2xl p-5 transition ${
                active ? "glow-pink-border" : "glass-card"
              }`}
              style={active ? { background: "rgba(255,91,168,0.06)" } : {}}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0`}
                    style={{
                      borderColor: active ? PINK : "rgba(255,255,255,0.3)",
                      background: active ? PINK : "transparent",
                    }}
                  >
                    {active && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <div className="text-[16px] font-black">{p.name}</div>
                </div>
                {p.badge && (
                  <span
                    className="text-[12px] px-2.5 py-1 rounded-full font-black"
                    style={{ background: YELLOW, color: "#0a0a0a" }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-black/60 mb-3 pl-9">{p.tagline}</p>

              <ul className="space-y-1.5 mb-4 pl-9">
                {p.includes.map((it, i) => (
                  <li key={i} className="text-[13px] text-black/85 leading-snug">
                    · {it}
                  </li>
                ))}
              </ul>

              <div className="pl-9 flex items-baseline gap-2 flex-wrap">
                {save > 0 && (
                  <span className="text-[13px] text-black/40 line-through">
                    {formatKRW(p.basePriceKRW)}
                  </span>
                )}
                <span className="text-[22px] font-black leading-none" style={{ color: active ? PINK : "white" }}>
                  {formatKRW(p.finalPriceKRW)}
                </span>
                {save > 0 && (
                  <span className="text-[12px] font-black px-2 py-0.5 rounded" style={{ background: PINK, color: "white" }}>
                    −{formatKRW(save)}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 개별 옵션 안내 */}
      <div className="mt-6 glass-card rounded-2xl p-5">
        <div className="text-[12px] text-black/55 tracking-widest mb-3 font-bold">개별 옵션</div>
        <div className="space-y-3">
          {bundleOptions.map((o) => (
            <div key={o.id} className="flex items-start justify-between gap-3 pb-3 border-b border-black/8 last:border-0 last:pb-0">
              <div>
                <div className="text-[13px] font-bold mb-0.5">{o.name}</div>
                <div className="text-[12px] text-black/55 leading-snug">{o.desc}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[12px] text-black/40 line-through">{formatKRW(o.priceKRW)}</div>
                <div className="text-[13px] font-bold" style={{ color: PINK }}>
                  세트 {formatKRW(o.bundlePriceKRW)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ━━━ S12: Trust Notice ━━━
function S12_TrustNotice() {
  const checks = [
    "카드는 랜덤 봉입입니다.",
    "특정 카드 당첨을 보장하지 않습니다.",
    "카드 시세는 실시간으로 변동됩니다.",
    "개봉 후에는 상품 특성상 단순 변심 환불이 어렵습니다.",
    "이미지는 이해를 돕기 위한 예시이며, 실제 수령 카드와 다를 수 있습니다.",
  ];
  return (
    <section className="px-5 py-24">
      <span className="block text-center text-[12px] tracking-[0.3em] font-bold mb-2" style={{ color: PINK }}>
        BEFORE YOU BUY
      </span>
      <h2 className="text-[26px] font-black text-center leading-tight mb-8">
        랜덤팩 구매 전,
        <br />
        꼭 확인하세요.
      </h2>
      <div className="space-y-2.5">
        {checks.map((c, i) => (
          <div key={i} className="glass-card rounded-xl px-5 py-4 flex gap-3 items-start">
            <span style={{ color: PINK }} className="text-[15px] mt-0.5 font-black">✓</span>
            <span className="text-[14px] text-black/90 leading-relaxed">{c}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ━━━ S13: FAQ ━━━
function S13_FAQ() {
  const qas = [
    { q: "1팩에 몇 장 들어있나요?", a: "1팩에 카드 10장이 랜덤으로 들어있습니다." },
    { q: "힛카드가 무조건 나오나요?", a: "아닙니다. 모든 카드는 랜덤 봉입이며 특정 카드 당첨을 보장하지 않습니다." },
    { q: "일본판인가요? 한국판이랑 어떻게 달라요?", a: "네, 일본판 정품입니다. 한국판 대비 일본판 SAR/MUR이 평균 3~5배 시세가 형성되어 있습니다." },
    { q: "카드 시세는 어떻게 정해진 건가요?", a: "일본 Mercari의 실제 거래가를 평균낸 값입니다. 시세는 매일 바뀌기 때문에 각 카드를 탭하면 Mercari 검색 페이지로 바로 이동해서 직접 확인하실 수 있어요." },
    { q: "서치팩 아닌가요?", a: "일본판은 봉랍/포장 라인 특성상 서치 자체가 어렵습니다. 저희는 일본 박스를 그대로 받아 봉인된 상태로 출고합니다." },
    { q: "개봉 후 환불 가능한가요?", a: "랜덤 상품 특성상 개봉 후 단순 변심 환불은 제한될 수 있습니다." },
    { q: "탑로더/케이스는 일본 정품인가요?", a: "탑로더는 PVC 35pt 규격품, 슬리브는 일본 정식 사이즈, 하드케이스는 130pt 매그네틱입니다." },
  ];
  return (
    <section className="px-5 py-24">
      <span className="block text-center text-[12px] tracking-[0.3em] text-black/50 font-bold mb-2">FAQ</span>
      <h2 className="text-[26px] font-black text-center mb-8">자주 묻는 질문</h2>
      <div className="space-y-3">
        {qas.map((qa, i) => (
          <details key={i} className="glass-card rounded-2xl px-5 py-4 group">
            <summary className="flex items-center justify-between cursor-pointer list-none gap-3">
              <span className="text-[14px] font-bold flex gap-2 flex-1">
                <span style={{ color: PINK }}>Q.</span>
                {qa.q}
              </span>
              <span className="text-black/50 group-open:rotate-180 transition shrink-0">▾</span>
            </summary>
            <p className="mt-3 text-[13px] text-black/80 leading-relaxed pl-6">{qa.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ━━━ S14: BuyBox ━━━
function S14_BuyBox({
  bundle, qty, setQty,
}: { bundle: BundlePreset; qty: number; setQty: (n: number) => void }) {
  const total = bundle.finalPriceKRW * qty;
  const baseTotal = bundle.basePriceKRW * qty;
  const save = baseTotal - total;

  const [buyerName, setBuyerName] = useState("");
  const [buyerTel, setBuyerTel] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [paying, setPaying] = useState(false);

  const handlePay = async () => {
    if (paying) return;
    if (!buyerName.trim()) { alert("구매자 이름을 입력해주세요."); return; }
    if (!buyerTel.trim() || buyerTel.replace(/\D/g, "").length < 9) {
      alert("연락처를 정확히 입력해주세요."); return;
    }
    setPaying(true);
    try {
      const res = await payWithKeonheung({
        amount: total,
        itemName: `${product.title} - ${bundle.name} × ${qty}`,
        userName: buyerName.trim(),
        userTel: buyerTel.replace(/\D/g, ""),
        userEmail: buyerEmail.trim() || undefined,
        udf1: bundle.id,
        udf2: String(qty),
      });
      alert(`✅ 결제 완료\n승인번호: ${res.pay?.authCd}\n거래번호: ${res.pay?.trxId}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      alert(`❌ 결제 실패: ${msg}`);
    } finally {
      setPaying(false);
    }
  };

  return (
    <section id="buy-box" className="px-5 py-20">
      <div className="glass-card rounded-3xl p-6 glow-pink-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[12px] text-black/55 mb-1">선택: {bundle.name}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] text-black/40 line-through">
                {formatKRW(bundle.basePriceKRW)}
              </span>
              <span className="text-[11px] font-black px-1.5 py-0.5 rounded" style={{ background: PINK, color: "white" }}>
                −{Math.round((1 - bundle.finalPriceKRW / bundle.basePriceKRW) * 100)}%
              </span>
            </div>
            <div className="text-[32px] font-black leading-tight">{formatKRW(bundle.finalPriceKRW)}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold mb-1" style={{ color: PINK }}>LIMITED</div>
            <div className="text-[11px] text-black/45">DROP SYSTEM</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 py-3 border-t border-black/12">
          <span className="text-[14px] text-black/75">수량</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-full border border-black/15 text-xl">−</button>
            <span className="w-8 text-center text-[15px] font-bold">{qty}</span>
            <button onClick={() => setQty(Math.min(10, qty + 1))} className="w-10 h-10 rounded-full border border-black/15 text-xl">+</button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5 pb-4 border-b border-black/12">
          <span className="text-[14px] text-black/75">
            결제 금액
            {save > 0 && qty >= 1 && (
              <span className="block text-[12px] text-black/45 mt-0.5">
                정가 대비 {formatKRW(save)} 할인
              </span>
            )}
          </span>
          <span className="text-[22px] font-black leading-none" style={{ color: PINK }}>
            {formatKRW(total)}
          </span>
        </div>

        {/* 구매자 정보 */}
        <div className="space-y-2.5 mb-5">
          <div>
            <label className="block text-[12px] text-black/55 mb-1.5 font-medium">구매자 이름</label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="홍길동"
              className="w-full px-4 py-3 rounded-xl border border-black/15 text-[13px] focus:outline-none focus:border-[#FF5BA8]"
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-[12px] text-black/55 mb-1.5 font-medium">연락처</label>
            <input
              type="tel"
              value={buyerTel}
              onChange={(e) => setBuyerTel(e.target.value)}
              placeholder="010-0000-0000"
              className="w-full px-4 py-3 rounded-xl border border-black/15 text-[13px] focus:outline-none focus:border-[#FF5BA8]"
              autoComplete="tel"
            />
          </div>
          <div>
            <label className="block text-[12px] text-black/55 mb-1.5 font-medium">이메일 (선택)</label>
            <input
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-black/15 text-[13px] focus:outline-none focus:border-[#FF5BA8]"
              autoComplete="email"
            />
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={paying}
          className="w-full py-4 rounded-full font-bold text-[14px] mb-2.5 animate-pulse-glow disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: PINK, color: "white" }}
        >
          {paying ? "결제창 준비중…" : `${formatKRW(total)} 결제하기`}
        </button>

        <div className="mt-5 text-[12px] text-black/50 leading-relaxed space-y-1.5">
          <p>• 신용카드 결제 — 건흥페이먼츠(GH Payments)</p>
          <p>• 개봉 전 상품 기준 교환/환불 가능</p>
          <p>• 개봉 후 랜덤 상품 특성상 단순 변심 환불 제한</p>
        </div>
      </div>
    </section>
  );
}

// ━━━ S15: Final CTA ━━━
function S15_FinalCTA({ bundle }: { bundle: BundlePreset }) {
  return (
    <section className="px-5 py-28 text-center relative overflow-hidden">
      <div className="absolute inset-0 radial-burst opacity-50 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full opacity-50 blur-3xl"
        style={{ background: `radial-gradient(circle, ${PINK} 0%, transparent 70%)` }}
      />
      <div className="relative z-10">
        <p className="text-[13px] text-black/55 mb-4">박스 안 사도 됩니다.</p>
        <h2 className="text-[34px] font-black leading-tight mb-6">
          메가드림 EX,
          <br />
          <span style={{ color: PINK }} className="text-glow-pink">1팩</span>부터.
        </h2>
        <p className="text-[13px] text-black/50 mb-2">선택: {bundle.name}</p>
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-[16px] text-black/50 line-through">
            {formatKRW(bundle.basePriceKRW)}
          </span>
          <span className="text-[12px] font-black px-2 py-0.5 rounded" style={{ background: PINK, color: "white" }}>
            −{Math.round((1 - bundle.finalPriceKRW / bundle.basePriceKRW) * 100)}%
          </span>
        </div>
        <div className="text-[48px] font-black mb-3 leading-none" style={{ color: "#0a0a0a" }}>
          {formatKRW(bundle.finalPriceKRW)}
        </div>
        <p className="text-[12px] mb-6 font-bold" style={{ color: "#E60020" }}>
          🔥 마지막 특가 — 잠시 후 정가 복귀
        </p>
        <button
          onClick={() => scrollToId("buy-box")}
          className="w-full max-w-[320px] py-4 rounded-full font-bold text-[15px] animate-pulse-glow mx-auto block"
          style={{ background: PINK, color: "white" }}
        >
          지금 1팩 열기 →
        </button>
        <p className="mt-5 text-[12px] text-black/50">
          랜덤 봉입 · 특정 카드 당첨 보장 없음
        </p>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
// SHARED
// ══════════════════════════════════════════════════════════════

function StickyCTA({ bundle, qty }: { bundle: BundlePreset; qty: number }) {
  const [show, setShow] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // 스크롤 감지
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 시작/만료시각 (sessionStorage 보존)
  const [startedAt, setStartedAt] = useState<number>(0);
  const TOTAL_MS = 10 * 60 * 1000;
  useEffect(() => {
    const KEY = "ph_deal_started_at";
    let s = Number(sessionStorage.getItem(KEY) || 0);
    const t = Date.now();
    if (!s || t - s > TOTAL_MS) {
      s = t;
      sessionStorage.setItem(KEY, String(s));
    }
    setStartedAt(s);

    // 50ms 틱 — ms 단위 카운트
    let raf = 0;
    const tick = () => {
      setNow(Date.now());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show || !startedAt) return null;

  const elapsed = Math.min(TOTAL_MS, now - startedAt);
  const remainingMs = Math.max(0, TOTAL_MS - elapsed);

  // 만료되면 재시작
  if (remainingMs === 0) {
    sessionStorage.setItem("ph_deal_started_at", String(Date.now()));
    setStartedAt(Date.now());
    return null;
  }

  // 표시
  const totalSec = Math.floor(remainingMs / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  const ms = String(Math.floor((remainingMs % 1000) / 10)).padStart(2, "0"); // 1/100초

  // 진행 바 (잔여율) — 처음 3분 동안 80% 줄어들도록 비선형
  // t = elapsed / TOTAL_MS  (0 ~ 1)
  // bar(t)  — t=0 → 1, t=0.3 → 0.2, t=1 → 0
  // 두 구간 선형:
  //   0 ≤ t < 0.3:  bar = 1 - (0.8 * t/0.3) = 1 - 2.667t
  //   0.3 ≤ t ≤ 1:  bar = 0.2 - (0.2 * (t-0.3)/0.7)
  const t = elapsed / TOTAL_MS;
  let barRatio: number;
  if (t < 0.3) barRatio = 1 - (0.8 * t) / 0.3;
  else barRatio = Math.max(0, 0.2 - (0.2 * (t - 0.3)) / 0.7);

  const total = bundle.finalPriceKRW * qty;
  const baseTotal = bundle.basePriceKRW * qty;
  const urgent = remainingMs <= 60 * 1000;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="w-full pointer-events-auto">
        {/* 통합 검정 카드 — 바닥/좌우 풀폭, 라운드 없이 */}
        <div
          className="overflow-hidden"
          style={{
            background: "#0a0a0a",
            boxShadow: "0 -8px 30px rgba(0,0,0,0.18), 0 -2px 14px rgba(255,91,168,0.25)",
          }}
        >
          {/* 타이머 + 특가 라벨 띠 */}
          <div className="px-4 pt-2.5 pb-2">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 shrink min-w-0">
                <span className="text-[12px] shrink-0">🔥</span>
                <span
                  className="text-[11px] font-black tracking-wide whitespace-nowrap"
                  style={{ color: urgent ? "#FF4D6A" : "#FFD400" }}
                >
                  마지막 특가 종료까지
                </span>
              </div>
              <div
                className="flex items-baseline gap-0.5 font-mono font-black tabular-nums shrink-0"
                style={{ color: urgent ? "#FF4D6A" : "#fff" }}
              >
                <span className="text-[13px] px-1.5 py-0.5 rounded bg-white/10 w-[30px] text-center inline-block">{mm}</span>
                <span className="text-[12px]">:</span>
                <span className="text-[13px] px-1.5 py-0.5 rounded bg-white/10 w-[30px] text-center inline-block">{ss}</span>
                <span className="text-[11px] opacity-80 ml-0.5 w-[22px] inline-block">.{ms}</span>
              </div>
            </div>

            {/* 잔여 바 (3분 만에 80% 소진) */}
            <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden relative">
              <div
                className="h-full rounded-full transition-none"
                style={{
                  width: `${barRatio * 100}%`,
                  background: urgent
                    ? "linear-gradient(90deg, #FF4D6A, #FF8FA8)"
                    : `linear-gradient(90deg, ${PINK}, ${YELLOW})`,
                  boxShadow: urgent
                    ? "0 0 8px rgba(255,77,106,0.7)"
                    : "0 0 8px rgba(255,91,168,0.6)",
                }}
              />
            </div>
          </div>

          {/* 구매 버튼 */}
          <button
            onClick={() => scrollToId("buy-box")}
            className="w-full py-3.5 font-black flex items-center justify-between px-4 animate-pulse-glow"
            style={{ background: PINK, color: "white" }}
          >
            <span className="text-left leading-tight">
              <div className="text-[11px] opacity-90 font-medium mb-0.5">
                {bundle.name} × {qty}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[12px] line-through opacity-70">
                  {formatKRW(baseTotal)}
                </span>
                <span className="text-[17px]">{formatKRW(total)}</span>
              </div>
            </span>
            <span className="text-[15px] font-black flex items-center gap-1 whitespace-nowrap">
              지금 구매 <span className="text-[16px]">→</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function HitCardModal({ card, onClose }: { card: HitCard; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={onClose}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-[440px] glass-card rounded-t-3xl sm:rounded-3xl p-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block text-[11px] px-2 py-0.5 rounded font-bold mb-2" style={{ background: PINK, color: "white" }}>
              RANK #{card.rank}
            </span>
            <div className="text-[11px] text-black/50">{card.label}</div>
          </div>
          <button onClick={onClose} className="text-black/55 text-xl px-2">✕</button>
        </div>

        <div className="aspect-[3/4] mb-5 rounded-2xl overflow-hidden bg-[#f4f4f6] max-w-[280px] mx-auto">
          <CardImage card={card} />
        </div>

        <div className="space-y-1 mb-5 text-center">
          <div className="text-[18px] font-black">{card.nameKo}</div>
          <div className="text-[12px] text-black/55">{card.nameJa}</div>
          <div className="text-[12px] text-black/40">{card.nameEn}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[12px] mb-5">
          <InfoCell k="레어도" v={card.rarity} />
          <InfoCell k="카드번호" v={card.cardNo} />
          <InfoCell k="기준일" v={CONFIG.priceBaseDate} />
          <InfoCell k="출처" v="Mercari" />
        </div>

        <div className="glass-card rounded-2xl p-5 mb-4 text-center">
          <div className="text-[13px] text-black/55 mb-3 font-medium">메루카리 거래가</div>
          <div className="text-[38px] font-black leading-none text-glow-pink" style={{ color: PINK }}>
            {formatKRW(jpyToKrw(card.marketPriceJPY))}
          </div>
          <div className="text-[12px] text-black/55 mt-2 font-medium">
            {formatJPY(card.marketPriceJPY)} (Mercari)
          </div>
          <div className="text-[11px] text-black/45 mt-2 pt-2 border-t border-black/8">
            미감정 raw 시세 {formatJPY(card.rawPriceJPY)}
            <br />
<span className="text-black/35">등급 받으면 약 {(card.marketPriceJPY/card.rawPriceJPY).toFixed(1)}배</span>
          </div>
          <div className="text-[11px] text-black/40 mt-2">※ 시세는 실시간 변동 가능</div>
        </div>

        <a
          href={card.marketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center py-3.5 rounded-full font-bold text-[13px] mb-2"
          style={{ background: PINK, color: "white" }}
        >
          Mercari 실거래가 보기 ↗
        </a>
        <button onClick={onClose} className="w-full py-3 rounded-full text-[13px] border border-black/15 text-black/75">
          닫기
        </button>
      </motion.div>
    </div>
  );
}

function InfoCell({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[#f4f4f6] rounded-lg px-3 py-2">
      <div className="text-[11px] text-black/50 mb-0.5">{k}</div>
      <div className="font-bold">{v}</div>
    </div>
  );
}

function CompareCard({
  title, price, items, dim, highlight,
}: {
  title: string; price: string; items: string[]; dim?: boolean; highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${highlight ? "glow-pink-border" : "border border-black/12"} ${dim ? "opacity-60" : ""}`}
      style={{ background: highlight ? "rgba(255,91,168,0.08)" : "#fafafa" }}
    >
      <div className="text-[13px] text-black/60 mb-1.5 font-bold">{title}</div>
      <div
        className={`text-[20px] font-black mb-4 ${dim ? "line-through text-black/55" : ""}`}
        style={highlight ? { color: PINK } : {}}
      >
        {price}
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="text-[13px] leading-snug text-black/90">{it}</li>
        ))}
      </ul>
    </div>
  );
}

function CompareRow({
  ko, jp,
}: { ko: [string, React.ReactNode]; jp: [string, React.ReactNode] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-xl p-4 border border-black/15 opacity-70">
        <div className="text-[12px] text-black/55 mb-2 font-bold">🇰🇷 {ko[0]}</div>
        <div className="text-[12px] text-black/75 leading-relaxed">{ko[1]}</div>
      </div>
      <div className="rounded-xl p-4" style={{ background: "rgba(255,91,168,0.08)", border: `1.5px solid ${PINK}88` }}>
        <div className="text-[12px] mb-2 font-bold" style={{ color: PINK }}>🇯🇵 {jp[0]}</div>
        <div className="text-[12px] text-black leading-relaxed">{jp[1]}</div>
      </div>
    </div>
  );
}

function FakeReview({
  name, tag, body,
}: { name: string; tag: string; body: string }) {
  // 본문 안의 핵심 키워드들을 자동으로 강조 (굵게 + 키컬러)
  const highlights = [
    "27만원 그냥 날렸어요",
    "80만원에 샀습니다",
    "운빨 게임",
    "1팩씩만 사기로 했습니다",
    "8만원도 안",
    "1팩씩 사서 운만",
  ];
  const renderBody = (text: string) => {
    // 본문 줄 단위로 처리
    return text.split("\n").map((line, lineIdx) => {
      let parts: (string | { strong: string })[] = [line];
      for (const kw of highlights) {
        const next: (string | { strong: string })[] = [];
        for (const p of parts) {
          if (typeof p !== "string") { next.push(p); continue; }
          const idx = p.indexOf(kw);
          if (idx === -1) { next.push(p); continue; }
          if (idx > 0) next.push(p.slice(0, idx));
          next.push({ strong: kw });
          const rest = p.slice(idx + kw.length);
          if (rest) next.push(rest);
        }
        parts = next;
      }
      return (
        <span key={lineIdx} className="block">
          {parts.map((p, i) =>
            typeof p === "string"
              ? <span key={i}>{p}</span>
              : <b key={i} style={{ color: PINK }}>{p.strong}</b>
          )}
        </span>
      );
    });
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-[13px] font-bold">
          {name[0]}
        </div>
        <div>
          <div className="text-[14px] font-bold">{name}</div>
          <div className="text-[12px] text-black/50">{tag}</div>
        </div>
      </div>
      <p className="text-[13px] leading-relaxed text-black/85 whitespace-pre-line">
        {renderBody(body)}
      </p>
    </div>
  );
}

function Reassure({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div
        className="text-[12px] font-black w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ background: PINK, color: "white" }}
      >
        {n}
      </div>
      <div>
        <div className="text-[15px] font-bold mb-1.5">{title}</div>
        <div className="text-[13px] text-black/75 leading-relaxed">{body}</div>
      </div>
    </div>
  );
}

function Stroke({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ textDecoration: "line-through", textDecorationColor: PINK, textDecorationThickness: "3px" }}>
      {children}
    </span>
  );
}
function Underline({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="underline decoration-4 underline-offset-4" style={{ textDecorationColor: color || PINK }}>
      {children}
    </span>
  );
}
function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="font-black" style={{ color: PINK }}>{children}</span>;
}

function Sparkle({
  top, left, right, bottom, delay = 0,
}: { top?: string; left?: string; right?: string; bottom?: string; delay?: number }) {
  return (
    <div
      className="absolute animate-pulse"
      style={{ top, left, right, bottom, animationDelay: `${delay}s` }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={YELLOW} opacity="0.9" />
      </svg>
    </div>
  );
}

// ━━━ Card Image (실 jpg 우선 → SVG fallback) ━━━
function CardImage({ card }: { card: HitCard }) {
  const realPath = `/images/mega-dream-ex/${card.imageFile.replace(".webp", ".jpg")}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={realPath}
      alt={`${card.nameKo} ${card.rarity} ${card.cardNo}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        imageRendering: "auto",
        background: "#0a0a0a",
      }}
      onError={(e) => {
        const t = e.currentTarget;
        t.onerror = null;
        t.src = `data:image/svg+xml;utf8,${encodeURIComponent(cardSvg(card))}`;
      }}
    />
  );
}

function cardSvg(card: HitCard) {
  const styles: Record<string, { bg1: string; bg2: string; accent: string; aura: string; symbol: string }> = {
    "240/193": { bg1: "#2a0a3a", bg2: "#0a0014", accent: "#c084fc", aura: "#a855f7", symbol: "👻" },
    "234/193": { bg1: "#3a2f00", bg2: "#1a1400", accent: "#fde047", aura: "#facc15", symbol: "⚡" },
    "250/193": { bg1: "#3a1500", bg2: "#1a0700", accent: "#fb923c", aura: "#f97316", symbol: "🐉" },
    "246/193": { bg1: "#3a1500", bg2: "#1a0700", accent: "#fb923c", aura: "#f97316", symbol: "🐉" },
    "237/193": { bg1: "#2a0a3a", bg2: "#0a0014", accent: "#c084fc", aura: "#a855f7", symbol: "✦" },
    "223/193": { bg1: "#3a0a00", bg2: "#1a0400", accent: "#fb7185", aura: "#e11d48", symbol: "🔥" },
    "242/193": { bg1: "#1a002a", bg2: "#0a0014", accent: "#a78bfa", aura: "#8b5cf6", symbol: "🌑" },
    "236/193": { bg1: "#2a2200", bg2: "#0f0a00", accent: "#fde047", aura: "#eab308", symbol: "⚡" },
    "243/193": { bg1: "#1a0033", bg2: "#0a0014", accent: "#f0abfc", aura: "#d946ef", symbol: "💜" },
    "230/193": { bg1: "#2a0a3a", bg2: "#0a0014", accent: "#c084fc", aura: "#a855f7", symbol: "👻" },
  };
  const p = styles[card.cardNo] || styles["240/193"];
  const holo = card.rarity === "SAR" || card.rarity === "MUR";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${p.bg1}"/><stop offset="100%" stop-color="${p.bg2}"/></linearGradient>
<radialGradient id="aura" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="${p.aura}" stop-opacity="0.7"/><stop offset="100%" stop-color="${p.aura}" stop-opacity="0"/></radialGradient>
<linearGradient id="holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ff00ff" stop-opacity="0.18"/><stop offset="50%" stop-color="#00ffff" stop-opacity="0.10"/><stop offset="100%" stop-color="#ffff00" stop-opacity="0.15"/></linearGradient>
<linearGradient id="shine" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stop-color="white" stop-opacity="0.35"/><stop offset="50%" stop-color="white" stop-opacity="0"/><stop offset="100%" stop-color="white" stop-opacity="0.15"/></linearGradient>
</defs>
<rect width="300" height="420" fill="url(#bg)"/>
<rect width="300" height="420" fill="url(#aura)"/>
${holo ? '<rect width="300" height="420" fill="url(#holo)"/>' : ""}
<rect width="300" height="420" fill="url(#shine)"/>
<rect x="6" y="6" width="288" height="408" rx="14" fill="none" stroke="${p.accent}" stroke-width="2.5" opacity="0.85"/>
<rect x="14" y="14" width="272" height="50" rx="6" fill="black" opacity="0.55"/>
<text x="24" y="46" font-size="14" fill="${p.accent}" font-family="-apple-system,sans-serif" font-weight="900" letter-spacing="2">${card.rarity}</text>
<text x="276" y="46" font-size="11" fill="white" font-family="-apple-system,sans-serif" text-anchor="end" opacity="0.7">${card.cardNo}</text>
<rect x="22" y="80" width="256" height="170" rx="10" fill="black" opacity="0.45" stroke="${p.accent}" stroke-opacity="0.4"/>
<text x="150" y="195" font-size="100" text-anchor="middle" font-family="-apple-system,sans-serif" opacity="0.95" style="filter: drop-shadow(0 0 12px ${p.aura});">${p.symbol}</text>
<text x="150" y="290" font-size="20" fill="white" text-anchor="middle" font-family="-apple-system,sans-serif" font-weight="900">${escapeXml(card.nameKo)}</text>
<text x="150" y="312" font-size="11" fill="${p.accent}" text-anchor="middle" font-family="-apple-system,sans-serif" font-weight="600" opacity="0.85">${escapeXml(card.nameJa)}</text>
<rect x="40" y="335" width="220" height="46" rx="23" fill="black" opacity="0.7"/>
<text x="150" y="365" font-size="20" fill="${p.accent}" text-anchor="middle" font-family="-apple-system,sans-serif" font-weight="900">¥${card.marketPriceJPY.toLocaleString()}</text>
<text x="150" y="402" font-size="9" fill="white" text-anchor="middle" font-family="-apple-system,sans-serif" opacity="0.45" letter-spacing="2">RANK #${card.rank} · MEGA DREAM EX</text>
</svg>`;
}
function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ━━━ Scroll Reveal: 뷰포트 진입 시 fade-in/up ━━━
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.985 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ━━━ Scroll Orbs: 스크롤에 따라 떠다니는 핑크/옐로우 부유 안개 ━━━
function ScrollOrbs() {
  const { scrollYProgress } = useScroll();
  // 각 오브가 페이지를 가로지르며 다른 속도로 이동
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "180%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "240%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);
  const rot1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rot2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 핑크 오브 1 */}
      <motion.div
        style={{ y: y1, rotate: rot1 }}
        className="absolute top-[10vh] left-[-15vw] w-[55vw] h-[55vw] rounded-full blur-[80px]"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(255,91,168,0.17), transparent 65%)" }} />
      </motion.div>

      {/* 옐로우 오브 */}
      <motion.div
        style={{ y: y2, rotate: rot2 }}
        className="absolute top-[40vh] right-[-20vw] w-[60vw] h-[60vw] rounded-full blur-[90px]"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(255,212,0,0.15), transparent 65%)" }} />
      </motion.div>

      {/* 핑크 오브 2 */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[75vh] left-[20vw] w-[45vw] h-[45vw] rounded-full blur-[70px]"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(255,91,168,0.12), transparent 65%)" }} />
      </motion.div>

      {/* 옐로우 작은 오브 */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-[55vh] left-[60vw] w-[35vw] h-[35vw] rounded-full blur-[60px]"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(255,212,0,0.1), transparent 65%)" }} />
      </motion.div>
    </div>
  );
}

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
