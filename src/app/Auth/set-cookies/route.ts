import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token, role } = await req.json();

    if (!token || !role) {
      return NextResponse.json({ message: 'Missing token or role' }, { status: 400 });
    }

    const response = NextResponse.json({ message: 'Cookies set successfully' });

    // Set token cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Set role cookie
    response.cookies.set({
      name: 'role',
      value: role,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (err) {
    console.error('Cookie error:', err);
    return NextResponse.json({ message: 'Server error while setting cookies' }, { status: 500 });
  }
}
