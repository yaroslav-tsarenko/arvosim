import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { sendPurchaseEmail, sendPurchaseNotification } from '@/lib/email';
import { countries } from '@/data/countries';
import { regionalPlans } from '@/data/regional';
import { globalPlans } from '@/data/global';

function getServerPrice(planId: string): number | null {
  for (const c of countries) {
    const plan = c.plans.find((p) => p.id === planId);
    if (plan) return plan.price;
  }
  for (const r of regionalPlans) {
    const plan = r.plans.find((p) => p.id === planId);
    if (plan) return plan.price;
  }
  const gp = globalPlans.find((p) => p.id === planId);
  if (gp) return gp.price;
  return null;
}

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = await getDb();
    const purchases = await db
      .collection('purchases')
      .find({ userId: new ObjectId(auth.userId) })
      .sort({ purchasedAt: -1 })
      .toArray();

    return NextResponse.json({
      purchases: purchases.map((p) => ({
        id: p._id.toString(),
        planId: p.planId,
        name: p.name,
        data: p.data,
        validity: p.validity,
        price: p.price,
        coverage: p.coverage,
        purchasedAt: p.purchasedAt,
        status: p.status,
      })),
    });
  } catch (err) {
    console.error('Purchases list error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthUser();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items array is required' }, { status: 400 });
    }

    for (const item of items) {
      if (!item.planId || typeof item.planId !== 'string') {
        return NextResponse.json({ error: 'Invalid item: planId is required' }, { status: 400 });
      }
      const serverPrice = getServerPrice(item.planId);
      if (serverPrice === null) {
        return NextResponse.json({ error: `Unknown plan: ${item.planId}` }, { status: 400 });
      }
      item.price = serverPrice;
    }

    const total = items.reduce((sum: number, item: { price: number }) => sum + item.price, 0);

    const db = await getDb();

    const user = await db.collection('users').findOne({ _id: new ObjectId(auth.userId) });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    if (user.balance < total) {
      return NextResponse.json(
        { error: 'Insufficient balance', needed: total, balance: user.balance },
        { status: 402 }
      );
    }

    // Deduct balance
    await db.collection('users').updateOne(
      { _id: new ObjectId(auth.userId) },
      { $inc: { balance: -total } }
    );

    // Create purchase records
    const purchaseRecords = items.map((item: { planId: string; name: string; data: string; validity: string; price: number; coverage: string }) => ({
      userId: new ObjectId(auth.userId),
      planId: item.planId,
      name: item.name,
      data: item.data,
      validity: item.validity,
      price: item.price,
      coverage: item.coverage,
      purchasedAt: new Date(),
      status: 'active',
    }));

    await db.collection('purchases').insertMany(purchaseRecords);

    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(auth.userId) });
    const remainingBalance = updatedUser?.balance ?? user.balance - total;
    const customerName = user.name || user.firstName || 'Customer';

    sendPurchaseEmail(user.email, customerName, items, total, remainingBalance).catch(() => {});
    sendPurchaseNotification(customerName, user.email, items, total).catch(() => {});

    return NextResponse.json({
      success: true,
      balance: remainingBalance,
      purchaseCount: items.length,
    });
  } catch (err) {
    console.error('Purchase error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
