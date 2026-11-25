"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { CameraIcon, PinIcon } from "./icons";

const LINKS = [
  { href: "/#route", label: "献立" },
  { href: "/#story", label: "屋台のこと" },
  { href: "/#visit", label: "行き方" },
  { href: "/menu", label: "品書き" },
];

/** 上部ナビ（N9 edge-aligned）＋ スマホ用の下部固定バー（C4） */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowBar(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ease-out border-b ${
          scrolled ? "bg-night/85 backdrop-blur-md border-rule" : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-8">
          <Link href="/" className="group flex items-baseline gap-2.5 whitespace-nowrap" aria-label="El Bajon トップへ">
            <span className="font-display text-[22px] leading-none text-lamp transition-opacity group-hover:opacity-80">
              El Bajon
            </span>
            <span className="hidden font-mono text-[11px] tracking-[0.12em] text-ink-3 sm:inline">
              天神屋台
            </span>
          </Link>

          <nav aria-label="メイン" className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-[14px] font-medium text-ink-2 transition-colors hover:text-lamp"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <a
            href={SITE.instagram.dm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full border border-lamp/60 px-4 text-[13px] font-bold text-lamp transition-colors hover:bg-lamp hover:text-lamp-ink active:translate-y-px"
          >
            <CameraIcon className="h-4 w-4" />
            DMで予約
          </a>
        </div>
      </header>

      {/* スマホ下部の固定バー */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-night/92 backdrop-blur-md transition-[transform,opacity] duration-300 ease-out md:hidden ${
          showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-hidden={!showBar}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-2 p-3">
          <a
            href={SITE.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={showBar ? 0 : -1}
            className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-rule text-[14px] font-bold text-ink active:bg-night-3"
          >
            <PinIcon className="h-4 w-4" />
            地図
          </a>
          <a
            href={SITE.instagram.dm}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={showBar ? 0 : -1}
            className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-lamp text-[14px] font-bold text-lamp-ink active:bg-lamp-deep"
          >
            <CameraIcon className="h-4 w-4" />
            DMで予約する
          </a>
        </div>
      </div>
    </>
  );
}
