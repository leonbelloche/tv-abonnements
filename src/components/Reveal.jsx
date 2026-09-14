import { motion } from 'framer-motion'
import { useMotionPreset } from '../hooks/useMotionPreset'

/**
 * Bloc générique "fondu + translation à l'entrée dans le viewport",
 * réutilisé par toutes les sections du site. `whileInView` déclenche
 * l'animation dès que l'élément entre dans l'écran ; `viewport={{ once:
 * true }}` fait que ça ne se joue qu'une fois (pas à chaque scroll
 * up/down), pour un rendu plus sobre.
 */
export function Reveal({ as = 'div', className, children, variant = 'up', ...props }) {
  const Comp = motion[as]
  const { fadeInUp, fadeIn, scaleIn } = useMotionPreset()
  const variants = variant === 'fade' ? fadeIn : variant === 'scale' ? scaleIn : fadeInUp

  return (
    <Comp
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}

/**
 * Conteneur qui fait apparaître ses enfants en cascade (chaque enfant
 * décalé de `stagger` secondes par rapport au précédent) une fois que le
 * conteneur entre dans le viewport. Les enfants directs doivent être des
 * <Reveal> ou des motion.* utilisant les variants hidden/visible.
 */
export function RevealGroup({ as = 'div', className, children, stagger = 0.12, delay = 0 }) {
  const Comp = motion[as]
  const { staggerContainer } = useMotionPreset()

  return (
    <Comp
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </Comp>
  )
}
