"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MenuItem } from "@/lib/types";
import { getImageUrl } from "@/lib/supabase/helpers";
import ImageUploader from "./ImageUploader";

type Props = {
  item?: MenuItem | null;
  onClose: () => void;
};

const TAG_OPTIONS = ["Signature", "A la carte", "Drinks", ""];

export default function MenuItemForm({ item, onClose }: Props) {
  const router = useRouter();
  const isEdit = !!item;

  const [title, setTitle] = useState(item?.title ?? "");
  const [titleJa, setTitleJa] = useState(item?.title_ja ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [tag, setTag] = useState(item?.tag ?? "");
  const [price, setPrice] = useState(item?.price?.toString() ?? "");
  const [sortOrder, setSortOrder] = useState(item?.sort_order?.toString() ?? "0");
  const [imagePath, setImagePath] = useState(item?.image_path ?? "");
  const [isVisible, setIsVisible] = useState(item?.is_visible ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !titleJa.trim()) {
      setError("メニュー名（英語・日本語）は必須です");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const body = {
      title: title.trim(),
      title_ja: titleJa.trim(),
      description: description.trim() || null,
      tag: tag || null,
      price: price ? Number(price) : null,
      sort_order: Number(sortOrder) || 0,
      image_path: imagePath || null,
      is_visible: isVisible,
    };

    try {
      const url = isEdit ? `/api/menu/${item!.id}` : "/api/menu";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `保存に失敗しました (${res.status})`);
      }

      setSuccess(true);
      router.refresh();
      setTimeout(() => onClose(), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white w-full sm:max-w-lg sm:mx-4 sm:rounded-xl rounded-t-2xl shadow-2xl max-h-[95dvh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-10">
          <h2 className="text-[16px] font-bold text-gray-900">
            {isEdit ? "メニューを編集" : "メニューを追加"}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 5l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Image */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1.5">写真</label>
            <ImageUploader
              currentUrl={imagePath ? getImageUrl(imagePath) : null}
              onUpload={(path) => setImagePath(path)}
              onRemove={() => setImagePath("")}
            />
          </div>

          {/* Title EN */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
              メニュー名（英語） <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Jerk Chicken"
              className="w-full h-11 px-3 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
            />
          </div>

          {/* Title JA */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
              メニュー名（日本語） <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={titleJa}
              onChange={(e) => setTitleJa(e.target.value)}
              placeholder="ジャークチキン"
              className="w-full h-11 px-3 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1.5">説明</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-3 rounded-lg border border-gray-200 text-[14px] resize-none focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
            />
          </div>

          {/* Tag & Price row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1.5">カテゴリ</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-[13px] bg-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
              >
                <option value="">なし</option>
                {TAG_OPTIONS.filter(Boolean).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1.5">価格（円）</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1200"
                className="w-full h-11 px-3 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
              />
            </div>
          </div>

          {/* Sort order & Visibility */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-700 mb-1.5">表示順</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-[12px] text-gray-700">公開する</span>
              </label>
            </div>
          </div>

          {success && (
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg p-3 text-[12px] text-green-600">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {isEdit ? "更新しました" : "追加しました"}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-lg p-3 text-[12px] text-red-600">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 4.5v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2.5 pt-2 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 border border-gray-200 text-gray-600 text-[14px] font-medium rounded-xl active:bg-gray-100 hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] h-12 bg-green-600 text-white text-[14px] font-bold rounded-xl active:bg-green-800 hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "保存中..." : isEdit ? "更新する" : "追加する"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
