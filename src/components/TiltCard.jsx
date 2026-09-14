import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Carte avec un léger effet de bascule 3D (tilt) au survol : la carte
 * s'incline selon la position du curseur à l'intérieur de ses limites,
 * comme si elle pivotait autour de son centre vers la souris.
 *
 * Fonctionnement :
 * - onMouseMove calcule la position du curseur en pourcentage (0 à 1)
 *   à l'intérieur du rectangle de la carte (getBoundingClientRect).
 * - On mappe ce pourcentage (via useTransform) sur un angle de rotation :
 *   bord gauche/droit -> légère rotation autour de l'axe Y, bord haut/bas
 *   -> légère rotation autour de l'axe X.
 * - useSpring adoucit le mouvement pour un rendu naturel plutôt que
 *   saccadé, et ramène la carte à plat (onMouseLeave) en douceur.
 */
export default function TiltCard({ children, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const springConfig = { stiffness: 200, damping: 20 }
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), springConfig)

  const handleMouseMove = (e) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
