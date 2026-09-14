import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Lumière ponctuelle chaude près des flammes, avec un léger scintillement
 * (mélange de deux sinusoïdes de fréquences différentes + un peu de
 * hasard) pour évoquer le tremblement d'une flamme réelle.
 */
export default function FlameLight({ position }) {
  const lightRef = useRef()
  const t0 = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    t0.current += delta
    const flicker =
      Math.sin(t0.current * 8) * 0.15 +
      Math.sin(t0.current * 17) * 0.08 +
      (Math.random() - 0.5) * 0.1
    if (lightRef.current) {
      lightRef.current.intensity = 2.4 + flicker
    }
  })

  return <pointLight ref={lightRef} position={position} color="#ff7a33" intensity={2.4} distance={2.5} decay={2} />
}
