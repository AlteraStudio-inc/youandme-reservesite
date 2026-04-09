"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Reservation } from "@/lib/types";
import ConfirmDialog from "./ConfirmDialog";

type Filter = "all" | "pending" | "confirmed" | "rejected";

const STATUS_MAP = {
  pending: { label: "未確認", className: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "確定", className: "bg-green-100 text-green-800" },
  rejected: { label: "不可", className: "bg-red-100 text-red-800" },
} as const;

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "pending", label: "未確認" },
  { value: "confirmed", label: "確定" },
  { value: "rejected", label: "不可" },
];

export default function ReservationTable({ reservations }: { reservations: Reservation[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    reservationId: string;
    action: "confirmed" | "rejected";
  }>({ isOpen: false, reservationId: "", action: "confirmed" });
  const [isLoading, setIsLoading] = useState(false);

  const filtered = filter === "all"
    ? reservations
    : reservations.filter((r) => r.status === filter);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/reservations/${confirmDialog.reservationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: confirmDialog.action }),
      });
      if (!res.ok) throw new Error("更新に失敗しました");
      setConfirmDialog({ isOpen: false, reservationId: "", action: "confirmed" });
      router.refresh();
    } catch {
      alert("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    return `${d.getMonth() + 1}/${d.getDate()}（${weekdays[d.getDay()]}）`;
  };

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {FILTER_OPTIONS.map((opt) => {
          const count = opt.value === "all"
            ? reservations.length
            : reservations.filter((r) => r.status === opt.value).length;
          return (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap min-h-[40px] ${
                filter === opt.value
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {opt.label}
              <span className="ml-1.5 text-[12px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-400 text-[13px]">予約はありません</p>
        </div>
      ) : (
        <>
          {/* Mobile: Card layout */}
          <div className="md:hidden space-y-3">
            {filtered.map((r) => (
              <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4">
                {/* Header: date/time + status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-gray-900">{formatDate(r.date)}</span>
                    <span className="text-[14px] text-gray-600">{r.time}</span>
                  </div>
                  <span className={`inline-block px-2.5 py-1 rounded-md text-[12px] font-medium ${STATUS_MAP[r.status].className}`}>
                    {STATUS_MAP[r.status].label}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-gray-400">お名前</span>
                    <span className="font-medium text-gray-900">{r.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">人数</span>
                    <span className="text-gray-700">{r.guest_count}名</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">電話番号</span>
                    <a href={`tel:${r.phone}`} className="text-blue-600 underline">{r.phone}</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">メール</span>
                    <a href={`mailto:${r.email}`} className="text-blue-600 underline truncate max-w-[200px]">{r.email}</a>
                  </div>
                  {r.note && (
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-gray-400 block mb-1">備考</span>
                      <span className="text-gray-600">{r.note}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {r.status === "pending" && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setConfirmDialog({ isOpen: true, reservationId: r.id, action: "confirmed" })}
                      className="flex-1 h-11 rounded-lg text-[14px] font-bold bg-green-600 text-white active:bg-green-700 transition-colors"
                    >
                      OK（確定）
                    </button>
                    <button
                      onClick={() => setConfirmDialog({ isOpen: true, reservationId: r.id, action: "rejected" })}
                      className="flex-1 h-11 rounded-lg text-[14px] font-bold bg-red-600 text-white active:bg-red-700 transition-colors"
                    >
                      NG（拒否）
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-4 py-3 font-medium text-gray-500">日付</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">時間</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">人数</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">お名前</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">電話番号</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">メール</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">状態</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium">{formatDate(r.date)}</td>
                      <td className="px-4 py-3">{r.time}</td>
                      <td className="px-4 py-3">{r.guest_count}名</td>
                      <td className="px-4 py-3 font-medium">{r.name}</td>
                      <td className="px-4 py-3 text-gray-500">{r.phone}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-gray-500 max-w-[180px] truncate">{r.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium ${STATUS_MAP[r.status].className}`}>
                          {STATUS_MAP[r.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {r.status === "pending" ? (
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => setConfirmDialog({ isOpen: true, reservationId: r.id, action: "confirmed" })}
                              className="px-3 py-1.5 rounded-md text-[12px] font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                            >
                              OK
                            </button>
                            <button
                              onClick={() => setConfirmDialog({ isOpen: true, reservationId: r.id, action: "rejected" })}
                              className="px-3 py-1.5 rounded-md text-[12px] font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                            >
                              NG
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Desktop: Notes section */}
          {filtered.some((r) => r.note) && (
            <div className="mt-4 space-y-2 hidden md:block">
              {filtered
                .filter((r) => r.note)
                .map((r) => (
                  <div key={r.id} className="bg-white rounded-lg border border-gray-200 px-4 py-3 text-[12px]">
                    <span className="font-medium text-gray-700">{r.name}</span>
                    <span className="text-gray-400 mx-2">|</span>
                    <span className="text-gray-500">{r.note}</span>
                  </div>
                ))}
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, reservationId: "", action: "confirmed" })}
        onConfirm={handleAction}
        title={confirmDialog.action === "confirmed" ? "予約を確定" : "予約を拒否"}
        message={
          confirmDialog.action === "confirmed"
            ? "予約を確定させていいですか？"
            : "予約を拒否していいですか？"
        }
        confirmLabel={confirmDialog.action === "confirmed" ? "確定する" : "拒否する"}
        confirmVariant={confirmDialog.action === "confirmed" ? "success" : "danger"}
        isLoading={isLoading}
      />
    </>
  );
}
