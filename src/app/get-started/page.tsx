import Link from 'next/link';
import { Smartphone, Globe, QrCode, Wifi, ArrowRight, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

const steps = [
  {
    number: 1,
    title: 'Check Device Compatibility',
    description:
      'Make sure your smartphone supports eSIM technology. Most phones released after 2019 are compatible, including iPhone XR and later, Samsung Galaxy S20 and later, and Google Pixel 3 and later.',
    icon: Smartphone,
    tips: [
      'Go to Settings > About Phone and look for an EID number',
      'On iPhone, check Settings > Mobile Data for "Add eSIM"',
      'Ensure your device is not carrier-locked',
    ],
  },
  {
    number: 2,
    title: 'Choose a Plan',
    description:
      'Browse our coverage for 190+ countries and pick a data plan that matches your destination and trip length. We offer country-specific, regional, and global plans to suit every traveller.',
    icon: Globe,
    tips: [
      'Light use (maps, messaging): 1 GB is usually enough for a week',
      'Moderate use (social media, photos): go for 3-5 GB',
      'Heavy use (streaming, hotspot): consider 10 GB or more',
    ],
  },
  {
    number: 3,
    title: 'Install Your eSIM',
    description:
      'After purchasing, you will receive a QR code. Open your phone settings, select "Add eSIM", and scan the code. The entire process takes about two minutes and requires a Wi-Fi connection.',
    icon: QrCode,
    tips: [
      'You can install before your trip — data only starts when you connect abroad',
      'Label your eSIM (e.g., "Travel Data") for easy identification',
      'Keep your primary SIM active for calls and texts',
    ],
  },
  {
    number: 4,
    title: 'Start Browsing',
    description:
      'When you arrive at your destination, your eSIM will automatically connect to a local network. Set the eSIM as your data line and you are online — it is that simple.',
    icon: Wifi,
    tips: [
      'Enable data roaming in your eSIM settings if prompted',
      'Network selection is automatic in most countries',
      'Top up or buy a new plan anytime if you need more data',
    ],
  },
];

export default function GetStartedPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      <AnimatedSection>
        <SectionHeader
          title="Get Started with ArvoSim"
          subtitle="Four simple steps to stay connected on your next trip. No SIM swaps, no queues, no hassle."
        />
      </AnimatedSection>

      <div className="mt-14 space-y-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <AnimatedSection key={step.number} delay={0.1 * i}>
              <div className="relative rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-5 md:flex-row md:gap-8">
                  <div className="flex items-start gap-4 md:w-1/3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="md:hidden">
                      <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="hidden md:flex items-center gap-3 mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-text">{step.title}</h3>
                    </div>
                    <p className="text-text-light leading-relaxed">{step.description}</p>
                    <ul className="mt-4 space-y-2">
                      {step.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-sm text-text-light">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection delay={0.5} className="mt-14 text-center">
        <p className="text-lg text-text-light">
          Ready to get connected? Browse plans for your destination.
        </p>
        <Link
          href="/locations"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
        >
          Browse Destinations
          <ArrowRight className="h-4 w-4" />
        </Link>
      </AnimatedSection>
    </section>
  );
}
