import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { DEFAULT_PORTFOLIO_DATA } from "@/data/types";

export const dynamic = "force-dynamic";

// GET: Ambil data portofolio (dari Supabase jika aktif, atau fallback default)
export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("portfolio_content")
        .select("data")
        .eq("id", "main")
        .single();

      if (!error && data && data.data) {
        return NextResponse.json({
          source: "supabase",
          data: data.data,
        });
      }
    }

    return NextResponse.json({
      source: "local-fallback",
      data: DEFAULT_PORTFOLIO_DATA,
    });
  } catch (err: any) {
    return NextResponse.json({
      source: "local-fallback",
      data: DEFAULT_PORTFOLIO_DATA,
      error: err.message,
    });
  }
}

// POST: Simpan data update portofolio
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, content } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || "irfanadmin2026";
    if (token !== expectedPassword) {
      return NextResponse.json({ error: "Akses ditolak: Password salah" }, { status: 401 });
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("portfolio_content")
        .upsert({
          id: "main",
          data: content,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, target: "supabase" });
    }

    return NextResponse.json({
      success: true,
      target: "local-memory",
      message: "Data berhasil disimpan di session/lokal (hubungkan Supabase di .env.local untuk persistensi cloud permanen)",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
