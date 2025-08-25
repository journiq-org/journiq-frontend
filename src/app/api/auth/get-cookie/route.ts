import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = cookies()
  const token = (await cookieStore).get("token")?.value || null
  const role = (await cookieStore).get("role")?.value || null

  return NextResponse.json({ token, role })
}
