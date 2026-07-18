import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { afiliadoSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = afiliadoSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Datos invÃ¡lidos. Revisa los campos." },
        { status: 400 }
      );
    }

    const { nombre, apellido, cedula, telefono, recinto_electoral } =
      validation.data;
    let email = validation.data.email || "sin-correo@placeholder.com";

    const { data: existing } = await supabase
      .from("afiliados")
      .select("id")
      .eq("cedula", cedula)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Esta cÃ©dula ya estÃ¡ registrada." },
        { status: 409 }
      );
    }

    const { error } = await supabase.from("afiliados").insert({
      nombre,
      apellido,
      cedula,
      telefono,
      email,
      recinto_electoral,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { success: false, message: "Error al guardar. Intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Â¡Registro exitoso! Bienvenido al movimiento.",
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, message: "Error del servidor. Intenta mÃ¡s tarde." },
      { status: 500 }
    );
  }
}
