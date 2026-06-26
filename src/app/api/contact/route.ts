import { NextRequest, NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required: name, email, subject, message' }, { status: 400 });
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'Invalid field types' }, { status: 400 });
  }

  if (name.length > 200 || email.length > 200 || subject.length > 500 || message.length > 5000) {
    return NextResponse.json({ error: 'Field length exceeds maximum allowed' }, { status: 400 });
  }

  const sent = await sendContactNotification({ name, email, subject, message });
  if (!sent) {
    return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
