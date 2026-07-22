import { useLang } from '../context/LanguageContext'
import { contactInfo } from '../context/translations'
import { asset } from '../utils/asset'

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="badge">
            <span className="badge__dot" /> {t.hero.badge}
          </span>
          <h1 className="hero__title">{t.hero.title}</h1>
          <p className="hero__subtitle">{t.hero.subtitle}</p>

          <div className="hero__cta">
            <a href="#products" className="btn btn--primary">
              {t.hero.ctaProducts}
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
            >
              {t.hero.ctaContact}
            </a>
          </div>

          <div className="hero__stats">
            <div className="stat">
              <span className="stat__num">+38</span>
              <span className="stat__label">{t.hero.stat1}</span>
            </div>
            <div className="stat">
              <span className="stat__num">3</span>
              <span className="stat__label">{t.hero.stat2}</span>
            </div>
            <div className="stat">
              <span className="stat__num">{t.hero.stat3v}</span>
              <span className="stat__label">{t.hero.stat3}</span>
            </div>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__media-glow" aria-hidden="true" />
          <img src={asset('/images/three-packs.jpeg')} alt={t.hero.title} loading="eager" />
          <div className="hero__chip hero__chip--1">🌾 {t.products.tagFiber}</div>
          <div className="hero__chip hero__chip--2">✅ {t.products.tagSugar}</div>
        </div>
      </div>
    </section>
  )
}
