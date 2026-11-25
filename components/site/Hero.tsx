import { SITE } from "@/lib/site";
import YataiIllustration from "./YataiIllustration";
import { ArrowIcon, CameraIcon } from "./icons";

/**
 * スマホ：見出し → 屋台イラスト → 説明・ボタン の順。
 * PC：左に見出しと説明、右にイラスト。
 */
export default function Hero() {
  return (
    <section className="grain relative overflow-hidden pt-24 pb-14 sm:pt-28 md:pb-20">
      <div className="mx-auto grid max-w-[1280px] items-center gap-x-6 px-4 sm:px-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:grid-rows-[auto_auto]">
        <div className="relative z-10 min-w-0 md:self-end">
          <h1 className="font-display text-[clamp(44px,13.5vw,112px)] leading-[1.02] tracking-[-0.01em] text-ink">
            路上の、
            <br />
            <span className="text-lamp">レストラン。</span>
          </h1>
          <p className="mt-5 font-mono text-[13px] tracking-[0.08em] text-ink-3">{SITE.tagline}</p>
        </div>

        <div className="relative -mx-4 mt-6 min-w-0 sm:mx-0 md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0">
          <YataiIllustration className="h-auto w-full" />
        </div>

        <div className="relative z-10 mt-6 min-w-0 md:col-start-1 md:row-start-2 md:mt-0 md:self-start">
          <p className="max-w-[30em] text-[15px] leading-[1.95] text-ink-2 sm:text-[16px] md:mt-7">
            天神・日銀前の屋台 <strong className="font-bold text-ink">{SITE.name}</strong>（{SITE.nameKana}）。
            世界30か国以上を食べ歩いた店主が、旅先で出会った“うまいもの”を、そのまま屋台で出しています。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-9">
            <a
              href={SITE.instagram.dm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center gap-2.5 whitespace-nowrap rounded-full bg-lamp px-7 text-[15px] font-bold text-lamp-ink shadow-[0_0_40px_-8px_var(--color-lamp)] transition-[background-color,transform] duration-200 hover:bg-ink active:translate-y-px"
            >
              <CameraIcon className="h-[18px] w-[18px]" />
              InstagramのDMで予約
            </a>
            <a
              href="#route"
              className="group inline-flex h-11 items-center gap-2 whitespace-nowrap text-[15px] font-bold text-ink underline decoration-lamp/50 decoration-2 underline-offset-[6px] transition-colors hover:decoration-lamp"
            >
              献立を見る
              <ArrowIcon dir="down" className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </div>

          <dl className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-5 font-mono text-[12.5px] text-ink-3 md:mt-10">
            <div>
              <dt className="sr-only">営業時間</dt>
              <dd className="whitespace-nowrap text-ink-2">
                {SITE.hours.open} – {SITE.hours.close}
              </dd>
            </div>
            <div>
              <dt className="sr-only">休み</dt>
              <dd className="whitespace-nowrap">{SITE.holiday}・雨天休業</dd>
            </div>
            <div>
              <dt className="sr-only">場所</dt>
              <dd className="whitespace-nowrap">天神 {SITE.landmark}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
