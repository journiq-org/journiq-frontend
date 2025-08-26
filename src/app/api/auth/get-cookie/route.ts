import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies(); // sync
  const token = cookieStore.get("token")?.value ?? null;
  const role = cookieStore.get("role")?.value ?? null;

   console.log("Token in cookie:", token)
  console.log("Role in cookie:", role)

  return NextResponse.json({ token, role });
}
