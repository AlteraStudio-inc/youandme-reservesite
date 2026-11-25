"use client";

import Link from "next/link";
import { useRef } from "react";
import { ROUTE, yen, type Stop } from "@/lib/site";
import BrushTitle from "./BrushTitle";

/** 写真のない料理は、木札に筆で書いた品書きで見せる */
function Fuda({ stop }: { stop: Stop }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-sumi-2">
      <div
        className="relative flex h-[82%] w-[46%] items-start justify-center bg-fuda pt-[16%] shadow-[0_14px_30px_-12px_oklch(0%_0_0/0.8),inset_0_0_0_2px_var(--color-fuda-edge)]"
        style={{ clipPath: "polygon(50% 0, 100% 11%, 100% 100%, 0 100%, 0 11%)" }}
      >
        <span aria-hidden="true" className="absolute top-[5%] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sumi/70" />
        <span
          className="tate font-brush leading-[1.25] tracking-[0.02em] whitespace-nowrap text-sumi"
          style={{ fontSize: stop.fuda ? "clamp(17px,4.6vw,20px)" : stop.name.length <= 5 ? "clamp(22px,6vw,27px)" : "clamp(19px,5.2vw,23px)" }}
        >
          {(stop.fuda ?? [stop.name]).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
        <span className="absolute bottom-[6%] left-1/2 -translate-x-1/2 border border-shu px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-shu">
          {stop.origin}
        </span>
      </div>
    </div>
  );
}

export default function PopularMenu() {
  const rail = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 3 : 300;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="wood py-16 sm:py-24" style={{ ["--plank" as string]: "120px" }}>
      <BrushTitle id="menu-title" tone="cream" sub={<>日によって内容が変わります。<br className="sm:hidden" />売り切れの際はご容赦ください。</>}>
        人気メニュー
      </BrushTitle>

      <div className="relative mt-10 sm:mt-14">
        <ul ref={rail} className="no-bar flex snap-x snap-mandatory gap-[3px] overflow-x-auto scroll-smooth">
          {ROUTE.map((s) => (
            <li key={s.name} className="w-[74vw] max-w-[340px] shrink-0 snap-start first:ml-0 sm:w-[300px]">
              <figure>
                <div className="aspect-square overflow-hidden bg-sumi">
                  {s.photo ? (
                    <img src={s.photo.src} alt={s.photo.alt} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <Fuda stop={s} />
                  )}
                </div>
                <figcaption className="px-3 pt-4 pb-1 text-center text-cream">
                  <span className="block text-[16px] font-bold">{s.name}</span>
                  <span className="mt-1 block text-[12px] text-mute">
                    {s.origin}
                    {s.price ? <span className="ml-2 font-bold text-cream">{yen(s.price)}</span> : null}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 flex max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="前のメニュー"
              className="flex h-11 w-11 items-center justify-center border border-cream/60 text-cream transition-colors hover:bg-cream hover:text-sumi"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                <path d="M12 4 6 10l6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="次のメニュー"
              className="flex h-11 w-11 items-center justify-center border border-cream/60 text-cream transition-colors hover:bg-cream hover:text-sumi"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                <path d="m8 4 6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <Link
            href="/menu"
            className="inline-flex h-11 items-center whitespace-nowrap bg-shu px-6 text-[14px] font-bold text-paper transition-colors hover:bg-shu-hi"
          >
            品書きをすべて見る
          </Link>
        </div>
      </div>
    </section>
  );
}
