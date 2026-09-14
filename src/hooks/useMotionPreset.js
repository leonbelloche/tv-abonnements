import { useReducedMotion } from 'framer-motion'

/**
 * Fournit un jeu de "variants" Framer Motion réutilisables dans tout le site.
 *
 * Un "variant" est un objet qui décrit un état visuel nommé (ex: "hidden",
 * "visible"). On le passe à un <motion.div variants={...} initial="hidden"
 * animate="visible" /> et Framer Motion anime automatiquement la transition
 * entre les deux états.
 *
 * Si l'utilisateur a activé "réduire les animations" dans son système
 * (prefers-reduced-motion), useReducedMotion() renvoie true : on supprime
 * alors les translations et on garde uniquement un fondu quasi instantané,
 * conformément à l'exigence d'accessibilité du brief.
 */
export function useMotionPreset() {
  const reduce = useReducedMotion()

  const baseTransition = reduce
    ? { duration: 0.15 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }

  const fadeInUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 32 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: baseTransition },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.92 },
    visible: { opacity: 1, scale: 1, transition: baseTransition },
  }

  // staggerContainer n'anime rien lui-même : il décale simplement le
  // déclenchement des animations de ses enfants pour créer un effet de
  // "cascade" (chaque enfant apparaît un peu après le précédent).
  const staggerContainer = (staggerChildren = 0.12, delayChildren = 0) => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : staggerChildren,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  })

  return { reduce, fadeInUp, fadeIn, scaleIn, staggerContainer }
}
