import { SITE } from "@/lib/site";
import BrushTitle from "./BrushTitle";
import Reveal from "./Reveal";

const ROWS = [
  { k: "営業時間", v: `${SITE.hours.open} 〜 ${SITE.hours.close}` },
  { k: "休み", v: `${SITE.holiday}（雨の日はお休み）` },
  { k: "場所", v: `${SITE.area}　${SITE.landmark}` },
  { k: "予約", v: "InstagramのDMで承ります。食材に限りがあるため、ご予約がおすすめです。" },
];

export default function ShopInfo() {
  return (
    <section id="shop" aria-labelledby="shop-title" className="bg-paper">
      <div className="py-14 sm:py-20">
        <BrushTitle id="shop-title">屋台情報</BrushTitle>
      </div>

      {/* 暗い写真のタイル */}
      <a
        href={SITE.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-[300px] overflow-hidden bg-sumi sm:h-[380px]"
      >
        <img
          src="/photos/stall-dusk.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-45 transition-opacity duration-500 group-hover:opacity-60"
        />
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-paper">
          <p className="text-[15px] font-bold tracking-[0.2em]">福岡・天神</p>
          <p className="mt-4 text-[clamp(26px,6vw,40px)] font-bold tracking-[0.08em]">
            {SITE.name}　<span className="text-[0.7em]">{SITE.nameKana}</span>
          </p>
          <p className="mt-4 text-[14px] font-bold">{SITE.landmark}</p>
          <span className="mt-6 inline-flex h-10 items-center border border-paper/70 px-5 text-[13px] font-bold transition-colors group-hover:bg-paper group-hover:text-sumi">
            Googleマップで見る
          </span>
        </div>
      </a>

      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <Reveal className="min-w-0">
          <dl className="border-t-2 border-sumi">
            {ROWS.map((r) => (
              <div key={r.k} className="grid grid-cols-[6.5em_minmax(0,1fr)] gap-4 border-b border-sumi/15 py-5">
                <dt className="text-[14px] font-bold text-sumi/60">{r.k}</dt>
                <dd className="text-[15px] leading-[1.85] font-bold">{r.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={100} className="min-w-0">
          <iframe
            title="El Bajon の場所（日本銀行 福岡支店前）"
            src={SITE.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-sepia block aspect-[4/3] w-full border-0"
          />
        </Reveal>
      </div>
    </section>
  );
}
