# مخابز سرور | Surur Bakeries — Company Profile Website

A modern, fully responsive **bilingual (Arabic / English)** company profile website for
**Surur Bakeries (شركة مخابز سرور)** — a healthy "Light & Diet" bread producer since 1986.

- 🌍 **Arabic is the default language** (RTL). One click switches to English (LTR).
- 📱 Responsive for mobile, tablet and desktop.
- ⚛️ Built with **React 18 + Vite**, no heavy UI dependencies.

## Sections

| Section | Arabic | Content |
|---|---|---|
| Hero | الرئيسية | Slogan, CTAs, key stats |
| About | من نحن | Company story & values (since 1986) |
| Products | منتجاتنا | Asmar (أسمر), Oat (شوفان), Barley (شعير) |
| Features | لماذا سرور | High-fiber, no added sugar, non-GMO, whole grains |
| Gallery | المعرض | Product & lifestyle imagery |
| Contact | تواصل معنا | Phone, WhatsApp, commercial registry, order form |

## Brand facts used

- Founded **1986**, slogan **Light & Diet / لحياة صحية**
- Products: whole-wheat with bran, oat, barley with quinoa & chia seeds
- Health claims: rich in fiber, no added sugar, free from GMOs & artificial colors
- Phone: `+963994744045`, `+963947698513` — Commercial Registry: `14746`

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing content

All text lives in [`src/context/translations.js`](src/context/translations.js) — edit the
`ar` and `en` objects to change copy, and `contactInfo` for phone numbers / registry.
Images are in [`public/images/`](public/images/).

## Structure

```
index.html                 main site entry
qr.html                    standalone QR "connect card" entry
src/
  main.jsx                 app entry
  App.jsx                  section composition
  index.css                all styles (RTL-first, responsive)
  utils/asset.js           base-aware public asset paths (for GitHub Pages)
  context/
    LanguageContext.jsx    language state, direction, persistence
    translations.js        AR/EN copy + contactInfo (phones, email, registries, links)
  components/
    Navbar, Hero, About, Products, Features, Gallery, Contact, Footer, Logo
  qr/
    QrPage.jsx             QR connect card (website + FB + WhatsApp + email)
    qr.css                 QR page styles (print-friendly)
    main.jsx               QR page entry
```

## Contact form (no backend)

The form posts to **[FormSubmit](https://formsubmit.co)** via its AJAX endpoint — free,
unlimited, no account. Submissions arrive as **email**.

- Destination address: `contactInfo.formEmail` in [`src/context/translations.js`](src/context/translations.js).
- **First submission** triggers a one-time confirmation email from FormSubmit — click the
  link in it once to activate delivery. After that, all submissions are emailed automatically.
- A WhatsApp order button is also provided as a second channel.

## QR connect card — `/qr.html`

A standalone, print-friendly page at `…/qr.html` with QR codes for the website (center,
with the logo embedded — this one opens the `/qr` page itself, ideal to print on packaging),
plus Facebook, WhatsApp and email, and the website URL at the bottom. Linked from the site footer.

## Deploying to GitHub Pages

A workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
deploys automatically on every push to `main`.

1. Create a GitHub repo and push this project.
2. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Push to `main`. The site publishes at `https://<user>.github.io/<repo>/`
   and the QR card at `https://<user>.github.io/<repo>/qr.html`.

`vite.config.js` uses `base: './'` (relative paths), so it works at any sub-path **and** on a
custom domain (`www.surur-bakeries.com`) with no changes. For a custom domain, add a `CNAME`
file in `public/` containing the domain, and configure it under Settings → Pages.
# Surur-bakeries
