import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getImageUrl } from "@/lib/supabase/helpers";
import { SITE, categoryLabel, yen } from "@/lib/site";
import type { MenuItem } from "@/lib/types";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { ArrowIcon, CameraIcon } from "@/components/site/icons";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: item } = await supabaseAdmin
    .from("menu_items")
    .select("title, title_ja, description")
    .eq("id", id)
    .single();

  if (!item) return { title: `品書き | ${SITE.name}` };
  return {
    title: `${item.title_ja} | ${SITE.name} エル・バホン`,
    description: item.description || `${item.title_ja} — 天神・日銀前の屋台 ${SITE.name} の品書き`,
  };
}

export default async function MenuDetailPage({ params }: Props) {
  const { id } = await params;

  const { data: item } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .single<MenuItem>();

  if (!item) notFound();

  const { data: others } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .eq("is_visible", true)
    .neq("id", id)
    .order("sort_order")
    .limit(4);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-4 pt-24 pb-20 sm:px-8 sm:pt-32 md:pb-28">
        <Link
          href="/menu"
          className="group -ml-1 inline-flex h-11 items-center gap-1.5 whitespace-nowrap px-1 text-[14px] text-ink-2 transition-colors hover:text-lamp"
        >
          <ArrowIcon dir="left" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          品書きにもどる
        </Link>

        <article
          className={`mt-6 grid gap-10 ${item.image_path ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-14" : ""}`}
        >
          {item.image_path && (
            <figure className="min-w-0">
              <img
                src={getImageUrl(item.image_path)}
                alt={item.title_ja}
                className="block aspect-[4/3] w-full rounded-[6px] object-cover ring-1 ring-rule"
              />
            </figure>
          )}
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-lamp">{categoryLabel(item.tag)}</p>
            <h1 className="mt-2 font-display text-[clamp(32px,8vw,60px)] leading-[1.15] text-ink">{item.title_ja}</h1>
            {item.title && <p className="mt-2 font-mono text-[13px] tracking-[0.04em] text-ink-3">{item.title}</p>}
            {item.price != null && <p className="mt-6 font-mono text-[26px] text-lamp">{yen(item.price)}</p>}
            {item.description && (
              <p className="mt-6 max-w-[34em] whitespace-pre-line text-[16px] leading-[2] text-ink-2">{item.description}</p>
            )}
            <div className="mt-10 rounded-[6px] border border-rule p-5 sm:p-6">
              <p className="text-[14px] leading-[1.9] text-ink-2">
                仕込みの量に限りがあります。確実に食べたい方は、InstagramのDMで予約してから来てください。
              </p>
              <a
                href={SITE.instagram.dm}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-full bg-lamp px-6 text-[14px] font-bold text-lamp-ink transition-[background-color,transform] duration-200 hover:bg-ink active:translate-y-px"
              >
                <CameraIcon className="h-4 w-4" />
                DMで予約する
              </a>
            </div>
          </div>
        </article>

        {others && others.length > 0 && (
          <section aria-labelledby="others-title" className="mt-20 border-t border-rule pt-10">
            <h2 id="others-title" className="font-display text-[24px] text-ink">
              ほかの品書き
            </h2>
            <ul className="mt-4">
              {(others as MenuItem[]).map((o) => (
                <li key={o.id} className="border-b border-rule/70">
                  <Link href={`/menu/${o.id}`} className="group flex items-baseline gap-3 py-4">
                    <span className="min-w-0 text-[16px] font-bold text-ink transition-colors group-hover:text-lamp">
                      {o.title_ja}
                    </span>
                    {o.price != null && (
                      <>
                        <span className="leader" aria-hidden="true" />
                        <span className="shrink-0 font-mono text-[14px] text-lamp">{yen(o.price)}</span>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
