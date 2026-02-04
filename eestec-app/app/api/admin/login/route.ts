import { sign } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Demo admin credentials - trebalo bi da budu u bazi
const ADMIN_CREDENTIALS = {
  email: 'admin@eestec-sa.ba',
  passwordHash: '$2a$10$kbhr6QR8DQX0A9QdCZAO1.9f8bCWSS41aNuYcTqP6Lgn1aYfFbjPa', // password123
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validate credentials
    if (email !== ADMIN_CREDENTIALS.email) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      ADMIN_CREDENTIALS.passwordHash
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await sign({ email, role: 'admin' });

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
