import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .order("sort_order");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, title_ja, description, tag, price, image_path, sort_order, is_visible } = body;

  if (!title || !title_ja) {
    return NextResponse.json(
      { error: "メニュー名（英語・日本語）は必須です" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .insert({
      title,
      title_ja,
      description: description || null,
      tag: tag || null,
      price: price || null,
      image_path: image_path || null,
      sort_order: sort_order ?? 0,
      is_visible: is_visible ?? true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
