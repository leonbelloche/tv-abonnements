import { Reveal } from './Reveal'

/**
 * Section plein écran sombre avec effet Ken Burns (lent zoom + léger
 * déplacement du fond, voir la classe .ken-burns dans index.css).
 *
 * Remarque de contenu : n'ayant pas de témoignage client réel à
 * disposition, cette section porte un engagement/une signature de
 * l'entreprise plutôt qu'une fausse citation attribuée à un client
 * inventé. Dès qu'un vrai témoignage client sera disponible, il suffit
 * de remplacer le texte et d'ajouter le nom/l'entreprise du client sous
 * la citation.
 */
export default function Testimonial() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink py-24">
      <div
        className="ken-burns absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(213,39,31,0.18), transparent 55%), linear-gradient(160deg, #101112 0%, #06070a 60%, #000000 100%)',
        }}
        aria-hidden="true"
      />
      <div className="industrial-grid absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Reveal variant="fade">
          <p className="font-display text-3xl font-bold leading-snug text-offwhite sm:text-4xl lg:text-5xl">
            « On n'installe pas un système de protection incendie pour
            qu'il ait l'air de fonctionner. On l'installe pour qu'il
            fonctionne, le jour où il le faut. »
          </p>
        </Reveal>
        <Reveal variant="fade">
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-fire">
            BTPI — Bellicini Tuyauterie Protection Incendie
          </p>
        </Reveal>
      </div>
    </section>
  )
}
