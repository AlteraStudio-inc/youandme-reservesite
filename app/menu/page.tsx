import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import MenuClient from "./MenuClient";

export const metadata = {
  title: "メニュー | you&me curry",
  description: "you&me curryのメニュー一覧。スパイス居酒屋ならではの料理・ドリンクをカテゴリ別にご覧いただけます。",
};

export const dynamic = "force-dynamic";

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
        <div className="mb-8 sm:mb-12">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="text-[11px] tracking-[0.2em] uppercase text-text-tertiary">Menu</span>
            <div className="hr-accent" />
          </div>
          <h1 className="text-[clamp(28px,5vw,52px)] font-black tracking-tight mb-3">
            メニュー一覧
          </h1>
          <p className="text-text-secondary text-[14px] sm:text-[15px] max-w-md">
            カレーのスパイス技術を活かした、夜の居酒屋メニュー。
          </p>
        </div>

        <MenuClient items={items} />
      </main>
    </div>
  );
}
