"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Info", href: "#info" },
  { label: "Access", href: "#access" },
  { label: "Reserve", href: "#reserve" },
];

export default function Header({ onReserve }: { onReserve?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setMenuOpen((v) => {
      document.body.style.overflow = !v ? "hidden" : "";
      return !v;
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-14 md:h-[72px]">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className={`text-[16px] md:text-[18px] font-extrabold tracking-tight transition-colors duration-500 ${
              scrolled ? "text-text-primary" : "text-white"
            }`}
          >
            you&<span className={scrolled ? "text-brand-yellow-dark" : "text-brand-yellow"}>me</span> curry
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className={`text-[13px] font-medium tracking-wide transition-colors duration-500 hover:opacity-70 ${
                  scrolled ? "text-text-secondary" : "text-white/80"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={onReserve}
            className={`hidden md:inline-flex items-center gap-2 text-[13px] font-semibold px-6 py-2.5 rounded-full transition-all duration-500 cursor-pointer ${
              scrolled
                ? "bg-brand-green-dark text-white hover:bg-brand-green"
                : "bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25"
            }`}
          >
            予約する
          </button>

          {/* Hamburger — 44px touch target */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative w-11 h-11 flex items-center justify-center z-[101]"
            aria-label="メニュー"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`block w-full h-[1.5px] transition-all duration-300 origin-center ${menuOpen ? "bg-text-primary translate-y-[7.5px] rotate-45" : scrolled ? "bg-text-primary" : "bg-white"}`} />
              <span className={`block w-full h-[1.5px] transition-all duration-300 ${menuOpen ? "opacity-0" : scrolled ? "bg-text-primary" : "bg-white"}`} />
              <span className={`block w-full h-[1.5px] transition-all duration-300 origin-center ${menuOpen ? "bg-text-primary -translate-y-[7.5px] -rotate-45" : scrolled ? "bg-text-primary" : "bg-white"}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[100] bg-white transition-all duration-500 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="flex flex-col justify-center h-full px-6 sm:px-8">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className="text-[28px] sm:text-[36px] font-extrabold tracking-tight text-text-primary hover:text-brand-green transition-colors py-3 border-b border-border"
                style={{ transitionDelay: menuOpen ? `${i * 40 + 80}ms` : "0ms" }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-10 text-text-tertiary text-[13px] space-y-1.5">
            <p>092-600-9969</p>
            <p>福岡市中央区春吉2-17-1</p>
            <p>18:00 〜 24:00 火曜定休</p>
          </div>
        </div>
      </div>
    </>
  );
}
