import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { useMotionPreset } from '../hooks/useMotionPreset'

/**
 * Représentation schématique (non cartographique) de la zone
 * d'intervention : des cercles concentriques qui pulsent doucement
 * autour du point BTPI, avec les deux villes citées positionnées de
 * façon indicative. Ce n'est pas une carte géographique précise — pour
 * une vraie carte, remplacer par un plugin de carte (ex: Leaflet) une
 * fois les coordonnées exactes du siège disponibles.
 */
function CoverageRadar({ reduce }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-fire/30"
          animate={
            reduce
              ? {}
              : { scale: [0.5, 1.15], opacity: [0.6, 0] }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: 'easeOut',
          }}
        />
      ))}
      <div className="absolute inset-[15%] rounded-full border border-white/10" />
      <div className="absolute inset-[35%] rounded-full border border-white/10" />

      <div className="absolute left-1/2 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fire">
        <span className="h-1.5 w-1.5 rounded-full bg-offwhite" />
      </div>
      <span className="absolute left-1/2 top-[56%] -translate-x-1/2 text-xs font-semibold uppercase tracking-wide text-offwhite/70">
        BTPI
      </span>

      <span className="absolute left-[14%] top-[22%] text-sm font-semibold text-offwhite/90">Nancy</span>
      <span className="absolute right-[6%] bottom-[10%] text-sm font-semibold text-offwhite/90">Pont-à-Mousson</span>
    </div>
  )
}

export default function ServiceArea() {
  const { fadeInUp, reduce } = useMotionPreset()

  return (
    <section id="zone" className="bg-anthracite py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-fire">
            Zone d'intervention
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
            À proximité, disponibles rapidement.
          </h2>
          <p className="mt-6 max-w-md text-lg text-offwhite/65">
            BTPI intervient à Nancy, à Pont-à-Mousson et dans les environs,
            depuis son site de Norroy-lès-Pont-à-Mousson (54700).
          </p>
          <motion.p variants={fadeInUp} className="mt-8 text-sm text-offwhite/50">
            15 Clos de Baine, 54700 Norroy-lès-Pont-à-Mousson
          </motion.p>
        </Reveal>

        <Reveal variant="scale">
          <CoverageRadar reduce={reduce} />
        </Reveal>
      </div>
    </section>
  )
}
