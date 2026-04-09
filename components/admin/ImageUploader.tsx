"use client";

import { useState, useRef } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type Props = {
  currentUrl?: string | null;
  onUpload: (path: string, url: string) => void;
  onRemove: () => void;
};

export default function ImageUploader({ currentUrl, onUpload, onRemove }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setErrorMsg(null);
    setStatus("idle");

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setErrorMsg("PNG、JPEG、WebP形式のみ対応しています");
      setStatus("error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("ファイルサイズは5MB以下にしてください");
      setStatus("error");
      return;
    }

    // Local preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prefix", "menu");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `サーバーエラー (${res.status})`);
      }

      onUpload(data.path, data.url);
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "アップロードに失敗しました";
      setErrorMsg(msg);
      setStatus("error");
      setPreview(currentUrl ?? null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setStatus("idle");
    setErrorMsg(null);
    onRemove();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img src={preview} alt="プレビュー" className="w-full aspect-[4/3] object-cover" />
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={status === "uploading"}
              className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[11px] font-medium text-gray-700 hover:bg-white transition-colors shadow-sm disabled:opacity-50"
            >
              変更
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={status === "uploading"}
              className="px-2.5 py-1 bg-red-600/90 backdrop-blur-sm rounded-md text-[11px] font-medium text-white hover:bg-red-600 transition-colors shadow-sm disabled:opacity-50"
            >
              削除
            </button>
          </div>
          {status === "uploading" && (
            <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center gap-2">
              <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-[12px] text-gray-600 font-medium">アップロード中...</span>
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            status === "uploading"
              ? "border-green-300 bg-green-50"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          {status === "uploading" ? (
            <>
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-[12px] text-green-600 font-medium">アップロード中...</p>
            </>
          ) : (
            <>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-3 text-gray-300">
                <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 22l6-6 4 4 4-6 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-[12px] text-gray-500">クリックまたはドラッグ&ドロップ</p>
              <p className="text-[11px] text-gray-400 mt-1">PNG, JPEG, WebP（5MB以下）</p>
            </>
          )}
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

      {/* Status messages */}
      {status === "success" && (
        <div className="flex items-center gap-1.5 text-[12px] text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          アップロード成功しました
        </div>
      )}
      {status === "error" && errorMsg && (
        <div className="flex items-center gap-1.5 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M7 4.5v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
