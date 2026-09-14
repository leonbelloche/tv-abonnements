import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import SprinklerModel from './SprinklerModel'
import ParticleSpray from './ParticleSpray'
import FlameLight from './FlameLight'
import CameraRig from './CameraRig'
import { DEFLECTOR_POSITION } from './constants'
import { useIsMobile } from '../../hooks/useIsMobile'

const FIRE_ORIGIN = [DEFLECTOR_POSITION[0], DEFLECTOR_POSITION[1] - 0.5, DEFLECTOR_POSITION[2]]

/**
 * Scène 3D du hero : le tuyau + tête de sprinkler (SprinklerModel), les
 * deux jets de particules (eau depuis le déflecteur, flammes en dessous),
 * l'éclairage et l'environnement de reflets.
 *
 * `scrollRef` est un objet mutable ({ current: 0..1 }) mis à jour par le
 * composant Hero parent pendant le scroll, sans jamais faire re-render
 * cet arbre React — seule la boucle useFrame de CameraRig le lit, à 60fps,
 * ce qui est beaucoup plus performant qu'un state React remonté à chaque
 * pixel de scroll.
 */
export default function HeroScene({ scrollRef }) {
  const rigRef = useRef()
  const isMobile = useIsMobile()

  const waterCount = isMobile ? 45 : 130
  const fireCount = isMobile ? 25 : 70

  return (
    <Canvas
      shadows
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{ position: [0.5, 0.3, 5.4], fov: 42 }}
      gl={{ antialias: true }}
    >
      {/* Éclairage à trois points, classique pour bien détacher le sujet
          d'un fond sombre : key (forte, projette les ombres), fill
          (douce, comble les zones noires), rim (par derrière, dessine un
          contour lumineux qui sépare le sujet du fond). */}
      <directionalLight
        position={[3, 4, 3]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-3, 1, 2]} intensity={0.5} />
      <directionalLight position={[-1, 2, -4]} intensity={0.8} color="#8fb8ff" />
      <ambientLight intensity={0.15} />

      <FlameLight position={FIRE_ORIGIN} />

      <group ref={rigRef} rotation={[0, 0, Math.PI / 5]} position={[0.4, 0.6, 0]}>
        <SprinklerModel />
        <ParticleSpray type="water" origin={DEFLECTOR_POSITION} count={waterCount} />
        <ParticleSpray type="fire" origin={FIRE_ORIGIN} count={fireCount} />
      </group>

      <CameraRig rigRef={rigRef} scrollRef={scrollRef} />

      {!isMobile && (
        <ContactShadows position={[0, -1.9, 0]} opacity={0.5} scale={6} blur={2.6} far={2.5} color="#000000" />
      )}

      <Suspense fallback={null}>
        {/* Environnement "synthétique" : plutôt que de charger une image
            HDR externe (dépendance réseau en plus, temps de chargement),
            on compose l'environnement avec des Lightformer — des plans
            lumineux virtuels que seuls les reflets des matériaux
            métalliques peuvent voir. Rapide, léger, et suffisant pour
            des reflets crédibles sur la tête du sprinkler. */}
        <Environment resolution={128}>
          <Lightformer intensity={2} color="#ffffff" position={[0, 4, 0]} scale={[6, 6, 1]} rotation={[Math.PI / 2, 0, 0]} />
          <Lightformer intensity={1.2} color="#ff8a4a" position={[2, -1, 2]} scale={[2, 2, 1]} />
          <Lightformer intensity={1} color="#6fa8ff" position={[-3, 1, -2]} scale={[3, 3, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  )
}
