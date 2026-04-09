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
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-green-600 hover:bg-green-700 text-white";

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="p-5 sm:p-6">
          <h3 className="text-[16px] font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-[13px] text-gray-600 leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-2.5 px-5 sm:px-6 pb-5 sm:pb-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-10 border border-gray-200 text-gray-600 text-[13px] font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 h-10 text-[13px] font-medium rounded-lg transition-colors disabled:opacity-50 ${confirmClass}`}
          >
            {isLoading ? "処理中..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
