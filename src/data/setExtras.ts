// SV 시리즈 25팩 메타 — 정가 + 박스 리셀 시세
// 일판 = 크림(Kream) 한국 마켓 시세 (원 → 엔 자동 환산, 표시는 원 메인)
// 한판 = 번개장터/네이버 평균
// 환율: 1엔 ≈ 9.5원 (2026.05 기준)

export type SetMetaExtra = {
  code: string;
  releasedKR: boolean;
  // 한국 (리셀 시세, 원)
  packPriceKR?: number;
  boxPriceKR?: number;
  // 한국 정가 (참고용)
  msrpPackKR?: number;
  msrpBoxKR?: number;
  releaseKR?: string;
  nameKR_full?: string;
  // 일본 (리셀 시세, 엔) — Kream KRW 기준으로 환산
  packPriceJPY: number;
  boxPriceJPY: number;
  // 일본 정가 (참고용)
  msrpPackJPY: number;
  msrpBoxJPY: number;
  releaseJP: string;
  // 박스당 팩 수 (일반=30, 하이클래스 151=20, 그 외 하이클래스=10)
  packsPerBox: number;
};

// JPY → KRW 환율 (1엔 ≈ 9.5원)
const JTK = 9.5;

// 일판 박스 Kream KRW 시세 → JPY 환산 헬퍼
const krwToJpy = (krw: number) => Math.round(krw / JTK / 100) * 100;

export const SET_EXTRAS: Record<string, SetMetaExtra> = {
  SV1V: {
    code: "SV1V", releasedKR: true,
    packPriceKR: 3200, boxPriceKR: 95000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2023-04-21",
    nameKR_full: "스칼렛 ex",
    packPriceJPY: krwToJpy(5000), boxPriceJPY: krwToJpy(149000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2023-01-20", packsPerBox: 30,
  },
  SV1S: {
    code: "SV1S", releasedKR: true,
    packPriceKR: 3200, boxPriceKR: 95000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2023-04-21",
    nameKR_full: "바이올렛 ex",
    packPriceJPY: krwToJpy(4200), boxPriceJPY: krwToJpy(125000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2023-01-20", packsPerBox: 30,
  },
  SV1a: {
    code: "SV1a", releasedKR: true,
    packPriceKR: 2500, boxPriceKR: 75000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2023-06-23",
    nameKR_full: "트리플렛 비트",
    packPriceJPY: krwToJpy(8000), boxPriceJPY: krwToJpy(240000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2023-03-10", packsPerBox: 30,
  },
  SV2D: {
    code: "SV2D", releasedKR: true,
    packPriceKR: 2400, boxPriceKR: 72000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2023-07-21",
    nameKR_full: "클레이 버스트",
    packPriceJPY: krwToJpy(5100), boxPriceJPY: krwToJpy(154000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2023-04-14", packsPerBox: 30,
  },
  SV2P: {
    code: "SV2P", releasedKR: true,
    packPriceKR: 2400, boxPriceKR: 72000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2023-07-21",
    nameKR_full: "스노우 해저드",
    packPriceJPY: krwToJpy(4500), boxPriceJPY: krwToJpy(136000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2023-04-14", packsPerBox: 30,
  },
  SV2a: {
    code: "SV2a", releasedKR: true,
    packPriceKR: 14000, boxPriceKR: 280000, msrpPackKR: 5500, msrpBoxKR: 110000, releaseKR: "2023-09-22",
    nameKR_full: "포켓몬 카드 151",
    packPriceJPY: krwToJpy(36900), boxPriceJPY: krwToJpy(738000), msrpPackJPY: 550, msrpBoxJPY: 11000, releaseJP: "2023-06-16", packsPerBox: 20,
  },
  SV3: {
    code: "SV3", releasedKR: true,
    packPriceKR: 4000, boxPriceKR: 120000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2023-10-27",
    nameKR_full: "흑염의 지배자",
    packPriceJPY: krwToJpy(8200), boxPriceJPY: krwToJpy(247000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2023-07-28", packsPerBox: 30,
  },
  SV3a: {
    code: "SV3a", releasedKR: true,
    packPriceKR: 2400, boxPriceKR: 70000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2023-11-24",
    nameKR_full: "레이징 서프",
    packPriceJPY: krwToJpy(5300), boxPriceJPY: krwToJpy(158000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2023-09-22", packsPerBox: 30,
  },
  SV4K: {
    code: "SV4K", releasedKR: true,
    packPriceKR: 2100, boxPriceKR: 62000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2024-01-26",
    nameKR_full: "고대의 포효",
    packPriceJPY: krwToJpy(4800), boxPriceJPY: krwToJpy(145000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2023-10-27", packsPerBox: 30,
  },
  SV4M: {
    code: "SV4M", releasedKR: true,
    packPriceKR: 2100, boxPriceKR: 62000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2024-01-26",
    nameKR_full: "미래의 일섬",
    packPriceJPY: krwToJpy(3800), boxPriceJPY: krwToJpy(115000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2023-10-27", packsPerBox: 30,
  },
  SV4a: {
    code: "SV4a", releasedKR: true,
    packPriceKR: 8500, boxPriceKR: 165000, msrpPackKR: 5500, msrpBoxKR: 55000, releaseKR: "2024-03-15",
    nameKR_full: "샤이니 트레저 ex",
    packPriceJPY: krwToJpy(25600), boxPriceJPY: krwToJpy(256000), msrpPackJPY: 550, msrpBoxJPY: 5500, releaseJP: "2023-12-01", packsPerBox: 10,
  },
  SV5K: {
    code: "SV5K", releasedKR: true,
    packPriceKR: 2000, boxPriceKR: 58000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2024-04-26",
    nameKR_full: "와일드 포스",
    packPriceJPY: krwToJpy(4300), boxPriceJPY: krwToJpy(130000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2024-01-26", packsPerBox: 30,
  },
  SV5M: {
    code: "SV5M", releasedKR: true,
    packPriceKR: 1500, boxPriceKR: 44000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2024-04-26",
    nameKR_full: "사이버 저지",
    packPriceJPY: krwToJpy(4000), boxPriceJPY: krwToJpy(120000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2024-01-26", packsPerBox: 30,
  },
  SV5a: {
    code: "SV5a", releasedKR: true,
    packPriceKR: 2300, boxPriceKR: 68000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2024-06-21",
    nameKR_full: "크림슨 헤이즈",
    packPriceJPY: krwToJpy(5700), boxPriceJPY: krwToJpy(172000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2024-03-22", packsPerBox: 30,
  },
  SV6: {
    code: "SV6", releasedKR: true,
    packPriceKR: 2100, boxPriceKR: 60000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2024-08-30",
    nameKR_full: "변환의 가면",
    packPriceJPY: krwToJpy(3700), boxPriceJPY: krwToJpy(110000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2024-04-26", packsPerBox: 30,
  },
  SV6a: {
    code: "SV6a", releasedKR: true,
    packPriceKR: 3000, boxPriceKR: 88000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2024-09-27",
    nameKR_full: "나이트 원더러",
    packPriceJPY: krwToJpy(4000), boxPriceJPY: krwToJpy(119000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2024-06-07", packsPerBox: 30,
  },
  SV7: {
    code: "SV7", releasedKR: true,
    packPriceKR: 2300, boxPriceKR: 65000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2024-11-15",
    nameKR_full: "스텔라 미라클",
    packPriceJPY: krwToJpy(4000), boxPriceJPY: krwToJpy(119000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2024-07-19", packsPerBox: 30,
  },
  SV7a: {
    code: "SV7a", releasedKR: true,
    packPriceKR: 2700, boxPriceKR: 78000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2024-12-13",
    nameKR_full: "패러다임 트리거",
    packPriceJPY: krwToJpy(10500), boxPriceJPY: krwToJpy(316000), msrpPackJPY: 165, msrpBoxJPY: 4950, releaseJP: "2024-09-13", packsPerBox: 30,
  },
  SV8: {
    code: "SV8", releasedKR: true,
    packPriceKR: 6700, boxPriceKR: 200000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2025-02-21",
    nameKR_full: "초전 브레이커",
    packPriceJPY: krwToJpy(13400), boxPriceJPY: krwToJpy(401000), msrpPackJPY: 180, msrpBoxJPY: 5400, releaseJP: "2024-10-18", packsPerBox: 30,
  },
  SV8a: {
    code: "SV8a", releasedKR: true,
    packPriceKR: 8300, boxPriceKR: 83000, msrpPackKR: 5500, msrpBoxKR: 55000, releaseKR: "2025-04-25",
    nameKR_full: "테라스탈 페스티벌 ex",
    packPriceJPY: krwToJpy(25900), boxPriceJPY: krwToJpy(259000), msrpPackJPY: 550, msrpBoxJPY: 5500, releaseJP: "2024-12-06", packsPerBox: 10,
  },
  SV9: {
    code: "SV9", releasedKR: true,
    packPriceKR: 2600, boxPriceKR: 79000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2025-06-20",
    nameKR_full: "배틀 파트너즈",
    packPriceJPY: krwToJpy(4500), boxPriceJPY: krwToJpy(135000), msrpPackJPY: 180, msrpBoxJPY: 5400, releaseJP: "2025-01-24", packsPerBox: 30,
  },
  SV9a: {
    code: "SV9a", releasedKR: true,
    packPriceKR: 4500, boxPriceKR: 135000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2025-07-25",
    nameKR_full: "열풍의 아레나",
    packPriceJPY: krwToJpy(6500), boxPriceJPY: krwToJpy(145000), msrpPackJPY: 180, msrpBoxJPY: 5400, releaseJP: "2025-03-14", packsPerBox: 30,
  },
  SV10: {
    code: "SV10", releasedKR: true,
    packPriceKR: 5000, boxPriceKR: 150000, msrpPackKR: 2200, msrpBoxKR: 66000, releaseKR: "2025-09-19",
    nameKR_full: "로켓단의 영광",
    packPriceJPY: krwToJpy(10000), boxPriceJPY: krwToJpy(300000), msrpPackJPY: 180, msrpBoxJPY: 5400, releaseJP: "2025-05-30", packsPerBox: 30,
  },
  SV11W: {
    code: "SV11W", releasedKR: true,
    packPriceKR: 1900, boxPriceKR: 56000, msrpPackKR: 2400, msrpBoxKR: 72000, releaseKR: "2026-02-27",
    nameKR_full: "화이트 플레어",
    packPriceJPY: krwToJpy(8500), boxPriceJPY: krwToJpy(256000), msrpPackJPY: 180, msrpBoxJPY: 5400, releaseJP: "2025-11-28", packsPerBox: 30,
  },
  SV11B: {
    code: "SV11B", releasedKR: true,
    packPriceKR: 1900, boxPriceKR: 57000, msrpPackKR: 2400, msrpBoxKR: 72000, releaseKR: "2026-02-27",
    nameKR_full: "블랙 볼트",
    packPriceJPY: krwToJpy(8700), boxPriceJPY: krwToJpy(260000), msrpPackJPY: 180, msrpBoxJPY: 5400, releaseJP: "2025-11-28", packsPerBox: 30,
  },

  // ── MEGA Evolution Era (M-시리즈) ──
  // 인페르노X (M2) — 메가 확장팩, 30팩/박스
  // Kream: 일판 670135=307,000원 / 한판 696775=77,000원
  M2: {
    code: "M2", releasedKR: true,
    packPriceKR: Math.round(77000 / 30 / 100) * 100, boxPriceKR: 76000,
    msrpPackKR: 2500, msrpBoxKR: 75000, releaseKR: "2026-01-30",
    nameKR_full: "인페르노X",
    packPriceJPY: krwToJpy(Math.round(307000 / 30 / 100) * 100), boxPriceJPY: krwToJpy(306000),
    msrpPackJPY: 180, msrpBoxJPY: 5400, releaseJP: "2025-09-26", packsPerBox: 30,
  },
  // 메가 드림 ex (M2a) — 하이클래스팩, 10팩/박스
  // Kream: 일판 696779=184,000원 / 한판 769746=88,000원
  M2a: {
    code: "M2a", releasedKR: true,
    packPriceKR: Math.round(88000 / 10 / 100) * 100, boxPriceKR: 88000,
    msrpPackKR: 5500, msrpBoxKR: 55000, releaseKR: "2026-02-27",
    nameKR_full: "MEGA 드림 ex",
    packPriceJPY: krwToJpy(Math.round(184000 / 10 / 100) * 100), boxPriceJPY: krwToJpy(183000),
    msrpPackJPY: 550, msrpBoxJPY: 5500, releaseJP: "2025-11-28", packsPerBox: 10,
  },
  // 닌자스피너 (M4) — 메가 확장팩, 30팩/박스
  // Kream: 일판 830225=146,000원 / 한판 904416=50,000원
  M4: {
    code: "M4", releasedKR: true,
    packPriceKR: Math.round(50000 / 30 / 100) * 100, boxPriceKR: 49000,
    msrpPackKR: 2500, msrpBoxKR: 75000, releaseKR: "2026-07-17",
    nameKR_full: "닌자스피너",
    packPriceJPY: krwToJpy(Math.round(146000 / 30 / 100) * 100), boxPriceJPY: krwToJpy(145000),
    msrpPackJPY: 180, msrpBoxJPY: 5400, releaseJP: "2026-03-13", packsPerBox: 30,
  },
};

// 환율 (JPY → KRW)
export const JPY_TO_KRW = 9.5;

// PSA10 가격 추정 multiplier (raw 시세 대비)
export const PSA10_MULTIPLIER: Record<string, number> = {
  SAR: 2.6, MUR: 2.4, MA: 2.0, AR: 1.8, UR: 2.8,
  SR: 2.2, SIR: 2.5, HR: 2.3, CHR: 1.6, CSR: 2.0, RR: 1.4, RRR: 1.5,
  R: 1.2, U: 1.0, C: 1.0,
};

export const RAW_PRICE_BY_RARITY: Record<string, number> = {
  SAR: 25000, MUR: 35000, MA: 12000, AR: 3500, UR: 18000,
  SR: 8000, SIR: 20000, HR: 22000, CHR: 6000, CSR: 9000, RR: 1500, RRR: 2200,
  R: 300, U: 100, C: 50,
};
