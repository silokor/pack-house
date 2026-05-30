// 건흥페이먼츠(GH Payments) — 온라인 인증 결제 SDK 래퍼
//
// 공식 SDK: https://api.ghpayments.kr/js/clientsideV2.js
// → 전역 window.MARU.pay({ ... }) 호출
//
// 가이드 핵심 파라미터:
//   payRoute: "3d"            (고정값)
//   publicKey: "pk_xxx"       (가맹점 Pay Key)
//   trackId: string           (가맹점 주문번호, 50자 이내)
//   amount: number            (결제 금액 KRW, 13자리)
//   itemName: string          (상품명)
//   userName / userTel        (필수)
//   userEmail                 (선택)
//   redirectUrl: string       (결제 완료 후 redirect)
//   webhookUrl: string        (서버 webhook)
//   responseFunction: (data) => void
//   validationFunction: () => boolean (true면 결제 진행)
//   directUse: "0000" | "0001" (카드사 직접 호출 여부)
//   cardType: string          (directUse=0001일 때만 필수)
//   mode: "layer" 권장
//   debugMode: "live" | "sandbox"

declare global {
  interface Window {
    MARU?: {
      pay: (opts: KeonheungPayRequest) => void;
      debug?: (b: boolean) => void;
    };
  }
}

export type KeonheungPayRequest = {
  payRoute: "3d";
  publicKey: string;
  trackId: string;
  amount: number;
  itemName: string;
  userName: string;
  userTel: string;
  userEmail?: string;
  redirectUrl?: string;
  webhookUrl?: string;
  responseFunction?: (data: KeonheungPayResponse) => void;
  validationFunction?: () => boolean;
  directUse?: "0000" | "0001";
  cardType?: string;
  installment?: string;
  mode?: "layer";
  debugMode?: "live" | "sandbox";
  udf1?: string;
  udf2?: string;
};

export type KeonheungPayResponse = {
  result: {
    resultCd: string;     // "0000" = 정상
    resultMsg: string;
    advanceMsg: string;
    create: string;
  };
  pay?: {
    authCd: string;
    trxId: string;
    trxType: string;
    trackId: string;
    payRoute: string;
    amount: number;
    card?: {
      cardId: string;
      installment: number;
      bin: string;
      last4: string;
      issuer: string;
      cardType: string;
    };
    udf1?: string;
    udf2?: string;
  };
};

// 카드사 코드 (directUse=0001 시 사용)
export const CARD_CODES = {
  BC:    "0052",
  KB:    "0050",
  HYUNDAI: "0073",
  SAMSUNG: "0054",
  SHINHAN: "0053",
  LOTTE: "0055",
  HANA:  "0076",
  NH:    "0078",
  CITI:  "0084",
  WOORI: "0077",
} as const;

const SCRIPT_URL = "https://api.ghpayments.kr/js/clientsideV2.js";

let _ready: Promise<void> | null = null;

/** SDK가 로드되었는지 확인하고 없으면 동적으로 로드 */
export function ensureKeonheungSDK(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.MARU) return Promise.resolve();
  if (_ready) return _ready;

  _ready = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("SDK load failed")));
      // 이미 로드됐을 수도 있음
      if (window.MARU) resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_URL;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("SDK load failed"));
    document.head.appendChild(s);
  });
  return _ready;
}

/** SDK가 동적 로드되어 DOMContentLoaded를 놓친 경우를 대비해
 *  결제 레이어 DOM(c3_pop_iframe 등)을 직접 박아준다.
 *  SDK 내부 init()이 이미 호출됐다면 #c3_pop_iframe이 존재 → no-op. */
export function ensureKeonheungLayer(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById("c3_pop_iframe")) return;

  const mk = (id: string, tag: string = "div") => {
    const el = document.createElement(tag);
    el.id = id;
    return el;
  };

  const popOverlay = mk("c3_pop_overlay");
  popOverlay.setAttribute(
    "style",
    "position:fixed;top:0;bottom:0;left:0;right:0;background:rgb(255,255,255);width:100%;height:100%;overflow:hidden !important;touch-action:none;display:none;"
  );
  const popOverlayWrap = mk("c3pop_pop_overlay_wrap");
  popOverlayWrap.setAttribute(
    "style",
    "z-index:2147483600;position:absolute;top:0;bottom:0;left:0;right:0;overflow:hidden !important;touch-action:none;display:none;"
  );
  const contentFixed = mk("c3pop_content_fixed");
  contentFixed.setAttribute(
    "style",
    "z-index:2147483601;position:fixed;top:0;left:0;width:100%;height:100%;background-color:transparent;display:none;"
  );
  const popIframe = mk("c3_pop_iframe", "iframe") as HTMLIFrameElement;
  popIframe.setAttribute("frameborder", "0");
  popIframe.setAttribute("allowTransparency", "true");
  popIframe.setAttribute(
    "style",
    "position:fixed;top:0;left:0;width:100%;height:100%;"
  );

  popOverlayWrap.appendChild(popOverlay);
  contentFixed.appendChild(popIframe);
  document.body.appendChild(popOverlay);
  document.body.appendChild(popOverlayWrap);
  document.body.appendChild(contentFixed);
}

/** 주문번호 생성: test-YYYYMMDDHHMMSS-rand */
export function generateTrackId(prefix = "ph"): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp =
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds());
  const rand = Math.random().toString(36).slice(2, 6);
  return `${prefix}-${stamp}-${rand}`;
}

export type PayInput = {
  amount: number;
  itemName: string;
  userName: string;
  userTel: string;
  userEmail?: string;
  udf1?: string;
  udf2?: string;
};

/** 결제창 호출 */
export async function payWithKeonheung(input: PayInput): Promise<KeonheungPayResponse> {
  const publicKey = process.env.NEXT_PUBLIC_KEONHEUNG_PUBLIC_KEY;
  const mode = (process.env.NEXT_PUBLIC_KEONHEUNG_MODE as "live" | "sandbox") || "sandbox";

  if (!publicKey) {
    throw new Error(
      "건흥페이먼츠 publicKey가 설정되지 않았습니다. .env.local에 NEXT_PUBLIC_KEONHEUNG_PUBLIC_KEY를 추가하세요."
    );
  }

  await ensureKeonheungSDK();
  if (!window.MARU) throw new Error("MARU SDK 로드 실패");
  ensureKeonheungLayer();

  const trackId = generateTrackId("ph");

  return new Promise((resolve, reject) => {
    try {
      window.MARU!.pay({
        payRoute: "3d",
        publicKey,
        trackId,
        amount: input.amount,
        itemName: input.itemName,
        userName: input.userName,
        userTel: input.userTel,
        userEmail: input.userEmail,
        udf1: input.udf1,
        udf2: input.udf2,
        redirectUrl:
          typeof window !== "undefined"
            ? `${window.location.origin}/checkout/result`
            : undefined,
        webhookUrl:
          typeof window !== "undefined"
            ? `${window.location.origin}/api/payments/webhook`
            : undefined,
        responseFunction: (data) => {
          if (data?.result?.resultCd === "0000") resolve(data);
          else reject(new Error(data?.result?.advanceMsg || data?.result?.resultMsg || "결제 실패"));
        },
        validationFunction: () => true,
        mode: "layer",
        debugMode: mode,
      });
    } catch (e) {
      reject(e);
    }
  });
}

/** Webhook signature 검증 — 가이드상 Pay Key 인증만 명시되어있으므로,
 *  Authorization 헤더의 Pay Key 일치 여부를 체크한다.
 */
export function verifyKeonheungWebhook(headers: Record<string, string>): boolean {
  const expected = process.env.KEONHEUNG_PAY_KEY;
  if (!expected) return false;
  const auth = headers["authorization"] || headers["Authorization"];
  return !!auth && auth === expected;
}

/** REST: 결제 결과 재조회 — GET /api/get/{trackId} */
export async function getKeonheungPayment(trackId: string): Promise<KeonheungPayResponse> {
  const payKey = process.env.KEONHEUNG_PAY_KEY;
  if (!payKey) throw new Error("KEONHEUNG_PAY_KEY 미설정");
  const res = await fetch(`https://api.ghpayments.kr/api/get/${encodeURIComponent(trackId)}`, {
    method: "GET",
    headers: {
      Authorization: payKey,
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

/** REST: 결제 취소 — POST /api/refund */
export async function refundKeonheungPayment(opts: {
  rootTrxId?: string;
  rootTrackId?: string;
  rootTrxDay?: string;
  trackId: string;
  amount: number;
}): Promise<KeonheungPayResponse> {
  const payKey = process.env.KEONHEUNG_PAY_KEY;
  if (!payKey) throw new Error("KEONHEUNG_PAY_KEY 미설정");
  const res = await fetch(`https://api.ghpayments.kr/api/refund`, {
    method: "POST",
    headers: {
      Authorization: payKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refund: {
        rootTrxId: opts.rootTrxId || "",
        rootTrackId: opts.rootTrackId || "",
        rootTrxDay: opts.rootTrxDay || "",
        trxType: "ONTR",
        trackId: opts.trackId,
        amount: opts.amount,
      },
    }),
  });
  return res.json();
}
