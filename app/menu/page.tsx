import { supabaseAdmin } from "@/lib/supabase/server";
import { getImageUrl } from "@/lib/supabase/helpers";
import { CATEGORIES, MENU, SITE, categoryLabel, yen, type Dish } from "@/lib/site";
import type { MenuItem } from "@/lib/types";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ReserveBand from "@/components/site/ReserveBand";
import Reveal from "@/components/site/Reveal";
import FudaWall from "./FudaWall";

export const metadata = {
  title: "品書き | El Bajon エル・バホン",
  description:
    "天神・日銀前の屋台 El Bajon の品書き。タコス アル・パストール、ジャークチキン、クレープ・サレ、カリカリチーズせんべい、豚骨ラーメンなど、世界の路上の味と博多の屋台の定番。",
};

export const dynamic = "force-dynamic";

/** DBに品書きがあればそれを、なければ lib/site.ts の品書きを使う */
async function loadDishes(): Promise<{ dishes: Dish[]; fromDb: boolean }> {
  try {
    const { data, error } = await supabaseAdmin
      .from("menu_items")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order");
    if (!error && data && data.length > 0) {
      const dishes = (data as MenuItem[]).map<Dish>((m) => ({
        id: m.id,
        name: m.title_ja,
        en: m.title || undefined,
        tag: m.tag ?? "",
        price: m.price,
        description: m.description,
        photo: m.image_path ? { src: getImageUrl(m.image_path), alt: m.title_ja } : undefined,
      }));
      return { dishes, fromDb: true };
    }
  } catch {
    // 接続できないときは静的な品書きで表示する
  }
  return { dishes: MENU, fromDb: false };
}

function OriginChip({ origin }: { origin?: string }) {
  if (!origin) return null;
  return (
    <span className="inline-block border border-shu px-2 py-0.5 text-[11px] font-bold whitespace-nowrap text-shu-deep">
      {origin}
    </span>
  );
}

function Limited() {
  return <span className="inline-block bg-sumi px-2 py-0.5 text-[11px] font-bold whitespace-nowrap text-paper">数量限定</span>;
}

/** 写真のある一品：大きく見せる */
function FeatureDish({ d, flip }: { d: Dish; flip: boolean }) {
  const poster = d.photo?.kind === "poster";
  return (
    <div id={`dish-${d.id}`} className="scroll-mt-[120px] lg:scroll-mt-[160px]">
    <Reveal
      as="article"
      className={`grid items-center gap-6 border-b border-sumi/15 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12 ${
        flip ? "md:[&>figure]:order-2" : ""
      }`}
    >
      <figure className={poster ? "mx-auto w-[78%] max-w-[360px] rotate-[-1.5deg]" : ""}>
        <img
          src={d.photo!.src}
          alt={d.photo!.alt}
          loading="lazy"
          className={`block w-full object-cover shadow-[0_20px_40px_-22px_oklch(0%_0_0/0.7)] ${poster ? "" : "aspect-[4/3]"}`}
        />
      </figure>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2">
          <OriginChip origin={d.origin} />
          {d.limited && <Limited />}
        </p>
        <h3 className="mt-3 text-[clamp(24px,5vw,32px)] leading-[1.35] font-bold">{d.name}</h3>
        {d.en && <p className="mt-1 text-[13px] tracking-[0.06em] text-sumi/60">{d.en}</p>}
        {d.price != null && <p className="mt-4 text-[28px] leading-none font-bold text-shu-deep">{yen(d.price)}</p>}
        {d.description && <p className="mt-5 max-w-[34em] text-[15px] leading-[2] font-bold text-sumi/85">{d.description}</p>}
      </div>
    </Reveal>
    </div>
  );
}

/** 写真のない一品：品書きの行 */
function RowDish({ d }: { d: Dish }) {
  return (
    <li id={`dish-${d.id}`} className="scroll-mt-[120px] border-b border-sumi/15 py-6 lg:scroll-mt-[160px]">
      <div className="flex items-baseline gap-3">
        <h3 className="min-w-0 text-[19px] leading-snug font-bold">{d.name}</h3>
        {d.price != null && (
          <>
            <span className="leader" aria-hidden="true" />
            <span className="shrink-0 text-[18px] font-bold text-shu-deep">{yen(d.price)}</span>
          </>
        )}
      </div>
      <p className="mt-2 flex flex-wrap items-center gap-2">
        <OriginChip origin={d.origin} />
        {d.limited && <Limited />}
        {d.en && <span className="text-[12px] tracking-[0.06em] text-sumi/55">{d.en}</span>}
      </p>
      {d.description && <p className="mt-3 text-[14px] leading-[1.95] font-bold text-sumi/80">{d.description}</p>}
    </li>
  );
}

export default async function MenuPage() {
  const { dishes } = await loadDishes();

  const order = CATEGORIES.map((c) => c.tag);
  const tags = [
    ...order.filter((t) => dishes.some((d) => d.tag === t)),
    ...Array.from(new Set(dishes.map((d) => d.tag))).filter((t) => !order.includes(t)),
  ];
  const groups = tags.map((tag) => {
    const cat = CATEGORIES.find((c) => c.tag === tag);
    const items = dishes.filter((d) => d.tag === tag);
    return {
      tag,
      label: cat?.label ?? categoryLabel(tag || null),
      en: cat?.en,
      lead: cat?.lead,
      featured: items.filter((d) => d.photo),
      rows: items.filter((d) => !d.photo),
    };
  });

  return (
    <>
      <SiteHeader />
      <main className="pt-16 lg:pt-[104px]">
        {/* 見出しの帯 */}
        <section className="relative flex h-[260px] items-center justify-center overflow-hidden bg-sumi sm:h-[340px]">
          <img
            src="/photos/ramen.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_50%,transparent,oklch(0%_0_0/0.55))]" />
          <div className="relative text-center text-paper">
            <p className="text-[12px] font-bold tracking-[0.3em] text-paper/80">The Menu</p>
            <h1 className="mt-2 font-brush text-[clamp(56px,14vw,104px)] leading-[1.05] tracking-[0.12em] [text-shadow:0_4px_24px_oklch(0%_0_0/0.6)]">
              品書き
            </h1>
            <p className="mt-3 px-4 text-[14px] font-bold tracking-[0.08em] sm:text-[15px]">
              世界の路上の味と、博多の屋台の定番。
            </p>
          </div>
        </section>

        {/* 屋台の壁にかかった木札 */}
        <FudaWall dishes={dishes} />

        {/* カテゴリの目次（スクロールしても上に残る） */}
        <div className="kraft">
        <nav
          aria-label="品書きのカテゴリ"
          className="kraft sticky top-16 z-30 border-b border-sumi/15 shadow-[0_6px_14px_-10px_oklch(0%_0_0/0.4)] lg:top-[104px]"
        >
          <ul className="no-bar mx-auto flex max-w-[1080px] gap-1 overflow-x-auto px-3 sm:justify-center sm:px-8">
            {groups.map((g) => (
              <li key={g.tag || "none"} className="shrink-0">
                <a
                  href={`#cat-${g.tag || "none"}`}
                  className="flex h-12 items-center px-4 text-[14px] font-bold whitespace-nowrap text-sumi/80 transition-colors hover:text-shu-deep"
                >
                  {g.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

          <div className="mx-auto max-w-[1080px] px-5 pb-20 sm:px-8 md:pb-28">
            {groups.map((g) => (
              <section
                key={g.tag || "none"}
                id={`cat-${g.tag || "none"}`}
                aria-labelledby={`cat-title-${g.tag || "none"}`}
                className="scroll-mt-[120px] pt-16 sm:pt-20 lg:scroll-mt-[160px]"
              >
                <Reveal className="border-b-2 border-sumi pb-4">
                  {g.en && <p className="text-[12px] font-bold tracking-[0.24em] text-shu-deep">{g.en}</p>}
                  <h2 id={`cat-title-${g.tag || "none"}`} className="mt-1 font-brush text-[clamp(34px,7vw,52px)] leading-[1.2] tracking-[0.08em]">
                    {g.label}
                  </h2>
                  {g.lead && <p className="mt-2 text-[14px] font-bold text-sumi/70">{g.lead}</p>}
                </Reveal>

                {g.featured.map((d, i) => (
                  <FeatureDish key={d.id} d={d} flip={i % 2 === 1} />
                ))}

                {g.rows.length > 0 && (
                  <ul className="grid gap-x-14 lg:grid-cols-2">
                    {g.rows.map((d) => (
                      <RowDish key={d.id} d={d} />
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* ご案内 */}
            <Reveal className="mt-20 border-2 border-sumi bg-paper/40 p-6 sm:p-10">
              <h2 className="text-[20px] font-bold tracking-[0.12em]">ご案内</h2>
              <ul className="mt-5 space-y-3 text-[14px] leading-[1.9] font-bold text-sumi/85">
                <li>・仕込みの量に限りがあります。売り切れ次第、終了となります。</li>
                <li>・内容は日によって変わります。その日の品書きは屋台でご確認ください。</li>
                <li>・掲載していない価格は、屋台でご確認ください。</li>
                <li>・料理に合わせたお酒もご用意しています。</li>
                <li>
                  ・最新のお知らせは{" "}
                  <a
                    href={SITE.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-shu-deep underline decoration-2 underline-offset-[5px]"
                  >
                    Instagram（@{SITE.instagram.handle}）
                  </a>
                  {" "}で。
                </li>
              </ul>
            </Reveal>
          </div>
        </div>

        <ReserveBand />
      </main>
      <SiteFooter />
    </>
  );
}
