"use client";

import ScrollReveal from "./ScrollReveal";

export default function AccessSection() {
  return (
    <section id="access" className="py-20 sm:py-32 md:py-44">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14">
        <ScrollReveal>
          <div className="flex items-baseline gap-4 sm:gap-6 mb-6">
            <span className="text-[11px] tracking-[0.2em] uppercase text-text-tertiary">Access</span>
            <div className="hr-accent" />
          </div>
          <h2 className="text-[clamp(26px,5vw,56px)] font-black tracking-tight mb-14 sm:mb-20">
            アクセス
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left info — 5 cols */}
          <ScrollReveal className="lg:col-span-5">
            <div className="space-y-7">
              <div>
                <h3 className="text-[22px] sm:text-[26px] font-black tracking-tight mb-2">
                  you&<span className="text-brand-yellow-dark">me</span> curry
                </h3>
                <p className="text-text-secondary text-[13px] sm:text-[14px] leading-relaxed">
                  〒810-0003<br />
                  福岡県福岡市中央区春吉2-17-1
                </p>
              </div>

              <div className="flex items-center gap-3 py-1">
                <div className="w-8 h-8 bg-brand-green/8 rounded-full flex items-center justify-center text-brand-green shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[13px] text-text-secondary">渡辺通駅 徒歩5〜10分</span>
              </div>

              <a href="tel:092-600-9969" className="flex items-center gap-3 group min-h-[44px]">
                <div className="w-8 h-8 bg-brand-green/8 rounded-full flex items-center justify-center text-brand-green shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M5.9 7.5c.7 1.4 1.7 2.4 3.1 3.1l1-.1c.2-.2.4-.2.5-.1.6.2 1.2.3 1.9.3.3 0 .5.2.5.5v1.8c0 .3-.2.5-.5.5C6.6 12.8 3.2 9.4 3.2 3.7c0-.3.2-.5.5-.5h1.8c.3 0 .5.2.5.5 0 .6.1 1.2.3 1.9.1.2 0 .4-.1.5L5.9 7.5z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[20px] font-bold text-text-primary group-hover:text-brand-green transition-colors">
                  092-600-9969
                </span>
              </a>

              {/* Hours — minimal design */}
              <div className="pt-4 border-t border-border">
                <p className="text-[10px] font-semibold text-text-tertiary tracking-[0.2em] uppercase mb-4">Hours</p>
                {[
                  { day: "月", time: "18:00 - 24:00", closed: false },
                  { day: "火", time: "定休日", closed: true },
                  { day: "水", time: "18:00 - 24:00", closed: false },
                  { day: "木", time: "18:00 - 24:00", closed: false },
                  { day: "金", time: "18:00 - 25:00", closed: false },
                  { day: "土", time: "18:00 - 25:00", closed: false },
                  { day: "日", time: "18:00 - 24:00", closed: false },
                ].map((row) => (
                  <div key={row.day} className={`flex items-center justify-between py-2 text-[12px] sm:text-[13px] ${row.closed ? "text-text-tertiary/50" : "text-text-secondary"}`}>
                    <span className="font-medium w-6">{row.day}</span>
                    <span className={row.closed ? "italic" : ""}>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right map — 7 cols */}
          <ScrollReveal delay={0.15} className="lg:col-span-7">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-border aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] lg:min-h-[500px] bg-surface-alt">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d130.4056!3d33.5856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzA4LjIiTiAxMzDCsDI0JzIwLjIiRQ!5e0!3m2!1sja!2sjp!4v1"
                width="100%" height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="you&me curry の地図"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
