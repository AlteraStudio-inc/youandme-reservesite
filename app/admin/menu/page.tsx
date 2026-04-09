import { supabaseAdmin } from "@/lib/supabase/server";
import MenuManager from "@/components/admin/MenuManager";
import type { MenuItem } from "@/lib/types";

export default async function AdminMenuPage() {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .order("sort_order");

  const menuItems: MenuItem[] = data ?? [];

  return (
    <div className="max-w-[1200px]">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-900">メニュー管理</h1>
        <p className="text-[13px] text-gray-500 mt-1">
          メニューの追加・編集・削除・写真の管理を行います
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-5 text-[13px] text-red-600">
          データの取得に失敗しました: {error.message}
        </div>
      )}

      <MenuManager menuItems={menuItems} />
    </div>
  );
}
