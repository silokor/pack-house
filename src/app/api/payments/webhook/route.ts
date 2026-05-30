import { NextResponse } from "next/server";
import { verifyKeonheungWebhook } from "@/lib/payments/keonheung";

// POST /api/payments/webhook
// 건흥페이먼츠 → 결제 완료 후 서버 webhook
// Authorization 헤더에 Pay Key가 들어옵니다.
export async function POST(req: Request) {
  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => (headers[k.toLowerCase()] = v));

  // Pay Key 검증
  const ok = verifyKeonheungWebhook(headers);
  if (!ok) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  // TODO: DB에 결제 상태 업데이트 (Order, PaymentTransaction)
  console.log("[keonheung webhook]", JSON.stringify(body));

  return NextResponse.json({ ok: true });
}

// GET — health check
export async function GET() {
  return NextResponse.json({ ok: true, provider: "keonheung" });
}
