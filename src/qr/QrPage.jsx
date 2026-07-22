import { QRCodeSVG } from 'qrcode.react'
import { contactInfo } from '../context/translations'
import { LogoMark } from '../components/Logo'

const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}`
const emailUrl = `mailto:${contactInfo.email}`

// The center QR opens the /qr connect page (this hub) — print it on packaging.
const qrPageUrl = `${contactInfo.website.replace(/\/$/, '')}/qr.html`

// Clean, self-contained logo mark embedded in the middle of the center QR
// (hardcoded colors so it renders inside a data URI, no CSS variables).
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="31" fill="#ffffff"/>
  <circle cx="32" cy="32" r="27" fill="#c8102e" stroke="#e6b24a" stroke-width="3"/>
  <path d="M25 45V32l7-6 7 6v13z" fill="#fff"/>
  <rect x="30" y="38" width="4" height="7" fill="#c8102e"/>
  <g stroke="#fff" stroke-width="3" stroke-linecap="round">
    <line x1="32" y1="26" x2="20" y2="14"/>
    <line x1="32" y1="26" x2="44" y2="14"/>
    <line x1="32" y1="26" x2="20" y2="38"/>
    <line x1="32" y1="26" x2="44" y2="38"/>
  </g>
</svg>`
const logoDataUri = `data:image/svg+xml,${encodeURIComponent(logoSvg)}`

const around = [
  {
    key: 'facebook',
    value: contactInfo.facebook,
    icon: 'f',
    ar: 'فيسبوك',
    en: 'Facebook',
    sub: 'مخابز سرور',
    color: '#1877f2',
  },
  {
    key: 'whatsapp',
    value: whatsappUrl,
    icon: '💬',
    ar: 'واتساب',
    en: 'WhatsApp',
    sub: contactInfo.phone1,
    color: '#25d366',
  },
  {
    key: 'email',
    value: emailUrl,
    icon: '✉',
    ar: 'البريد الإلكتروني',
    en: 'Email',
    sub: contactInfo.email,
    color: 'var(--red)',
  },
]

export default function QrPage() {
  return (
    <div className="qr-page">
      <div className="qr-card">
        <header className="qr-head">
          <LogoMark size={64} />
          <div className="qr-head__text">
            <h1>مخابز سرور · Surur Bakeries</h1>
            <p>Light &amp; Diet · لحياة صحية · Since 1986</p>
          </div>
        </header>

        <p className="qr-lead">
          امسح الرمز للتواصل معنا ومتابعتنا
          <span>Scan to connect &amp; follow us</span>
        </p>

        {/* Center: master QR — opens the /qr connect page, logo in the middle */}
        <div className="qr-center">
          <div className="qr-center__frame">
            <QRCodeSVG
              value={qrPageUrl}
              size={220}
              level="H"
              bgColor="#ffffff"
              fgColor="#3a1f12"
              marginSize={1}
              imageSettings={{
                src: logoDataUri,
                height: 52,
                width: 52,
                excavate: true,
              }}
            />
          </div>
          <div className="qr-center__label">
            <strong>صفحة الروابط</strong>
            <span>Our Links Page</span>
          </div>
        </div>

        {/* Around: social / contact QRs */}
        <div className="qr-grid">
          {around.map((q) => (
            <a key={q.key} className="qr-item" href={q.value} target="_blank" rel="noreferrer">
              <span className="qr-item__icon" style={{ background: q.color }}>
                {q.icon}
              </span>
              <div className="qr-item__frame">
                <QRCodeSVG
                  value={q.value}
                  size={128}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#3a1f12"
                  marginSize={1}
                />
              </div>
              <div className="qr-item__label">
                <strong>
                  {q.ar} · {q.en}
                </strong>
                <span dir="ltr">{q.sub}</span>
              </div>
            </a>
          ))}
        </div>

        <footer className="qr-foot">
          <div className="qr-foot__regs">
            <span>السجل التجاري (س.ت): {contactInfo.commercialRegistry}</span>
            <span>السجل الصناعي (س.ص): {contactInfo.industrialRegistry}</span>
          </div>
          <a className="qr-foot__web" href={contactInfo.website} target="_blank" rel="noreferrer">
            {contactInfo.websiteLabel}
          </a>
        </footer>
      </div>
    </div>
  )
}
