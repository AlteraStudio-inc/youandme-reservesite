import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

const MOSAIC = [
  { src: "/photos/tacos-poster.jpg", alt: "パストールとジャメキシカン、2種のタコスの告知", cls: "row-span-2" },
  { src: "/photos/oven-dish.jpg", alt: "こんがり焼き上げた一皿", cls: "" },
  { src: "/photos/ramen.jpg", alt: "豚骨ラーメン", cls: "" },
  { src: "/photos/stall-front.jpg", alt: "正面から見た屋台。天井には青空と雲が描かれている", cls: "" },
  { src: "/photos/jerk-chicken.jpg", alt: "炭火で焼いたジャークチキン", cls: "lg:col-span-2" },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shu-fade relative overflow-hidden text-paper">
      <h2 id="about-title" className="sr-only">
        エル・バホンとは
      </h2>

      {/* 縦書き ＋ ロゴ */}
      <div className="mx-auto grid max-w-[1120px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-3 px-3 pt-16 sm:gap-8 sm:px-8 lg:pt-28">
        {/* 左（後に読む） */}
        <Reveal className="flex justify-center pt-10 lg:pt-4">
          <p className="tate h-[300px] text-[13px] leading-[2.1] font-bold tracking-[0.12em] sm:h-[380px] sm:text-[16px] lg:h-[430px] lg:text-[18px]">
            店名の「バホン」は、スペイン語で『空腹』。
            お腹をすかせて来た人を、世界の味で満たす屋台です。
          </p>
        </Reveal>

        <Reveal className="flex flex-col items-center pt-2 text-center">
          <p className="text-[11px] font-bold tracking-[0.28em] sm:text-[15px]">天神 日銀前 屋台</p>
          <p className="mt-2 font-brush text-[clamp(44px,13vw,128px)] leading-[1] text-paper [text-shadow:0_4px_24px_oklch(0%_0_0/0.35)]">
            {SITE.name}
          </p>
          <p className="mt-3 text-[11px] font-bold tracking-[0.32em] sm:text-[16px]">{SITE.nameKana}</p>
          <p className="mt-5 border-y border-paper/40 py-1.5 text-[10px] tracking-[0.2em] sm:text-[13px]">
            {SITE.tagline}
          </p>
        </Reveal>

        {/* 右（先に読む） */}
        <Reveal className="flex justify-center pt-10 lg:pt-4" delay={120}>
          <p className="tate h-[300px] text-[13px] leading-[2.1] font-bold tracking-[0.12em] sm:h-[380px] sm:text-[16px] lg:h-[430px] lg:text-[18px]">
            「世界あちこちで、うまいものをひたすら食べてきましたので、同じものを作ります。」
            <span className="mt-[1.5em] block text-paper/75">— 店主</span>
          </p>
        </Reveal>
      </div>

      {/* 屋台の実写（日暮れどき）。四辺を朱と墨の背景へ溶かす */}
      <Reveal as="figure" className="mx-auto mt-2 max-w-[1040px] sm:mt-0">
        <img
          src="/photos/stall-dusk.jpg"
          alt="日暮れどき、天神・日銀前のビルの前で灯りがともった屋台 El Bajon。木のカウンターに白いスツールが並ぶ"
          width={1440}
          height={1080}
          loading="lazy"
          className="fade-edges block h-auto w-full"
        />
        <figcaption className="-mt-6 text-center text-[12px] font-bold tracking-[0.14em] text-paper/70 sm:-mt-10">
          日暮れどきの El Bajon（天神・日銀前）
        </figcaption>
      </Reveal>

      {/* 30か国 */}
      <Reveal className="mx-auto mt-4 flex max-w-[1120px] flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 pb-12 sm:px-8 lg:pb-16">
        <span
          aria-hidden="true"
          className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-shu font-brush text-[36px] text-paper ring-4 ring-paper/15 sm:h-[96px] sm:w-[96px] sm:text-[52px]"
        >
          旅
        </span>
        <p className="text-[clamp(20px,4.6vw,40px)] leading-[1.35] font-bold">
          世界のあちこちを、
          <br />
          食べ歩いて
        </p>
        <p className="flex items-baseline gap-1 font-bold whitespace-nowrap">
          <span className="text-[clamp(64px,15vw,136px)] leading-none tracking-[-0.02em]">30</span>
          <span className="text-[clamp(26px,5.6vw,52px)]">か国以上</span>
        </p>
      </Reveal>

      {/* 写真のモザイク */}
      <div className="grid grid-flow-row-dense auto-rows-[38vw] grid-cols-2 gap-[3px] bg-sumi sm:auto-rows-[30vw] lg:auto-rows-[230px] lg:grid-cols-4">
        {MOSAIC.map((m) => (
          <div key={m.src} className={`relative overflow-hidden ${m.cls}`}>
            <img src={m.src} alt={m.alt} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group col-span-2 flex flex-col items-center justify-center gap-2 bg-sumi px-4 text-center lg:col-span-1"
        >
          <span className="font-brush text-[26px] leading-tight text-paper">屋台と、世界の味と、夜風。</span>
          <span className="text-[13px] font-bold tracking-[0.06em] text-mute transition-colors group-hover:text-shu-hi">
            @{SITE.instagram.handle}
          </span>
        </a>
      </div>
    </section>
  );
}
