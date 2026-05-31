"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PINK = "#FF5BA8";

const MENU = [
  { href: "/", label: "팩 카탈로그", desc: "SV1~SV11 + MEGA 시리즈" },
  { href: "/products/mega-dream-ex", label: "🔥 메가드림 ex 박스", desc: "한정 판매 진행중" },
  { href: "#", label: "리셀 시세표", desc: "준비중" },
  { href: "#", label: "About", desc: "Pack House" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < 80) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
        } else if (delta < -6) {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-black/5 transition-transform duration-300 will-change-transform ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-[18px] font-black tracking-tight text-black">
              Pack<span style={{ color: PINK }}>House</span>
            </span>
            <span className="text-[10px] text-black/30 tracking-widest hidden sm:inline">팩하우스</span>
          </Link>

          <button
            onClick={() => setOpen(true)}
            aria-label="메뉴 열기"
            className="flex flex-col gap-[5px] w-9 h-9 items-center justify-center rounded-md hover:bg-black/5 transition"
          >
            <span className="block w-5 h-[2px] bg-black rounded-full" />
            <span className="block w-5 h-[2px] bg-black rounded-full" />
            <span className="block w-3 h-[2px] rounded-full self-end" style={{ background: PINK }} />
          </button>
        </div>
      </header>

      {/* 메뉴 오버레이 */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 bottom-0 w-[88%] max-w-[380px] bg-white border-l border-black/10 p-6 overflow-y-auto transition-transform duration-300 shadow-2xl ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="text-[16px] font-black">
              Pack<span style={{ color: PINK }}>House</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="w-9 h-9 flex items-center justify-center text-black/50 hover:text-black text-[22px]"
            >
              ×
            </button>
          </div>

          <nav className="space-y-1">
            {MENU.map((m) => (
              <Link
                key={m.label}
                href={m.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-4 rounded-xl hover:bg-black/5 border border-transparent hover:border-black/10 transition group"
              >
                <div className="text-[15px] font-bold group-hover:text-[var(--pink)] transition" style={{ color: undefined }}>{m.label}</div>
                <div className="text-[12px] text-black/40 mt-0.5">{m.desc}</div>
              </Link>
            ))}
          </nav>

          <div className="mt-10 pt-6 border-t border-black/5 text-[11px] text-black/40 space-y-1">
            <div>일본판 포켓몬 카드 리셀 전문</div>
            <div style={{ color: PINK }}>@packhouse_kr</div>
          </div>
        </aside>
      </div>
    </>
  );
}
