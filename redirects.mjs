// Old WordPress URLs -> new URLs (301/308 permanent). Google keeps the ranking.
// Add more here whenever a URL changes.
export const redirects = [
  // Home page "Gerry's Avaya" button pointed to a URL that does not exist on the live site
  { source: '/gerrys-avaya', destination: '/avaya-partner-pakistan', permanent: true },

  // Old event posts that still had WordPress demo slugs
  { source: '/hello-world', destination: '/gerrys-huawei-ict-partnership-event-marriott-karachi', permanent: true },
  { source: '/kate-hanson-to-prepare-for-the-cafe-mocha-cup-of-coffee', destination: '/gerrys-and-h3c-together-for-a-digital-future', permanent: true },
  { source: '/kate-hanson-to-prepare-for-the-cafe-mocha-cup-of-coffee-2', destination: '/gitex-global-2022', permanent: true },
  { source: '/post-4', destination: '/karachi-safe-city-project', permanent: true },
  { source: '/world-renown-speaker', destination: '/signing-ceremony-gerrys-it-and-wapda', permanent: true },

  // Old duplicate page URLs seen in the WordPress stats
  { source: '/avaya-partner-pakistan-uc-contact-centers-gerrys-it', destination: '/avaya-partner-pakistan', permanent: true },
  { source: '/news-events-gerrys-information-technology-pakistan', destination: '/news-updates', permanent: true },
  { source: '/cir-internet-enterprise-it-avaya-services-gerrys-it', destination: '/internet-services', permanent: true },
  { source: '/faq-cir-internet-enterprise-it-avaya-gerrys-it', destination: '/faq', permanent: true },

  // WordPress system URLs -> home (stops bots poking at the new site)
  { source: '/wp-admin/:path*', destination: '/', permanent: true },
  { source: '/wp-login.php', destination: '/', permanent: true },
  { source: '/feed', destination: '/blogs', permanent: true },
  { source: '/newsletter-signup-gerrys-it-pakistan', destination: '/', permanent: true },
  { source: '/services', destination: '/internet-services', permanent: true },
]
