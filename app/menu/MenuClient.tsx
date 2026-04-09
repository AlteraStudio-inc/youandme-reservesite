"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import { getImageUrl } from "@/lib/supabase/helpers";

const CATEGORY_LABELS: Record<string, string> = {
  Signature: "Signature",
  "A la carte": "A la carte",
  Drinks: "Drinks",
  Side: "Side",
};

// Static fallback images for items without image_path (cycle through available ones)
const FALLBACK_IMAGES = ["/images/2.png", "/images/3.png", "/images/4.png", "/images/5.png"];

function getFallbackImage(index: number) {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

export default function MenuClient({ items }: { items: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Derive ordered category list from actual items
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const order = ["Signature", "A la carte", "Side", "Drinks"];
    const found: string[] = [];
    for (const cat of order) {
      if (items.some((item) => item.tag === cat)) {
        found.push(cat);
        seen.add(cat);
      }
    }
    // Any extra categories not in the fixed order
    for (const item of items) {
      if (item.tag && !seen.has(item.tag)) {
        found.push(item.tag);
        seen.add(item.tag);
      }
    }
    return found;
  }, [items]);

  const filtered = useMemo(
    () => (activeCategory === "all" ? items : items.filter((item) => item.tag === activeCategory)),
    [items, activeCategory]
  );

  return (
    <>
      {/* Category filter tabs */}
      <div className="flex gap-2 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none">
        <button
          onClick={() => setActiveCategory("all")}
          className={`h-10 sm:h-9 px-5 sm:px-4 rounded-full text-[13px] sm:text-[12px] font-semibold tracking-wide transition-all duration-200 whitespace-nowrap shrink-0 ${
            activeCategory === "all"
              ? "bg-text-primary text-white"
              : "bg-white text-text-secondary border border-border hover:border-text-secondary"
          }`}
        >
          All
          <span className="ml-1.5 text-[11px] sm:text-[10px] opacity-50">{items.length}</span>
        </button>
        {categories.map((cat) => {
          const count = items.filter((item) => item.tag === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`h-10 sm:h-9 px-5 sm:px-4 rounded-full text-[13px] sm:text-[12px] font-semibold tracking-wide transition-all duration-200 whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? "bg-brand-green-dark text-white"
                  : "bg-white text-text-secondary border border-border hover:border-brand-green hover:text-brand-green"
              }`}
            >
              {CATEGORY_LABELS[cat] ?? cat}
              <span className="ml-1.5 text-[11px] sm:text-[10px] opacity-50">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-text-tertiary text-[14px]">メニューは現在準備中です。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {filtered.map((item, index) => (
            <Link
              key={item.id}
              href={`/menu/${item.id}`}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-row sm:flex-col"
            >
              {/* Image: square on mobile (left), 4:3 on desktop (top) */}
              <div className="w-28 sm:w-full aspect-square sm:aspect-[4/3] shrink-0 overflow-hidden bg-surface-alt">
                {item.image_path ? (
                  <img
                    src={getImageUrl(item.image_path)}
                    alt={item.title_ja}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={getFallbackImage(index)}
                      alt={item.title_ja}
                      className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-text-tertiary text-[10px] tracking-widest uppercase">No Image</span>
                    </div>
                  </div>
                )}
              </div>
              {/* Content */}
              <div className="p-3 sm:p-5 flex flex-col flex-1 min-w-0 justify-center">
                {item.tag && (
                  <span className={`text-[9px] font-semibold tracking-[0.15em] uppercase w-fit mb-1 sm:mb-2 ${
                    item.tag === "Signature" ? "text-brand-yellow-dark" :
                    item.tag === "Drinks" ? "text-blue-500" :
                    item.tag === "Side" ? "text-orange-500" :
                    "text-brand-green"
                  }`}>
                    {CATEGORY_LABELS[item.tag] ?? item.tag}
                  </span>
                )}
                <h2 className="text-[14px] sm:text-[16px] font-bold tracking-tight mb-0.5 leading-snug truncate">
                  {item.title}
                </h2>
                <p className="text-text-tertiary text-[11px] mb-1 sm:mb-2 truncate">{item.title_ja}</p>
                <p className="text-text-secondary text-[12px] leading-relaxed flex-1 line-clamp-1 sm:line-clamp-2 hidden sm:block">
                  {item.description}
                </p>
                {item.price && (
                  <p className="text-brand-green-dark text-[14px] font-bold mt-1 sm:mt-2">
                    ¥{item.price.toLocaleString()}
                  </p>
                )}
                <span className="text-[11px] text-text-tertiary mt-1 sm:mt-3 items-center gap-1 group-hover:text-brand-green transition-colors hidden sm:flex">
                  詳細を見る
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M3 8l5-5m0 0H4M8 3v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
