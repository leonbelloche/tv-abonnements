import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Barre de progression de scroll, fixée en haut de l'écran.
 *
 * useScroll() sans argument suit le scroll de toute la page (0 = en haut,
 * 1 = tout en bas). useSpring() "adoucit" cette valeur avec une physique
 * de ressort pour éviter un mouvement saccadé. On applique ensuite la
 * valeur obtenue à scaleX : la barre, ancrée à gauche (origin-left),
 * s'étire donc de 0 à 100% de large au fil du scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-fire z-[60]"
      aria-hidden="true"
    />
  )
}
