import { useLang } from '../context/LanguageContext'

const icons = ['🌾', '🚫', '🧬', '🌰', '🥗', '⭐']

export default function Features() {
  const { t } = useLang()

  return (
    <section id="features" className="section features">
      <div className="container">
        <div className="section__head">
          <span className="tag tag--light">{t.features.tag}</span>
          <h2 className="section__title section__title--light">{t.features.title}</h2>
        </div>

        <div className="features__grid">
          {t.features.items.map((f, i) => (
            <div key={f.t} className="feature">
              <span className="feature__icon">{icons[i % icons.length]}</span>
              <h4>{f.t}</h4>
              <p>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
