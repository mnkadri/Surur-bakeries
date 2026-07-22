import { useLang } from '../context/LanguageContext'
import { asset } from '../utils/asset'

export default function About() {
  const { t } = useLang()

  const values = [
    { icon: '🏆', t: t.about.v1t, d: t.about.v1d },
    { icon: '🌱', t: t.about.v2t, d: t.about.v2d },
    { icon: '❤️', t: t.about.v3t, d: t.about.v3d },
  ]

  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__media">
          <img src={asset('/images/lifestyle-table.jpeg')} alt={t.about.title} loading="lazy" />
          <div className="about__since">
            <strong>1986</strong>
            <span>{t.hero.badge}</span>
          </div>
        </div>

        <div className="about__content">
          <span className="tag">{t.about.tag}</span>
          <h2 className="section__title">{t.about.title}</h2>
          <p className="about__lead">{t.about.lead}</p>
          <p className="about__intro">{t.about.intro}</p>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>

          <div className="values">
            {values.map((v) => (
              <div key={v.t} className="value">
                <span className="value__icon">{v.icon}</span>
                <div>
                  <h4>{v.t}</h4>
                  <p>{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
