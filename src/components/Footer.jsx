export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 text-sm text-offwhite/40 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} BTPI — Bellicini Tuyauterie Protection Incendie</p>
        <p>15 Clos de Baine, 54700 Norroy-lès-Pont-à-Mousson</p>
      </div>
    </footer>
  )
}
