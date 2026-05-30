"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutResultPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-white text-black">
      <Suspense fallback={<div className="text-[16px] text-black/60">Loading...</div>}>
        <Inner />
      </Suspense>
    </main>
  );
}

function Inner() {
  const params = useSearchParams();
  const [data, setData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const obj: Record<string, string> = {};
    params.forEach((v, k) => { obj[k] = v; });
    setData(obj);
  }, [params]);

  const ok = data && (data.resultCd === "0000" || data.result === "0000");

  return (
    <div className="max-w-md w-full text-center">
      <div className="text-[28px] font-black mb-4">
        {ok ? "✅ 결제 완료" : "결제 결과"}
      </div>
      <p className="text-[16px] text-black/65 mb-6">
        {ok
          ? "주문이 정상적으로 접수되었습니다."
          : "결제 정보를 확인하고 있습니다."}
      </p>
      <pre className="text-left text-[12px] bg-black/5 rounded-xl p-4 overflow-x-auto">
        {data ? JSON.stringify(data, null, 2) : "Loading..."}
      </pre>
      <a
        href="/products/mega-dream-ex"
        className="inline-block mt-6 px-6 py-3 rounded-full font-bold text-white"
        style={{ background: "#FF5BA8" }}
      >
        상품 페이지로 돌아가기
      </a>
    </div>
  );
}
