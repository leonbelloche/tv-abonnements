import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#savoir-faire', label: 'Savoir-faire' },
  { href: '#chiffres', label: 'Chiffres clés' },
  { href: '#zone', label: "Zone d'intervention" },
  { href: '#contact', label: 'Contact' },
]

/**
 * Lien de nav avec un soulignement animé au survol.
 *
 * Le <span> qui fait office de trait est caché par défaut (scaleX: 0,
 * origin à gauche) et Framer Motion l'anime jusqu'à scaleX: 1 quand le
 * <motion.a> parent passe en état "hover" (whileHover propage l'état aux
 * variants des enfants).
 */
function NavLink({ href, label, onClick }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative text-sm font-medium text-offwhite/85 hover:text-offwhite transition-colors"
    >
      {label}
      <motion.span
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ originX: 0 }}
        className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-fire"
      />
    </motion.a>
  )
}

export default function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // useMotionValueEvent écoute un motion value (ici la position de scroll
  // en pixels) sans re-render à chaque pixel : on ne déclenche un
  // setState que quand on franchit le seuil de 24px.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  return (
    <motion.header
      animate={{
        paddingTop: scrolled ? 12 : 24,
        paddingBottom: scrolled ? 12 : 24,
        boxShadow: scrolled
          ? '0 8px 24px -12px rgba(0,0,0,0.6)'
          : '0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-ink/90 backdrop-blur-md border-b border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#hero" className="font-display font-extrabold tracking-tight text-lg text-offwhite">
          BTPI
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center rounded-sm bg-fire px-5 py-2.5 text-sm font-semibold text-offwhite hover:bg-fire-light transition-colors"
          >
            Nous contacter
          </a>
        </div>

        {/* Bouton menu mobile */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden text-offwhite p-2 -mr-2"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              className="h-[2px] w-full bg-offwhite origin-center"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="h-[2px] w-full bg-offwhite"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              className="h-[2px] w-full bg-offwhite origin-center"
            />
          </div>
        </button>
      </div>

      {/* Panneau mobile : AnimatePresence permet d'animer la sortie du
          composant (exit) quand mobileOpen repasse à false, ce que React
          seul ne sait pas faire (il démonterait le noeud instantanément). */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-white/5 mt-4"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-offwhite/85"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-sm bg-fire px-5 py-3 text-sm font-semibold text-offwhite"
              >
                Nous contacter
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
