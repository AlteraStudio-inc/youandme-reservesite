"use client";

import ScrollReveal from "./ScrollReveal";

export default function Gallery() {
  return (
    <section className="py-20 sm:py-32 md:py-44">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14">
        <ScrollReveal>
          <div className="flex items-baseline gap-4 sm:gap-6 mb-10 sm:mb-16">
            <span className="text-[11px] tracking-[0.2em] uppercase text-text-tertiary">Gallery</span>
            <div className="hr-accent" />
          </div>
        </ScrollReveal>

        {/* 3 images — large left + 2 stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {/* Large — store interior */}
          <ScrollReveal className="md:row-span-2">
            <div className="group rounded-lg sm:rounded-xl overflow-hidden h-full">
              <img
                src="/images/6.jpeg"
                alt="店内の雰囲気"
                className="w-full h-full object-cover aspect-[4/3] md:aspect-auto md:min-h-full group-hover:scale-[1.03] transition-transform duration-1000"
              />
            </div>
          </ScrollReveal>

          {/* Top right — exterior 1 */}
          <ScrollReveal delay={0.1}>
            <div className="group rounded-lg sm:rounded-xl overflow-hidden">
              <img
                src="/images/7.jpeg"
                alt="外観"
                className="w-full h-full object-cover aspect-[3/2] group-hover:scale-[1.03] transition-transform duration-1000"
              />
            </div>
          </ScrollReveal>

          {/* Bottom right — exterior 2 */}
          <ScrollReveal delay={0.18}>
            <div className="group rounded-lg sm:rounded-xl overflow-hidden">
              <img
                src="/images/8.jpeg"
                alt="外観"
                className="w-full h-full object-cover aspect-[3/2] group-hover:scale-[1.03] transition-transform duration-1000"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
