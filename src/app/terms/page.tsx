import { AnimatedSection } from '@/components/ui/AnimatedSection';

const sections = [
  {
    title: '1. Agreement to Terms',
    content:
      'By accessing or using the ArvoSim website and services (collectively, the "Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access or use the Service. These Terms apply to all visitors, users, and others who access or use the Service.',
  },
  {
    title: '2. Description of Service',
    content:
      'ArvoSim provides a digital marketplace for purchasing eSIM data plans for international travel. Our Service enables users to browse available data plans, purchase eSIM profiles, and manage their connectivity through our platform. We act as an intermediary between mobile network operators and end users.',
  },
  {
    title: '3. Account Registration',
    content:
      'To use certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration and keep your account information up to date. You must be at least 18 years old to create an account.',
  },
  {
    title: '4. Purchases and Payments',
    content:
      'All eSIM plan purchases are processed in GBP (British Pounds). Prices displayed in other currencies are estimates based on current exchange rates and may differ from the actual charged amount. Payment is required at the time of purchase. We accept Visa and Mastercard credit and debit cards only. All transactions are processed with 3D Secure authentication for your protection. Wallet top-ups are non-refundable but never expire.',
  },
  {
    title: '5. eSIM Activation and Usage',
    content:
      'eSIM profiles are delivered digitally via QR code after purchase. Once an eSIM profile has been downloaded and activated on a device, it is considered used and is non-transferable. Plan validity begins when the eSIM first connects to a supported network in the coverage area. Data usage is tracked by the network operator and may differ slightly from on-device usage indicators.',
  },
  {
    title: '6. Refund Policy',
    content:
      'We offer a full refund for unused eSIM plans within 30 days of purchase. An eSIM is considered "used" once it has connected to a network and consumed any amount of data. To request a refund, contact our support team with your order reference. Refunds are processed to the original payment method within 5-10 business days. Wallet balance top-ups are non-refundable.',
  },
  {
    title: '7. Acceptable Use',
    content:
      'You agree not to use the Service for any unlawful purpose or in violation of any applicable laws. You may not resell, redistribute, or commercially exploit eSIM plans purchased through ArvoSim without our prior written consent. Excessive or abusive usage that degrades network quality for other users may result in throttling or suspension of service.',
  },
  {
    title: '8. Intellectual Property',
    content:
      'The Service and its original content, features, and functionality are owned by ELVORIN LTD (Company number 17344051) and are protected by international copyright, trademark, and other intellectual property laws. Our trademarks, service marks, and logos may not be used in connection with any product or service without our prior written consent.',
  },
  {
    title: '9. Limitation of Liability',
    content:
      'To the maximum extent permitted by applicable law, ArvoSim shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service. This includes but is not limited to loss of data, loss of profits, or business interruption. Our total liability for any claim arising from the Service shall not exceed the amount you paid to ArvoSim in the 12 months preceding the claim.',
  },
  {
    title: '10. Network Coverage and Performance',
    content:
      'While we strive to provide accurate coverage information, network availability and performance depend on local operators and infrastructure. We do not guarantee specific speeds, uptime, or coverage in all areas within a listed country. Network performance may vary based on location, time of day, device capability, and local network conditions.',
  },
  {
    title: '11. Privacy',
    content:
      'Your use of the Service is also governed by our Privacy Policy, which describes how we collect, use, and share your personal information. By using the Service, you consent to the data practices described in our Privacy Policy.',
  },
  {
    title: '12. Changes to Terms',
    content:
      'We reserve the right to modify or replace these Terms at any time. Material changes will be communicated via email or a prominent notice on our website at least 30 days before they take effect. Your continued use of the Service after changes become effective constitutes acceptance of the revised Terms.',
  },
  {
    title: '13. Governing Law',
    content:
      'These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law provisions. Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
  },
  {
    title: '14. Contact',
    content:
      'If you have any questions about these Terms of Service, please contact us at legal@arvosim.com or write to ELVORIN LTD, Dept 6946, 196 High Road, Wood Green, London, United Kingdom, N22 8HH.',
  },
];

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <AnimatedSection>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text md:text-4xl">Terms of Service</h1>
          <p className="mt-3 text-text-light">Last updated: 1 April 2026</p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-10">
        <div className="rounded-2xl border border-border bg-white p-6 md:p-10 shadow-sm">
          <p className="text-text-light leading-relaxed">
            Please read these Terms of Service carefully before using ArvoSim. These terms govern
            your access to and use of our eSIM marketplace platform and related services.
          </p>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-text">{section.title}</h2>
                <p className="mt-2 text-text-light leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
