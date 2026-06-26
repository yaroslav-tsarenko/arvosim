import { Country } from '@/types';

export const countries: Country[] = [
  {
    slug: 'united-states',
    name: 'United States',
    flag: '🇺🇸',
    region: 'Americas',
    plans: [
      { id: 'us-1', data: '1 GB', validity: '7 days', price: 3.50, coverage: 'United States', networkType: '4G/LTE' },
      { id: 'us-2', data: '3 GB', validity: '15 days', price: 7.00, coverage: 'United States', networkType: '4G/LTE' },
      { id: 'us-3', data: '5 GB', validity: '30 days', price: 11.00, coverage: 'United States', networkType: '5G/4G' },
      { id: 'us-4', data: '10 GB', validity: '30 days', price: 18.00, coverage: 'United States', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Does this eSIM work across all US states?', answer: 'Yes, our US eSIM provides coverage across all 50 states including Alaska and Hawaii, with roaming on major carriers like T-Mobile, AT&T, and Verizon partner networks.' },
      { question: 'Can I use this eSIM for calls and texts?', answer: 'Our eSIM plans are data-only. You can make calls and send messages using apps like WhatsApp, Telegram, or FaceTime over your data connection.' },
      { question: 'What speeds can I expect?', answer: 'You will get 4G/LTE speeds in most areas, with 5G available on compatible plans in major cities. Typical download speeds range from 20-100 Mbps depending on location.' },
    ],
    relatedSlugs: ['canada', 'united-kingdom', 'france'],
  },
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    plans: [
      { id: 'uk-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'United Kingdom', networkType: '4G/LTE' },
      { id: 'uk-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'United Kingdom', networkType: '4G/LTE' },
      { id: 'uk-3', data: '5 GB', validity: '30 days', price: 9.50, coverage: 'United Kingdom', networkType: '5G/4G' },
      { id: 'uk-4', data: '10 GB', validity: '30 days', price: 16.00, coverage: 'United Kingdom', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Does this eSIM cover all of the UK?', answer: 'Yes, coverage extends across England, Scotland, Wales, and Northern Ireland with partner networks providing extensive 4G and 5G coverage.' },
      { question: 'How do I activate the eSIM?', answer: 'After purchase, you will receive a QR code. Simply scan it with your phone camera from Settings > Mobile Data > Add eSIM, and the profile will install automatically.' },
    ],
    relatedSlugs: ['france', 'germany', 'spain'],
  },
  {
    slug: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷',
    region: 'Europe',
    plans: [
      { id: 'tr-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Turkey', networkType: '4G/LTE' },
      { id: 'tr-2', data: '3 GB', validity: '15 days', price: 5.50, coverage: 'Turkey', networkType: '4G/LTE' },
      { id: 'tr-3', data: '5 GB', validity: '30 days', price: 8.50, coverage: 'Turkey', networkType: '4G/LTE' },
      { id: 'tr-4', data: '10 GB', validity: '30 days', price: 14.00, coverage: 'Turkey', networkType: '4G/LTE' },
    ],
    faqs: [
      { question: 'Does this work in Istanbul and resort areas?', answer: 'Yes, our eSIM works across all major Turkish cities including Istanbul, Ankara, Antalya, Bodrum, and all popular tourist destinations along the coast.' },
      { question: 'Is the connection fast enough for video calls?', answer: 'Absolutely. With 4G/LTE speeds typically between 15-50 Mbps, you can comfortably make video calls, stream music, and browse the web.' },
    ],
    relatedSlugs: ['egypt', 'georgia', 'spain'],
  },
  {
    slug: 'ukraine',
    name: 'Ukraine',
    flag: '🇺🇦',
    region: 'Europe',
    plans: [
      { id: 'ua-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Ukraine', networkType: '4G/LTE' },
      { id: 'ua-2', data: '3 GB', validity: '15 days', price: 5.00, coverage: 'Ukraine', networkType: '4G/LTE' },
      { id: 'ua-3', data: '5 GB', validity: '30 days', price: 7.50, coverage: 'Ukraine', networkType: '4G/LTE' },
      { id: 'ua-4', data: '10 GB', validity: '30 days', price: 12.00, coverage: 'Ukraine', networkType: '4G/LTE' },
    ],
    faqs: [
      { question: 'Which areas of Ukraine have coverage?', answer: 'Our eSIM provides coverage in major cities and populated areas. Coverage may be limited in some regions due to ongoing infrastructure changes.' },
    ],
    relatedSlugs: ['poland', 'moldova', 'germany'],
  },
  {
    slug: 'poland',
    name: 'Poland',
    flag: '🇵🇱',
    region: 'Europe',
    plans: [
      { id: 'pl-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Poland', networkType: '4G/LTE' },
      { id: 'pl-2', data: '3 GB', validity: '15 days', price: 5.00, coverage: 'Poland', networkType: '4G/LTE' },
      { id: 'pl-3', data: '5 GB', validity: '30 days', price: 8.00, coverage: 'Poland', networkType: '5G/4G' },
      { id: 'pl-4', data: '10 GB', validity: '30 days', price: 13.00, coverage: 'Poland', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Does the eSIM work throughout Poland?', answer: 'Yes, we partner with major Polish carriers to provide excellent coverage nationwide, including Warsaw, Krakow, Gdansk, Wroclaw, and rural areas.' },
    ],
    relatedSlugs: ['germany', 'ukraine', 'france'],
  },
  {
    slug: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    region: 'Europe',
    plans: [
      { id: 'es-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Spain', networkType: '4G/LTE' },
      { id: 'es-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'Spain', networkType: '4G/LTE' },
      { id: 'es-3', data: '5 GB', validity: '30 days', price: 9.00, coverage: 'Spain', networkType: '5G/4G' },
      { id: 'es-4', data: '10 GB', validity: '30 days', price: 15.00, coverage: 'Spain', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Does this cover the Canary and Balearic Islands?', answer: 'Yes, our Spain eSIM covers the entire country including the Canary Islands, Balearic Islands (Mallorca, Ibiza, Menorca), and all mainland regions.' },
    ],
    relatedSlugs: ['france', 'italy', 'turkey'],
  },
  {
    slug: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    region: 'Europe',
    plans: [
      { id: 'it-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Italy', networkType: '4G/LTE' },
      { id: 'it-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'Italy', networkType: '4G/LTE' },
      { id: 'it-3', data: '5 GB', validity: '30 days', price: 9.50, coverage: 'Italy', networkType: '5G/4G' },
      { id: 'it-4', data: '10 GB', validity: '30 days', price: 15.50, coverage: 'Italy', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Will this eSIM work in Sicily and Sardinia?', answer: 'Yes, coverage extends across all Italian regions including Sicily, Sardinia, and all major tourist destinations like Rome, Florence, Venice, and Milan.' },
    ],
    relatedSlugs: ['spain', 'france', 'germany'],
  },
  {
    slug: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    region: 'Asia',
    plans: [
      { id: 'jp-1', data: '1 GB', validity: '7 days', price: 3.50, coverage: 'Japan', networkType: '4G/LTE' },
      { id: 'jp-2', data: '3 GB', validity: '15 days', price: 7.50, coverage: 'Japan', networkType: '4G/LTE' },
      { id: 'jp-3', data: '5 GB', validity: '30 days', price: 12.00, coverage: 'Japan', networkType: '5G/4G' },
      { id: 'jp-4', data: '10 GB', validity: '30 days', price: 20.00, coverage: 'Japan', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Does this work on the Shinkansen (bullet train)?', answer: 'You will have connectivity along most Shinkansen routes, though speeds may vary during transit. Coverage is excellent in urban areas and major transportation corridors.' },
    ],
    relatedSlugs: ['china', 'australia', 'united-states'],
  },
  {
    slug: 'china',
    name: 'China',
    flag: '🇨🇳',
    region: 'Asia',
    plans: [
      { id: 'cn-1', data: '1 GB', validity: '7 days', price: 4.00, coverage: 'Mainland China', networkType: '4G/LTE' },
      { id: 'cn-2', data: '3 GB', validity: '15 days', price: 8.00, coverage: 'Mainland China', networkType: '4G/LTE' },
      { id: 'cn-3', data: '5 GB', validity: '30 days', price: 13.00, coverage: 'Mainland China', networkType: '4G/LTE' },
      { id: 'cn-4', data: '10 GB', validity: '30 days', price: 22.00, coverage: 'Mainland China', networkType: '4G/LTE' },
    ],
    faqs: [
      { question: 'Can I access Google and social media in China?', answer: 'Standard internet restrictions in China apply. Some international services may not be accessible without a VPN. Our eSIM provides local mobile data through Chinese carriers.' },
    ],
    relatedSlugs: ['japan', 'australia', 'egypt'],
  },
  {
    slug: 'egypt',
    name: 'Egypt',
    flag: '🇪🇬',
    region: 'Middle East',
    plans: [
      { id: 'eg-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Egypt', networkType: '4G/LTE' },
      { id: 'eg-2', data: '3 GB', validity: '15 days', price: 5.50, coverage: 'Egypt', networkType: '4G/LTE' },
      { id: 'eg-3', data: '5 GB', validity: '30 days', price: 8.50, coverage: 'Egypt', networkType: '4G/LTE' },
      { id: 'eg-4', data: '10 GB', validity: '30 days', price: 14.00, coverage: 'Egypt', networkType: '4G/LTE' },
    ],
    faqs: [
      { question: 'Does this work at resort areas like Sharm el-Sheikh?', answer: 'Yes, coverage extends to all popular tourist areas including Sharm el-Sheikh, Hurghada, Luxor, Aswan, and Cairo.' },
    ],
    relatedSlugs: ['turkey', 'georgia', 'spain'],
  },
  {
    slug: 'georgia',
    name: 'Georgia',
    flag: '🇬🇪',
    region: 'Europe',
    plans: [
      { id: 'ge-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Georgia', networkType: '4G/LTE' },
      { id: 'ge-2', data: '3 GB', validity: '15 days', price: 4.50, coverage: 'Georgia', networkType: '4G/LTE' },
      { id: 'ge-3', data: '5 GB', validity: '30 days', price: 7.00, coverage: 'Georgia', networkType: '4G/LTE' },
      { id: 'ge-4', data: '10 GB', validity: '30 days', price: 11.00, coverage: 'Georgia', networkType: '4G/LTE' },
    ],
    faqs: [
      { question: 'Does this cover mountain areas like Kazbegi?', answer: 'Coverage is excellent in Tbilisi, Batumi, and other cities. Mountain areas like Kazbegi and Svaneti have coverage along main roads and villages, though remote hiking trails may have limited signal.' },
    ],
    relatedSlugs: ['turkey', 'ukraine', 'moldova'],
  },
  {
    slug: 'moldova',
    name: 'Moldova',
    flag: '🇲🇩',
    region: 'Europe',
    plans: [
      { id: 'md-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Moldova', networkType: '4G/LTE' },
      { id: 'md-2', data: '3 GB', validity: '15 days', price: 4.50, coverage: 'Moldova', networkType: '4G/LTE' },
      { id: 'md-3', data: '5 GB', validity: '30 days', price: 7.00, coverage: 'Moldova', networkType: '4G/LTE' },
    ],
    faqs: [
      { question: 'Does coverage include Transnistria?', answer: 'Coverage is focused on internationally recognized Moldova territory, primarily in Chisinau and surrounding regions. Coverage in Transnistria may be limited.' },
    ],
    relatedSlugs: ['ukraine', 'georgia', 'poland'],
  },
  {
    slug: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    plans: [
      { id: 'de-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Germany', networkType: '4G/LTE' },
      { id: 'de-2', data: '3 GB', validity: '15 days', price: 6.50, coverage: 'Germany', networkType: '5G/4G' },
      { id: 'de-3', data: '5 GB', validity: '30 days', price: 10.00, coverage: 'Germany', networkType: '5G/4G' },
      { id: 'de-4', data: '10 GB', validity: '30 days', price: 17.00, coverage: 'Germany', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Which German carriers does this connect to?', answer: 'Our eSIM connects to major German networks including Deutsche Telekom and Vodafone partners, providing excellent coverage across all 16 federal states.' },
    ],
    relatedSlugs: ['france', 'poland', 'italy'],
  },
  {
    slug: 'france',
    name: 'France',
    flag: '🇫🇷',
    region: 'Europe',
    plans: [
      { id: 'fr-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'France', networkType: '4G/LTE' },
      { id: 'fr-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'France', networkType: '4G/LTE' },
      { id: 'fr-3', data: '5 GB', validity: '30 days', price: 9.50, coverage: 'France', networkType: '5G/4G' },
      { id: 'fr-4', data: '10 GB', validity: '30 days', price: 16.00, coverage: 'France', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Does this work in French overseas territories?', answer: 'This eSIM covers metropolitan France. Coverage in overseas territories like Reunion, Martinique, and Guadeloupe may require a separate plan.' },
    ],
    relatedSlugs: ['spain', 'germany', 'italy'],
  },
  {
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'Americas',
    plans: [
      { id: 'ca-1', data: '1 GB', validity: '7 days', price: 3.50, coverage: 'Canada', networkType: '4G/LTE' },
      { id: 'ca-2', data: '3 GB', validity: '15 days', price: 7.50, coverage: 'Canada', networkType: '4G/LTE' },
      { id: 'ca-3', data: '5 GB', validity: '30 days', price: 12.00, coverage: 'Canada', networkType: '5G/4G' },
      { id: 'ca-4', data: '10 GB', validity: '30 days', price: 19.00, coverage: 'Canada', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Does this cover rural Canadian areas?', answer: 'Coverage is excellent in cities and along major highways. Remote northern territories and very rural areas may have limited coverage due to the vast geography.' },
    ],
    relatedSlugs: ['united-states', 'united-kingdom', 'france'],
  },
  {
    slug: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'Oceania',
    plans: [
      { id: 'au-1', data: '1 GB', validity: '7 days', price: 3.50, coverage: 'Australia', networkType: '4G/LTE' },
      { id: 'au-2', data: '3 GB', validity: '15 days', price: 7.00, coverage: 'Australia', networkType: '4G/LTE' },
      { id: 'au-3', data: '5 GB', validity: '30 days', price: 11.50, coverage: 'Australia', networkType: '5G/4G' },
      { id: 'au-4', data: '10 GB', validity: '30 days', price: 19.00, coverage: 'Australia', networkType: '5G/4G' },
    ],
    faqs: [
      { question: 'Does this work in the Outback?', answer: 'Coverage is excellent along the east coast and in major cities (Sydney, Melbourne, Brisbane, Perth). Remote Outback areas have limited coverage. We recommend downloading offline maps for road trips.' },
    ],
    relatedSlugs: ['japan', 'united-states', 'canada'],
  },
  {
    slug: 'thailand', name: 'Thailand', flag: '🇹🇭', region: 'Asia',
    plans: [
      { id: 'th-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Thailand', networkType: '4G/LTE' },
      { id: 'th-2', data: '3 GB', validity: '15 days', price: 5.00, coverage: 'Thailand', networkType: '4G/LTE' },
      { id: 'th-3', data: '5 GB', validity: '30 days', price: 8.00, coverage: 'Thailand', networkType: '4G/LTE' },
      { id: 'th-4', data: '10 GB', validity: '30 days', price: 13.00, coverage: 'Thailand', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this work on Thai islands?', answer: 'Yes, coverage extends to popular islands like Phuket, Koh Samui, and Koh Phangan. Remote islands may have limited signal.' }],
    relatedSlugs: ['vietnam', 'singapore', 'japan'],
  },
  {
    slug: 'south-korea', name: 'South Korea', flag: '🇰🇷', region: 'Asia',
    plans: [
      { id: 'kr-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'South Korea', networkType: '5G/4G' },
      { id: 'kr-2', data: '3 GB', validity: '15 days', price: 6.50, coverage: 'South Korea', networkType: '5G/4G' },
      { id: 'kr-3', data: '5 GB', validity: '30 days', price: 10.00, coverage: 'South Korea', networkType: '5G/4G' },
      { id: 'kr-4', data: '10 GB', validity: '30 days', price: 17.00, coverage: 'South Korea', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'How fast is the network in South Korea?', answer: 'South Korea has one of the fastest mobile networks globally. Expect 5G speeds in Seoul and major cities, with excellent 4G everywhere else.' }],
    relatedSlugs: ['japan', 'china', 'thailand'],
  },
  {
    slug: 'vietnam', name: 'Vietnam', flag: '🇻🇳', region: 'Asia',
    plans: [
      { id: 'vn-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Vietnam', networkType: '4G/LTE' },
      { id: 'vn-2', data: '3 GB', validity: '15 days', price: 4.50, coverage: 'Vietnam', networkType: '4G/LTE' },
      { id: 'vn-3', data: '5 GB', validity: '30 days', price: 7.00, coverage: 'Vietnam', networkType: '4G/LTE' },
      { id: 'vn-4', data: '10 GB', validity: '30 days', price: 11.00, coverage: 'Vietnam', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this cover Ha Long Bay and Sapa?', answer: 'Coverage is good in major cities and popular tourist areas. Remote mountainous regions like Sapa may have spotty coverage.' }],
    relatedSlugs: ['thailand', 'singapore', 'malaysia'],
  },
  {
    slug: 'singapore', name: 'Singapore', flag: '🇸🇬', region: 'Asia',
    plans: [
      { id: 'sg-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Singapore', networkType: '5G/4G' },
      { id: 'sg-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'Singapore', networkType: '5G/4G' },
      { id: 'sg-3', data: '5 GB', validity: '30 days', price: 9.50, coverage: 'Singapore', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'Is 5G available in Singapore?', answer: 'Yes, Singapore has extensive 5G coverage across the island. You can expect very fast speeds throughout the country.' }],
    relatedSlugs: ['malaysia', 'thailand', 'indonesia'],
  },
  {
    slug: 'malaysia', name: 'Malaysia', flag: '🇲🇾', region: 'Asia',
    plans: [
      { id: 'my-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Malaysia', networkType: '4G/LTE' },
      { id: 'my-2', data: '3 GB', validity: '15 days', price: 5.00, coverage: 'Malaysia', networkType: '4G/LTE' },
      { id: 'my-3', data: '5 GB', validity: '30 days', price: 8.00, coverage: 'Malaysia', networkType: '4G/LTE' },
      { id: 'my-4', data: '10 GB', validity: '30 days', price: 13.00, coverage: 'Malaysia', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this cover both Peninsular Malaysia and Borneo?', answer: 'Yes, coverage extends to both Peninsular Malaysia and East Malaysia (Sabah and Sarawak), including major cities and tourist destinations.' }],
    relatedSlugs: ['singapore', 'thailand', 'indonesia'],
  },
  {
    slug: 'indonesia', name: 'Indonesia', flag: '🇮🇩', region: 'Asia',
    plans: [
      { id: 'id-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Indonesia', networkType: '4G/LTE' },
      { id: 'id-2', data: '3 GB', validity: '15 days', price: 5.00, coverage: 'Indonesia', networkType: '4G/LTE' },
      { id: 'id-3', data: '5 GB', validity: '30 days', price: 8.00, coverage: 'Indonesia', networkType: '4G/LTE' },
      { id: 'id-4', data: '10 GB', validity: '30 days', price: 13.50, coverage: 'Indonesia', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this work in Bali?', answer: 'Yes, Bali has excellent 4G coverage. Java, Sumatra, and other major islands also have good coverage in populated areas.' }],
    relatedSlugs: ['malaysia', 'singapore', 'thailand'],
  },
  {
    slug: 'india', name: 'India', flag: '🇮🇳', region: 'Asia',
    plans: [
      { id: 'in-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'India', networkType: '4G/LTE' },
      { id: 'in-2', data: '3 GB', validity: '15 days', price: 5.00, coverage: 'India', networkType: '4G/LTE' },
      { id: 'in-3', data: '5 GB', validity: '30 days', price: 7.50, coverage: 'India', networkType: '4G/LTE' },
      { id: 'in-4', data: '10 GB', validity: '30 days', price: 12.00, coverage: 'India', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this cover rural India?', answer: 'Coverage is excellent in cities and along major highways. Rural and remote areas may have limited connectivity depending on the region.' }],
    relatedSlugs: ['singapore', 'thailand', 'japan'],
  },
  {
    slug: 'brazil', name: 'Brazil', flag: '🇧🇷', region: 'Americas',
    plans: [
      { id: 'br-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Brazil', networkType: '4G/LTE' },
      { id: 'br-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'Brazil', networkType: '4G/LTE' },
      { id: 'br-3', data: '5 GB', validity: '30 days', price: 9.50, coverage: 'Brazil', networkType: '4G/LTE' },
      { id: 'br-4', data: '10 GB', validity: '30 days', price: 16.00, coverage: 'Brazil', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this work during Carnival in Rio?', answer: 'Yes, though network congestion during major events may affect speeds. Coverage is excellent in Rio de Janeiro, Sao Paulo, and other cities.' }],
    relatedSlugs: ['argentina', 'colombia', 'mexico'],
  },
  {
    slug: 'mexico', name: 'Mexico', flag: '🇲🇽', region: 'Americas',
    plans: [
      { id: 'mx-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Mexico', networkType: '4G/LTE' },
      { id: 'mx-2', data: '3 GB', validity: '15 days', price: 5.50, coverage: 'Mexico', networkType: '4G/LTE' },
      { id: 'mx-3', data: '5 GB', validity: '30 days', price: 8.50, coverage: 'Mexico', networkType: '4G/LTE' },
      { id: 'mx-4', data: '10 GB', validity: '30 days', price: 14.00, coverage: 'Mexico', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this cover Cancun and beach resorts?', answer: 'Yes, all major tourist areas including Cancun, Playa del Carmen, Los Cabos, and Puerto Vallarta have excellent coverage.' }],
    relatedSlugs: ['united-states', 'brazil', 'colombia'],
  },
  {
    slug: 'argentina', name: 'Argentina', flag: '🇦🇷', region: 'Americas',
    plans: [
      { id: 'ar-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Argentina', networkType: '4G/LTE' },
      { id: 'ar-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'Argentina', networkType: '4G/LTE' },
      { id: 'ar-3', data: '5 GB', validity: '30 days', price: 9.00, coverage: 'Argentina', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this work in Patagonia?', answer: 'Coverage is good in Buenos Aires and major cities. Patagonia has coverage along main routes but remote areas may have limited signal.' }],
    relatedSlugs: ['brazil', 'colombia', 'mexico'],
  },
  {
    slug: 'colombia', name: 'Colombia', flag: '🇨🇴', region: 'Americas',
    plans: [
      { id: 'co-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Colombia', networkType: '4G/LTE' },
      { id: 'co-2', data: '3 GB', validity: '15 days', price: 5.00, coverage: 'Colombia', networkType: '4G/LTE' },
      { id: 'co-3', data: '5 GB', validity: '30 days', price: 8.00, coverage: 'Colombia', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this cover Cartagena and Medellin?', answer: 'Yes, coverage is excellent in all major Colombian cities including Bogota, Medellin, Cartagena, Cali, and the Coffee Region.' }],
    relatedSlugs: ['brazil', 'mexico', 'argentina'],
  },
  {
    slug: 'uae', name: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East',
    plans: [
      { id: 'ae-1', data: '1 GB', validity: '7 days', price: 3.50, coverage: 'UAE', networkType: '5G/4G' },
      { id: 'ae-2', data: '3 GB', validity: '15 days', price: 7.00, coverage: 'UAE', networkType: '5G/4G' },
      { id: 'ae-3', data: '5 GB', validity: '30 days', price: 11.00, coverage: 'UAE', networkType: '5G/4G' },
      { id: 'ae-4', data: '10 GB', validity: '30 days', price: 18.00, coverage: 'UAE', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'Are VoIP calls available in UAE?', answer: 'UAE restricts some VoIP services. WhatsApp messaging works but voice/video calls may be limited. Consider this when choosing your plan.' }],
    relatedSlugs: ['saudi-arabia', 'qatar', 'egypt'],
  },
  {
    slug: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East',
    plans: [
      { id: 'sa-1', data: '1 GB', validity: '7 days', price: 3.50, coverage: 'Saudi Arabia', networkType: '5G/4G' },
      { id: 'sa-2', data: '3 GB', validity: '15 days', price: 7.00, coverage: 'Saudi Arabia', networkType: '5G/4G' },
      { id: 'sa-3', data: '5 GB', validity: '30 days', price: 11.00, coverage: 'Saudi Arabia', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'Does this cover Hajj/Umrah routes?', answer: 'Yes, coverage in Mecca, Medina, and Jeddah is excellent with 5G available in urban areas.' }],
    relatedSlugs: ['uae', 'qatar', 'egypt'],
  },
  {
    slug: 'qatar', name: 'Qatar', flag: '🇶🇦', region: 'Middle East',
    plans: [
      { id: 'qa-1', data: '1 GB', validity: '7 days', price: 3.50, coverage: 'Qatar', networkType: '5G/4G' },
      { id: 'qa-2', data: '3 GB', validity: '15 days', price: 7.00, coverage: 'Qatar', networkType: '5G/4G' },
      { id: 'qa-3', data: '5 GB', validity: '30 days', price: 11.00, coverage: 'Qatar', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'How is 5G coverage in Doha?', answer: 'Qatar has one of the best 5G networks in the Middle East, with comprehensive coverage across Doha and surrounding areas.' }],
    relatedSlugs: ['uae', 'saudi-arabia', 'egypt'],
  },
  {
    slug: 'south-africa', name: 'South Africa', flag: '🇿🇦', region: 'Africa',
    plans: [
      { id: 'za-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'South Africa', networkType: '4G/LTE' },
      { id: 'za-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'South Africa', networkType: '4G/LTE' },
      { id: 'za-3', data: '5 GB', validity: '30 days', price: 9.00, coverage: 'South Africa', networkType: '4G/LTE' },
      { id: 'za-4', data: '10 GB', validity: '30 days', price: 15.00, coverage: 'South Africa', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this work on safari?', answer: 'Coverage in cities and along major routes is excellent. Game reserves and safari lodges in remote areas may have limited signal.' }],
    relatedSlugs: ['kenya', 'morocco', 'nigeria'],
  },
  {
    slug: 'morocco', name: 'Morocco', flag: '🇲🇦', region: 'Africa',
    plans: [
      { id: 'ma-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Morocco', networkType: '4G/LTE' },
      { id: 'ma-2', data: '3 GB', validity: '15 days', price: 5.00, coverage: 'Morocco', networkType: '4G/LTE' },
      { id: 'ma-3', data: '5 GB', validity: '30 days', price: 8.00, coverage: 'Morocco', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this cover the Sahara Desert area?', answer: 'Coverage is good in Marrakech, Casablanca, Fez, and coastal areas. Desert regions have limited coverage.' }],
    relatedSlugs: ['south-africa', 'egypt', 'spain'],
  },
  {
    slug: 'kenya', name: 'Kenya', flag: '🇰🇪', region: 'Africa',
    plans: [
      { id: 'ke-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Kenya', networkType: '4G/LTE' },
      { id: 'ke-2', data: '3 GB', validity: '15 days', price: 5.50, coverage: 'Kenya', networkType: '4G/LTE' },
      { id: 'ke-3', data: '5 GB', validity: '30 days', price: 8.50, coverage: 'Kenya', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this work in the Masai Mara?', answer: 'Nairobi and Mombasa have excellent coverage. Safari areas like the Masai Mara have limited coverage at main camps.' }],
    relatedSlugs: ['south-africa', 'nigeria', 'egypt'],
  },
  {
    slug: 'nigeria', name: 'Nigeria', flag: '🇳🇬', region: 'Africa',
    plans: [
      { id: 'ng-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Nigeria', networkType: '4G/LTE' },
      { id: 'ng-2', data: '3 GB', validity: '15 days', price: 5.50, coverage: 'Nigeria', networkType: '4G/LTE' },
      { id: 'ng-3', data: '5 GB', validity: '30 days', price: 8.50, coverage: 'Nigeria', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Which cities have the best coverage?', answer: 'Lagos, Abuja, and Port Harcourt have the best 4G coverage. Other state capitals generally have good connectivity.' }],
    relatedSlugs: ['south-africa', 'kenya', 'morocco'],
  },
  {
    slug: 'portugal', name: 'Portugal', flag: '🇵🇹', region: 'Europe',
    plans: [
      { id: 'pt-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Portugal', networkType: '4G/LTE' },
      { id: 'pt-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'Portugal', networkType: '4G/LTE' },
      { id: 'pt-3', data: '5 GB', validity: '30 days', price: 9.00, coverage: 'Portugal', networkType: '5G/4G' },
      { id: 'pt-4', data: '10 GB', validity: '30 days', price: 15.00, coverage: 'Portugal', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'Does this cover the Azores and Madeira?', answer: 'Coverage in mainland Portugal is excellent. The Azores and Madeira have coverage in main towns but may be limited in remote areas.' }],
    relatedSlugs: ['spain', 'france', 'morocco'],
  },
  {
    slug: 'netherlands', name: 'Netherlands', flag: '🇳🇱', region: 'Europe',
    plans: [
      { id: 'nl-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Netherlands', networkType: '5G/4G' },
      { id: 'nl-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'Netherlands', networkType: '5G/4G' },
      { id: 'nl-3', data: '5 GB', validity: '30 days', price: 9.50, coverage: 'Netherlands', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'How is the network coverage?', answer: 'The Netherlands has one of the densest mobile networks in Europe. Expect excellent coverage everywhere, including rural areas.' }],
    relatedSlugs: ['germany', 'france', 'switzerland'],
  },
  {
    slug: 'switzerland', name: 'Switzerland', flag: '🇨🇭', region: 'Europe',
    plans: [
      { id: 'ch-1', data: '1 GB', validity: '7 days', price: 4.00, coverage: 'Switzerland', networkType: '5G/4G' },
      { id: 'ch-2', data: '3 GB', validity: '15 days', price: 8.00, coverage: 'Switzerland', networkType: '5G/4G' },
      { id: 'ch-3', data: '5 GB', validity: '30 days', price: 13.00, coverage: 'Switzerland', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'Does this work in the Alps?', answer: 'Switzerland has excellent mountain coverage along ski resorts and hiking trails. Very high altitude or remote valleys may have limited signal.' }],
    relatedSlugs: ['germany', 'france', 'austria'],
  },
  {
    slug: 'austria', name: 'Austria', flag: '🇦🇹', region: 'Europe',
    plans: [
      { id: 'at-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Austria', networkType: '4G/LTE' },
      { id: 'at-2', data: '3 GB', validity: '15 days', price: 6.00, coverage: 'Austria', networkType: '5G/4G' },
      { id: 'at-3', data: '5 GB', validity: '30 days', price: 9.50, coverage: 'Austria', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'Does this cover ski resorts?', answer: 'Yes, major ski resorts in Tyrol, Salzburg, and other regions have good coverage. Expect signal in most alpine villages and along slopes.' }],
    relatedSlugs: ['germany', 'switzerland', 'italy'],
  },
  {
    slug: 'greece', name: 'Greece', flag: '🇬🇷', region: 'Europe',
    plans: [
      { id: 'gr-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Greece', networkType: '4G/LTE' },
      { id: 'gr-2', data: '3 GB', validity: '15 days', price: 5.50, coverage: 'Greece', networkType: '4G/LTE' },
      { id: 'gr-3', data: '5 GB', validity: '30 days', price: 8.50, coverage: 'Greece', networkType: '4G/LTE' },
      { id: 'gr-4', data: '10 GB', validity: '30 days', price: 14.00, coverage: 'Greece', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this work on the Greek islands?', answer: 'Yes, popular islands like Santorini, Mykonos, Crete, and Rhodes have good coverage. Smaller islands may have limited connectivity.' }],
    relatedSlugs: ['italy', 'turkey', 'spain'],
  },
  {
    slug: 'czech-republic', name: 'Czech Republic', flag: '🇨🇿', region: 'Europe',
    plans: [
      { id: 'cz-1', data: '1 GB', validity: '7 days', price: 2.50, coverage: 'Czech Republic', networkType: '4G/LTE' },
      { id: 'cz-2', data: '3 GB', validity: '15 days', price: 5.00, coverage: 'Czech Republic', networkType: '4G/LTE' },
      { id: 'cz-3', data: '5 GB', validity: '30 days', price: 8.00, coverage: 'Czech Republic', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Is there good coverage in Prague?', answer: 'Prague has excellent 4G coverage. The rest of the country also has good connectivity including Brno, Cesky Krumlov, and other tourist destinations.' }],
    relatedSlugs: ['germany', 'austria', 'poland'],
  },
  {
    slug: 'sweden', name: 'Sweden', flag: '🇸🇪', region: 'Europe',
    plans: [
      { id: 'se-1', data: '1 GB', validity: '7 days', price: 3.00, coverage: 'Sweden', networkType: '5G/4G' },
      { id: 'se-2', data: '3 GB', validity: '15 days', price: 6.50, coverage: 'Sweden', networkType: '5G/4G' },
      { id: 'se-3', data: '5 GB', validity: '30 days', price: 10.00, coverage: 'Sweden', networkType: '5G/4G' },
    ],
    faqs: [{ question: 'Does this cover Lapland?', answer: 'Coverage in Stockholm, Gothenburg, and southern Sweden is excellent. Northern Lapland has coverage in towns but wilderness areas may be limited.' }],
    relatedSlugs: ['germany', 'netherlands', 'france'],
  },
  {
    slug: 'new-zealand', name: 'New Zealand', flag: '🇳🇿', region: 'Oceania',
    plans: [
      { id: 'nz-1', data: '1 GB', validity: '7 days', price: 3.50, coverage: 'New Zealand', networkType: '4G/LTE' },
      { id: 'nz-2', data: '3 GB', validity: '15 days', price: 7.00, coverage: 'New Zealand', networkType: '4G/LTE' },
      { id: 'nz-3', data: '5 GB', validity: '30 days', price: 11.00, coverage: 'New Zealand', networkType: '4G/LTE' },
      { id: 'nz-4', data: '10 GB', validity: '30 days', price: 18.00, coverage: 'New Zealand', networkType: '4G/LTE' },
    ],
    faqs: [{ question: 'Does this work on both islands?', answer: 'Yes, both North and South Islands have good coverage in cities and along main highways. Remote fiords and hiking trails may have limited signal.' }],
    relatedSlugs: ['australia', 'japan', 'singapore'],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getCountriesByRegion(region: string): Country[] {
  return countries.filter((c) => c.region === region);
}

export function getPopularCountries(): Country[] {
  return countries.filter((c) =>
    ['united-states', 'united-kingdom', 'turkey', 'japan', 'spain', 'france', 'italy', 'germany'].includes(c.slug)
  );
}

export const regions = ['Europe', 'Americas', 'Asia', 'Middle East', 'Africa', 'Oceania'] as const;
