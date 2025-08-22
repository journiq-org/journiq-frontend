import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  // Expire cookies
  response.cookies.set('token', '', { maxAge: 0 });
  response.cookies.set('role', '', { maxAge: 0 });

  return response;
}
