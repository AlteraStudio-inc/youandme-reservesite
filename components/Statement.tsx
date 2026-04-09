"use client";

import ScrollReveal from "./ScrollReveal";

/*
  Cinematic statement section — dark background, large typography
  Acts as a visual break between content sections
*/

export default function Statement() {
  return (
    <section className="relative py-28 sm:py-36 md:py-48 bg-text-primary overflow-hidden">
      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-8 h-px bg-brand-yellow mx-auto mb-8 sm:mb-12" />
            <p className="text-brand-yellow text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-6 sm:mb-10">
              What We Believe
            </p>
            <h2 className="text-white text-[clamp(22px,4.5vw,48px)] font-bold leading-[1.6] sm:leading-[1.5] tracking-tight">
              カレーのスパイスは、
              <br className="hidden sm:block" />
              夜の料理をもっと自由にする。
            </h2>
            <div className="w-12 h-px bg-brand-yellow mx-auto mt-8 sm:mt-12" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
