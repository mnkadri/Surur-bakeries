import { useLang } from '../context/LanguageContext'
import { contactInfo } from '../context/translations'
import { LogoMark } from './Logo'

export default function Footer() {
  const { t, lang } = useLang()

  const links = [
    ['#about', t.nav.about],
    ['#products', t.nav.products],
    ['#features', t.nav.features],
    ['#gallery', t.nav.gallery],
    ['#contact', t.nav.contact],
  ]

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <LogoMark size={48} />
            <div>
              <strong>{lang === 'ar' ? 'مخابز سرور' : 'Surur Bakeries'}</strong>
              <span>Light &amp; Diet · {t.footer.slogan}</span>
            </div>
          </div>
          <p>{t.footer.about}</p>
        </div>

        <div className="footer__col">
          <h4>{t.footer.links}</h4>
          <ul>
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>{t.footer.contact}</h4>
          <ul className="footer__contact">
            <li dir="ltr">
              <a href={`tel:${contactInfo.phone1}`}>{contactInfo.phone1}</a>
            </li>
            <li dir="ltr">
              <a href={`tel:${contactInfo.phone2}`}>{contactInfo.phone2}</a>
            </li>
            <li dir="ltr">
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
            <li dir="ltr">
              <a href={contactInfo.website} target="_blank" rel="noreferrer">
                {contactInfo.websiteLabel}
              </a>
            </li>
            <li>
              {t.contact.commercialRegistryLabel}: <span dir="ltr">{contactInfo.commercialRegistry}</span>
            </li>
            <li>
              {t.contact.industrialRegistryLabel}: <span dir="ltr">{contactInfo.industrialRegistry}</span>
            </li>
          </ul>
          <div className="footer__social">
            <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
            <a href={contactInfo.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a href={`mailto:${contactInfo.email}`} aria-label="Email">✉</a>
            <a href="./qr.html" aria-label="QR" title="QR">▦</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          © {new Date().getFullYear()} {lang === 'ar' ? 'مخابز سرور' : 'Surur Bakeries'} — {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
