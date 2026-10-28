// Content copied from the live gerrys.net (October 2026).
// Used (1) by the seed script to fill the database and
// (2) as a fallback so the site still renders before the database is filled.
import type { HomeContent, Img, SiteContent } from './types'

const U = 'https://gerrys.net/wp-content/uploads'
const im = (path: string, alt: string): Img => ({ url: `${U}/${path}`, alt })

export const siteDefaults: SiteContent = {
  topBar: { background: '#DFDFDF', showRibbon: false },
  email: 'info@gerrys.net',
  phone: '(021) 111 - 123 -321',
  phoneLink: '+92-21-111-123-321',
  whatsapp: '+9221111123321',
  socials: {
    facebook: 'https://www.facebook.com/Gerrys-Information-Technology-730877750327407/',
    instagram: 'https://www.instagram.com/gerrysinformationtechnology',
    linkedin: 'https://www.linkedin.com/company/gerrys-information-technology',
  },
}

export const homeDefaults: HomeContent = {
  slides: [
    {
      image: im('2026/08/home-banner-image.webp', 'Gerry’s Net CIR bandwidth'),
      heading: 'Cir Bandwidth',
      text: 'Gerry’s Information Technology (GIT) emphasizes collaboration and cutting-edge solutions.',
      buttonText: 'Discover More',
      buttonLink: '/internet-services',
    },
    {
      image: im('2026/08/service-3.webp', 'Gerry’s Enterprise Solutions'),
      heading: 'Enterprise Solutions',
      text: 'GIT is one of the biggest and boldest providers of IT solutions in Pakistan',
      buttonText: 'Discover More',
      buttonLink: '/enterprise-solutions',
    },
    {
      image: im('2026/10/Avaya-banner.webp', 'Gerry’s Avaya devices'),
      heading: 'Gerry’s Avaya',
      text: 'A Leader in Cloud Communications Avaya is a global leader in cloud communications and contact center solutions',
      buttonText: 'Discover More',
      buttonLink: '/avaya-partner-pakistan',
    },
  ],
  about: {
    heading: 'About US',
    paragraphs: [
      "Gerry's Information Technology (GIT), a key part of Gerry's Group since 1998, delivers **innovative and sustainable IT solutions.** Our internet service, **Gerry's Net,** boasts a 25-year legacy, offering **premium internet connectivity, last-mile solutions, cloud services, hosting, and cyber security nationwide.** We also provide cost-effective enterprise hardware, software, and networking.",
      'Our Enterprise Solutions division which delivers end-to-end IT infrastructure and technology solutions, with strong technical expertise and industry partnerships.',
    ],
    image: im('2026/07/home-about-section-image.png', 'Hand touching a digital network'),
  },
  stats: [
    { value: '500+', label: 'Clients' },
    { value: '150+', label: 'Case Study' },
    { value: '26+', label: 'Years in Business' },
  ],
  services: [
    {
      tabTitle: 'Internet Services',
      image: im('2026/07/internet-services-1.png', 'Gerry’s Net network equipment'),
      logo: im('2026/07/Gerrys_Net_logo_final.png', 'Gerry’s Net'),
      points: ['Corporate Internet', 'Wireless Connectivity', 'Cyber Security', 'Data Center Solutions', 'Co-Location Services'],
      link: '/internet-services',
    },
    {
      tabTitle: 'Enterprise Solutions',
      image: im('2026/07/71910283b15b1058e185a5687e864ef27337641a.jpg', 'Enterprise hardware'),
      logo: im('2026/07/6ab6dc05b59d01ab2212c4dd0985ca6b378b8d70-scaled.png', 'Gerry’s Enterprise Solutions'),
      points: ['Hardware Solutions', 'Software Solutions', 'Surveillance and Security'],
      link: '/enterprise-solutions',
    },
    {
      tabTitle: "Gerry's Avaya",
      image: im('2026/07/b1dc5e52cb038fea060eb5915aaa334bb7f6a61e.jpg', 'Avaya phones and servers'),
      logo: im('2026/07/564618a7d3c83bb97bfdd97262d7ee597a8cc6f4-scaled.png', 'Gerry’s Avaya'),
      points: ['Unified Communications Suite', 'Avaya Equinox™ Collaboration', 'Avaya Spaces'],
      link: '/avaya-partner-pakistan',
    },
  ],
  partners: [
    ['2026/07/HP-Logo.png', 'HP'],
    ['2026/07/huawei_logo.png', 'Huawei'],
    ['2026/07/Lenovo_logo.png', 'Lenovo'],
    ['2026/07/microsoft_logo.png', 'Microsoft'],
    ['2026/07/NetApp_logo.png', 'NetApp'],
    ['2026/07/atrust_logo.png', 'Atrust'],
    ['2026/07/Dell_Logo.png', 'Dell'],
    ['2026/07/Fortinet_logo.png', 'Fortinet'],
    ['2026/07/Hikvision_logo.png', 'Hikvision'],
    ['2026/07/zkteco-logo-vector.svg', 'ZKTeco'],
    ['2026/07/2560px-Honeywell_logo.svg.png', 'Honeywell'],
    ['2026/07/2560px-Corning_Incorporated_Logo.svg.png', 'Corning'],
    ['2026/07/apc-logo.png', 'APC'],
    ['2026/07/Dahua_Technology_logo.svg.png', 'Dahua'],
    ['2026/08/Cisco-Emblem-scaled.png', 'Cisco'],
    ['2026/08/vyond-logo.svg', 'Vyond'],
    ['2026/07/Juniper_Networks-Logo.wine_.svg', 'Juniper Networks'],
    ['2026/07/avaya-icon.svg', 'Gerry’s Avaya'],
    ['2026/07/h3c.png', 'H3C'],
    ['2026/07/kaspersky.svg', 'Kaspersky'],
  ].map(([p, n]) => ({ name: n, logo: im(p, `${n} logo`) })),
  clients: [
    ['client-1.png', 'Dubai Islamic Bank'],
    ['client-2.png', 'PSO'],
    ['client-3.png', 'K-Electric'],
    ['client-4.png', 'Utopia'],
    ['client-5.png', 'FedEx'],
    ['client-6.png', 'dnata'],
    ['client-7.png', 'ICS'],
    ['client-8.png', 'Artistic Milliners'],
    ['client-9.png', 'SECMC'],
    ['client-10.png', 'Movenpick'],
  ].map(([p, n]) => ({ name: n, logo: im(`2026/07/${p}`, `${n} logo`) })),
  achievements: [
    ['2026/08/h3c.jpg.jpeg', 'H3C Certificate'],
    ['2026/08/avaya-1.jpg.jpeg', 'Avaya Learning Certificate'],
    ['2026/08/hexnode1.jpg.jpeg', 'Hexnode Certificate'],
    ['2026/08/alcatel-1.jpg.jpeg', 'Alcatel-Lucent Training Certificate'],
    ['2026/08/Lenovo-360_360_BusinessCertificate_page-0001.jpg', 'Lenovo 360 Authorized Certificate'],
    ['2026/08/2027-Kaspersky-B2B-Partner-Certificate_page-0001.jpg.jpeg', 'Kaspersky United Partner Certificate'],
    ['2026/08/dell.jpg.jpeg', 'Dell Technologies Certificate'],
    ['2026/08/NetApp-Enterprise-Storage-Certificate-scaled.jpg', 'NetApp Enterprise Storage Certificate'],
  ].map(([p, t]) => ({ title: t, image: im(p, t) })),
  testimonials: [
    ['2026/07/Picture3.png', 'Pakistan State Oil', "We appreciate the support for our Avaya product Migration. Gerry's IT stands out as a highly professional and forward-thinking collaborator in the technology sector."],
    ['2026/08/Ary_Digital_Logo.png', 'ARY Digital', 'Gerry’s Net delivered a flawless solution with built-in route redundancy. Since migrating, our remote branch communications and cloud applications run without a single hiccup. Their proactive account management team is always one step ahead.'],
    ['2026/07/Picture2.png', 'PPHI Sindh', "Since 2018, Gerry's Information Technology has been a trusted technology partner, delivering reliable IT hardware, surveillance, CCTV, and networking solutions. Their technical expertise, professionalism, and responsive support have consistently ensured successful project delivery and made them a dependable partner for our technology needs."],
    ['2026/08/samsung-logo-png_seeklogo-370356.png', 'Samsung', "Gerry’s Net delivered ring-redundancy fiber links that ensure zero downtime. When internet stability is vital to patient care, Gerry's Net is the partner you want."],
    ['2026/08/Picture1.png', 'Abacus Consulting', 'Gerry’s Net equipped our campus with high-throughput bandwidth and robust gateway security. Their 24/7 technical support is genuinely responsive whenever we need on-site assistance.'],
    ['2026/08/GEO_News_logo_in_Urdu.png', 'GEO', 'Gerry’s Net provides consistent, symmetric high-speed internet without frustrating throttling or peak-hour drops. It’s easily the most stable ISP connection we’ve used in our ten years of operation.'],
    ['2026/08/Movenpick-Logo.png', 'Movenpick Hotel', 'Gerry’s Net handled our PTA IP whitelisting seamlessly and provided ultra-low latency routing for our international voice and video traffic. Their automated DDoS protection gives us peace of mind knowing our operations are protected against traffic spikes.'],
    ['2026/08/con-logo.png', 'Jinnah Sindh Medical University', 'Gerry’s Net provides consistent, symmetric high-speed internet without frustrating throttling or peak-hour drops. It’s easily the most stable ISP connection we’ve used in our ten years of operation.'],
    ['2026/08/satcomm-logo.png.bv_-3.webp', 'Satcomm Pvt. Ltd.', 'We needed a unified solution that could handle demanding guest Wi-Fi usage alongside our internal surveillance and PMS operations. Gerry’s Net customized a high-capacity link with dedicated bandwidth controls, ensuring our guests always experience fast, hassle-free internet.'],
    ['2026/08/21be31_c2b537f9b8cf4b9dbdcf9379d78490ebmv2.png', 'Yunus Textile Mills', 'During our biggest promotional sales of the year, web traffic increases tenfold. Gerry’s Net’s route optimization and DDOS attack monitoring keep our hosting environment online and responsive. We haven’t experienced a single drop in traffic during high-volume periods.'],
  ].map(([p, name, review]) => ({ logo: im(p, `${name} logo`), name, review, position: '' })),
  cta: {
    lineOne: 'Your One Trusted Partner for',
    lineTwo: 'Smarter, Connected, and Secure IT Solutions',
    text: 'Delivering reliability, security, and innovation through 25+ years of expertise in networking, cloud, and enterprise IT.',
    background: im('2026/07/newsletter-bg.png', ''),
  },
  contact: {
    heading: 'Get in Touch',
    text: 'To speak with our expert team member for any queries.',
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14481.55160632044!2d67.0101608871582!3d24.850597900000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f30833661c7%3A0x3db644f01b519023!2sGerry's%20Information%20Technology!5e0!3m2!1sen!2s!4v1784815811397!5m2!1sen!2s",
  },
}

export const backgroundAbout = `${U}/2026/07/background-about.png`

// Main navigation (same order and URLs as the live site)
export const NAV: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us-gerrys-information-technology-pakistan' },
  {
    label: 'Services',
    href: '/internet-services',
    children: [
      { label: 'Internet Service', href: '/internet-services' },
      { label: 'Enterprise Solutions', href: '/enterprise-solutions' },
      { label: "Gerry's Avaya", href: '/avaya-partner-pakistan' },
    ],
  },
  { label: 'News & Updates', href: '/news-updates' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact-us' },
]
