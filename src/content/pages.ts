// Static page content copied from the live gerrys.net (October 2026).
import type { Feature } from '@/components/page/FeatureRow'

const img = (name: string, alt: string, width: number, height: number) => ({ src: `/images/pages/${name}`, alt, width, height })
const IMG = {
  network: img('ip-network-section.webp', 'Network servers and routers connected by fiber', 514, 447),
  globe: img('corporate-internet.webp', 'Satellite orbiting a golden globe', 496, 450),
  fiber: img('fiber.webp', 'Fiber optic cable', 583, 417),
  cloud: img('cloud-services.webp', 'Cloud services connected to devices', 606, 505),
  satellite: img('satellite.webp', 'Satellite network over a world map', 610, 259),
  tower: img('wireless.webp', 'Wireless communication tower', 212, 497),
}

/* ----------------------------- Internet Service ----------------------------- */
export const internetIntro =
  "Gerry's IT provides lightning-fast broadband internet to businesses throughout Pakistan. We offer flexible contracts and customized solutions to fit your specific needs, all with competitive pricing and reliable speeds. For businesses located outside of our primary network, we offer solutions via satellite and wireless broadband, which are ideal for rural and remote areas. With 24/7/365 technical support, we ensure maximum uptime, reliability, and dedicated customer care."

export const internetFeatures: Feature[] = [
  {
    id: 'dark-fiber',
    title: 'Dark Fiber',
    image: IMG.network,
    paragraphs: [
      'Invest in dedicated capacity to meet long-term demands while reducing costs and achieving rapid payback. With GIT’s Dark Fiber solutions, enjoy the advantages of network ownership without the hassle of building it yourself. Benefit from our extensive experience to manage the connectivity needs of your expanding business.',
    ],
  },
  {
    id: 'wireless',
    title: 'Wireless connectivity',
    image: IMG.globe,
    paragraphs: [
      'GIT delivers affordable, enterprise-grade wireless networks covering 2 meters to 100 kilometers. We utilize 2.4 GHz and 5 GHz bands for high-capacity Wi-Fi, and 1 GHz and 900 MHz frequencies for long-range IoT deployments.',
      'Our cloud-managed indoor, outdoor, enterprise, and residential solutions are fully scalable and customizable, ensuring tailored connectivity for any throughput, latency, or regional requirement.',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Services',
    image: IMG.fiber,
    paragraphs: [
      "Gerry's IT cloud solutions can enhance your organization's security, resilience, and agility while promoting innovation and scalability. Migrating to the cloud also offers significant cost savings with flexible pricing models and reduced waste.",
      "Our expert consultants, who are certified as a **Microsoft Solutions Partner** and **AWS Network Partner**, can help you achieve these benefits using solutions from Azure and AWS. We understand that every company's journey to the cloud is unique, so we tailor our solutions to your organization's specific needs, focusing on people, processes, and technology.",
    ],
  },
  {
    id: 'cloud-management',
    title: 'Cloud Management',
    image: IMG.cloud,
    paragraphs: [
      'Smart companies are outsourcing their cloud needs to specialists rather than maintaining costly internal IT staff. Tech 360 provides proactive, on-demand managed services aligned with your organization’s goals, guiding everything from strategic direction to project management. Whether your environment is private, multitenant, or hybrid, we deliver the expertise needed to manage your cloud effectively.',
    ],
  },
  {
    id: 'service-desk',
    title: 'IT Service Desk/ Customer Support',
    image: IMG.satellite,
    paragraphs: [
      'We go beyond standard IT help desk services by innovating and automating the entire process, from call logging to complaint resolution.',
      'These user-friendly platforms are tailored to your business, allowing you to monitor client queries and manage **Service Level Agreements (SLAs)** efficiently. Our system empowers you to generate custom reports for service analysis and future planning. We automate the help desk process by generating complaint tickets for every call and enabling customers to track the status of their complaints in real time, ensuring transparency until the issue is resolved.',
    ],
  },
  {
    id: 'mpls',
    title: 'MPLS DPLC & IPLC / MPLS-based DPLC',
    image: IMG.tower,
    paragraphs: [
      "As a premier IT service provider, **Gerry's IT** offers customized, multi-tiered **MPLS-based DPLC & IPLC services** designed to meet your specific business needs. Our team of IP networking experts provides professional guidance and consultancy to ensure your business remains secure and thrives in the digital landscape. You can trust Gerry's IT for comprehensive service and support, especially if you're seeking reliable internetworking solutions in Pakistan.",
    ],
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    image: IMG.satellite,
    paragraphs: [
      'With our 24/7 threat monitoring and response services, we ensure that potential threats are detected and addressed in real time before they can cause harm.',
      "Gerry’s IT understands that every business is unique, with its own cybersecurity challenges. That's why we tailor our solutions to meet the specific needs, environments, and compliance requirements of each client. Whether you're a small business or a large enterprise, we adapt our services to your infrastructure, ensuring you receive the most effective and efficient protection possible.",
    ],
  },
  {
    id: 'data-center',
    title: 'Data Center Solutions and Colocation Services',
    image: IMG.tower,
    paragraphs: [
      'Gerry’s Colocation services help you safeguard mission critical data with the highest levels of security and operational reliability. The data centres provide access to vital ecosystems where major networks, enterprise and business partners interconnect to each other.',
    ],
  },
]

/* ----------------------------- Gerry's Avaya ----------------------------- */
export const avayaIntro =
  'A Leader in Cloud Communications Avaya is a global leader in cloud communications and contact center solutions. As a Diamond partner for Avaya Global, we offer a comprehensive portfolio of unified communication products and support.'

export const avayaFeatures: Feature[] = [
  {
    id: 'infinity',
    title: 'Avaya Infinity Platform',
    image: IMG.network,
    paragraphs: [
      '**Comprehensive Enterprise CX Platform Designed for the AI Age.** Transform customer experience into your competitive advantage. The **Avaya Infinity Platform** unites advanced AI, omnichannel capabilities, and deep customer intelligence into a single, scalable ecosystem. Built to handle the modern enterprise’s most complex workflows, Infinity delivers seamless interactions across every touchpoint—empowering agents with real-time AI assistance and providing leadership with actionable insights.',
    ],
    bullets: ['AI-First Customer Journeys', 'Unified Omnichannel CX', 'Enterprise-Grade Scalability'],
  },
  {
    id: 'nexus',
    title: 'Avaya Nexus',
    image: IMG.globe,
    paragraphs: [
      '**Mission-Critical Voice with Unmatched Resiliency.** When dynamic communication is vital to your operation, downtime is simply not an option. **Avaya Nexus** provides robust, rock-solid voice infrastructure built specifically for mission-critical enterprise environments. Designed to withstand network disruptions and high-stress scenarios, Nexus guarantees voice availability when every second counts.',
    ],
    bullets: ['Uncompromised Reliability', 'Crystal-Clear Quality', 'Resilient Infrastructure'],
  },
  {
    id: 'unified-communications',
    title: 'Unified Communications & Collaboration',
    image: IMG.fiber,
    paragraphs: [
      '**Enhance Productivity and Foster Connectivity Across Your Business.** Break down operational silos and connect your workforce, regardless of location. Avaya’s Unified Communications suite provides a modern, flexible foundation for secure communication, real-time collaboration, and streamlined business workflows.',
    ],
  },
  {
    id: 'ai',
    title: 'Explore AI at Avaya',
    image: IMG.cloud,
    paragraphs: [
      '**Open AI Ecosystem: Open Standards, Model Choice, and Enterprise Control.** Innovate without lock-in. Avaya’s Open AI Ecosystem empowers you to bring your choice of Large Language Models (LLMs), AI frameworks, and third-party solutions into your contact center architecture. Built on open standards, our infrastructure ensures you retain complete governance over your AI strategy—allowing you to adopt the latest models at your own pace while maintaining rigorous enterprise security, compliance, and data privacy.',
    ],
    bullets: ['Bring Your Own AI (BYO-AI)', 'Vendor Agnostic', 'Granular Control'],
  },
]

/* ----------------------------- Enterprise Solutions ----------------------------- */
export const enterpriseIntro =
  'GIT is one of the biggest and boldest providers of IT solutions in Pakistan - helping hundreds of businesses achieve their business goals and objectives by offering diversified low-cost and high performance information technology solutions, we are entitled to offer the entire range of personal and Mobile computing solutions which includes all business products covering: Desktops, Laptops, Servers to suit to your needs from a new user with basic requirement to a high end corporate user.'

const b = (name: string) => (['juniper', 'kaspersky', 'fortinet'].includes(name) ? `/images/brands/${name}.svg` : `/images/brands/${name}.webp`)

export const enterpriseCategories = [
  {
    no: '01',
    name: 'Hardware',
    icon: 'hardware',
    brands: ['netapp', 'cisco', 'apc', 'zebra', 'dell', 'juniper', 'hp', 'lenovo', 'mikrotik', 'ubiquiti', 'h3c'],
    focus: 'Networking, Servers, Data Center Equipment, Scanners/Printers, Storage, UPS/Power, Enterprise Wi-Fi',
  },
  {
    no: '02',
    name: 'Software',
    icon: 'software',
    brands: ['avaya', 'protex', 'microsoft'],
    focus: 'Unified Communications (UC), Contact Center Software, Enterprise Resource Planning (ERP)',
  },
  {
    no: '03',
    name: 'Firewall',
    icon: 'firewall',
    brands: ['fortinet', 'h3c', 'apc', 'juniper', 'sophos', 'barracuda'],
    focus: 'Network Security Appliances, Next-Generation Firewalls (NGFW), Security Gateways',
  },
  {
    no: '04',
    name: 'Surveillance & Security',
    icon: 'security',
    brands: ['zkteco', 'hikvision', 'pollo', 'kaspersky'],
    focus: 'Access Control, Time & Attendance, Cybersecurity, Security Software, Video Surveillance',
  },
].map((c) => ({ ...c, logos: c.brands.map((n) => ({ name: n, src: b(n) })) }))

export type Brand = { id: string; name: string; logo: string; paragraphs: string[]; bullets?: string[]; subtitle?: string; listTitle?: string }

export const enterpriseBrands: Brand[] = [
  {
    id: 'h3c',
    name: 'H3C',
    logo: b('h3c'),
    paragraphs: [
      'GIT as a gold partner of H3C, brings the entire pro portfolio of H3C to its valued customers with best in class after sales support to cater to various industries, including telecommunications, government, education, finance, and healthcare.',
    ],
    listTitle: 'Product Portfolio',
    bullets: [
      '**Intelligent Connectivity:** Switches, routers, and wireless solutions, including AI-native Wi-Fi 7, for data centers, campuses, and WANs.',
      '**Computing & Storage:** Servers, SANs, and distributed storage for high-performance computing and scalable data management.',
      '**Security:** A full suite of products like firewalls, security management platforms, and threat detection tools.',
      '**Cloud & AI Platforms:** Cloud computing and big data solutions, including the H3C CloudOS platform, to support AI workloads and digital transformation.',
      '**SMB Products:** Dedicated, easy-to-use, and high-performance products under the Aolynk and Cloudnet brands for small and medium businesses.',
    ],
  },
  {
    id: 'dell',
    name: 'Dell',
    logo: b('dell'),
    paragraphs: [
      'We are a reseller of Dell; it empowers countries, communities, customers and people everywhere to use technology to realize their dreams. Customers trust to deliver technology solutions that include personal computers (PCs), servers, data storage devices, network switches, software, computer peripherals, HDTVs, cameras, printers, MP3 players, and electronics.',
    ],
  },
  {
    id: 'lenovo',
    name: 'Lenovo',
    logo: b('lenovo'),
    paragraphs: [
      'We deal in a comprehensive range of Lenovo laptops, desktops, and servers, offering reliable and high-performance IT solutions for businesses, enterprises, educational institutions, and organizations. Our Lenovo portfolio includes business laptops, desktops, workstations, tower servers, rack servers, and enterprise infrastructure solutions.',
      'Lenovo laptops and desktops are designed to provide high performance, productivity, security, and reliability, while Lenovo servers deliver scalable performance for enterprise workloads.',
    ],
  },
  {
    id: 'fortinet',
    name: 'Fortinet',
    logo: b('fortinet'),
    paragraphs: [
      'Cybercriminals continue to launch automated and sophisticated attacks against organizations, threatening the foundation of cloud and digital transformation critical to efficient business operations. FortiGate NGFWs reduce complexity and lower the total cost of ownership along with supporting scalable deployments at the network edge, data center, internal segments, and distributed branches. FortiGates are the core of the Fortinet Security Fabric, defending against known and unknown attacks to provide network security across the entire attack surface.',
    ],
  },
  {
    id: 'netapp',
    name: 'NetApp',
    subtitle: 'Intelligent Data Infrastructure & Enterprise Storage',
    logo: b('netapp'),
    paragraphs: [
      'Gerry’s Information Technology provides **NetApp enterprise data infrastructure solutions** designed to help organizations securely store, manage, protect, and scale their critical data across on-premises, hybrid-cloud, and AI environments.',
    ],
    listTitle: 'Key Portfolio',
    bullets: [
      '**All-Flash & Hybrid Storage** — High-performance storage for enterprise workloads, databases, and virtualization.',
      '**SAN & Block Storage** — Reliable infrastructure for mission-critical applications.',
      '**AI-Ready Infrastructure** — Scalable data platforms designed to support AI and advanced analytics.',
      '**Hybrid & Multi-Cloud** — Seamless data management across data centers and leading cloud platforms.',
      '**Object Storage** — Scalable solutions for unstructured data, data lakes, backup, and analytics.',
      '**Data Protection & Cyber Resilience** — Backup, disaster recovery, ransomware protection, and business continuity.',
      '**ONTAP Data Management** — Unified storage management, replication, snapshots, efficiency, and security.',
      '**Storage-as-a-Service** — Flexible consumption models with NetApp Keystone.',
      '**FlexPod** — Integrated and validated infrastructure combining NetApp and Cisco technologies.',
    ],
  },
  {
    id: 'hp',
    name: 'HP',
    logo: b('hp'),
    paragraphs: [
      'We are a reseller of HP. HP (Hewlett-Packard) is a multinational information technology (IT) company whose product lines include PCs and other computing devices, enterprise and industry standard servers, storage devices, networking products, software, printers, scanners, plotters and other imaging products. The company introduced handheld calculators, the first commercially distributed data processing system, LaserJet printers, and (jointly with Intel) the Explicitly Parallel Instruction Computing (EPIC) architecture.',
    ],
  },
  {
    id: 'apc',
    name: 'APC',
    logo: b('apc'),
    paragraphs: ['APC produces and sells the following products to home offices, medium-sized businesses and larger corporations, as well:'],
    bullets: ['Uninterruptible Power Supply (UPS)', 'Surge Protection and Power Conditioning', 'Mobile Accessories', 'Racks and Accessories'],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: b('microsoft'),
    paragraphs: [
      'We are a reseller of Microsoft. Microsoft is an American multinational corporation that develops, manufactures, licenses, supports and sells computer software, consumer electronics, personal computers and services. Its best known software products are the Microsoft Windows line of operating systems, along with Office, Exchange, SharePoint, SQL Server, Windows Server, Visual Studio, Xbox, Bing, Dynamics, System Center, Skype, Azure, etc.',
    ],
  },
  {
    id: 'zkteco',
    name: 'ZKTeco',
    logo: b('zkteco'),
    paragraphs: [
      'ZKTeco strives to integrate intellectual property rights biometric verification techniques, including fingerprint, facial recognition, finger vein, iris recognition with techniques related to the Internet, Internet of Things, big data, cloud computing, and offers integrated and applied solutions.',
    ],
  },
  {
    id: 'hikvision',
    name: 'Hikvision',
    logo: b('hikvision'),
    paragraphs: [
      'Our company provides comprehensive **Hikvision security and surveillance solutions** for commercial, corporate, industrial, government, and critical infrastructure projects. We offer complete end-to-end services, including system design, supply, installation, configuration, integration, testing, commissioning, and after-sales technical support.',
    ],
  },
  {
    id: 'dahua',
    name: 'Dahua',
    logo: b('dahua'),
    paragraphs: [
      'We have the technical capability to design and implement **Dahua-based surveillance systems** according to project requirements. Our services include site surveys, system design, equipment supply, installation, configuration, integration, testing, commissioning, preventive maintenance and technical support.',
    ],
  },
  {
    id: 'ubiquiti',
    name: 'Ubiquiti',
    logo: b('ubiquiti'),
    paragraphs: [
      'We are a reseller of UBNT. It scales an end-to-end system of network devices across multiple locations within one unified interface. UniFi® AP, UniFi Video and mFi® are highly scalable, feature-rich hardware and software platforms that deliver enterprise performance at a fraction of the cost — allowing you to expand your enterprise network with hundreds of indoor/outdoor devices across multiple locations.',
    ],
  },
  {
    id: 'kaspersky',
    name: 'Kaspersky',
    logo: b('kaspersky'),
    // NOTE: the live site shows the Ubiquiti text here by mistake. Please confirm this text with the team.
    paragraphs: [
      'We are a reseller of Kaspersky and a Kaspersky United B2B partner, providing endpoint protection, threat detection and security software that keeps business devices, servers and data protected against malware, ransomware and targeted attacks.',
    ],
  },
  {
    id: 'sophos',
    name: 'Sophos',
    logo: b('sophos'),
    paragraphs: [
      'We are a reseller of Sophos. Sophos Group plc is a security software and hardware company. Sophos develops products for communication endpoint, encryption, network security, email security and mobile security as well as unified threat management.',
    ],
  },
  {
    id: 'cisco',
    name: 'Cisco',
    logo: b('cisco'),
    paragraphs: [
      'We are a reseller of Cisco. Cisco has shaped the future of the Internet by creating unprecedented value and opportunity for customers. Cisco product lines are Switches, Routers, Wireless, Security, WAN Optimization and Cloud System Management.',
    ],
  },
  {
    id: 'logitech',
    name: 'Logitech',
    logo: b('logitech'),
    paragraphs: [
      "We are a reseller of Logitech, a renowned global leader in technology and innovation, which has formed a strategic partnership with GIT to enhance its market reach and customer service in the Pakistani market. This collaboration aims to provide seamless access to Logitech's comprehensive range of products, catering to diverse needs across government, corporate, and consumer segments.",
    ],
  },
  {
    id: 'barracuda',
    name: 'Barracuda',
    logo: b('barracuda'),
    paragraphs: ['Barracuda Networks complete variety of Internet Security, Firewalls, Application Delivery and Data Protection solutions let you expand your control over IT.'],
    bullets: [
      '**Network and Application Security:** Develop applications scalability and workforce output. Now, you can have better and improved reliability and performance for your applications and network infrastructure.',
      '**Email Security and Archiving:** It maximizes and has brought email security, web application security and network threats security to superior level. Now your network threat vectors can be secured with maximum threat protection.',
      '**Data Protection:** Defending crucial data whereas accomplishing parameters and lawsuits conformity with Data Protection Plus.',
    ],
  },
  {
    id: 'zebra',
    name: 'Zebra',
    logo: b('zebra'),
    paragraphs: ['Enhance performance with Enterprise Scanners, Mobile Computers, Tablets & Printers with one purpose to help you perform even better.'],
  },
  {
    id: 'mikrotik',
    name: 'MikroTik',
    logo: b('mikrotik'),
    paragraphs: [
      'We are a reseller of MikroTik. MikroTik is a Latvian manufacturer of computer networking equipment. It includes wireless products and routers and wireless ISP systems, using industry standard PC hardware and complete routing systems to create the RouterOS software system that provides extensive stability, controls, and flexibility for all kinds of data interfaces and routing.',
    ],
  },
]

/* ----------------------------- About ----------------------------- */
export const aboutContent = {
  group: {
    title: 'Group Introduction',
    text: '50 long years of hard work and dedication have brought Gerry’s as Pakistan’s leading aviation based company. It was a journey that has a humble beginning and a glorious present; today we are not only Pakistan’s largest aviation based company but have diversified our portfolio into other divisions like Information Technology and Food & Beverages services and excelled in the respective divisions proving that the leadership and management has the ability to deliver in any aspect of business. Today, Gerry’s is a brand that requires no introduction, despite having only one consumer-based product.',
  },
  director: {
    title: 'A Message from our Director',
    text: 'Gerry’s Information Technology is a well established IT company that started off by providing internet services; two decades of dedication and hard work have led us to become an integrated all rounding one stop IT solution provider having diversified into enterprise solutions, software & application and cloud computing.',
    name: 'Arshad Wali Muhammad',
    role: 'Group Director',
  },
  who: {
    title: 'Who We Are?',
    paragraphs: [
      'Since 1998, Gerry’s Information Technology (GIT) has been empowering businesses through innovation, reliability, and customer-focused solutions. As a key member of Gerry’s Group, we’ve evolved with the ever-changing tech landscape, consistently exceeding industry standards.',
      'With a strong legacy in Internet Services, ICT, and Enterprise Solutions, GIT delivers turnkey technology solutions that enable smarter, faster, and more connected organizations. Our dedicated team of experts drives every project with professionalism, adaptability, and an unwavering commitment to excellence — ensuring our clients stay ahead in a rapidly advancing digital world.',
    ],
  },
  // Mission & vision graphic from the live site (move into the CMS with `npm run seed`)
  missionImage: 'https://gerrys.net/wp-content/uploads/2026/07/Group-new-about-point-scaled.png',
}

/* ----------------------------- Contact ----------------------------- */
export const contactDepartments = [
  { name: "Gerry's Avaya", email: 'gerrysavaya@gerrys.net', logo: '/images/brands/gavaya.webp' },
  { name: "Gerry's Net", email: 'sales@gerrys.net', logo: '/images/brands/gnet.webp' },
  { name: "Gerry's Enterprise Solutions", email: 'esolutions@gerrys.net', logo: '/images/brands/ges.webp' },
]

export const branches = [
  { city: 'Karachi – Head Office', address: ['3rd Floor, Central Hotel Building,', 'Mereweather Road, Karachi.'], phones: ['+92-21-111-123-321', '+92-21-38682509, 38682504'] },
  { city: 'Lahore – Branch', address: ['Al-Malik Plaza, 19 Davis Road, Lahore.'], phones: ['+92-42-36287702-03'] },
  { city: 'Islamabad – Branch', address: ['14-B, Sadiq Plaza, Opp: Meraj Hotel,', 'G-9 Markaz, Karachi Company, Islamabad.'], phones: ['+92-307-6660224', '+92-51-2285889'] },
  {
    city: 'Hyderabad – Branch',
    address: ['Office # G1, Ground Floor, Beautiful Homes,', 'Plot No.30, Unit #07, Block C, Latifabad,', 'Near American Hospital, Hyderabad.'],
    phones: ['+92-300-8228869', '+92-315-6911180'],
  },
  { city: 'Peshawar – Branch', address: ['3rd Floor, Marhaba IT Tower, University Road,', 'Near BRT Station, Peshawar'], phones: ['+92-21-38682524'] },
]

/* ----------------------------- Search index for static pages ----------------------------- */
export const pageIndex = [
  { title: 'Home', url: '/', text: 'CIR bandwidth enterprise solutions avaya roi calculator partners clients achievements testimonials contact' },
  { title: 'About Us', url: '/about-us-gerrys-information-technology-pakistan', text: 'gerrys group introduction director message who we are clients achievements mission vision since 1998' },
  { title: 'Internet Service', url: '/internet-services', text: internetIntro + ' ' + internetFeatures.map((f) => f.title + ' ' + f.paragraphs.join(' ')).join(' ') },
  { title: "Gerry's Avaya", url: '/avaya-partner-pakistan', text: avayaIntro + ' ' + avayaFeatures.map((f) => f.title + ' ' + f.paragraphs.join(' ')).join(' ') },
  {
    title: 'Enterprise Solutions',
    url: '/enterprise-solutions',
    text: enterpriseIntro + ' ' + enterpriseBrands.map((x) => x.name + ' ' + x.paragraphs.join(' ')).join(' ') + ' hardware software firewall surveillance',
  },
  { title: 'FAQ', url: '/faq', text: 'frequently asked questions cir sla symmetrical avaya migration voice quality managed hardware' },
  { title: 'Careers', url: '/careers', text: 'join our team jobs career cv apply vacancy' },
  { title: 'Contact Us', url: '/contact-us', text: 'contact address phone email karachi lahore islamabad hyderabad peshawar branch office map' },
  { title: 'Privacy Policy', url: '/privacy-policy', text: 'privacy policy data pta peca ctdisr retention security' },
  { title: 'News & Updates', url: '/news-updates', text: 'news updates events awards partnerships' },
  { title: 'Blogs', url: '/blogs', text: 'blogs articles insights data center cloud sla security' },
]
