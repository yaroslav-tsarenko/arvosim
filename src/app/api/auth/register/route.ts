import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';
import { signToken, COOKIE_NAME } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, firstName, lastName, phone, dateOfBirth, address } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'First name and last name are required' }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    if (!dateOfBirth) {
      return NextResponse.json({ error: 'Date of birth is required' }, { status: 400 });
    }

    if (!address?.street || !address?.city || !address?.country || !address?.postalCode) {
      return NextResponse.json({ error: 'Complete address is required' }, { status: 400 });
    }

    const db = await getDb();
    const existing = await db.collection('users').findOne({ email: email.toLowerCase() });

    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const displayName = name || `${firstName} ${lastName}`;
    const result = await db.collection('users').insertOne({
      name: displayName,
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashed,
      phone,
      dateOfBirth,
      address: {
        street: address.street,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
      },
      balance: 0,
      createdAt: new Date(),
    });

    const token = await signToken({ userId: result.insertedId.toString(), email: email.toLowerCase() });

    sendWelcomeEmail(email.toLowerCase(), displayName).catch(() => {});

    const res = NextResponse.json({
      user: { id: result.insertedId.toString(), email: email.toLowerCase(), name: displayName, balance: 0 },
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return res;
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
