import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { date, time, guest_count, name, phone, email, note } = body;

  if (!date || !time || !guest_count || !name || !phone || !email) {
    return NextResponse.json(
      { error: "必須項目が入力されていません" },
      { status: 400 }
    );
  }

  // Check if date is a Tuesday
  const d = new Date(date);
  if (d.getDay() === 2) {
    return NextResponse.json(
      { error: "火曜日は定休日です" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("reservations")
    .insert({
      date,
      time,
      guest_count,
      name,
      phone,
      email,
      note: note || null,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
