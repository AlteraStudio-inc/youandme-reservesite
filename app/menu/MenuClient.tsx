"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import { getImageUrl } from "@/lib/supabase/helpers";
import { CATEGORIES, SITE, categoryLabel, yen } from "@/lib/site";

export default function MenuClient({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<string>("all");

  const tags = useMemo(() => {
    const order = CATEGORIES.map((c) => c.tag);
    const present = Array.from(new Set(items.map((i) => i.tag ?? "")));
    return [
      ...order.filter((t) => present.includes(t)),
      ...present.filter((t) => !order.includes(t)),
    ];
  }, [items]);

  const groups = useMemo(() => {
    const visible = active === "all" ? tags : tags.filter((t) => t === active);
    return visible.map((tag) => ({ tag, items: items.filter((i) => (i.tag ?? "") === tag) }));
  }, [items, tags, active]);

  if (items.length === 0) {
    return (
      <div className="mt-14 border border-dashed border-sumi/20 px-6 py-12 text-center">
        <p className="text-[15px] text-sumi/80">ただいま品書きを準備中です。</p>
        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-[14px] font-bold text-shu-deep underline decoration-2 underline-offset-[6px]"
        >
          最新のメニューはInstagramで
        </a>
      </div>
    );
  }

  return (
    <>
      {tags.length > 1 && (
        <div
          role="tablist"
          aria-label="カテゴリ"
          className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {["all", ...tags].map((t) => {
            const on = active === t;
            return (
              <button
                key={t || "none"}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(t)}
                className={`h-10 shrink-0 whitespace-nowrap px-5 text-[14px] font-bold transition-colors ${
                  on
                    ? "bg-shu text-paper"
                    : "border border-sumi/20 text-sumi/80 hover:border-sumi/50 hover:text-sumi"
                }`}
              >
                {t === "all" ? "すべて" : categoryLabel(t || null)}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-10 space-y-16">
        {groups.map((g) => (
          <section key={g.tag || "none"} aria-labelledby={`cat-${g.tag || "none"}`}>
            <h2
              id={`cat-${g.tag || "none"}`}
              className="border-b border-sumi/20 pb-3 font-brush text-[24px] leading-tight text-shu-deep sm:text-[28px]"
            >
              {categoryLabel(g.tag || null)}
            </h2>
            <ul>
              {g.items.map((item) => (
                <li key={item.id} className="border-b border-sumi/15">
                  <Link
                    href={`/menu/${item.id}`}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-5 transition-colors sm:gap-6"
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <h3 className="min-w-0 text-[17px] font-bold leading-snug text-sumi transition-colors group-hover:text-shu-deep sm:text-[18px]">
                          {item.title_ja}
                        </h3>
                        {item.price != null && (
                          <>
                            <span className="leader" aria-hidden="true" />
                            <span className="shrink-0 font-bold text-[15px] text-shu-deep">{yen(item.price)}</span>
                          </>
                        )}
                      </div>
                      {item.title && (
                        <p className="mt-0.5 font-bold text-[12px] tracking-[0.04em] text-sumi/60">{item.title}</p>
                      )}
                      {item.description && (
                        <p className="mt-2 line-clamp-2 max-w-[38em] text-[14px] leading-[1.85] text-sumi/80">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.image_path && (
                      <img
                        src={getImageUrl(item.image_path)}
                        alt=""
                        loading="lazy"
                        className="h-20 w-20 object-cover ring-1 ring-sumi/15 sm:h-24 sm:w-24"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
