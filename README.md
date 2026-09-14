# BTPI — Site vitrine

Site one-page pour **BTPI (Bellicini Tuyauterie Protection Incendie)**,
entreprise de tuyauterie et protection incendie industrielle basée à
Norroy-lès-Pont-à-Mousson (54700).

## Stack technique

- **React 19 + Vite** — l'application et son outil de build
- **Tailwind CSS v4** — les styles, via des classes utilitaires directement
  dans le JSX (voir `src/index.css` pour la palette de couleurs et les
  polices, définies dans un bloc `@theme`)
- **React Three Fiber + drei** — la scène 3D du sprinkler dans le hero
  (`src/components/hero/`)
- **Framer Motion** — toutes les animations (apparitions au scroll, survol
  des cartes, barre de progression, etc.)

## Démarrer en local

```bash
npm install
npm run dev       # serveur de développement, avec rechargement à chaud
npm run build      # build de production dans dist/
npm run preview    # sert le build de production localement, pour vérifier avant mise en ligne
```

## Où trouver quoi

```
src/
  index.css              couleurs, polices, animations CSS globales
  App.jsx                assemble toutes les sections de la page
  components/
    Header.jsx            navigation fixe en haut
    ScrollProgress.jsx     barre de progression de scroll
    ScrollToTop.jsx        bouton "retour en haut"
    Hero.jsx                section d'accueil (titre + scène 3D)
    hero/                   la scène 3D (voir détail ci-dessous)
    SectionTitle.jsx        section "titre fort" à effet glitch
    SavoirFaire.jsx          savoir-faire + fiches flottantes + secteurs
    StatsCounter.jsx         chiffres clés animés
    Testimonial.jsx           section plein écran avec effet Ken Burns
    ServiceArea.jsx            zone d'intervention
    Contact.jsx                 formulaire de contact
    Footer.jsx
    Reveal.jsx                composants réutilisables pour l'animation
                               "apparition au scroll"
    TiltCard.jsx               carte avec effet de bascule 3D au survol
  hooks/
    useMotionPreset.js        variants Framer Motion partagés, adaptés à
                              prefers-reduced-motion
    useIsMobile.js            détecte un petit écran (réduit la 3D)
```

### La scène 3D (`src/components/hero/`)

- `SprinklerModel.jsx` — le modèle 3D du sprinkler, assemblé à partir de
  primitives three.js (cylindres, cône, boîtes)
- `ParticleSpray.jsx` — le système de particules (eau et feu), animé
  frame par frame
- `CameraRig.jsx` — le parallax souris + la réaction au scroll
- `FlameLight.jsx` — la lumière chaude qui scintille près des flammes
- `HeroScene.jsx` — assemble tout ça dans un `<Canvas>`

Elle est chargée en asynchrone (`React.lazy`, voir `Hero.jsx`) pour ne pas
alourdir le chargement initial de la page, et remplacée par une version
statique si l'utilisateur a activé "réduire les animations" sur son
système.

## Contenu à compléter

Quelques éléments sont volontairement laissés en placeholder, faute de
matière réelle au moment de la conception — ils sont signalés par un
commentaire dans le code correspondant :

- **Photographies** (`SectionTitle.jsx`, `SavoirFaire.jsx`) : remplacées
  par des dégradés CSS / illustrations vectorielles. À remplacer par de
  vraies photos industrielles quand elles seront disponibles.
- **Témoignage client** (`Testimonial.jsx`) : porte une citation de
  l'entreprise plutôt qu'un faux témoignage attribué à un client
  inventé. À remplacer par un vrai témoignage client le moment venu.
- **Formulaire de contact** (`Contact.jsx`) : la soumission est simulée
  côté client (aucun service d'envoi n'est branché). Pour une mise en
  ligne réelle, il faut connecter un service comme Formspree, Resend ou
  EmailJS.
- **Zone d'intervention** (`ServiceArea.jsx`) : représentée par un
  schéma (cercles concentriques), pas une carte géographique précise.
