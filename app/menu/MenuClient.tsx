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
      <div className="mt-14 rounded-[6px] border border-dashed border-rule px-6 py-12 text-center">
        <p className="text-[15px] text-ink-2">ただいま品書きを準備中です。</p>
        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-[14px] font-bold text-lamp underline decoration-2 underline-offset-[6px]"
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
                className={`h-10 shrink-0 whitespace-nowrap rounded-full px-5 text-[14px] font-bold transition-colors ${
                  on
                    ? "bg-lamp text-lamp-ink"
                    : "border border-rule text-ink-2 hover:border-ink-3 hover:text-ink"
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
              className="border-b border-rule pb-3 font-display text-[24px] leading-tight text-lamp sm:text-[28px]"
            >
              {categoryLabel(g.tag || null)}
            </h2>
            <ul>
              {g.items.map((item) => (
                <li key={item.id} className="border-b border-rule/70">
                  <Link
                    href={`/menu/${item.id}`}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-5 transition-colors sm:gap-6"
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <h3 className="min-w-0 text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-lamp sm:text-[18px]">
                          {item.title_ja}
                        </h3>
                        {item.price != null && (
                          <>
                            <span className="leader" aria-hidden="true" />
                            <span className="shrink-0 font-mono text-[15px] text-lamp">{yen(item.price)}</span>
                          </>
                        )}
                      </div>
                      {item.title && (
                        <p className="mt-0.5 font-mono text-[12px] tracking-[0.04em] text-ink-3">{item.title}</p>
                      )}
                      {item.description && (
                        <p className="mt-2 line-clamp-2 max-w-[38em] text-[14px] leading-[1.85] text-ink-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.image_path && (
                      <img
                        src={getImageUrl(item.image_path)}
                        alt=""
                        loading="lazy"
                        className="h-20 w-20 rounded-[4px] object-cover ring-1 ring-rule sm:h-24 sm:w-24"
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
