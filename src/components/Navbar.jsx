import { useEffect, useState } from 'react'
import { useLang } from '../context/LanguageContext'
import Logo from './Logo'

export default function Navbar() {
  const { t, toggleLang } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['#home', t.nav.home],
    ['#about', t.nav.about],
    ['#products', t.nav.products],
    ['#features', t.nav.features],
    ['#gallery', t.nav.gallery],
    ['#contact', t.nav.contact],
  ]

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Logo />

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <button className="lang-btn lang-btn--mobile" onClick={toggleLang}>
            {t.switchTo}
          </button>
        </nav>

        <div className="navbar__actions">
          <button className="lang-btn" onClick={toggleLang} aria-label="Switch language">
            <span className="lang-btn__globe" aria-hidden="true">🌐</span>
            {t.switchTo}
          </button>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
