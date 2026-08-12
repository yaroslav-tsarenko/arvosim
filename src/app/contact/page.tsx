'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setSubject(''); setMessage('');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <AnimatedSection>
        <SectionHeader title="Get in Touch" subtitle="Have a question or need help? We are here for you." />
      </AnimatedSection>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <AnimatedSection delay={0.1} className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-text">Send us a message</h2>
            <p className="mt-1 text-sm text-text-light">We typically respond within 24 hours.</p>

            {status === 'success' && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-success/5 border border-success/20 px-4 py-3 text-sm text-success">
                <CheckCircle className="h-4 w-4 shrink-0" />
                Message sent successfully! We&apos;ll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-danger/5 border border-danger/20 px-4 py-3 text-sm text-danger">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text">Your name</label>
                  <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" className="w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">Email address</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-text">Subject</label>
                <input id="subject" type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="How can we help?" className="w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text">Message</label>
                <textarea id="message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us more about your question or issue..." className="w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
              <button type="submit" disabled={status === 'loading'} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-50">
                {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </form>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-text">Contact Information</h3>
            <div className="mt-4 space-y-4">
              <div className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="text-sm font-medium text-text">Email</p><p className="text-sm text-text-light">support@arvosim.com</p></div></div>
              <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="text-sm font-medium text-text">Phone</p><p className="text-sm text-text-light">+44 20 7946 0958</p></div></div>
              <div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="text-sm font-medium text-text">Address</p><p className="text-sm text-text-light">ELVORIN LTD<br />Suite 709, Avicenna House, 258–262 Romford Road, London, E7 9HZ, United Kingdom</p></div></div>
              <div className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><div><p className="text-sm font-medium text-text">Support Hours</p><p className="text-sm text-text-light">Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM GMT<br />Saturday: 10:00 AM &ndash; 4:00 PM GMT</p></div></div>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex h-48 items-center justify-center">
              <div className="text-center"><MapPin className="mx-auto h-8 w-8 text-text-light/40" /><p className="mt-2 text-sm text-text-light">London, E7 9HZ, United Kingdom</p></div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
