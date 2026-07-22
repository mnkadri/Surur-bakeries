import { useLang } from '../context/LanguageContext'
import { asset } from '../utils/asset'

const accent = {
  asmar: 'var(--brown)',
  shoufan: 'var(--green)',
  shaeer: 'var(--gold-deep)',
}

export default function Products() {
  const { t } = useLang()

  return (
    <section id="products" className="section products">
      <div className="container">
        <div className="section__head">
          <span className="tag">{t.products.tag}</span>
          <h2 className="section__title">{t.products.title}</h2>
          <p className="section__subtitle">{t.products.subtitle}</p>
        </div>

        <div className="products__grid">
          {t.products.items.map((p) => (
            <article
              key={p.key}
              className="product-card"
              style={{ '--accent': accent[p.key] }}
            >
              <div className="product-card__media">
                <img src={asset(p.img)} alt={p.name} loading="lazy" />
                <span className="product-card__pill">Light &amp; Diet</span>
              </div>
              <div className="product-card__body">
                <h3 className="product-card__name">{p.name}</h3>
                <p className="product-card__sub">{p.sub}</p>
                <p className="product-card__desc">{p.desc}</p>
                <div className="product-card__tags">
                  <span>🌾 {t.products.tagFiber}</span>
                  <span>🚫 {t.products.tagSugar}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
