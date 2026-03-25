import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = ['About', 'Projects', 'Blog', 'Analytics', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 border-b border-border/60 max-lg:px-8 max-md:px-5 ${scrolled ? 'py-3 px-16 bg-cream/90 backdrop-blur-xl' : 'py-5 px-16 bg-cream/80 backdrop-blur-md'}`}>
      <div className="font-serif text-2xl tracking-tight">G<span className="text-accent">.</span>Singh</div>
      <ul className="hidden md:flex gap-10 list-none">
        {NAV_LINKS.map(l => (
          <li key={l}>
            <button onClick={() => scrollTo(l)} className="font-sans text-xs font-medium tracking-widest uppercase text-muted hover:text-ink transition-colors duration-200 bg-transparent border-none p-0">
              {l}
            </button>
          </li>
        ))}
      </ul>
      <div className="hidden md:flex items-center gap-3">
        <Link to="/admin" className="font-mono text-xs text-muted border border-border rounded-full px-3 py-1.5 hover:text-ink hover:border-ink transition-all duration-200 no-underline">Admin</Link>
        <button onClick={() => scrollTo('Contact')} className="bg-ink text-cream font-sans text-sm font-medium tracking-wide px-5 py-2 rounded-full border-none transition-all duration-200 hover:bg-accent hover:-translate-y-0.5">
          Let's Talk
        </button>
      </div>
      <button className="md:hidden flex flex-col gap-1.5 bg-transparent border-none p-1" onClick={() => setOpen(!open)}>
        <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}/>
        <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${open ? 'opacity-0' : ''}`}/>
        <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}/>
      </button>
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cream/95 backdrop-blur-xl border-b border-border py-6 px-5 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} className="text-left font-sans text-sm font-medium text-muted hover:text-ink bg-transparent border-none p-0 transition-colors">{l}</button>
          ))}
          <Link to="/admin" className="font-mono text-xs text-muted no-underline">Admin →</Link>
        </div>
      )}
    </nav>
  )
}