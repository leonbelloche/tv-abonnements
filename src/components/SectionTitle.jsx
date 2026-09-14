import { Reveal } from './Reveal'

/**
 * Section "titre fort" : un grand titre à effet glitch discret, posé sur
 * un fond industriel sombre à teinte froide.
 *
 * Remplace-image : en l'absence d'une photo industrielle réelle fournie
 * pour ce site, le fond est composé de dégradés CSS (acier + grille fine)
 * plutôt qu'une image générique. Pour brancher une vraie photo plus tard,
 * il suffit de remplacer le <div> de fond par une balise <img> (avec
 * object-cover) et de garder le même calque de dégradé par-dessus pour
 * l'assombrissement + la teinte froide.
 */
export default function SectionTitle() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-anthracite py-24">
      {/* Fond "acier" : dégradés diagonaux + trame fine, assombri, teinte
          froide (bleu-gris) en overlay comme demandé dans le brief. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #23262a 0%, #16181a 45%, #0d1013 100%)',
        }}
        aria-hidden="true"
      />
      <div className="industrial-grid absolute inset-0 opacity-[0.12]" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(20,40,60,0.35), rgba(6,8,10,0.75))' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Reveal>
          <h2
            data-text="20 ans d'exigence, une seule mission : protéger."
            className="glitch-title font-display text-4xl font-extrabold leading-tight tracking-tight text-offwhite sm:text-5xl lg:text-6xl"
          >
            20 ans d'exigence, une seule mission&nbsp;: protéger.
          </h2>
        </Reveal>
        <Reveal variant="fade">
          <p className="mt-6 max-w-2xl text-lg text-offwhite/65">
            Structures métalliques, réseaux de tuyauterie, systèmes de
            protection incendie&nbsp;: chaque intervention BTPI est pensée
            pour durer et pour tenir, le jour où ça compte vraiment.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
