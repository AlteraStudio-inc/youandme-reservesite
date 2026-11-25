import Link from "next/link";
import { SITE } from "@/lib/site";
import { CameraIcon } from "./icons";

/** Ft5 Statement footer */
export default function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden border-t border-rule bg-night-2 pb-24 md:pb-0">
      <div className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-8 md:pt-28">
        <p className="font-display text-[clamp(40px,11vw,120px)] leading-[1.08] text-ink">
          腹が減ったら、
          <br />
          <span className="text-lamp">日銀前へ。</span>
        </p>

        <div className="mt-16 flex flex-col gap-6 border-t border-rule py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[20px] leading-none text-lamp">{SITE.name}</span>
            <span className="text-[13px] text-ink-3">{SITE.kind}</span>
          </div>
          <nav aria-label="フッター" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
            <Link href="/menu" className="whitespace-nowrap text-ink-2 transition-colors hover:text-lamp">
              品書き
            </Link>
            <Link href="/#visit" className="whitespace-nowrap text-ink-2 transition-colors hover:text-lamp">
              行き方
            </Link>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-ink-2 transition-colors hover:text-lamp"
            >
              <CameraIcon className="h-4 w-4" />@{SITE.instagram.handle}
            </a>
          </nav>
        </div>
        <p className="pb-8 font-mono text-[11px] tracking-[0.08em] text-ink-3">
          © {new Date().getFullYear()} {SITE.name} — {SITE.tagline}
        </p>
      </div>
    </footer>
  );
}
