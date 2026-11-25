import { supabaseAdmin } from "@/lib/supabase/server";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import MenuClient from "./MenuClient";

export const metadata = {
  title: "品書き | El Bajon エル・バホン",
  description:
    "天神・日銀前の屋台 El Bajon の品書き。タコス、ジャークチキン、クレープ・サレ、博多のつまみまで、世界の路上の味をそろえています。",
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const { data: menuItems } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order");

  return (
    <>
      <SiteHeader />
      <main className="kraft min-h-[70vh] pt-16 lg:pt-[104px]"><div className="mx-auto max-w-[1080px] px-5 pt-14 pb-20 sm:px-8 sm:pt-20 md:pb-28">
        <h1 className="font-brush text-[clamp(40px,10vw,84px)] leading-[1.05] text-sumi">品書き</h1>
        <p className="mt-5 max-w-[34em] text-[15px] leading-[1.95] text-sumi/80">
          世界の路上で出会った味と、博多の屋台の定番。
          仕込みの量に限りがあるので、売り切れの際はご容赦ください。
        </p>
        <MenuClient items={menuItems ?? []} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
