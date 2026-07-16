import { NextResponse } from "next/server";
import { RECINTOS_ELECTORALES } from "@/lib/utils";

export async function GET() {
  return NextResponse.json({ recintos: RECINTOS_ELECTORALES });
}
