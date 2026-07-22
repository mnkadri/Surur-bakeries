import { useLang } from '../context/LanguageContext'
import { asset } from '../utils/asset'

const images = [
  { src: '/images/lifestyle-fitness.jpeg', span: 'wide' },
  { src: '/images/lifestyle-eid.jpeg', span: 'tall' },
  { src: '/images/product-shaeer-pack.jpeg', span: '' },
  { src: '/images/hero-packs.jpeg', span: '' },
  { src: '/images/lifestyle-table.jpeg', span: 'wide' },
]

export default function Gallery() {
  const { t } = useLang()

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <div className="section__head">
          <span className="tag">{t.gallery.tag}</span>
          <h2 className="section__title">{t.gallery.title}</h2>
          <p className="section__subtitle">{t.gallery.subtitle}</p>
        </div>

        <div className="gallery__grid">
          {images.map((img, i) => (
            <figure key={i} className={`gallery__item gallery__item--${img.span || 'reg'}`}>
              <img src={asset(img.src)} alt={`${t.footer.slogan} ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
