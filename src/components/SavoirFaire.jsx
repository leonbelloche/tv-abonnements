import { motion } from 'framer-motion'
import { Reveal, RevealGroup } from './Reveal'
import TiltCard from './TiltCard'
import PipeIllustration from './PipeIllustration'
import { useMotionPreset } from '../hooks/useMotionPreset'

const SPEC_CARDS = [
  {
    title: 'Tuyauterie industrielle',
    detail: 'Conception, pose et raccordement de réseaux de tuyauterie pour sites industriels.',
  },
  {
    title: 'Structures métalliques',
    detail: 'Installation et maintenance de structures métalliques, en atelier comme sur site.',
  },
  {
    title: 'Protection incendie',
    detail: 'Spécialisation en systèmes de protection incendie industrielle, de la pose au suivi.',
  },
]

const SECTEURS = [
  'Industrie manufacturière',
  'Agroalimentaire',
  'Logistique & entrepôts',
  'Chimie & process industriels',
  'Bâtiments tertiaires & collectivités',
]

/**
 * Section "savoir-faire" : alternance claire/studio. Un visuel produit en
 * gros plan à gauche avec des fiches techniques flottantes qui
 * apparaissent au scroll, une barre latérale listant les secteurs
 * d'intervention à droite.
 */
export default function SavoirFaire() {
  const { fadeInUp } = useMotionPreset()

  return (
    <section id="savoir-faire" className="relative bg-offwhite py-28 text-anthracite">
      <div className="industrial-grid absolute inset-0 opacity-[0.4]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-fire">
            Notre savoir-faire
          </span>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Une expertise technique, de la conception à la maintenance.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.7fr_0.6fr]">
          {/* Visuel produit + fiches flottantes */}
          <div className="relative">
            <Reveal variant="scale" className="mx-auto aspect-square w-full max-w-md">
              <PipeIllustration />
            </Reveal>

            {/* Fiches techniques flottantes, superposées au visuel,
                chacune apparaît en fondu/glissement quand elle entre
                dans le viewport (Reveal = whileInView), avec un léger
                décalage pour un effet de cascade naturel. */}
            <div className="pointer-events-none absolute inset-0 hidden sm:block">
              {SPEC_CARDS.slice(0, 2).map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.15 * i }}
                  className={`pointer-events-auto absolute w-52 rounded-sm border border-black/5 bg-white/95 p-4 shadow-xl shadow-black/10 backdrop-blur ${
                    i === 0 ? '-left-6 top-4' : '-right-4 bottom-10'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-fire">{card.title}</p>
                  <p className="mt-1.5 text-sm text-anthracite/70">{card.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Troisième fiche + description, sous forme de carte avec tilt 3D */}
          <RevealGroup className="flex flex-col gap-5">
            {SPEC_CARDS.slice(2).map((card) => (
              <TiltCard
                key={card.title}
                className="rounded-sm border border-black/5 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-fire">{card.title}</p>
                <p className="mt-2 text-sm text-anthracite/70">{card.detail}</p>
              </TiltCard>
            ))}
            <TiltCard className="rounded-sm border border-black/5 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-fire">Depuis 2002</p>
              <p className="mt-2 text-sm text-anthracite/70">
                20 ans d'expérience au service des industriels de la région
                nancéienne, basés à Norroy-lès-Pont-à-Mousson.
              </p>
            </TiltCard>
          </RevealGroup>

          {/* Barre latérale : secteurs d'intervention */}
          <Reveal as="aside" className="border-l border-black/10 pl-8">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-anthracite/50">
              Secteurs d'intervention
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {SECTEURS.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-anthracite/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fire" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
