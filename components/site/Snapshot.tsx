import Reveal from "./Reveal";

/** 実際の屋台写真（Instagramより）。写真が小さめなので、額装したスナップとして見せる */
export default function Snapshot() {
  return (
    <section aria-labelledby="snapshot-title" className="relative border-t border-rule bg-night-2">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-20 sm:px-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-16 md:py-28">
        <Reveal className="min-w-0">
          <h2 id="snapshot-title" className="font-display text-[clamp(32px,7.5vw,60px)] leading-[1.15] text-ink">
            これ、
            <br />
            屋台なんだぜ。
          </h2>
          <p className="mt-6 max-w-[28em] text-[15px] leading-[1.95] text-ink-2">
            木の格子で組んだカウンターに、青空を描いた天井。
            日が落ちると灯りがともって、天神のビルのあいだに、ちいさなレストランがあらわれます。
          </p>
          <p className="mt-4 text-[13px] text-ink-3">写真：Instagram @bajon.restaurant_ots より</p>
        </Reveal>

        <div className="relative min-w-0 pb-10 sm:pb-16">
          <Reveal>
            <figure className="relative w-[88%] rotate-[-1.5deg] bg-ink p-2.5 pb-10 shadow-[0_30px_60px_-20px_oklch(0%_0_0/0.7)] sm:p-3 sm:pb-12">
              <img
                src="/photos/stall-dusk.jpg"
                alt="夕暮れの天神。ビルの前で灯りがともった屋台 El Bajon と、並んだスツール"
                width={640}
                height={480}
                loading="lazy"
                className="block aspect-[4/3] w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 font-mono text-[11px] tracking-[0.08em] text-lamp-ink sm:bottom-4 sm:left-4 sm:text-[12px]">
                日銀前・日暮れどき
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={140} className="absolute right-0 bottom-0 w-[52%]">
            <figure className="relative rotate-[2.5deg] bg-ink p-2 pb-8 shadow-[0_30px_60px_-20px_oklch(0%_0_0/0.8)] sm:p-2.5 sm:pb-10">
              <img
                src="/photos/stall-front.jpg"
                alt="正面から見た屋台。天井には青空と雲が描かれている"
                width={640}
                height={599}
                loading="lazy"
                className="block aspect-square w-full object-cover"
              />
              <figcaption className="absolute bottom-2 left-2.5 font-mono text-[10px] tracking-[0.08em] text-lamp-ink sm:bottom-3 sm:text-[11px]">
                天井は、青空
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
