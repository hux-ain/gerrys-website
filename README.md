# Gerry's IT website: Next.js + Payload CMS

Step 1 of moving gerrys.net off WordPress.
**Included:** Home page (same design as the live site, plus animations), header, footer, WhatsApp button, admin panel, and database.

| Part | Technology |
|---|---|
| Frontend | Next.js 15 (React 19), Tailwind CSS 4, TypeScript |
| Backend + Admin panel | Payload CMS 3 (runs inside the same Next.js app, at `/admin`) |
| Database | PostgreSQL 16 |
| Images | Uploaded through the admin panel, auto-converted to WebP (max 1920px) |

---

## Chalane ka tareeqa (pehli dafa)

Zaroori cheezein:
- **Node.js 20 ya naya**
- **Docker Desktop** (sirf database ke liye). Agar PostgreSQL pehle se installed hai to Docker ki zaroorat nahi.

```bash
# 1. Settings file banayein
cp .env.example .env
#    .env kholein aur PAYLOAD_SECRET mein koi lamba random text daalein
#    SEED_ADMIN_EMAIL aur SEED_ADMIN_PASSWORD apne hisaab se rakhein

# 2. Database chalayein (Docker)
docker compose up -d

# 3. Packages install karein
npm install

# 4. Website chalayein
npm run dev
```

- Website: http://localhost:3000. Database khali ho tab bhi Home page live site ka content dikhata hai.
- Admin panel: http://localhost:3000/admin

**5. Content database mein daalein.** `npm run dev` chalta rahe, aur ek naye terminal mein ye command chalayein:

```bash
npm run seed
```

Ye command:
- Super Admin bana deti hai (`.env` wali email aur password se).
- gerrys.net se saari images download kar ke WebP mein badal kar Media mein daal deti hai.
- Home Page aur Site Settings bhar deti hai.

Iske baad `/admin` mein login karein: **Pages → Home Page**. Jo bhi badlenge, website pe foran nazar aayega.

### Agar `npm install` mein version ka masla aaye

Payload aur Next.js ke versions kabhi kabhi aapas mein match nahi karte. Us soorat mein:

```bash
npx create-payload-app@latest gerrys-fresh -t blank --db postgres
```

Phir is project se ye cheezein `gerrys-fresh` mein copy kar dein:
- `src/` folder
- `public/` folder
- `next.config.mjs`, `redirects.mjs`, `postcss.config.mjs`, `docker-compose.yml`, `.env.example`

Aur ye packages install karein:

```bash
npm i jspdf
npm i -D tailwindcss @tailwindcss/postcss
```

---

## Folder structure

```
src/
├── app/(frontend)/         ← website (layout, home page, forms ka server action)
├── app/(payload)/          ← admin panel + API (Payload ki standard files)
├── collections/            ← database tables: Users, Media, Posts, Leads
├── globals/                ← Site Settings, Home Page (admin se edit hote hain)
├── access/roles.ts         ← roles: Super Admin, Admin, Editor, Sales, HR
├── components/home/        ← Home ke sections (Hero, About, Services, Calculator...)
├── components/layout/      ← Header, Footer, WhatsApp
├── components/ui/          ← animations (Reveal, SplitHeading, Counter), button, icons
├── content/defaults.ts     ← live site ka content (seed + fallback)
├── lib/getContent.ts       ← database se content lena
└── seed/index.ts           ← npm run seed
redirects.mjs               ← purane WordPress URLs → naye URLs
```

## Admin panel mein kya hai

| Section | Kya karta hai | Kaun dekh sakta hai |
|---|---|---|
| **Users** | Staff accounts. 5 ghalat password pe 15 minute lock | Super Admin |
| **Media** | Images. Upload pe khud WebP aur chhoti ho jaati hain | Editor+ |
| **Posts** | Blogs aur News (Step 2 mein in ke pages banenge) | Editor+ |
| **Leads** | Calculator, Contact aur Newsletter forms ka data, status ke saath | Sales, Admin |
| **Home Page** | Banner, About, Stats, Services, Logos, Certificates, Testimonials, CTA | Editor+ |
| **Site Settings** | Phone, email, WhatsApp, social links, top bar ka rang (Pink October) | Admin |

Database mein bana pehla account hamesha **Super Admin** banta hai.

## Animations

- **Headings:** lafz ek ek kar ke neeche se upar aate hain, aur neeche wali gold line barhti hai.
- **Text, cards aur images:** scroll pe fade, slide ya zoom ho kar aate hain.
- **Buttons:** hover pe chamak (shine), arrow aage khisakta hai, button upar uthta hai.
- **Counters:** 1 se ginti kar ke 500+, 150+, 26+ tak jaate hain.
- **Banner:** slide badalne pe image halka zoom hoti hai aur text upar aata hai.
- **Partners:** diamond logos ek ke baad ek pop ho kar aate hain.
- **Clients:** logos ki patti chalti rehti hai, mouse rakhne pe rukti hai.
- **Certificates:** khud chalte hain, click karne pe bare ho kar khulte hain.
- **Testimonials:** khud chalte hain, saath mein arrows aur dots.

Jis visitor ne phone mein "Reduce motion" on kiya ho, us ke liye saari animations khud band ho jati hain.

## Speed ke liye kya kiya gaya

- jQuery, Bootstrap, Slick, Font Awesome aur Visual Composer kuch bhi nahi hai.
- Fonts sirf 2 hain (Montserrat aur Onest), dono WOFF2, aur Next.js inhein khud apne server se deta hai.
- Images WebP/AVIF mein hain, sahi size mein, aur lazy load hoti hain.
- PDF library (jsPDF) sirf tab load hoti hai jab koi "Download" dabaye.
- Page pehle se bana hota hai (static). Admin mein kuch badlo to page khud dobara ban jata hai.
- Google Map lazy load hota hai.

## Purani site ke bugs jo is mein theek kiye gaye

- **Avaya ka "Discover" button:** `/gerrys-avaya/` pe jata tha, jo page maujood hi nahi. Ab `/avaya-partner-pakistan` pe jata hai, aur purane link ka redirect bhi laga diya hai.
- **Ghalat jagah se aane wali images:** kuch images staging site (`darkslategray-armadillo-113019.hostingersite.com`) aur server ke IP (`202.69.36.157`) se aa rahi thin. Ab sab ek jagah se aati hain.
- **WordPress demo naam wale URLs:** 5 event posts ke URL `/hello-world/` aur `/kate-hanson-...` jaise the. Inke naye URLs ke redirects `redirects.mjs` mein hain.

**Client se confirm karein:** testimonials mein **GEO** aur **Jinnah Sindh Medical University** ka text bilkul ek jaisa hai. Ye purani site pe bhi aisa hi tha.

## Live site se farq (jaan boojh kar)

| Purani site | Nayi site |
|---|---|
| Google reCAPTCHA | Chhupa honeypot field. Step 2 mein Cloudflare Turnstile lagega |
| OneTap accessibility widget | Nahi hai. Site khud keyboard aur screen reader ke liye theek banayi gayi hai |
| Header mein search aur mic | Step 2 mein aayenge |
| Banner ki height 130% screen | 100% screen, taake content jaldi nazar aaye |

## Production (live) karne se pehle

```bash
npx payload migrate:create   # database ka schema save karein
npx payload migrate          # live database pe chalayein
npm run build && npm start
```

## Step 2 mein kya add hua

**Saare pages** (purane URLs wahi hain):

| Page | URL |
|---|---|
| About Us | `/about-us-gerrys-information-technology-pakistan` |
| Internet Service | `/internet-services` |
| Enterprise Solutions | `/enterprise-solutions` |
| Gerry's Avaya | `/avaya-partner-pakistan` |
| News & Updates | `/news-updates` |
| Blogs | `/blogs` |
| Har blog aur news ka apna page | `/<slug>` |
| FAQ | `/faq` |
| Careers | `/careers` |
| Contact Us | `/contact-us` |
| Privacy Policy | `/privacy-policy` |
| Search | `/search` |

**Admin panel ke naye hisse:**

| Section | Kya karta hai |
|---|---|
| **FAQs** | Sawal aur jawab, order ke saath |
| **Jobs** | Openings. Agar koi opening na ho to "No Positions Available" khud dikhta hai |
| **Applications** | Career form ka data |
| **Resumes** | CV files. Sirf HR aur Admin khol sakte hain |

`npm run seed` ab WordPress ke saare **19 blogs aur news** bhi import karta hai: un ki featured images aur article ke andar wali images Media mein chali jaati hain. Saath mein 7 FAQs bhi daal deta hai.

**Search aur voice search:** header mein search 🔍 aur mic 🎤 buttons hain.
- Mic dabao, bolo: "dark fiber", "Avaya" waghera, aur results khul jaate hain.
- Voice search Chrome, Edge aur Safari mein chalta hai.
- Search pages, blogs, news aur FAQs sab mein dhoondta hai.

**Accessibility Adjustments:** WhatsApp button ke oopar ek button hai, jo OneTap plugin ki jagah leta hai. Is mein ye sab hai:
- **Page parh kar sunana** (Text-to-speech): poora page, ya sirf select kiya hua text.
- **Profiles:** Vision Impaired, Seizure Safe, ADHD, Cognitive, Dyslexia.
- **Content:** text size, line height, letter spacing, readable font, links aur headings highlight, bara cursor, text alignment.
- **Colour:** light, dark aur high contrast; monochrome; low saturation.
- **Orientation:** reading line, reading mask, images chhupana, animations rokna.
- **Skip to:** content, menu ya footer pe seedha jana.

Visitor ki settings us ke browser mein yaad rehti hain.

**Header:**
- Scroll karne pe menu poora **kaala (dark)** ho jata hai.
- "About Us" aur "Contact Us" ab ek hi line mein rehte hain.

**Doosri tabdeeliyan:**
- **Partners:** diamonds ke beech har taraf barabar gap hai.
- **Sliders:** banner aur testimonials ab **8 second** baad badalte hain.
- **SEO:** `sitemap.xml`, `robots.txt`, FAQ ka Google schema, aur har post ka apna title/description.

## Content jo confirm karna hai

- **Kaspersky (Enterprise page):** live site pe is ke neeche ghalti se Ubiquiti wala text tha. Naya text `src/content/pages.ts` mein hai, team se check karwa lein.
- **Gerry's Group introduction:** shuru ke alfaaz "50 long years ... have brought Gerry's as" waise hi rakhe hain jaise live site pe hain.

## Abhi bhi gerrys.net se aane wali images

Ye images local copy mein nahi thin:
- About ka "Mission & Vision" graphic
- Careers aur Contact ke banner

WordPress band karne se **pehle** in teeno ko admin ke Media mein upload karein, ya `public/images/pages/` mein rakh kar `src/content/pages.ts` aur page files mein path badal dein.

## Agle qadam

1. Naye lead ya application pe email notification (SMTP).
2. Google Tag Manager: sirf ek tag, Site Settings se.
3. Static pages (Internet, Avaya, Enterprise, About) ko bhi admin se editable banana.
4. Super Admin ke liye Activity Log: kis ne kya badla.
