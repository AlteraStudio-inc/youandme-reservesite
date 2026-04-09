import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getImageUrl } from "@/lib/supabase/helpers";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: item } = await supabaseAdmin
    .from("menu_items")
    .select("title, title_ja, description")
    .eq("id", id)
    .single();

  if (!item) return { title: "メニューが見つかりません" };

  return {
    title: `${item.title_ja} | you&me curry`,
    description: item.description || `${item.title_ja} - you&me curryのメニュー`,
  };
}

export default async function MenuDetailPage({ params }: Props) {
  const { id } = await params;

  const { data: item } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .single();

  if (!item) notFound();

  // Fetch other menu items for "Other menus" section
  const { data: otherItems } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .eq("is_visible", true)
    .neq("id", id)
    .order("sort_order")
    .limit(3);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14 h-14 flex items-center justify-between">
          <Link href="/" className="text-[14px] font-bold tracking-tight hover:opacity-70 transition-opacity">
            you&me curry
          </Link>
          <Link
            href="/menu"
            className="text-[12px] text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            メニュー一覧
          </Link>
        </div>
      </header>

      <main className="max-w-[960px] mx-auto px-5 sm:px-8 py-10 sm:py-16">
        {/* Hero image */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-surface-alt mb-8 sm:mb-12">
          <div className="aspect-[16/9] sm:aspect-[21/9]">
            <img
              src={item.image_path ? getImageUrl(item.image_path) : `/images/${item.sort_order + 1}.png`}
              alt={item.title_ja}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[640px]">
          <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-brand-green mb-3">
            {item.tag}
          </span>
          <h1 className="text-[clamp(28px,5vw,44px)] font-black tracking-tight mb-1">
            {item.title}
          </h1>
          <p className="text-text-tertiary text-[14px] mb-6">{item.title_ja}</p>

          {item.price && (
            <p className="text-brand-green-dark text-[22px] font-bold mb-6">
              ¥{item.price.toLocaleString()}
            </p>
          )}

          {item.description && (
            <p className="text-text-secondary text-[14px] sm:text-[15px] leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Other menus */}
        {otherItems && otherItems.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-10 border-t border-border">
            <h2 className="text-[18px] sm:text-[20px] font-bold tracking-tight mb-6">
              その他のメニュー
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {otherItems.map((other) => (
                <Link
                  key={other.id}
                  href={`/menu/${other.id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-surface-alt">
                    <img
                      src={other.image_path ? getImageUrl(other.image_path) : `/images/${other.sort_order + 1}.png`}
                      alt={other.title_ja}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-bold tracking-tight">{other.title}</h3>
                    <p className="text-text-tertiary text-[11px]">{other.title_ja}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
