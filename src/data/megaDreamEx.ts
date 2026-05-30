// Pack House — MEGA 드림 ex 상품 데이터
// 환율은 고정값 (config). 시세 변동 고지는 UI에서 노출.

export const CONFIG = {
  exchangeRateJPYKRW: 9.5, // 1 JPY = 9.5 KRW (대략값, 변동 가능)
  priceBaseDate: "2026.05.30",
  priceSource: "Mercari PSA10 거래가 기준",
  // PSA10 등급 카드는 raw(미감정) 대비 평균 2.2~3.0배 프리미엄으로 거래됨
  psa10Multiplier: {
    SAR: 2.6,
    MUR: 2.4,
    MA: 2.0,
    AR: 1.8,
    UR: 2.8,
  } as Record<string, number>,
};

export const product = {
  id: "mega-dream-ex-jp-pack",
  slug: "mega-dream-ex",
  brand: "Pack House",
  title: "포켓몬카드 일본판 MEGA 드림 ex 1팩",
  originalTitle: "ポケモンカードゲーム ハイクラスパック MEGAドリームex",
  priceKRW: 17000,
  listPriceKRW: 30000,  // 정가 (앵커)
  currency: "KRW",
  origin: "일본판",
  packType: "하이클래스팩",
  cardsPerPack: 10,
  officialMsrpJPY: 550,
  releaseDate: "2025-11-28",
  notice: "카드는 랜덤으로 봉입되어 있으며, 특정 카드 당첨을 보장하지 않습니다.",
} as const;

export type HitCard = {
  rank: number;
  nameKo: string;
  nameJa: string;
  nameEn: string;
  rarity: "SAR" | "MUR" | "MA" | "AR" | "UR";
  cardNo: string;
  marketPriceJPY: number;       // PSA10 시세 (메루카리 거래가)
  rawPriceJPY: number;          // 미감정 raw 시세 (앵커용)
  imageFile: string;
  label: string;
  marketUrl: string;            // PSA10 검색 링크
};

const mercariPSA = (q: string) =>
  `https://jp.mercari.com/search?keyword=${encodeURIComponent(q + " PSA10")}&status=on_sale,sold_out`;

// 원본 raw 시세 (yuyu-tei 기반)
const rawCards = [
  { rank: 1,  no: "240/193", rarity: "SAR" as const, raw: 78100, nameKo: "메가팬텀 ex",       nameJa: "メガゲンガーex",      nameEn: "Mega Gengar ex",         label: "최상위 힛카드" },
  { rank: 2,  no: "234/193", rarity: "SAR" as const, raw: 63600, nameKo: "피카츄 ex",         nameJa: "ピカチュウex",         nameEn: "Pikachu ex",             label: "인기 캐릭터" },
  { rank: 3,  no: "250/193", rarity: "MUR" as const, raw: 54750, nameKo: "메가망나뇽 ex",     nameJa: "メガカイリューex",     nameEn: "Mega Dragonite ex",      label: "MUR 희귀 카드" },
  { rank: 4,  no: "246/193", rarity: "SAR" as const, raw: 43280, nameKo: "메가망나뇽 ex",     nameJa: "メガカイリューex",     nameEn: "Mega Dragonite ex",      label: "상위 SAR" },
  { rank: 5,  no: "237/193", rarity: "SAR" as const, raw: 31067, nameKo: "로켓단의 뮤츠 ex", nameJa: "ロケット団のミュウツーex", nameEn: "Team Rocket's Mewtwo ex", label: "로켓단 인기 카드" },
  { rank: 6,  no: "223/193", rarity: "MA" as const,  raw: 11135, nameKo: "메가리자몽X ex",   nameJa: "メガリザードンXex",     nameEn: "Mega Charizard X ex",    label: "리자몽 라인" },
  { rank: 7,  no: "242/193", rarity: "SAR" as const, raw: 8994,  nameKo: "N의 조로아크 ex",   nameJa: "Nのゾロアークex",      nameEn: "N's Zoroark ex",         label: "캐릭터 SAR" },
  { rank: 8,  no: "236/193", rarity: "SAR" as const, raw: 7754,  nameKo: "난자모의 하라바리 ex", nameJa: "ナンジャモのハラバリーex", nameEn: "Iono's Bellibolt ex",    label: "인기 트레이너 라인" },
  { rank: 9,  no: "243/193", rarity: "SAR" as const, raw: 6567,  nameKo: "마리의 오롱털 ex",  nameJa: "マリィのオーロンゲex", nameEn: "Marnie's Grimmsnarl ex", label: "마리 라인" },
  { rank: 10, no: "230/193", rarity: "MA" as const,  raw: 5200,  nameKo: "메가팬텀 ex",       nameJa: "メガゲンガーex",       nameEn: "Mega Gengar ex",         label: "MA 인기 카드" },
];

// 파일명 매핑
const fileMap: Record<string, string> = {
  "240/193": "240-mega-gengar-ex-sar.webp",
  "234/193": "234-pikachu-ex-sar.webp",
  "250/193": "250-mega-dragonite-ex-mur.webp",
  "246/193": "246-mega-dragonite-ex-sar.webp",
  "237/193": "237-team-rockets-mewtwo-ex-sar.webp",
  "223/193": "223-mega-charizard-x-ex-ma.webp",
  "242/193": "242-ns-zoroark-ex-sar.webp",
  "236/193": "236-ionos-bellibolt-ex-sar.webp",
  "243/193": "243-marnies-grimmsnarl-ex-sar.webp",
  "230/193": "230-mega-gengar-ex-ma.webp",
};

export const hitCards: HitCard[] = rawCards.map((c) => {
  const mult = CONFIG.psa10Multiplier[c.rarity] ?? 2.0;
  const psa10Price = Math.round((c.raw * mult) / 100) * 100; // 100엔 단위 라운드
  return {
    rank: c.rank,
    nameKo: c.nameKo,
    nameJa: c.nameJa,
    nameEn: c.nameEn,
    rarity: c.rarity,
    cardNo: c.no,
    rawPriceJPY: c.raw,
    marketPriceJPY: psa10Price,
    imageFile: fileMap[c.no],
    label: c.label,
    marketUrl: mercariPSA(`${c.nameJa} ${c.rarity}`),
  };
});

export const formatJPY = (n: number) => `¥${n.toLocaleString("ja-JP")}`;
export const formatKRW = (n: number) => `${n.toLocaleString("ko-KR")}원`;
export const jpyToKrw = (jpy: number) =>
  Math.round(jpy * CONFIG.exchangeRateJPYKRW);

// ──────────────────────────────────────────────────────────
// 구성품 / 번들 옵션 (탑로더, 카드케이스)
// ──────────────────────────────────────────────────────────
export type BundleOption = {
  id: string;
  name: string;
  desc: string;
  priceKRW: number;        // 단품가 (앵커)
  bundlePriceKRW: number;  // 함께 살 때 할인가
  image?: string;
};

export const bundleOptions: BundleOption[] = [
  {
    id: "toploader",
    name: "탑로더 (Top Loader)",
    desc: "메인 힛카드가 터졌을 때 즉시 보호. 35pt 두께 / PVC",
    priceKRW: 1500,
    bundlePriceKRW: 900,
  },
  {
    id: "sleeve",
    name: "카드 슬리브 60매",
    desc: "10장 전부 1차 보호. 일본 정식 사이즈 (66×91mm)",
    priceKRW: 4000,
    bundlePriceKRW: 2500,
  },
  {
    id: "case",
    name: "하드 카드 케이스",
    desc: "메가팬텀급 SAR 한 장 전용 매그네틱 케이스 / 130pt",
    priceKRW: 6000,
    bundlePriceKRW: 3900,
  },
];

// 프리셋 번들 (구성세트)
export type BundlePreset = {
  id: string;
  name: string;
  tagline: string;
  includes: string[];
  packs: number;
  bundles: string[]; // bundleOptions id
  basePriceKRW: number;     // 정가 합 (앵커용)
  finalPriceKRW: number;    // 최종가
  badge?: string;
};

export const bundlePresets: BundlePreset[] = [
  {
    id: "single",
    name: "1팩 단품",
    tagline: "딱 한 번, 가볍게.",
    includes: ["MEGA 드림 ex 1팩 (10장)"],
    packs: 1,
    bundles: [],
    basePriceKRW: 30000,
    finalPriceKRW: 17000,
  },
  {
    id: "starter",
    name: "스타터 세트",
    tagline: "처음 뜯어보는 분께.",
    includes: ["MEGA 드림 ex 1팩", "탑로더 1개", "슬리브 60매"],
    packs: 1,
    bundles: ["toploader", "sleeve"],
    basePriceKRW: 30000 + 1500 + 4000,
    finalPriceKRW: 19900,
    badge: "초보 추천",
  },
  {
    id: "collector",
    name: "컬렉터 세트",
    tagline: "힛카드가 터지면 바로 보관.",
    includes: ["MEGA 드림 ex 3팩", "탑로더 3개", "슬리브 60매", "하드 케이스 1개"],
    packs: 3,
    bundles: ["toploader", "sleeve", "case"],
    basePriceKRW: 30000 * 3 + 1500 * 3 + 4000 + 6000,
    finalPriceKRW: 59000,
    badge: "BEST",
  },
  {
    id: "drop",
    name: "드롭 풀세트",
    tagline: "박스값보다 싸게, 1팩의 재미는 그대로.",
    includes: ["MEGA 드림 ex 5팩", "탑로더 5개", "슬리브 60매 × 2", "하드 케이스 2개"],
    packs: 5,
    bundles: ["toploader", "sleeve", "case"],
    basePriceKRW: 30000 * 5 + 1500 * 5 + 4000 * 2 + 6000 * 2,
    finalPriceKRW: 92000,
    badge: "박스 대신",
  },
];
