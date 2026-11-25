import Link from "next/link";
import { SITE } from "@/lib/site";
import Logo from "./Logo";
import { CameraIcon } from "./icons";

export default function SiteFooter() {
  return (
    <footer className="bg-sumi-2 text-cream">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-12 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <Link href="/" aria-label={`${SITE.name} トップへ`}>
            <Logo size="sm" />
          </Link>
          <p className="text-center text-[13px] leading-[2] text-mute sm:text-left">
            {SITE.area} {SITE.landmark}
            <br />
            営業 {SITE.hours.open}〜{SITE.hours.close}／{SITE.holiday}・雨天休業
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 lg:items-end">
          <nav aria-label="フッター" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-bold">
            <Link href="/#about" className="whitespace-nowrap hover:text-shu-hi">エル・バホンとは</Link>
            <Link href="/menu" className="whitespace-nowrap hover:text-shu-hi">品書き</Link>
            <Link href="/#shop" className="whitespace-nowrap hover:text-shu-hi">屋台情報</Link>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-shu-hi"
            >
              <CameraIcon className="h-4 w-4" />
              Instagram
            </a>
          </nav>
          <p className="text-[12px] text-mute">© {new Date().getFullYear()} {SITE.name}</p>
        </div>
      </div>
    </footer>
  );
}
