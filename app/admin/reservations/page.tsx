import { supabaseAdmin } from "@/lib/supabase/server";
import ReservationTable from "@/components/admin/ReservationTable";
import type { Reservation } from "@/lib/types";

export default async function AdminReservationsPage() {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .order("date", { ascending: false });

  const reservations: Reservation[] = data ?? [];

  return (
    <div className="max-w-[1200px]">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-900">予約管理</h1>
        <p className="text-[13px] text-gray-500 mt-1">
          予約リクエストの確認・承認・拒否を行います
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-5 text-[13px] text-red-600">
          データの取得に失敗しました: {error.message}
        </div>
      )}

      <ReservationTable reservations={reservations} />
    </div>
  );
}
