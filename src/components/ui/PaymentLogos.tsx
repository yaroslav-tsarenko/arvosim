import Image from 'next/image';

export function PaymentLogos() {
  return (
    <div className="flex items-center gap-4">
      <Image src="/cards/visa.png" alt="Visa" width={80} height={50} className="h-12 w-auto" />
      <Image src="/cards/mastercard.png" alt="Mastercard" width={80} height={50} className="h-12 w-auto" />
      <Image src="/cards/pci-dss-compliant-logo-vector.svg" alt="PCI DSS Compliant" width={96} height={58} className="h-12 w-auto" />
    </div>
  );
}
