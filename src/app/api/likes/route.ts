import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const publicacion_id = url.searchParams.get("publicacion_id");
  if (!publicacion_id) {
    return NextResponse.json({ error: "publicacion_id requerido" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from("likes")
    .select("*")
    .eq("publicacion_id", publicacion_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ likes: data, count: data?.length || 0 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { publicacion_id, nombre } = body;
  if (!publicacion_id || !nombre) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }
  const { data: existing } = await supabaseAdmin
    .from("likes")
    .select("id")
    .eq("publicacion_id", publicacion_id)
    .eq("nombre", nombre)
    .maybeSingle();
  if (existing) {
    await supabaseAdmin.from("likes").delete().eq("id", existing.id);
    return NextResponse.json({ liked: false });
  }
  const { data, error } = await supabaseAdmin
    .from("likes")
    .insert({ publicacion_id, nombre })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ liked: true, like: data }, { status: 201 });
}
