"use client";

import { useEffect, useRef } from "react";

export default function Hero({ onReserve }: { onReserve?: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => contentRef.current?.classList.add("revealed"), 500);
    const t2 = setTimeout(() => scrollRef.current?.classList.add("revealed"), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section id="hero" className="relative w-full overflow-hidden h-screen-safe">
      {/* Ken Burns zoom background */}
      <div className="absolute inset-0">
        <img
          src="/images/TOP.jpeg"
          alt="you&me curry 店内の様子"
          className="w-full h-full object-cover hero-img"
        />
      </div>

      {/* Cinematic overlay — darker at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

      {/* Content — bottom right */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-end z-10 opacity-0 translate-y-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
      >
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 md:px-14 pb-16 sm:pb-20 md:pb-24">
          {/* Top line accent */}
          <div className="w-8 h-px bg-brand-yellow mb-6 md:ml-auto" />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
            {/* Left — sub info */}
            <div className="hidden md:flex flex-col gap-6 max-w-[260px]">
              <p className="text-white/40 text-[11px] tracking-[0.25em] uppercase leading-relaxed">
                Spice Izakaya<br />Fukuoka Haruyoshi
              </p>
              <div className="w-8 h-px bg-white/15" />
              <p className="text-white/50 text-[13px] leading-[1.9]">
                昼はカレー、夜はスパイス居酒屋。
                二つの顔を持つ春吉の店。
              </p>
            </div>

            {/* Right — main copy */}
            <div className="text-left md:text-right max-w-lg md:max-w-none">
              <p className="md:hidden text-white/40 text-[10px] tracking-[0.25em] uppercase mb-4">
                Spice Izakaya — Fukuoka
              </p>

              <h1 className="text-white text-[clamp(30px,8vw,80px)] font-black leading-[1.08] tracking-tight mb-8">
                スパイスと酒と、
                <br />
                <span className="text-brand-yellow">いい夜を。</span>
              </h1>

              <div className="flex gap-3 md:justify-end">
                <button
                  onClick={onReserve}
                  className="group inline-flex items-center gap-2.5 bg-brand-yellow text-brand-green-dark text-[13px] font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-white transition-all duration-500 cursor-pointer"
                >
                  予約する
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 text-white/80 text-[13px] font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-500"
                >
                  Menu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3 opacity-0 transition-opacity duration-1000 [&.revealed]:opacity-100"
      >
        <div className="w-px h-12 bg-white/15 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-brand-yellow animate-[slideDown_2.5s_ease-in-out_infinite]" />
        </div>
        <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase">Scroll</span>
      </div>
    </section>
  );
}
