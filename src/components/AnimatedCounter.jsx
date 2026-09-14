import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * Chiffre qui compte de 0 jusqu'à `value` quand il entre dans le
 * viewport. `animate()` (l'API impérative de Framer Motion, en dehors de
 * tout JSX) anime un simple nombre et appelle `onUpdate` à chaque frame
 * avec la valeur intermédiaire — on s'en sert pour mettre à jour un
 * state React affiché dans le texte (ce que les `motion.*` déclaratifs
 * ne permettent pas directement, puisqu'un contenu texte n'est pas un
 * style animable).
 *
 * Si prefers-reduced-motion est actif, on affiche directement la valeur
 * finale sans décompte animé.
 */
export default function AnimatedCounter({ value, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!isInView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, value, duration, reduce])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
