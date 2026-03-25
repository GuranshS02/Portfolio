import { useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function Hero() {
  const cardRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-12px)`
    }
    const reset = () => { if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)' }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', reset)
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseleave', reset) }
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 px-16 max-lg:px-8 max-md:px-5 relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle, rgba(200,83,26,0.07) 0%, transparent 70%)'}}/>
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle, rgba(26,107,200,0.05) 0%, transparent 70%)'}}/>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="animate-[slideUp_.7s_ease_forwards]">
          <div className="section-label">Software Developer</div>
          <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6">
            Building{' '}
            <em className="not-italic text-accent">
              <TypeAnimation
                sequence={['systems', 2000, 'products', 2000, 'solutions', 2000]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </em>
            <br />that scale &<br />
            <span className="text-muted">problems that matter</span>
          </h1>
          <p className="text-muted font-light text-lg leading-relaxed max-w-md mb-10">
            Full-stack developer passionate about clean architecture, scalable backends, and products that solve real-world problems. Targeting FAANG — one system at a time.
          </p>
          <div className="flex gap-4 flex-wrap mb-14">
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}) }} className="btn-primary">View My Work</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}) }} className="btn-outline">Get In Touch</a>
          </div>
          {/* Stats */}
          <div className="flex gap-10 pt-8 border-t border-border">
            {[['200+','LeetCode Solved'],['3','Production Apps'],['1','Hackathon Award']].map(([n,l]) => (
              <div key={l}>
                <div className="font-serif text-3xl text-accent leading-none">{n}</div>
                <div className="font-mono text-xs text-muted uppercase tracking-widest mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo + floating card */}
        <div className="hidden lg:flex justify-center items-center relative">
          {/* Photo */}
          <div className="relative">
            <div className="w-72 h-72 xl:w-80 xl:h-80 rounded-3xl overflow-hidden border border-border shadow-2xl">
              <img src="/images/guransh2.jpeg" alt="Guransh Singh" className="w-full h-full object-cover object-top"/>
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-3xl border border-border/40 -z-10"/>
            <div className="absolute -inset-6 rounded-3xl border border-border/20 -z-10"/>
          </div>

          {/* Floating info card */}
          <div ref={cardRef} className="absolute -right-8 -bottom-4 bg-card border border-border rounded-2xl p-5 w-64 shadow-2xl transition-transform duration-300 ease-out">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-cream font-serif text-sm font-bold">GS</div>
              <div>
                <div className="font-sans text-sm font-semibold text-ink">Guransh Singh</div>
                <div className="font-mono text-xs text-muted">GGSIPU '26 · IT</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['React','Node.js','MongoDB','C++','DSA'].map(s => (
                <span key={s} className="font-mono text-xs px-2 py-0.5 rounded-full border border-border text-muted">{s}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"/>
              Open to opportunities
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}