import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'

/**
 * Formulaire de contact.
 *
 * Aucun service d'envoi n'étant branché pour ce projet, la soumission
 * est simulée (état "loading" puis "success") côté client. Pour une
 * mise en production réelle, il suffit de remplacer le contenu de
 * `handleSubmit` par un appel à un service d'envoi d'e-mail (ex:
 * Formspree, Resend, EmailJS) ou à une fonction serverless.
 */
export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    window.setTimeout(() => {
      setStatus('success')
    }, 900)
  }

  return (
    <section id="contact" className="bg-offwhite py-28 text-anthracite">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-fire">Contact</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Un projet ? Parlons-en.
          </h2>
          <p className="mt-6 max-w-md text-lg text-anthracite/65">
            Décrivez-nous votre besoin en tuyauterie, structures
            métalliques ou protection incendie : nous revenons vers vous
            rapidement.
          </p>

          <div className="mt-10 border-t border-black/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-anthracite/40">
              Adresse
            </p>
            <p className="mt-2 text-base text-anthracite/80">
              BTPI — Bellicini Tuyauterie Protection Incendie
              <br />
              15 Clos de Baine
              <br />
              54700 Norroy-lès-Pont-à-Mousson
            </p>
          </div>
        </Reveal>

        <Reveal variant="scale">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-sm border border-black/10 bg-white p-10 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-fire/10">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="#d5271f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-4 font-display text-xl font-bold">Message envoyé</p>
                <p className="mt-2 max-w-xs text-sm text-anthracite/60">
                  Merci, nous revenons vers vous dès que possible.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 rounded-sm border border-black/10 bg-white p-8"
              >
                <div>
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-anthracite/50">
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-base outline-none focus:border-fire"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-anthracite/50">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-base outline-none focus:border-fire"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-anthracite/50">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-2 w-full resize-none border-b border-black/15 bg-transparent py-2 text-base outline-none focus:border-fire"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 inline-flex items-center justify-center rounded-sm bg-fire px-6 py-3.5 text-sm font-semibold text-offwhite transition-colors hover:bg-fire-light disabled:opacity-60"
                >
                  {status === 'loading' ? 'Envoi...' : 'Envoyer le message'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
