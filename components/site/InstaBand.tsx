import { SITE } from "@/lib/site";
import BrushTitle from "./BrushTitle";
import { CameraIcon } from "./icons";

const POSTS = [
  { src: "/photos/stall-dusk.jpg", date: "2022.09.04", text: "綺麗だろ…？ これ、屋台なんだぜ…", href: "https://www.instagram.com/bajon.restaurant_ots/p/CiFL368Jm8T/" },
  { src: "/photos/tacos-poster.jpg", date: "2026.06.12", text: "パストールタコス・ジャメキシカン 各¥680。売り切れ前にぜひ。", href: "https://www.instagram.com/bajon.restaurant_ots/p/DZgvMVoTTRA/" },
  { src: "/photos/oven-dish.jpg", date: "2026.03.30", text: "フランス仕込みのクレープ・サレや、明太子のオリジナルおつまみも。", href: "https://www.instagram.com/bajon.restaurant_ots/p/DWiHMP4mHwa/" },
];

/** モノクロの屋台写真を背景に、Instagramの投稿を3つ */
export default function InstaBand() {
  return (
    <section aria-labelledby="insta-title" className="relative overflow-hidden py-16 sm:py-24">
      <img
        src="/photos/stall-front.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,oklch(99%_0.003_85/0.55)_0%,oklch(99%_0.003_85/0.88)_45%,var(--color-paper)_80%)]" />

      <div className="relative mx-auto max-w-[1080px] px-5 sm:px-8">
        <BrushTitle id="insta-title">インスタグラム</BrushTitle>

        <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
          {POSTS.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-sumi/10 bg-paper shadow-[0_10px_30px_-18px_oklch(0%_0_0/0.5)] transition-shadow hover:shadow-[0_16px_40px_-18px_oklch(0%_0_0/0.6)]"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={p.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="flex items-center gap-2 text-[12px] font-bold text-sumi/60">
                    <CameraIcon className="h-4 w-4" />
                    {SITE.instagram.handle}
                    <time className="ml-auto">{p.date}</time>
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.8] font-bold text-sumi group-hover:text-shu-deep">{p.text}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 whitespace-nowrap bg-sumi px-7 text-[14px] font-bold text-paper transition-colors hover:bg-shu"
          >
            <CameraIcon className="h-5 w-5" />@{SITE.instagram.handle} をフォロー
          </a>
        </div>
      </div>
    </section>
  );
}
