import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { contactInfo } from '../context/translations'

export default function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    // Honeypot: if a bot fills the hidden field, silently pretend success.
    if (form._honey && form._honey.value) {
      setStatus('sent')
      return
    }

    const payload = {
      name: form.name.value,
      phone: form.phone.value,
      message: form.message.value,
      _subject: 'طلب جديد من موقع مخابز سرور | New order from Surur Bakeries',
      _template: 'table',
      _captcha: 'false',
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contactInfo.formEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      form.reset()
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 6000)
    } catch {
      setStatus('error')
    }
  }

  const cards = [
    {
      icon: '📞',
      label: t.contact.phoneLabel,
      value: (
        <>
          <a href={`tel:${contactInfo.phone1}`} dir="ltr">
            {contactInfo.phone1}
          </a>
          <a href={`tel:${contactInfo.phone2}`} dir="ltr">
            {contactInfo.phone2}
          </a>
        </>
      ),
    },
    {
      icon: '💬',
      label: t.contact.whatsappLabel,
      value: (
        <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noreferrer" dir="ltr">
          {contactInfo.phone1}
        </a>
      ),
    },
    {
      icon: '📧',
      label: t.contact.emailLabel,
      value: (
        <a href={`mailto:${contactInfo.email}`} dir="ltr">
          {contactInfo.email}
        </a>
      ),
    },
    {
      icon: '📋',
      label: t.contact.commercialRegistryLabel,
      value: <span dir="ltr">{contactInfo.commercialRegistry}</span>,
    },
    {
      icon: '🏭',
      label: t.contact.industrialRegistryLabel,
      value: <span dir="ltr">{contactInfo.industrialRegistry}</span>,
    },
    {
      icon: '🕒',
      label: t.contact.hoursLabel,
      value: <span>{t.contact.hoursValue}</span>,
    },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section__head">
          <span className="tag">{t.contact.tag}</span>
          <h2 className="section__title">{t.contact.title}</h2>
          <p className="section__subtitle">{t.contact.subtitle}</p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__cards">
              {cards.map((c) => (
                <div key={c.label} className="contact-card">
                  <span className="contact-card__icon">{c.icon}</span>
                  <div>
                    <span className="contact-card__label">{c.label}</span>
                    <div className="contact-card__value">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn--whatsapp"
            >
              💬 {t.contact.whatsappCta}
            </a>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <label>
              {t.contact.formName}
              <input type="text" name="name" required placeholder="—" />
            </label>
            <label>
              {t.contact.formPhone}
              <input type="tel" name="phone" required placeholder="—" dir="ltr" />
            </label>
            <label>
              {t.contact.formMsg}
              <textarea name="message" rows="4" placeholder="—" />
            </label>
            {/* honeypot — hidden from users, catches bots */}
            <input
              type="text"
              name="_honey"
              tabIndex="-1"
              autoComplete="off"
              style={{ display: 'none' }}
              aria-hidden="true"
            />
            <button
              type="submit"
              className="btn btn--primary btn--block"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t.contact.formSending : t.contact.formSend}
            </button>
            {status === 'sent' && <p className="contact__note">✅ {t.contact.formNote}</p>}
            {status === 'error' && (
              <p className="contact__note contact__note--error">⚠️ {t.contact.formError}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
