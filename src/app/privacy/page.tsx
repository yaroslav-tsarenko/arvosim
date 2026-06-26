import { AnimatedSection } from '@/components/ui/AnimatedSection';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly when you create an account, make a purchase, or contact our support team. This includes your name, email address, payment information, and device details necessary for eSIM provisioning.

We also collect certain information automatically when you use our Service, including your IP address, browser type, operating system, referring URLs, and pages visited. This data helps us improve the Service and understand usage patterns.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use your personal information to provide and maintain the Service, process transactions and deliver eSIM profiles, send transactional communications (order confirmations, plan expiry reminders), respond to support requests and inquiries, improve and personalise your experience, detect and prevent fraud, and comply with legal obligations.

We do not sell your personal information to third parties. We only share data as described in this policy.`,
  },
  {
    title: '3. Payment Information',
    content: `All payment transactions are processed by our third-party payment processor. We do not store your full credit or debit card numbers on our servers. Our payment processor is PCI DSS compliant and uses industry-standard encryption to protect your financial data. We retain only a tokenised reference and the last four digits of your card for order identification purposes.`,
  },
  {
    title: '4. Data Sharing',
    content: `We share your information with mobile network operators solely for the purpose of provisioning and managing your eSIM profile. This includes device identifiers necessary for network activation. We may also share data with payment processors to complete transactions, analytics providers to help us understand Service usage, and legal authorities when required by law or to protect our rights.

All third-party service providers are contractually obligated to handle your data in accordance with applicable data protection laws.`,
  },
  {
    title: '5. Cookies and Tracking',
    content: `We use cookies and similar technologies to keep you signed in, remember your preferences (such as currency selection), analyse how the Service is used, and improve performance and reliability.

You can manage cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of the Service. We do not use cookies for targeted advertising.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain your account information for as long as your account remains active. Transaction records are retained for a minimum of six years to comply with financial record-keeping requirements. If you request account deletion, we will remove your personal data within 30 days, except where retention is required by law. Anonymised usage data may be retained indefinitely for analytical purposes.`,
  },
  {
    title: '7. Data Security',
    content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, regular security assessments, access controls limiting employee access to personal data, and secure development practices.

While we strive to protect your information, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security.`,
  },
  {
    title: '8. Your Rights',
    content: `Under applicable data protection laws, you have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data (subject to legal retention requirements), object to or restrict certain processing activities, receive your data in a portable format, and withdraw consent where processing is based on consent.

To exercise any of these rights, contact us at privacy@arvosim.com. We will respond to your request within 30 days.`,
  },
  {
    title: '9. International Data Transfers',
    content: `Your data may be transferred to and processed in countries outside the United Kingdom and European Economic Area. When we transfer data internationally, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the relevant authorities, or transfers to countries deemed to provide an adequate level of data protection.`,
  },
  {
    title: '10. Children\'s Privacy',
    content: `The Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child without parental consent, we will take steps to delete that information promptly.`,
  },
  {
    title: '11. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and, where appropriate, by sending you an email notification. Your continued use of the Service after changes take effect constitutes acceptance of the revised policy.`,
  },
  {
    title: '12. Contact Us',
    content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer at privacy@arvosim.com, or write to ARVO LINE LTD, Dept 6800, 196 High Road, Wood Green, London, United Kingdom, N22 8HH.

For complaints regarding our handling of your personal data, you also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.`,
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <AnimatedSection>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text md:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-text-light">Last updated: 1 April 2026</p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-10">
        <div className="rounded-2xl border border-border bg-white p-6 md:p-10 shadow-sm">
          <p className="text-text-light leading-relaxed">
            At ArvoSim, we take your privacy seriously. This Privacy Policy explains how we
            collect, use, store, and protect your personal information when you use our eSIM
            marketplace platform and related services (the &ldquo;Service&rdquo;).
          </p>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-text">{section.title}</h2>
                {section.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mt-2 text-text-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
