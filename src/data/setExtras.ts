// SV + MEGA 시리즈 — 박스 1박스 정가/리셀 시세 (KREAM 일판 + 일부 한판 + 번개장터 추정)
// 일판 박스 시세 = KREAM 즉시구매가 (자동 fetch 기준 1박스)
// 한판 박스 시세 = KREAM 한글판 있는 경우 KREAM, 없으면 번개장터 평균 추정
// 환율: 1엔 ≈ 9.5원

export type SetMetaExtra = {
  code: string;
  releasedKR: boolean;
  // 한국 (1박스 기준)
  packPriceKR?: number;   // 1팩 리셀가 (= boxPriceKR / packs)
  boxPriceKR?: number;    // 1박스 리셀가 (한판)
  msrpPackKR?: number;    // 1팩 정가
  msrpBoxKR?: number;     // 1박스 정가
  releaseKR?: string;
  nameKR_full?: string;
  // 일본 (1박스 기준, 엔)
  packPriceJPY: number;   // 1팩 리셀가 (KREAM 일판 박스 / 9.5 / packs)
  boxPriceJPY: number;    // 1박스 리셀가 (일판 = KREAM)
  msrpPackJPY: number;    // 1팩 정가 (엔)
  msrpBoxJPY: number;     // 1박스 정가 (엔)
  releaseJP: string;
  // 박스당 팩 수
  packsPerBox: number;
};

// JPY → KRW 환율
const JTK = 9.5;
const krwToJpy = (krw: number) => Math.round(krw / JTK / 100) * 100;

export const SET_EXTRAS: Record<string, SetMetaExtra> = {
  SV1V: {
    code: "SV1V", releasedKR: true,
    packPriceKR: 3200, boxPriceKR: 95000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2023-04-21",
    nameKR_full: "스칼렛 ex",
    packPriceJPY: 500, boxPriceJPY: 15700,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2023-01-20", packsPerBox: 30,
  },
  SV1S: {
    code: "SV1S", releasedKR: true,
    packPriceKR: 3200, boxPriceKR: 95000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2023-04-21",
    nameKR_full: "바이올렛 ex",
    packPriceJPY: 400, boxPriceJPY: 13200,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2023-01-20", packsPerBox: 30,
  },
  SV1a: {
    code: "SV1a", releasedKR: true,
    packPriceKR: 2500, boxPriceKR: 75000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2023-06-23",
    nameKR_full: "트리플렛 비트",
    packPriceJPY: 800, boxPriceJPY: 25300,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2023-03-10", packsPerBox: 30,
  },
  SV2D: {
    code: "SV2D", releasedKR: true,
    packPriceKR: 2400, boxPriceKR: 72000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2023-07-21",
    nameKR_full: "클레이 버스트",
    packPriceJPY: 500, boxPriceJPY: 16200,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2023-04-14", packsPerBox: 30,
  },
  SV2P: {
    code: "SV2P", releasedKR: true,
    packPriceKR: 2400, boxPriceKR: 72000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2023-07-21",
    nameKR_full: "스노우 해저드",
    packPriceJPY: 500, boxPriceJPY: 14300,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2023-04-14", packsPerBox: 30,
  },
  SV2a: {
    code: "SV2a", releasedKR: true,
    packPriceKR: 14000, boxPriceKR: 280000,
    msrpPackKR: 5500, msrpBoxKR: 110000,
    releaseKR: "2023-09-22",
    nameKR_full: "포켓몬 카드 151",
    packPriceJPY: 3900, boxPriceJPY: 77800,
    msrpPackJPY: 550, msrpBoxJPY: 11000,
    releaseJP: "2023-06-16", packsPerBox: 20,
  },
  SV3: {
    code: "SV3", releasedKR: true,
    packPriceKR: 4000, boxPriceKR: 120000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2023-10-27",
    nameKR_full: "흑염의 지배자",
    packPriceJPY: 900, boxPriceJPY: 26000,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2023-07-28", packsPerBox: 30,
  },
  SV3a: {
    code: "SV3a", releasedKR: true,
    packPriceKR: 2300, boxPriceKR: 70000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2023-11-24",
    nameKR_full: "레이징 서프",
    packPriceJPY: 600, boxPriceJPY: 16600,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2023-09-22", packsPerBox: 30,
  },
  SV4K: {
    code: "SV4K", releasedKR: true,
    packPriceKR: 2100, boxPriceKR: 62000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2024-01-26",
    nameKR_full: "고대의 포효",
    packPriceJPY: 500, boxPriceJPY: 15300,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2023-10-27", packsPerBox: 30,
  },
  SV4M: {
    code: "SV4M", releasedKR: true,
    packPriceKR: 2100, boxPriceKR: 62000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2024-01-26",
    nameKR_full: "미래의 일섬",
    packPriceJPY: 400, boxPriceJPY: 12100,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2023-10-27", packsPerBox: 30,
  },
  SV4a: {
    code: "SV4a", releasedKR: true,
    packPriceKR: 16500, boxPriceKR: 165000,
    msrpPackKR: 5500, msrpBoxKR: 55000,
    releaseKR: "2024-03-15",
    nameKR_full: "샤이니 트레저 ex",
    packPriceJPY: 2700, boxPriceJPY: 26800,
    msrpPackJPY: 550, msrpBoxJPY: 5500,
    releaseJP: "2023-12-01", packsPerBox: 10,
  },
  SV5K: {
    code: "SV5K", releasedKR: true,
    packPriceKR: 1900, boxPriceKR: 58000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2024-04-26",
    nameKR_full: "와일드 포스",
    packPriceJPY: 500, boxPriceJPY: 13700,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2024-01-26", packsPerBox: 30,
  },
  SV5M: {
    code: "SV5M", releasedKR: true,
    packPriceKR: 1500, boxPriceKR: 44000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2024-04-26",
    nameKR_full: "사이버 저지",
    packPriceJPY: 400, boxPriceJPY: 12600,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2024-01-26", packsPerBox: 30,
  },
  SV5a: {
    code: "SV5a", releasedKR: true,
    packPriceKR: 2300, boxPriceKR: 68000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2024-06-21",
    nameKR_full: "크림슨 헤이즈",
    packPriceJPY: 600, boxPriceJPY: 18100,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2024-03-22", packsPerBox: 30,
  },
  SV6: {
    code: "SV6", releasedKR: true,
    packPriceKR: 2000, boxPriceKR: 60000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2024-08-30",
    nameKR_full: "변환의 가면",
    packPriceJPY: 400, boxPriceJPY: 11600,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2024-04-26", packsPerBox: 30,
  },
  SV6a: {
    code: "SV6a", releasedKR: true,
    packPriceKR: 2900, boxPriceKR: 88000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2024-09-27",
    nameKR_full: "나이트 원더러",
    packPriceJPY: 400, boxPriceJPY: 12500,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2024-06-07", packsPerBox: 30,
  },
  SV7: {
    code: "SV7", releasedKR: true,
    packPriceKR: 2200, boxPriceKR: 65000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2024-11-15",
    nameKR_full: "스텔라 미라클",
    packPriceJPY: 400, boxPriceJPY: 12500,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2024-07-19", packsPerBox: 30,
  },
  SV7a: {
    code: "SV7a", releasedKR: true,
    packPriceKR: 2600, boxPriceKR: 78000,
    msrpPackKR: 2200, msrpBoxKR: 66000,
    releaseKR: "2024-12-13",
    nameKR_full: "패러다임 트리거",
    packPriceJPY: 1100, boxPriceJPY: 33300,
    msrpPackJPY: 165, msrpBoxJPY: 4950,
    releaseJP: "2024-09-13", packsPerBox: 30,
  },
  SV8: {
    code: "SV8", releasedKR: true,
    packPriceKR: 2300, boxPriceKR: 70000,
    msrpPackKR: 2400, msrpBoxKR: 72000,
    releaseKR: "2025-02-21",
    nameKR_full: "초전 브레이커",
    packPriceJPY: 1400, boxPriceJPY: 42200,
    msrpPackJPY: 180, msrpBoxJPY: 5400,
    releaseJP: "2024-10-18", packsPerBox: 30,
  },
  SV8a: {
    code: "SV8a", releasedKR: true,
    packPriceKR: 14500, boxPriceKR: 145000,
    msrpPackKR: 5500, msrpBoxKR: 55000,
    releaseKR: "2025-04-25",
    nameKR_full: "테라스탈 페스티벌 ex",
    packPriceJPY: 2800, boxPriceJPY: 27600,
    msrpPackJPY: 550, msrpBoxJPY: 5500,
    releaseJP: "2024-12-06", packsPerBox: 10,
  },
  SV9: {
    code: "SV9", releasedKR: true,
    packPriceKR: 3200, boxPriceKR: 95000,
    msrpPackKR: 2400, msrpBoxKR: 72000,
    releaseKR: "2025-06-20",
    nameKR_full: "배틀 파트너즈",
    packPriceJPY: 500, boxPriceJPY: 14200,
    msrpPackJPY: 180, msrpBoxJPY: 5400,
    releaseJP: "2025-01-24", packsPerBox: 30,
  },
  SV9a: {
    code: "SV9a", releasedKR: true,
    packPriceKR: 4500, boxPriceKR: 135000,
    msrpPackKR: 2400, msrpBoxKR: 72000,
    releaseKR: "2025-07-25",
    nameKR_full: "열풍의 아레나",
    packPriceJPY: 200, boxPriceJPY: 5700,
    msrpPackJPY: 180, msrpBoxJPY: 5400,
    releaseJP: "2025-03-14", packsPerBox: 30,
  },
  SV10: {
    code: "SV10", releasedKR: true,
    packPriceKR: 3700, boxPriceKR: 110000,
    msrpPackKR: 2400, msrpBoxKR: 72000,
    releaseKR: "2025-09-19",
    nameKR_full: "로켓단의 영광",
    packPriceJPY: 1100, boxPriceJPY: 31600,
    msrpPackJPY: 180, msrpBoxJPY: 5400,
    releaseJP: "2025-05-30", packsPerBox: 30,
  },
  SV11W: {
    code: "SV11W", releasedKR: true,
    packPriceKR: 1900, boxPriceKR: 56000,
    msrpPackKR: 2500, msrpBoxKR: 75000,
    releaseKR: "2026-02-27",
    nameKR_full: "화이트 플레어",
    packPriceJPY: 900, boxPriceJPY: 26900,
    msrpPackJPY: 200, msrpBoxJPY: 6000,
    releaseJP: "2025-11-28", packsPerBox: 30,
  },
  SV11B: {
    code: "SV11B", releasedKR: true,
    packPriceKR: 1900, boxPriceKR: 57000,
    msrpPackKR: 2500, msrpBoxKR: 75000,
    releaseKR: "2026-02-27",
    nameKR_full: "블랙 볼트",
    packPriceJPY: 900, boxPriceJPY: 27400,
    msrpPackJPY: 200, msrpBoxJPY: 6000,
    releaseJP: "2025-11-28", packsPerBox: 30,
  },
  M2: {
    code: "M2", releasedKR: true,
    packPriceKR: 2500, boxPriceKR: 74000,
    msrpPackKR: 2500, msrpBoxKR: 75000,
    releaseKR: "2026-01-30",
    nameKR_full: "인페르노X",
    packPriceJPY: 1100, boxPriceJPY: 32400,
    msrpPackJPY: 200, msrpBoxJPY: 6000,
    releaseJP: "2025-09-26", packsPerBox: 30,
  },
  M2a: {
    code: "M2a", releasedKR: true,
    packPriceKR: 8800, boxPriceKR: 88000,
    msrpPackKR: 7500, msrpBoxKR: 75000,
    releaseKR: "2026-02-27",
    nameKR_full: "MEGA 드림 ex",
    packPriceJPY: 2000, boxPriceJPY: 19600,
    msrpPackJPY: 600, msrpBoxJPY: 6000,
    releaseJP: "2025-11-28", packsPerBox: 10,
  },
  M4: {
    code: "M4", releasedKR: true,
    packPriceKR: 1600, boxPriceKR: 49000,
    msrpPackKR: 2500, msrpBoxKR: 75000,
    releaseKR: "2026-07-17",
    nameKR_full: "닌자스피너",
    packPriceJPY: 500, boxPriceJPY: 15500,
    msrpPackJPY: 200, msrpBoxJPY: 6000,
    releaseJP: "2026-03-13", packsPerBox: 30,
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