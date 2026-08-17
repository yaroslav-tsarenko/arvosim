import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const COMPANY = 'ELVORIN LTD';
const COMPANY_NUMBER = '17344051';
const ADDRESS_LINES = [
  'Suite 709, Avicenna House',
  '258–262 Romford Road',
  'London, E7 9HZ, United Kingdom',
];
const EMAIL = 'info@arvosim.com';
const DOMAIN = 'arvosim.com';

const GREEN = rgb(0.02, 0.588, 0.412);
const DARK = rgb(0.118, 0.161, 0.231);
const GREY = rgb(0.392, 0.455, 0.545);
const LINE = rgb(0.886, 0.91, 0.941);

export interface InvoiceItem {
  name: string;
  data: string;
  validity: string;
  price: number;
  coverage: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: Date;
  customerName: string;
  customerEmail: string;
  items: InvoiceItem[];
  total: number;
}

export function buildInvoiceNumber(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ARV-${y}${m}${d}-${rand}`;
}

export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  const marginX = 48;
  let y = height - 56;

  const text = (
    str: string,
    x: number,
    yy: number,
    size: number,
    f = font,
    color = DARK,
  ) => page.drawText(str, { x, y: yy, size, font: f, color });

  const right = (
    str: string,
    xRight: number,
    yy: number,
    size: number,
    f = font,
    color = DARK,
  ) => {
    const w = f.widthOfTextAtSize(str, size);
    page.drawText(str, { x: xRight - w, y: yy, size, font: f, color });
  };

  // Header band
  page.drawRectangle({ x: 0, y: height - 120, width, height: 120, color: GREEN });
  text(COMPANY, marginX, height - 58, 22, bold, rgb(1, 1, 1));
  text('eSIM data plans', marginX, height - 80, 11, font, rgb(0.82, 0.98, 0.92));
  right('INVOICE', width - marginX, height - 58, 26, bold, rgb(1, 1, 1));
  right('PAID', width - marginX, height - 82, 12, bold, rgb(0.82, 0.98, 0.92));

  y = height - 156;

  // Company / meta block
  text(`Company number ${COMPANY_NUMBER}`, marginX, y, 9, font, GREY);
  ADDRESS_LINES.forEach((l, i) => text(l, marginX, y - 13 * (i + 1), 9, font, GREY));
  text(EMAIL, marginX, y - 13 * (ADDRESS_LINES.length + 1), 9, font, GREY);

  const metaX = width - marginX;
  right('Invoice number', metaX - 96, y, 9, bold, GREY);
  right(data.invoiceNumber, metaX, y, 9, font, DARK);
  right('Date', metaX - 96, y - 15, 9, bold, GREY);
  right(
    data.date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
    metaX,
    y - 15,
    9,
    font,
    DARK,
  );
  right('Billed to', metaX - 96, y - 30, 9, bold, GREY);
  right(data.customerEmail, metaX, y - 30, 9, font, DARK);
  right('Payment method', metaX - 96, y - 45, 9, bold, GREY);
  right('Balance', metaX, y - 45, 9, font, DARK);

  y -= 96;

  // Table header
  text('DESCRIPTION', marginX, y, 9, bold, GREY);
  text('COVERAGE', 300, y, 9, bold, GREY);
  right('AMOUNT', width - marginX, y, 9, bold, GREY);
  y -= 8;
  page.drawLine({ start: { x: marginX, y }, end: { x: width - marginX, y }, thickness: 1, color: LINE });
  y -= 20;

  for (const item of data.items) {
    text(item.name, marginX, y, 11, bold, DARK);
    text(`${item.data} · ${item.validity}`, marginX, y - 13, 9, font, GREY);
    text(item.coverage, 300, y, 10, font, DARK);
    right(`£${item.price.toFixed(2)}`, width - marginX, y, 11, font, DARK);
    y -= 34;
    page.drawLine({ start: { x: marginX, y: y + 8 }, end: { x: width - marginX, y: y + 8 }, thickness: 0.5, color: LINE });
  }

  y -= 6;
  right('Total paid', width - marginX - 100, y, 12, bold, DARK);
  right(`£${data.total.toFixed(2)}`, width - marginX, y, 14, bold, GREEN);

  // Footer
  const footerY = 60;
  page.drawLine({ start: { x: marginX, y: footerY + 28 }, end: { x: width - marginX, y: footerY + 28 }, thickness: 0.5, color: LINE });
  const footer = `${COMPANY} · Company number ${COMPANY_NUMBER} · ${ADDRESS_LINES.join(', ')}`;
  const fw = font.widthOfTextAtSize(footer, 8);
  page.drawText(footer, { x: (width - fw) / 2, y: footerY + 12, size: 8, font, color: GREY });
  const dw = bold.widthOfTextAtSize(DOMAIN, 9);
  page.drawText(DOMAIN, { x: (width - dw) / 2, y: footerY - 2, size: 9, font: bold, color: GREEN });

  return doc.save();
}
