import { SITE } from "@/lib/site";

/** 朱の札に筆文字のロゴ（ヘッダーとフッターで共通） */
export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = {
    sm: { pad: "px-4 py-3", top: "text-[10px]", name: "text-[26px]", sub: "text-[9px]" },
    md: { pad: "px-6 pt-4 pb-5", top: "text-[11px]", name: "text-[38px]", sub: "text-[10px]" },
    lg: { pad: "px-7 pt-5 pb-6", top: "text-[12px]", name: "text-[44px]", sub: "text-[11px]" },
  }[size];
  return (
    <span className={`inline-flex flex-col items-center bg-shu text-paper ${s.pad} shadow-[0_8px_24px_-10px_oklch(0%_0_0/0.6)]`}>
      <span className={`whitespace-nowrap font-bold tracking-[0.18em] ${s.top}`}>天神 日銀前 屋台</span>
      <span className={`font-brush leading-[1.05] whitespace-nowrap ${s.name}`}>{SITE.name}</span>
      <span className={`mt-0.5 whitespace-nowrap font-bold tracking-[0.3em] ${s.sub}`}>{SITE.nameKana}</span>
    </span>
  );
}
