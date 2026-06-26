import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { sendTopUpEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthUser();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { amount } = await request.json();

    if (!amount || typeof amount !== 'number' || amount < 10 || amount > 10000) {
      return NextResponse.json({ error: 'Top-up amount must be between £10 and £10,000' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(auth.userId) },
      { $inc: { balance: amount } },
      { returnDocument: 'after' }
    );

    if (!result) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    sendTopUpEmail(result.email, result.name || result.firstName || 'Customer', amount, result.balance).catch(() => {});

    return NextResponse.json({ balance: result.balance });
  } catch (err) {
    console.error('Top-up error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
