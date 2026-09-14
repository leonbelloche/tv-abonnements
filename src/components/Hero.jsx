import { lazy, Suspense, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useMotionPreset } from '../hooks/useMotionPreset'

// La scène 3D (three.js + React Three Fiber) pèse plusieurs centaines de
// Ko. On la charge en asynchrone avec React.lazy : elle part dans son
// propre fichier JS, téléchargé seulement quand ce composant est monté,
// pendant que StaticHeroVisual (léger, en CSS pur) s'affiche à sa place.
const HeroScene = lazy(() => import('./hero/HeroScene'))

/**
 * Remplacement statique de la scène 3D pour les personnes ayant activé
 * "réduire les animations" sur leur système (prefers-reduced-motion).
 * Purement décoratif (aria-hidden) : aucune information n'y est encodée
 * uniquement visuellement.
 */
function StaticHeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute top-1/2 left-1/2 h-[3px] w-[70%] -translate-x-1/2 -translate-y-1/2 rotate-[26deg] rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, #d5271f, #d5271f)' }}
      />
      <div className="absolute top-[38%] left-[62%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fire/25 blur-2xl" />
      <div className="absolute top-[46%] left-[64%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-xl" />
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(0)
  const reduce = useReducedMotion()
  const { fadeInUp, staggerContainer } = useMotionPreset()

  // On suit le scroll relatif à CETTE section (de son entrée en haut du
  // viewport à sa sortie) et on écrit la valeur dans scrollRef.current,
  // lue à chaque frame par CameraRig à l'intérieur du Canvas. Passer par
  // un ref plutôt qu'un useState évite de re-render tout l'arbre React
  // (et donc de recréer la scène 3D) à chaque pixel de scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    scrollRef.current = latest
  })

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-ink via-ink to-anthracite"
    >
      <div className="absolute inset-0">
        {reduce ? (
          <StaticHeroVisual />
        ) : (
          <Suspense fallback={<StaticHeroVisual />}>
            <HeroScene scrollRef={scrollRef} />
          </Suspense>
        )}
      </div>

      {/* Dégradé bas pour garantir la lisibilité du texte et amorcer la
          transition visuelle vers la section suivante. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-fire"
        >
          Tuyauterie industrielle · Protection incendie
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="glow-text max-w-2xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-offwhite sm:text-6xl lg:text-7xl"
        >
          Nous protégeons ce qui compte, à chaque installation.
        </motion.h1>

        <motion.p variants={fadeInUp} className="mt-6 max-w-lg text-lg text-offwhite/70">
          BTPI installe et entretient vos structures métalliques et réseaux
          de tuyauterie, avec une expertise spécialisée en protection
          incendie industrielle. Depuis 2002, à Norroy-lès-Pont-à-Mousson.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center rounded-sm bg-fire px-7 py-3.5 text-sm font-semibold text-offwhite transition-colors hover:bg-fire-light"
          >
            Demander un devis
          </a>
          <a
            href="#savoir-faire"
            className="inline-flex items-center rounded-sm border border-white/20 px-7 py-3.5 text-sm font-semibold text-offwhite/90 transition-colors hover:border-white/40"
          >
            Notre savoir-faire
          </a>
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll, discret, en bas de l'écran */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-offwhite/40 sm:block"
        aria-hidden="true"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-offwhite/30 p-1"
        >
          <div className="h-1.5 w-1 rounded-full bg-offwhite/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
