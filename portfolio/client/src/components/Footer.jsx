
export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/8 py-8 px-16 max-lg:px-8 max-md:px-5 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="font-mono text-xs text-cream/30">© 2025 Guransh Singh</div>
      <div className="flex gap-6">
        {[
          ['LinkedIn','https://linkedin.com/in/singhguransh'],
          ['GitHub','#'],
          ['Email','mailto:gransha.8singh@gmail.com'],
        ].map(([l,h]) => (
          <a key={l} href={h} className="font-mono text-xs text-cream/35 hover:text-accent no-underline transition-colors">{l}</a>
        ))}
      </div>
    </footer>
  )
}
