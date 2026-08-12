import Link from 'next/link';
import { footerSections } from '@/data/navigation';
import { PaymentLogos } from '@/components/ui/PaymentLogos';
import { Logo } from '@/components/ui/Logo';

const companyName = 'ELVORIN LTD';
const companyNumber = '17344051';
const companyAddress = 'Suite 709, Avicenna House, 258–262 Romford Road, London, E7 9HZ, United Kingdom';
const companyEmail = 'info@arvosim.com';

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Logo />
            </Link>
            <p className="mt-4 text-sm text-text-light leading-relaxed">
              Stay connected worldwide with affordable eSIM data plans. No plastic, no hassle — just scan and go.
            </p>
            <div className="mt-5">
              <PaymentLogos />
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-text">{section.title}</h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-light hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1 text-xs text-text-light">
              <p className="font-semibold text-text">{companyName}</p>
              <p>Company number: {companyNumber}</p>
              <p>{companyAddress}</p>
              <p>Email: <a href={`mailto:${companyEmail}`} className="hover:text-primary transition-colors">{companyEmail}</a></p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <p className="text-sm text-text-light">
                © {new Date().getFullYear()} ArvoSim. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="/terms" className="text-sm text-text-light hover:text-primary transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="text-sm text-text-light hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link href="/contact" className="text-sm text-text-light hover:text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
