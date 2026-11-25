"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import Logo from "./Logo";
import { CameraIcon } from "./icons";

const NAV = [
  { href: "/#about", label: "エル・バホンとは" },
  { href: "/#menu", label: "人気メニュー" },
  { href: "/#news", label: "お知らせ" },
  { href: "/#shop", label: "屋台情報" },
];

/** 木の板のヘッダーに、朱のロゴ札をぶら下げる */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="wood fixed inset-x-0 top-0 z-50 h-16 shadow-[0_6px_18px_-8px_oklch(0%_0_0/0.7)] lg:h-[104px]">
        <div className="relative mx-auto flex h-full max-w-[1280px] items-center justify-center px-4 lg:justify-end lg:px-8">
          {/* ロゴ札：PCは左上からぶら下がる / スマホは中央 */}
          <Link href="/" aria-label={`${SITE.name} トップへ`} className="lg:absolute lg:top-0 lg:left-8">
            <span className="hidden lg:block">
              <Logo size="md" />
            </span>
            <span className="flex flex-col items-center text-cream lg:hidden">
              <span className="text-[9px] font-bold tracking-[0.2em] text-mute">天神 日銀前 屋台</span>
              <span className="font-brush text-[26px] leading-none">{SITE.name}</span>
            </span>
          </Link>

          {/* PCナビ */}
          <div className="hidden flex-col items-end gap-3 lg:flex">
            <div className="flex items-center gap-3">
              <Link
                href="/menu"
                className="inline-flex h-8 items-center whitespace-nowrap border border-cream/70 px-5 text-[13px] font-bold text-cream transition-colors hover:bg-cream hover:text-sumi"
              >
                品書き
              </Link>
              <a
                href={SITE.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center whitespace-nowrap border border-cream/70 px-5 text-[13px] font-bold text-cream transition-colors hover:bg-cream hover:text-sumi"
              >
                地図
              </a>
              <a
                href={SITE.instagram.dm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center whitespace-nowrap bg-shu px-5 text-[13px] font-bold text-paper transition-colors hover:bg-shu-hi"
              >
                DMで予約
              </a>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="ml-1 inline-flex h-9 w-9 items-center justify-center text-cream transition-opacity hover:opacity-70"
              >
                <CameraIcon className="h-7 w-7" />
              </a>
            </div>
            <nav aria-label="メイン" className="flex items-center gap-9">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="whitespace-nowrap text-[16px] font-bold tracking-[0.08em] text-cream transition-colors hover:text-shu-hi"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* スマホ：朱の MENU ボタン */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="sp-menu"
            className="absolute top-0 right-0 flex h-16 w-16 flex-col items-center justify-center gap-1 bg-shu text-paper active:bg-shu-deep lg:hidden"
          >
            <span className="block h-[2px] w-7 bg-paper" />
            <span className="block h-[2px] w-7 bg-paper" />
            <span className="block h-[2px] w-7 bg-paper" />
            <span className="mt-0.5 text-[9px] font-bold tracking-[0.1em]">MENU</span>
          </button>
        </div>
      </header>

      {/* スマホメニュー */}
      <div
        id="sp-menu"
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
        className={`wood fixed inset-0 z-[60] flex flex-col transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-16 w-16 flex-col items-center justify-center bg-shu text-paper"
          >
            <svg viewBox="0 0 20 20" className="h-6 w-6" aria-hidden="true">
              <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="mt-0.5 text-[9px] font-bold tracking-[0.1em]">CLOSE</span>
          </button>
        </div>
        <nav aria-label="スマホメニュー" className="flex flex-1 flex-col px-8 pt-4">
          {[...NAV, { href: "/menu", label: "品書き（全メニュー）" }].map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-cream/15 py-5 text-[20px] font-bold tracking-[0.06em] text-cream"
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-10 grid gap-3">
            <a
              href={SITE.instagram.dm}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center gap-2 bg-shu text-[16px] font-bold text-paper"
            >
              <CameraIcon className="h-5 w-5" />
              InstagramのDMで予約
            </a>
            <a
              href={SITE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center border border-cream/60 text-[16px] font-bold text-cream"
            >
              地図をひらく
            </a>
          </div>
          <p className="mt-8 text-[13px] leading-[2] text-mute">
            営業 {SITE.hours.open}〜{SITE.hours.close}／{SITE.holiday}・雨天休業
            <br />
            {SITE.area} {SITE.landmark}
          </p>
        </nav>
      </div>
    </>
  );
}
