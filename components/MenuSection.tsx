"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import type { MenuItem } from "@/lib/types";
import { getImageUrl } from "@/lib/supabase/helpers";

const FALLBACK_ITEMS: MenuItem[] = [
  {
    id: "fallback-1", title: "Jerk Chicken", title_ja: "ジャークチキン",
    description: "ジャマイカの伝統料理。数種のスパイスに漬け込んだ鶏肉を炭火でじっくり焼き上げた看板メニュー。",
    tag: "Signature", price: null, image_path: null, sort_order: 1, is_visible: true, created_at: "", updated_at: "",
  },
  {
    id: "fallback-2", title: "Spice Tacos", title_ja: "スパイスタコス",
    description: "カレー屋ならではのスパイス使いで仕上げた、ここだけのタコス。",
    tag: "Signature", price: null, image_path: null, sort_order: 2, is_visible: true, created_at: "", updated_at: "",
  },
  {
    id: "fallback-3", title: "Spice Appetizers", title_ja: "スパイスおつまみ",
    description: "お酒に合うスパイス仕立ての一品料理をアラカルト形式で多数ご用意。",
    tag: "A la carte", price: null, image_path: null, sort_order: 3, is_visible: true, created_at: "", updated_at: "",
  },
  {
    id: "fallback-4", title: "Craft Drinks", title_ja: "ドリンク",
    description: "スパイス料理に合う厳選のお酒。ビール、ハイボール、スパイスカクテルなど。",
    tag: "Drinks", price: null, image_path: null, sort_order: 4, is_visible: true, created_at: "", updated_at: "",
  },
];

const isFallback = (id: string) => id.startsWith("fallback-");

type Props = {
  menuItems?: MenuItem[];
};

export default function MenuSection({ menuItems }: Props) {
  const items = menuItems && menuItems.length > 0 ? menuItems : FALLBACK_ITEMS;
  const heroItem = items[0];
  const restItems = items.slice(1);

  return (
    <section id="menu" className="py-20 sm:py-32 md:py-44 bg-surface-alt">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14">
        <ScrollReveal>
          <div className="flex items-baseline gap-4 sm:gap-6 mb-6">
            <span className="text-[11px] tracking-[0.2em] uppercase text-text-tertiary">Menu</span>
            <div className="hr-accent" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14 sm:mb-20">
            <div>
              <h2 className="text-[clamp(26px,5vw,56px)] font-black tracking-tight mb-4">
                Our Spice Menu
              </h2>
              <p className="text-text-secondary text-[14px] sm:text-[15px] max-w-md">
                カレーのスパイス技術を活かした、夜の居酒屋メニュー。
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-brand-green-dark border border-brand-green-dark/30 px-5 py-2.5 rounded-full hover:bg-brand-green-dark hover:text-white transition-all duration-300 shrink-0 min-h-[44px]"
            >
              全メニューを見る
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M3 10l7-7m0 0H5M10 3v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Hero menu item — full bleed first card */}
        <ScrollReveal className="mb-4 sm:mb-6">
          <Link
            href={isFallback(heroItem.id) ? "/menu" : `/menu/${heroItem.id}`}
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-text-primary block"
          >
            <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
              <img
                src={heroItem.image_path ? getImageUrl(heroItem.image_path) : "/images/2.png"}
                alt={heroItem.title_ja}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-end p-5 sm:p-8 md:p-12">
              <div>
                <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-brand-yellow bg-brand-yellow/15 px-3 py-1 rounded-full mb-3">
                  {heroItem.tag}
                </span>
                <h3 className="text-white text-[clamp(22px,4vw,42px)] font-black tracking-tight leading-tight">
                  {heroItem.title}
                </h3>
                <p className="text-white/50 text-[12px] sm:text-[13px] mt-1 mb-2">
                  {heroItem.title_ja}
                </p>
                <p className="text-white/60 text-[13px] sm:text-[14px] leading-relaxed max-w-md hidden sm:block">
                  {heroItem.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-white/50 text-[11px] mt-4 group-hover:text-white/80 transition-colors">
                  詳細を見る
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 9l6-6m0 0H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* Remaining cards — asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {restItems.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <Link
                href={isFallback(item.id) ? "/menu" : `/menu/${item.id}`}
                className="group bg-surface rounded-xl sm:rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-700 hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image_path ? getImageUrl(item.image_path) : `/images/${item.sort_order + 1}.png`}
                    alt={item.title_ja}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] uppercase text-brand-green w-fit mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-[16px] sm:text-[18px] font-bold tracking-tight mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-text-tertiary text-[11px] mb-2">{item.title_ja}</p>
                  <p className="text-text-secondary text-[12px] sm:text-[13px] leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-text-tertiary mt-3 group-hover:text-brand-green transition-colors">
                    詳細を見る
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M3 8l5-5m0 0H4M8 3v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="mt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-brand-green-dark rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10">
            <div>
              <p className="text-white text-[16px] sm:text-[18px] font-bold tracking-tight">& More — アラカルト多数</p>
              <p className="text-white/45 text-[12px] sm:text-[13px] mt-1">すべてのメニューはメニューページからご確認いただけます。</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-brand-green-dark text-[12px] font-bold px-5 py-2.5 rounded-full bg-brand-yellow hover:bg-brand-yellow-dark transition-all min-h-[44px]"
              >
                全メニューを見る
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M3 10l7-7m0 0H5M10 3v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a
                href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white text-[12px] font-semibold px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/10 transition-all min-h-[44px]"
              >
                Instagram
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 10l6-6m0 0H5.5M10 4v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
