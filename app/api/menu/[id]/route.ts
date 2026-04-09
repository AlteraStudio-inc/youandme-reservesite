import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = {};
  const allowedFields = [
    "title", "title_ja", "description", "tag", "price",
    "image_path", "sort_order", "is_visible",
  ];

  for (const field of allowedFields) {
    if (field in body) {
      updates[field] = body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "更新するフィールドがありません" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Fetch the item to get image_path for cleanup
  const { data: item } = await supabaseAdmin
    .from("menu_items")
    .select("image_path")
    .eq("id", id)
    .single();

  // Delete the menu item
  const { error } = await supabaseAdmin
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Clean up image from Storage
  if (item?.image_path) {
    await supabaseAdmin.storage.from("images").remove([item.image_path]);
  }

  return NextResponse.json({ success: true });
}
