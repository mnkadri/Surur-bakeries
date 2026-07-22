import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Features from './components/Features'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLang } from './context/LanguageContext'

export default function App() {
  const { lang } = useLang()
  // key forces a subtle remount so fonts/direction settle cleanly on toggle
  return (
    <div className="app" key={lang}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Features />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
