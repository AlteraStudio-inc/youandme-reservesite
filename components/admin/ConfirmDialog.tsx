"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel: string;
  confirmVariant?: "success" | "danger";
  isLoading?: boolean;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  confirmVariant = "success",
  isLoading = false,
}: Props) {
  if (!isOpen) return null;

  const confirmClass =
    confirmVariant === "danger"
      ? "bg-red-600 active:bg-red-800 hover:bg-red-700 text-white"
      : "bg-green-600 active:bg-green-800 hover:bg-green-700 text-white";

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white w-full sm:max-w-sm sm:mx-4 rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden">
        <div className="p-5 sm:p-6">
          <h3 className="text-[17px] font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-[14px] text-gray-600 leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3 px-5 sm:px-6 pb-6 sm:pb-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-12 border border-gray-200 text-gray-600 text-[14px] font-medium rounded-xl active:bg-gray-100 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-[2] h-12 text-[14px] font-bold rounded-xl transition-colors disabled:opacity-50 ${confirmClass}`}
          >
            {isLoading ? "処理中..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
