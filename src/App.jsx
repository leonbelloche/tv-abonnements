import ScrollProgress from './components/ScrollProgress'
import Header from './components/Header'
import Hero from './components/Hero'
import SectionTitle from './components/SectionTitle'
import SavoirFaire from './components/SavoirFaire'
import StatsCounter from './components/StatsCounter'
import Testimonial from './components/Testimonial'
import ServiceArea from './components/ServiceArea'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

/**
 * Page unique (one-page) du site BTPI : chaque section est un composant
 * dédié dans src/components/, assemblé ici dans l'ordre demandé par le
 * brief. ScrollProgress, Header et ScrollToTop sont "globaux" (fixed) et
 * rendus une fois, en dehors du flux normal des sections.
 */
function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <SectionTitle />
        <SavoirFaire />
        <StatsCounter />
        <Testimonial />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
