/**
 * Illustration vectorielle stylisée d'un raccord de tuyauterie (bride
 * boulonnée vue de face), utilisée en absence de photographie produit
 * réelle. Purement décorative, donc aria-hidden. Pour remplacer par une
 * vraie photo produit plus tard : substituer ce composant par une balise
 * <img> avec le même ratio, dans SavoirFaire.jsx.
 */
export default function PipeIllustration() {
  const bolts = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    return { x: 150 + Math.cos(angle) * 108, y: 150 + Math.sin(angle) * 108 }
  })

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="pipeMetal" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e6e8ea" />
          <stop offset="55%" stopColor="#b7bcc1" />
          <stop offset="100%" stopColor="#82888e" />
        </radialGradient>
        <radialGradient id="pipeCore" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#3a3d40" />
          <stop offset="100%" stopColor="#151617" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="140" fill="url(#pipeMetal)" />
      <circle cx="150" cy="150" r="140" fill="none" stroke="#6b7178" strokeWidth="1" opacity="0.4" />
      <circle cx="150" cy="150" r="95" fill="none" stroke="#82888e" strokeWidth="10" opacity="0.5" />
      <circle cx="150" cy="150" r="70" fill="url(#pipeCore)" />
      <circle cx="150" cy="150" r="70" fill="none" stroke="#d5271f" strokeWidth="3" opacity="0.85" />
      {bolts.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="9" fill="#4d5257" stroke="#2a2c2e" strokeWidth="1.5" />
      ))}
    </svg>
  )
}
