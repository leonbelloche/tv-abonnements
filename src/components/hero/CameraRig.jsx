import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Pilote la caméra et le "rig" (le groupe contenant le sprinkler) à
 * chaque frame, dans UNE seule boucle d'animation fluide :
 *
 * 1. Parallax souris : `state.pointer` (fourni par React Three Fiber)
 *    donne la position normalisée du curseur (-1 à 1). On en déduit un
 *    léger décalage de caméra, amorti avec THREE.MathUtils.damp (une
 *    interpolation exponentielle indépendante du framerate — contrairement
 *    à un simple lerp, elle donne le même mouvement à 30 ou 120 fps).
 *
 * 2. Réaction au scroll : `scrollRef.current` (0 → 1) est mis à jour en
 *    dehors du Canvas par le composant Hero (voir hooks framer-motion),
 *    sans jamais provoquer de re-render React. On l'utilise ici pour
 *    faire légèrement tourner et zoomer le rig au fil du scroll.
 */
export default function CameraRig({ rigRef, scrollRef }) {
  const { camera } = useThree()

  useFrame((state, delta) => {
    const scroll = scrollRef.current ?? 0
    const { x, y } = state.pointer

    const targetCamX = x * 0.5
    const targetCamY = 0.3 + -y * 0.25
    const targetCamZ = 5.4 - scroll * 1.1

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 4, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 4, delta)
    camera.lookAt(0, -0.2, 0)

    if (rigRef.current) {
      const targetRotY = scroll * 0.5 + x * 0.08
      const targetRotX = scroll * 0.12
      rigRef.current.rotation.y = THREE.MathUtils.damp(rigRef.current.rotation.y, targetRotY, 3, delta)
      rigRef.current.rotation.x = THREE.MathUtils.damp(rigRef.current.rotation.x, targetRotX, 3, delta)
    }
  })

  return null
}
