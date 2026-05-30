// PG 결제 추상화 — Toss/PortOne 중 무엇을 붙여도 동일 인터페이스로 호출
// TODO: 실제 SDK 연동

export interface PaymentRequest {
  orderId: string;
  productId: string;
  amountKRW: number;
  buyerName?: string;
  buyerPhone?: string;
  buyerEmail?: string;
  successUrl: string;
  failUrl: string;
}

export interface PaymentResult {
  ok: boolean;
  paymentKey?: string;
  rawPayload?: unknown;
  error?: string;
}

export interface PaymentProvider {
  name: "toss" | "portone" | "mock";
  initiate(req: PaymentRequest): Promise<{ redirectUrl: string } | PaymentResult>;
  verifyWebhook(headers: Record<string, string>, body: unknown): Promise<boolean>;
  confirm(paymentKey: string, orderId: string, amountKRW: number): Promise<PaymentResult>;
}

// ── mock provider ──
export const mockProvider: PaymentProvider = {
  name: "mock",
  async initiate(req) {
    return {
      redirectUrl: `${req.successUrl}?orderId=${req.orderId}&paymentKey=mock_${Date.now()}`,
    };
  },
  async verifyWebhook() {
    return true;
  },
  async confirm(paymentKey, orderId, amountKRW) {
    return { ok: true, paymentKey, rawPayload: { orderId, amountKRW } };
  },
};

export function getProvider(): PaymentProvider {
  const name = process.env.PAYMENT_PROVIDER || "mock";
  // TODO: 실제 toss/portone 구현 import 추가
  // if (name === "toss") return tossProvider;
  // if (name === "portone") return portoneProvider;
  if (name) return mockProvider;
  return mockProvider;
}
