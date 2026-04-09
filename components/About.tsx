"use client";

import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32 md:py-44">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14">
        {/* Large statement typography — dramatic sizing */}
        <ScrollReveal>
          <div className="flex items-baseline gap-4 sm:gap-6 mb-12 sm:mb-20">
            <span className="text-[11px] tracking-[0.2em] uppercase text-text-tertiary">About</span>
            <div className="hr-accent" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">
          {/* Left — large heading taking 7 cols */}
          <ScrollReveal className="lg:col-span-7">
            <h2 className="text-[clamp(26px,5vw,56px)] font-black tracking-tight leading-[1.3]">
              昼はカレー、
              <br />
              夜はスパイス居酒屋。
              <br />
              <span className="relative inline-block">
                <span className="text-brand-green">二つの顔を持つ店。</span>
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-brand-yellow/50 rounded-full" />
              </span>
            </h2>
          </ScrollReveal>

          {/* Right — body text taking 5 cols, pushed down */}
          <div className="lg:col-span-5 lg:pt-8">
            <ScrollReveal delay={0.15}>
              <div className="text-text-secondary text-[14px] sm:text-[15px] leading-[2] space-y-6 lg:max-w-[420px]">
                <p>
                  you&me curryは、昼間はスパイスカレーの店として多くのお客様に愛されてきました。
                  そのスパイスへのこだわりと技術を、夜の居酒屋メニューに展開したのがこの夜営業です。
                </p>
                <p>
                  ジャマイカ伝統のジャークチキン、自家製のスパイスタコス、
                  そしてスパイスの効いたおつまみたち。
                  「カレー屋がつくる居酒屋」だからこそ出せる味があります。
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats — refined with yellow accent bars */}
        <ScrollReveal className="mt-20 sm:mt-28 md:mt-36">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-16 pt-10 sm:pt-14 border-t border-border">
            {[
              { num: "20", unit: "席", en: "Seats" },
              { num: "18:00", unit: "開店", en: "Open" },
              { num: "¥3,000〜", unit: "客単価", en: "Per person" },
              { num: "火曜", unit: "定休日", en: "Closed" },
            ].map((s, i) => (
              <ScrollReveal key={s.en} delay={i * 0.08}>
                <div className="flex flex-col">
                  <div className="w-5 h-[2px] bg-brand-yellow rounded-full mb-4" />
                  <span className="text-[clamp(26px,4vw,48px)] font-black tracking-tight text-text-primary leading-none">
                    {s.num}
                  </span>
                  <span className="text-[12px] font-semibold text-text-primary mt-2">{s.unit}</span>
                  <span className="text-[10px] text-text-tertiary tracking-[0.1em] uppercase mt-0.5">{s.en}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
