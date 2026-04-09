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
      <div className="flex gap-1.5 mb-5">
        {FILTER_OPTIONS.map((opt) => {
          const count = opt.value === "all"
            ? reservations.length
            : reservations.filter((r) => r.status === opt.value).length;
          return (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                filter === opt.value
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {opt.label}
              <span className="ml-1.5 text-[11px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-400 text-[13px]">予約はありません</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">日付</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">時間</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">人数</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">お名前</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">電話番号</th>
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
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500">{r.phone}</td>
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
                            onClick={() =>
                              setConfirmDialog({ isOpen: true, reservationId: r.id, action: "confirmed" })
                            }
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                          >
                            OK
                          </button>
                          <button
                            onClick={() =>
                              setConfirmDialog({ isOpen: true, reservationId: r.id, action: "rejected" })
                            }
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
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
      )}

      {/* Note column for mobile */}
      {filtered.some((r) => r.note) && (
        <div className="mt-4 space-y-2">
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
