import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(auth.userId) });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        balance: user.balance,
      },
    });
  } catch (err) {
    console.error('Auth me error:', err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
