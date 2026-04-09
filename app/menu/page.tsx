import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getImageUrl } from "@/lib/supabase/helpers";

export const metadata = {
  title: "メニュー | you&me curry",
  description: "you&me curryのメニュー一覧。ジャークチキン、スパイスタコスなどスパイス居酒屋ならではの料理をご紹介。",
};

export default async function MenuPage() {
  const { data: menuItems } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order");

  const items = menuItems ?? [];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14 h-14 flex items-center justify-between">
          <Link href="/" className="text-[14px] font-bold tracking-tight hover:opacity-70 transition-opacity">
            you&me curry
          </Link>
          <Link
            href="/"
            className="text-[12px] text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            トップに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14 py-12 sm:py-20">
        {/* Page title */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="text-[11px] tracking-[0.2em] uppercase text-text-tertiary">Menu</span>
            <div className="hr-accent" />
          </div>
          <h1 className="text-[clamp(28px,5vw,52px)] font-black tracking-tight mb-3">
            メニュー一覧
          </h1>
          <p className="text-text-secondary text-[14px] sm:text-[15px] max-w-md">
            カレーのスパイス技術を活かした、夜の居酒屋メニュー。タップして詳細をご覧ください。
          </p>
        </div>

        {/* Menu grid */}
        {items.length === 0 ? (
          <p className="text-text-tertiary text-[14px]">メニューは現在準備中です。</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/menu/${item.id}`}
                className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-surface-alt">
                  <img
                    src={item.image_path ? getImageUrl(item.image_path) : `/images/${item.sort_order + 1}.png`}
                    alt={item.title_ja}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] uppercase text-brand-green w-fit mb-2">
                    {item.tag}
                  </span>
                  <h2 className="text-[17px] sm:text-[19px] font-bold tracking-tight mb-0.5">
                    {item.title}
                  </h2>
                  <p className="text-text-tertiary text-[11px] mb-2">{item.title_ja}</p>
                  <p className="text-text-secondary text-[12px] sm:text-[13px] leading-relaxed flex-1 line-clamp-2">
                    {item.description}
                  </p>
                  {item.price && (
                    <p className="text-brand-green-dark text-[15px] font-bold mt-3">
                      ¥{item.price.toLocaleString()}
                    </p>
                  )}
                  <span className="text-[11px] text-text-tertiary mt-3 flex items-center gap-1 group-hover:text-brand-green transition-colors">
                    詳細を見る
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
