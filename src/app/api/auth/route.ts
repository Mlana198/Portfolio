import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "irfanadmin2026";

    if (password === expectedPassword) {
      return NextResponse.json({ success: true, token: expectedPassword });
    }

    return NextResponse.json({ success: false, error: "Password admin salah" }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
