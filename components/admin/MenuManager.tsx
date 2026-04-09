"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MenuItem } from "@/lib/types";
import { getImageUrl } from "@/lib/supabase/helpers";
import ConfirmDialog from "./ConfirmDialog";
import MenuItemForm from "./MenuItemForm";

export default function MenuManager({ menuItems }: { menuItems: MenuItem[] }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; item: MenuItem | null }>({
    isOpen: false,
    item: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteDialog.item) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/menu/${deleteDialog.item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("削除に失敗しました");
      setDeleteDialog({ isOpen: false, item: null });
      router.refresh();
    } catch {
      alert("エラーが発生しました");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleVisibility = async (item: MenuItem) => {
    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_visible: !item.is_visible }),
      });
      if (!res.ok) throw new Error("更新に失敗しました");
      router.refresh();
    } catch {
      alert("エラーが発生しました");
    }
  };

  return (
    <>
      {/* Add button */}
      <div className="flex justify-end mb-5">
        <button
          onClick={() => {
            setEditItem(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-[13px] font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          メニューを追加
        </button>
      </div>

      {/* Menu grid */}
      {menuItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-400 text-[13px]">メニューはまだ登録されていません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl border border-gray-200 overflow-hidden transition-opacity ${
                !item.is_visible ? "opacity-50" : ""
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {item.image_path ? (
                  <img
                    src={getImageUrl(item.image_path)}
                    alt={item.title_ja}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M4 22l6-6 4 4 4-6 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                {!item.is_visible && (
                  <div className="absolute top-2 left-2 bg-gray-800/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                    非公開
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-600 px-2 py-0.5 rounded-md">
                  #{item.sort_order}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-900">{item.title}</h3>
                    <p className="text-[11px] text-gray-500">{item.title_ja}</p>
                  </div>
                  {item.tag && (
                    <span className="text-[10px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-md shrink-0">
                      {item.tag}
                    </span>
                  )}
                </div>
                {item.price && (
                  <p className="text-[13px] font-medium text-gray-700 mt-1">¥{item.price.toLocaleString()}</p>
                )}

                {/* Actions */}
                <div className="flex gap-1.5 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setEditItem(item);
                      setFormOpen(true);
                    }}
                    className="flex-1 h-8 text-[11px] font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(item)}
                    className="flex-1 h-8 text-[11px] font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    {item.is_visible ? "非公開" : "公開"}
                  </button>
                  <button
                    onClick={() => setDeleteDialog({ isOpen: true, item })}
                    className="h-8 px-3 text-[11px] font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {formOpen && (
        <MenuItemForm
          item={editItem}
          onClose={() => {
            setFormOpen(false);
            setEditItem(null);
          }}
        />
      )}

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, item: null })}
        onConfirm={handleDelete}
        title="メニューを削除"
        message={`「${deleteDialog.item?.title_ja ?? ""}」を削除していいですか？この操作は元に戻せません。`}
        confirmLabel="削除する"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}
