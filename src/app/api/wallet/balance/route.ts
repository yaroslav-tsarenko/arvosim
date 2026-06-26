import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(auth.userId) });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ balance: user.balance });
  } catch (err) {
    console.error('Balance error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
