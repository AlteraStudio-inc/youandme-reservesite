import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="grain relative overflow-hidden border-t border-rule bg-night-2">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 md:py-32">
        <Reveal>
          <h2 id="story-title" className="sr-only">
            屋台のこと
          </h2>
          <blockquote className="max-w-[22em]">
            <p className="font-display text-[clamp(26px,5.8vw,54px)] leading-[1.45] text-ink">
              「世界あちこちで
              <span className="text-lamp">うまいもの</span>
              をひたすら食べてきましたので、同じものを作ります。」
            </p>
            <footer className="mt-6 text-[14px] text-ink-3">— 店主（Instagramのプロフィールより）</footer>
          </blockquote>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
          <Reveal className="min-w-0 border-t border-rule pt-6">
            <p className="font-display text-[56px] leading-none text-lamp sm:text-[64px]">30+</p>
            <p className="mt-3 text-[14px] font-bold text-ink">店主が食べ歩いた国</p>
            <p className="mt-3 text-[14px] leading-[1.9] text-ink-2">
              スペイン、カリブ海、メキシコ、フランス、オランダ。現地で食べた味を、なるべくそのままの形で再現しています。
            </p>
          </Reveal>
          <Reveal delay={100} className="min-w-0 border-t border-rule pt-6">
            <p className="font-display text-[clamp(34px,8vw,56px)] leading-none text-ink">
              Bajón<span className="text-lamp">.</span>
            </p>
            <p className="mt-3 text-[14px] font-bold text-ink">店名はスペイン語の「空腹」</p>
            <p className="mt-3 text-[14px] leading-[1.9] text-ink-2">
              お腹をすかせて来た人を、世界の味で満たす。それが {SITE.name}（{SITE.nameKana}）という名前の由来です。
            </p>
          </Reveal>
          <Reveal delay={200} className="min-w-0 border-t border-rule pt-6">
            <p className="font-display text-[clamp(34px,8vw,56px)] leading-none text-ink">博多の夜風</p>
            <p className="mt-3 text-[14px] font-bold text-ink">それでも、ここは博多の屋台</p>
            <p className="mt-3 text-[14px] leading-[1.9] text-ink-2">
              隣の人と肩を並べて、夜風にあたりながら一杯。旅先のような気分で、2軒目や食べ歩きの途中にもどうぞ。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
