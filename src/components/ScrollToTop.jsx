import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion'

/**
 * Bouton "retour en haut" qui n'apparaît qu'après un certain scroll.
 * AnimatePresence gère l'animation de disparition (exit) quand la
 * condition repasse à false — sans elle, le bouton disparaîtrait d'un
 * coup au lieu de s'estomper en douceur.
 */
export default function ScrollToTop() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > window.innerHeight * 0.8)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Retour en haut de la page"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-fire text-offwhite shadow-lg shadow-black/40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
