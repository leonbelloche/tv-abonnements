import { useMemo } from 'react'
import { DEFLECTOR_POSITION } from './constants'

/**
 * Le modèle 3D du sprinkler : un tuyau rouge en diagonale relié à une
 * tête de sprinkler détaillée. La tête n'est pas une forme unique, mais
 * l'assemblage de plusieurs primitives three.js (cylindres, cône, boîtes)
 * pour évoquer un vrai sprinkler industriel de type "pendant" :
 *
 *        corps fileté (cylindre)
 *              |
 *          écrou hexagonal (cylindre à 6 faces)
 *              |
 *            buse (cône)
 *           /      \
 *      bras du déflecteur (2 boîtes fines)
 *           \      /
 *        plaque déflecteur (disque)   <- l'eau frappe ici et se disperse
 *
 * Tous les matériaux sont créés une seule fois via useMemo pour éviter
 * de recréer des objets three.js à chaque re-render de React.
 *
 * Ce composant ne porte aucune transformation globale : c'est le groupe
 * parent (le "rig") dans HeroScene qui positionne et incline l'ensemble
 * diagonalement, afin que les systèmes de particules (dans le même
 * groupe, voir ParticleSpray) restent parfaitement alignés avec la tête
 * du sprinkler.
 */
export default function SprinklerModel() {
  const materials = useMemo(
    () => ({
      // Le tuyau : rouge satiné avec un léger vernis (clearcoat) pour un
      // reflet net en surface, comme une peinture industrielle de qualité.
      pipe: {
        color: '#c22420',
        metalness: 0.35,
        roughness: 0.45,
        clearcoat: 0.6,
        clearcoatRoughness: 0.25,
      },
      // Les pièces métalliques : très métalliques, assez lisses pour
      // capter les reflets de l'environnement (drei <Environment>).
      metal: {
        color: '#c7ccd1',
        metalness: 0.9,
        roughness: 0.25,
      },
      metalDark: {
        color: '#8b9197',
        metalness: 0.9,
        roughness: 0.35,
      },
    }),
    [],
  )

  return (
    <group>
      {/* Tuyau diagonal */}
      <mesh position={[-1.6, 0.9, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 2.6, 24]} />
        <meshPhysicalMaterial {...materials.pipe} />
      </mesh>

      {/* Raccord entre le tuyau et la tête */}
      <mesh position={[0, -0.02, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.16, 24]} />
        <meshStandardMaterial {...materials.metalDark} />
      </mesh>

      {/* Corps fileté vertical descendant vers la tête */}
      <mesh position={[0, -0.28, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.32, 20]} />
        <meshStandardMaterial {...materials.metal} />
      </mesh>

      {/* Écrou hexagonal : cylindre à 6 segments radiaux = hexagone */}
      <mesh position={[0, -0.46, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.11, 6]} />
        <meshStandardMaterial {...materials.metalDark} />
      </mesh>

      {/* Buse conique */}
      <mesh position={[0, -0.62, 0]} castShadow>
        <coneGeometry args={[0.1, 0.22, 24]} />
        <meshStandardMaterial {...materials.metal} />
      </mesh>

      {/* Bras du déflecteur, inclinés vers l'extérieur */}
      <mesh position={[0.1, -0.84, 0.07]} rotation={[0.15, 0, -0.45]} castShadow>
        <boxGeometry args={[0.03, 0.34, 0.03]} />
        <meshStandardMaterial {...materials.metalDark} />
      </mesh>
      <mesh position={[-0.1, -0.84, -0.07]} rotation={[-0.15, 0, 0.45]} castShadow>
        <boxGeometry args={[0.03, 0.34, 0.03]} />
        <meshStandardMaterial {...materials.metalDark} />
      </mesh>

      {/* Plaque déflecteur : c'est ici que l'eau frappe et se disperse.
          Sa position sert aussi d'origine aux systèmes de particules
          (voir constants.js). */}
      <mesh position={DEFLECTOR_POSITION} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.02, 24]} />
        <meshStandardMaterial {...materials.metal} />
      </mesh>
    </group>
  )
}
