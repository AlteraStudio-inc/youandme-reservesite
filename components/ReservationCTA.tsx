"use client";

import ScrollReveal from "./ScrollReveal";

export default function ReservationCTA({ onReserve }: { onReserve?: () => void }) {
  return (
    <section id="reserve" className="relative py-24 sm:py-36 md:py-48 bg-brand-green-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-1/4 left-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-brand-yellow blur-[100px] sm:blur-[200px]" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14 relative z-10 text-center">
        <ScrollReveal>
          <div className="w-8 h-px bg-brand-yellow mx-auto mb-8 sm:mb-10" />
          <p className="text-brand-yellow text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-8 sm:mb-10">
            Reservation
          </p>
          <h2 className="text-white text-[clamp(28px,7vw,68px)] font-black tracking-tight leading-[1.1] mb-6 sm:mb-8">
            今夜、スパイスに
            <br />
            会いに行く。
          </h2>
          <p className="text-white/35 text-[13px] sm:text-[15px] leading-relaxed max-w-sm mx-auto mb-12 sm:mb-16">
            ご予約はオンラインまたはお電話で。
            飛び込みも歓迎です。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-14">
            <button
              onClick={onReserve}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-yellow text-brand-green-dark text-[14px] font-bold px-8 sm:px-10 py-4 rounded-full hover:bg-white transition-all duration-500 min-h-[48px] cursor-pointer"
            >
              オンライン予約
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
              href="tel:092-600-9969"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white/70 text-[14px] font-medium px-8 sm:px-10 py-4 rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-all duration-500 min-h-[48px]"
            >
              092-600-9969
            </a>
          </div>
          <p className="text-white/15 text-[11px]">
            1名〜20名 ／ 30分刻み ／ 変更は前日まで
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
