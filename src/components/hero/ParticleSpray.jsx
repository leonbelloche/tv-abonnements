import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WATER_COLOR = new THREE.Color('#eaf4ff')
const FIRE_COLOR_HOT = new THREE.Color('#ffb347')
const FIRE_COLOR_COOL = new THREE.Color('#7a1810')
// Couleur de travail réutilisée à chaque particule/frame pour éviter de
// recréer un objet THREE.Color à chaque itération (coût GC inutile).
const tmpColor = new THREE.Color()

/**
 * Système de particules "eau" ou "feu", en boucle continue.
 *
 * Principe : on ne recrée jamais les particules à chaque frame. On garde
 * un tableau JS `state` avec la position/vitesse/âge de chaque particule,
 * et à chaque frame (useFrame) on avance leur physique simple (vitesse +
 * gravité) puis on réécrit les Float32Array de position/couleur du
 * <bufferGeometry>. Quand une particule dépasse sa durée de vie, on la
 * relance depuis l'origine : ça donne une boucle infinie sans jamais
 * allouer de nouvelles particules.
 *
 * Le "fondu" (fade) est obtenu en assombrissant la couleur vers le noir
 * au fil de l'âge de la particule, combiné à un rendu en additive
 * blending sur fond sombre : une couleur noire additionnée au fond ne
 * change rien, donc la particule semble disparaître progressivement,
 * sans avoir besoin de gérer une opacité par-sommet (non supportée
 * nativement par PointsMaterial).
 */
export default function ParticleSpray({ origin = [0, 0, 0], type = 'water', count = 120 }) {
  const pointsRef = useRef()
  const isFire = type === 'fire'

  const particles = useMemo(() => {
    const makeParticle = () => {
      const angle = Math.random() * Math.PI * 2
      const life = isFire ? 0.9 + Math.random() * 0.6 : 0.7 + Math.random() * 0.5
      const spreadRadius = Math.random() * (isFire ? 0.12 : 0.35)
      return {
        pos: new THREE.Vector3(
          Math.cos(angle) * spreadRadius,
          -Math.random() * (isFire ? 0.15 : 0.3),
          Math.sin(angle) * spreadRadius,
        ),
        vel: new THREE.Vector3(
          Math.cos(angle) * (isFire ? 0.15 : 0.55) * (0.4 + Math.random() * 0.6),
          isFire ? 0.55 + Math.random() * 0.4 : -0.7 - Math.random() * 0.7,
          Math.sin(angle) * (isFire ? 0.15 : 0.55) * (0.4 + Math.random() * 0.6),
        ),
        age: Math.random() * life, // désynchronise le départ de chaque particule
        life,
      }
    }

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const state = Array.from({ length: count }, () => makeParticle())

    state.forEach((p, i) => {
      positions[i * 3] = origin[0] + p.pos.x
      positions[i * 3 + 1] = origin[1] + p.pos.y
      positions[i * 3 + 2] = origin[2] + p.pos.z
    })

    return { positions, colors, state, makeParticle }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- origin est une constante importée, référence stable
  }, [count, isFire])

  useFrame((_, delta) => {
    const geometry = pointsRef.current?.geometry
    if (!geometry) return

    const { positions, colors, state, makeParticle } = particles

    for (let i = 0; i < count; i++) {
      let p = state[i]
      p.age += delta

      if (p.age >= p.life) {
        p = makeParticle()
        state[i] = p
      } else {
        p.pos.addScaledVector(p.vel, delta)
        // Gravité pour l'eau (retombe), légère poussée ascendante pour le
        // feu (les flammes montent avant de s'éteindre au contact de l'eau).
        p.vel.y += (isFire ? 0.18 : -1.1) * delta
      }

      const t = p.age / p.life
      const fade = 1 - t

      positions[i * 3] = origin[0] + p.pos.x
      positions[i * 3 + 1] = origin[1] + p.pos.y
      positions[i * 3 + 2] = origin[2] + p.pos.z

      if (isFire) {
        tmpColor.copy(FIRE_COLOR_HOT).lerp(FIRE_COLOR_COOL, t)
      } else {
        tmpColor.copy(WATER_COLOR)
      }
      colors[i * 3] = tmpColor.r * fade
      colors[i * 3 + 1] = tmpColor.g * fade
      colors[i * 3 + 2] = tmpColor.b * fade
    }

    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} usage={THREE.DynamicDrawUsage} />
      </bufferGeometry>
      <pointsMaterial
        size={isFire ? 0.06 : 0.035}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}
