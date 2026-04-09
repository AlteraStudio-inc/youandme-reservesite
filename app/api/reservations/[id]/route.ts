import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { status } = body;

  if (!status || !["confirmed", "rejected"].includes(status)) {
    return NextResponse.json(
      { error: "ステータスは confirmed または rejected を指定してください" },
      { status: 400 }
    );
  }

  // Fetch the reservation first
  const { data: reservation, error: fetchError } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !reservation) {
    return NextResponse.json(
      { error: "予約が見つかりません" },
      { status: 404 }
    );
  }

  // Update status
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // TODO: Send email when Resend is configured
  // if (status === "confirmed") {
  //   await sendConfirmationEmail(reservation);
  // } else {
  //   await sendRejectionEmail(reservation);
  // }

  return NextResponse.json(data);
}
