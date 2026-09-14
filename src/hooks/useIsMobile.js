import { useEffect, useState } from 'react'

/**
 * Détecte un écran étroit (mobile/tablette portrait) pour réduire la
 * complexité de la scène 3D (nombre de particules, ombres, résolution)
 * et garder une animation fluide sur les appareils moins puissants.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint,
  )

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const onChange = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [breakpoint])

  return isMobile
}
