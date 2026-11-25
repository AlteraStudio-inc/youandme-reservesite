import { SITE } from "@/lib/site";
import Reveal from "./Reveal";
import { ArrowIcon, CameraIcon, PinIcon } from "./icons";

const ROWS: { k: string; v: string; sub?: string }[] = [
  { k: "営業時間", v: `${SITE.hours.open} 〜 ${SITE.hours.close}` },
  { k: "休み", v: SITE.holiday, sub: "雨の日はお休みします" },
  { k: "場所", v: `天神 ${SITE.landmark}`, sub: SITE.area },
  { k: "予約", v: "InstagramのDMで", sub: "食材に限りがあるので、DMでの予約がおすすめです" },
];

export default function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative border-t border-rule">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-4 py-20 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 md:py-28">
        <div className="min-w-0">
          <Reveal>
            <h2 id="visit-title" className="font-display text-[clamp(32px,7.5vw,60px)] leading-[1.15] text-ink">
              日銀前で、
              <br />
              待ってます。
            </h2>
          </Reveal>

          {/* 屋台の札（チケット風） */}
          <Reveal className="mt-10">
            <div className="relative rounded-[6px] bg-ink text-lamp-ink">
              <span aria-hidden="true" className="absolute top-[58%] -left-3 h-6 w-6 rounded-full bg-night" />
              <span aria-hidden="true" className="absolute top-[58%] -right-3 h-6 w-6 rounded-full bg-night" />
              <div className="flex items-baseline justify-between gap-4 border-b-2 border-dashed border-lamp-ink/25 px-5 pt-5 pb-4 sm:px-7">
                <p className="font-display text-[22px] leading-none whitespace-nowrap">{SITE.name}</p>
                <p className="font-mono text-[11px] tracking-[0.1em] whitespace-nowrap opacity-70">YATAI · TENJIN</p>
              </div>
              <dl className="px-5 py-2 sm:px-7">
                {ROWS.map((r) => (
                  <div
                    key={r.k}
                    className="grid grid-cols-[5.5em_minmax(0,1fr)] gap-3 border-b border-lamp-ink/12 py-4 last:border-b-0"
                  >
                    <dt className="pt-0.5 text-[13px] font-bold opacity-60">{r.k}</dt>
                    <dd className="min-w-0">
                      <p className="text-[16px] font-bold leading-snug">{r.v}</p>
                      {r.sub && <p className="mt-1 text-[13px] leading-relaxed opacity-70">{r.sub}</p>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.instagram.dm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-full bg-lamp px-6 text-[14px] font-bold text-lamp-ink transition-[background-color,transform] duration-200 hover:bg-ink active:translate-y-px"
            >
              <CameraIcon className="h-4 w-4" />
              DMで予約する
            </a>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-ink/40 px-6 text-[14px] font-bold text-ink transition-colors hover:border-lamp hover:text-lamp"
            >
              今日の営業を確認
              <ArrowIcon dir="out" className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={120} className="min-w-0 md:pt-4">
          <div className="overflow-hidden rounded-[6px] ring-1 ring-rule">
            <iframe
              title="El Bajon の場所（日本銀行 福岡支店前）"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-night block aspect-[4/5] w-full border-0 sm:aspect-[4/3] md:aspect-[4/5]"
            />
          </div>
          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <p className="flex min-w-0 items-start gap-2 text-[14px] leading-[1.8] text-ink-2">
              <PinIcon className="mt-1 h-4 w-4 shrink-0 text-lamp" />
              <span>
                {SITE.area}
                <br />
                {SITE.landmark}に屋台を出しています
              </span>
            </p>
            <a
              href={SITE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-1.5 whitespace-nowrap text-[14px] font-bold text-lamp underline decoration-lamp/40 decoration-2 underline-offset-[6px] hover:decoration-lamp"
            >
              Googleマップで開く
              <ArrowIcon dir="out" className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
