import { RevealGroup } from './Reveal'
import AnimatedCounter from './AnimatedCounter'
import { useMotionPreset } from '../hooks/useMotionPreset'
import { motion } from 'framer-motion'

export default function StatsCounter() {
  const { fadeInUp } = useMotionPreset()

  return (
    <section id="chiffres" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-6">
        <RevealGroup className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <motion.div variants={fadeInUp} className="border-t border-white/10 pt-6">
            <p className="font-display text-5xl font-extrabold text-offwhite sm:text-6xl">
              <AnimatedCounter value={2002} />
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.15em] text-offwhite/50">Année de création</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="border-t border-fire pt-6">
            <p className="font-display text-5xl font-extrabold text-fire sm:text-6xl">
              <AnimatedCounter value={20} suffix="+" />
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.15em] text-offwhite/50">Ans d'expérience</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="border-t border-white/10 pt-6">
            <p className="font-display text-2xl font-extrabold leading-tight text-offwhite sm:text-3xl">
              Nancy · Pont-à-Mousson
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.15em] text-offwhite/50">Zone d'intervention</p>
          </motion.div>
        </RevealGroup>
      </div>
    </section>
  )
}
