import Link from "next/link";
import { ALSO, ROUTE, yen, type Stop } from "@/lib/site";
import Reveal from "./Reveal";
import { ArrowIcon } from "./icons";

const TILTS = [-8, 6, -3, 9, -6, 4, -10];

function Stamp({ stop, i }: { stop: Stop; i: number }) {
  return (
    <div
      className="relative flex h-[76px] w-[76px] shrink-0 flex-col items-center justify-center rounded-full border-2 border-shu bg-night text-shu shadow-[inset_0_0_0_4px_var(--color-night),inset_0_0_0_5px_var(--color-shu)] sm:h-[88px] sm:w-[88px]"
      style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
      aria-hidden="true"
    >
      <span className="px-1 text-center font-mono text-[11px] font-medium leading-tight tracking-[0.04em] sm:text-[12px]">
        {stop.code}
      </span>
      <span className="mt-1 font-mono text-[9px] tracking-[0.1em] opacity-80">
        {String(i + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function StopRow({ stop, i }: { stop: Stop; i: number }) {
  const hasPhoto = !!stop.photo;
  return (
    <li className="relative grid grid-cols-[76px_minmax(0,1fr)] gap-x-5 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-x-8">
      <div className="relative z-10 pt-1">
        <Stamp stop={stop} i={i} />
      </div>

      <Reveal
        className={`min-w-0 pb-14 sm:pb-20 ${
          hasPhoto ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-10" : ""
        }`}
      >
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-ink-3">
            <span className="sr-only">ルーツ：</span>
            {stop.origin}
          </p>
          <h3 className="mt-1.5 font-display text-[clamp(24px,5.6vw,40px)] leading-[1.25] text-ink">
            {stop.name}
          </h3>
          {stop.price && (
            <p className="mt-2 font-mono text-[15px] text-lamp">
              {yen(stop.price)}
            </p>
          )}
          <p className="mt-4 max-w-[32em] text-[15px] leading-[1.95] text-ink-2">{stop.note}</p>
        </div>

        {stop.photo && (
          <figure
            className={`mt-7 md:mt-0 ${
              stop.photo.kind === "poster"
                ? "w-[78%] max-w-[300px] rotate-[2deg] md:w-full md:justify-self-end"
                : "max-w-[420px] md:justify-self-end"
            }`}
          >
            <img
              src={stop.photo.src}
              alt={stop.photo.alt}
              loading="lazy"
              className={`block w-full object-cover ${
                stop.photo.kind === "poster"
                  ? "shadow-[0_24px_50px_-18px_oklch(0%_0_0/0.8)]"
                  : "aspect-[4/3] rounded-[3px] ring-1 ring-rule"
              }`}
            />
          </figure>
        )}
      </Reveal>
    </li>
  );
}

export default function Route() {
  return (
    <section id="route" aria-labelledby="route-title" className="relative border-t border-rule">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 md:py-28">
        <Reveal className="max-w-[40em]">
          <h2 id="route-title" className="font-display text-[clamp(34px,8vw,68px)] leading-[1.12] text-ink">
            旅する献立
          </h2>
          <p className="mt-5 text-[15px] leading-[1.95] text-ink-2 sm:text-[16px]">
            メキシコの屋台、カリブの炭火、南仏の家庭の台所。
            店主が旅先で出会った味を、ひと皿ずつ天神の路上へ持ち帰りました。
          </p>
        </Reveal>

        <ol className="relative mt-14 sm:mt-20" aria-label="看板料理">
          {/* 旅のルート線 */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-10 left-[37px] border-l-2 border-dashed border-rule sm:left-[43px]"
          />
          {ROUTE.map((stop, i) => (
            <StopRow key={stop.name} stop={stop} i={i} />
          ))}
        </ol>

        <Reveal className="mt-2 grid gap-8 border-t border-rule pt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="text-[14px] text-ink-3">ほかにも</p>
            <p className="mt-2 text-[18px] font-bold leading-[1.8] text-ink sm:text-[20px]">
              {ALSO.join("　/　")}　ほか
            </p>
            <p className="mt-4 text-[13px] leading-[1.8] text-ink-3">
              ※ 仕込みの量に限りがあり、売り切れ次第終了です。内容は日によって変わります。
            </p>
          </div>
          <Link
            href="/menu"
            className="group inline-flex h-12 items-center gap-2 justify-self-start whitespace-nowrap rounded-full border border-ink/40 px-6 text-[14px] font-bold text-ink transition-colors hover:border-lamp hover:text-lamp"
          >
            品書きをすべて見る
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
