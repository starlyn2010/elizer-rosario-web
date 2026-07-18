import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const publicacion_id = url.searchParams.get("publicacion_id");
  if (!publicacion_id) {
    return NextResponse.json({ error: "publicacion_id requerido" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from("comentarios")
    .select("*")
    .eq("publicacion_id", publicacion_id)
    .order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comentarios: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { publicacion_id, nombre, texto } = body;
  if (!publicacion_id || !nombre || !texto) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from("comentarios")
    .insert({ publicacion_id, nombre, texto })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comentario: data }, { status: 201 });
}
