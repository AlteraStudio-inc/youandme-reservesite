"use client";

import { useState, useRef } from "react";

type Props = {
  currentUrl?: string | null;
  onUpload: (path: string, url: string) => void;
  onRemove: () => void;
};

export default function ImageUploader({ currentUrl, onUpload, onRemove }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);

    // Validate type
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("PNG、JPEG、WebP形式のみ対応しています");
      return;
    }

    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      setError("ファイルサイズは5MB以下にしてください");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prefix", "menu");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "アップロードに失敗しました");
      }
      const data = await res.json();
      onUpload(data.path, data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "アップロードに失敗しました");
      setPreview(currentUrl ?? null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img src={preview} alt="プレビュー" className="w-full aspect-[4/3] object-cover" />
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[11px] font-medium text-gray-700 hover:bg-white transition-colors shadow-sm"
            >
              変更
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="px-2.5 py-1 bg-red-600/90 backdrop-blur-sm rounded-md text-[11px] font-medium text-white hover:bg-red-600 transition-colors shadow-sm"
            >
              削除
            </button>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-[13px] text-gray-600">アップロード中...</span>
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-3 text-gray-300">
            <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 22l6-6 4 4 4-6 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-[12px] text-gray-500">
            クリックまたはドラッグ&ドロップ
          </p>
          <p className="text-[11px] text-gray-400 mt-1">PNG, JPEG, WebP（5MB以下）</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
      />

      {error && <p className="text-red-500 text-[11px] mt-2">{error}</p>}
    </div>
  );
}
