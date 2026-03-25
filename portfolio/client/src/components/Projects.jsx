import { useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { analyticsAPI } from '../utils/api'
import { projects } from '../utils/projects'

function MediaCarousel({ media, title }) {
  const [idx, setIdx] = useState(0)
  const videoRef = useRef(null)
  const current = media[idx]

  const goTo = (i) => {
    setIdx(i)
    if (videoRef.current) videoRef.current.currentTime = 0
  }

  return (
    <div className="relative w-full h-full min-h-[320px] bg-white overflow-hidden group">

      {current.type === 'video' ? (
        <video
          ref={videoRef}
          key={current.src}
          src={current.src}
          className="w-full h-full"
          style={{ objectFit: 'contain', background: '#fff' }}
          controls
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={current.src}
          alt={`${title} screenshot ${idx}`}
          className="w-full h-full"
          style={{ objectFit: 'contain', background: '#fff' }}
          onError={(e) => { e.target.style.opacity = '0.3' }}
        />
      )}

      {/* Prev / Next */}
      {media.length > 1 && (
        <>
          <button
            onClick={() => goTo((idx - 1 + media.length) % media.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full text-white text-base flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 border-none z-10"
          >‹</button>
          <button
            onClick={() => goTo((idx + 1) % media.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full text-white text-base flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 border-none z-10"
          >›</button>
        </>
      )}

      {/* Dots */}
      {media.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {media.map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`border-none transition-all duration-200 rounded-full
                ${i === idx
                  ? 'bg-white w-5 h-1.5'
                  : 'bg-white/40 w-1.5 h-1.5 hover:bg-white/70'
                }`}
              title={item.type === 'video' ? 'Demo Video' : `Screenshot ${i}`}
            />
          ))}
        </div>
      )}

      {/* Video badge */}
      {current.type === 'video' && (
        <div className="absolute top-3 left-3 bg-black/60 text-white font-mono text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse inline-block" />
          Demo Video
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false)

  const handleDemoClick = () => {
    analyticsAPI.trackClick(project.id).catch(() => {})
  }

  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-sm">

      {/* Media side */}
      <div className="min-h-[320px] lg:min-h-[500px]">
        <MediaCarousel media={project.media} title={project.title} />
      </div>

      {/* Content side */}
      <div className="p-8 flex flex-col justify-between overflow-y-auto max-h-[620px]">
        <div>

          {/* Status row */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${project.statusType === 'done' ? 'bg-green-500' : 'bg-amber-400 animate-pulse'}`} />
            <span className="font-mono text-xs text-muted tracking-widest uppercase">{project.status}</span>
            <span className="font-mono text-xs text-muted ml-auto">{project.year}</span>
          </div>

          <h3 className="font-serif text-3xl mb-1">{project.title}</h3>
          <div className="font-mono text-xs text-accent uppercase tracking-wider mb-4">{project.tagline}</div>

          {/* Problem */}
          <div className="mb-4">
            <div className="font-mono text-xs text-accent/70 uppercase tracking-widest mb-2">Problem it solves</div>
            <p className="text-muted text-sm leading-relaxed font-light">{project.problem}</p>
          </div>

          {/* Tech stack */}
          <div className="mb-5">
            <div className="font-mono text-xs text-accent/70 uppercase tracking-widest mb-2">⚙ Tech Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-5">
            <div className="font-mono text-xs text-accent/70 uppercase tracking-widest mb-2">✨ Key Features</div>
            <ul className="space-y-1.5">
              {project.features.slice(0, expanded ? project.features.length : 3).map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted font-light leading-snug">
                  <span className="text-accent mt-0.5 flex-shrink-0 font-mono text-xs">→</span>
                  {f}
                </li>
              ))}
            </ul>
            {project.features.length > 3 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="font-mono text-xs text-accent mt-2 bg-transparent border-none p-0 underline underline-offset-2"
              >
                {expanded ? 'Show less' : `+${project.features.length - 3} more`}
              </button>
            )}
          </div>

          {/* Challenge */}
          <div className="bg-cream rounded-xl p-4 mb-4 border border-border">
            <div className="font-mono text-xs text-accent/70 uppercase tracking-widest mb-2">🧩 Challenge & Optimisation</div>
            <p className="text-muted text-xs leading-relaxed font-light mb-3">{project.challenge}</p>
            <div className="flex gap-4 flex-wrap">
              {project.metrics.map(m => (
                <div key={m.label} className="text-center">
                  <div className="font-serif text-xl text-accent leading-none">{m.value}</div>
                  <div className="font-mono text-xs text-muted mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* System design */}
          <div className="bg-ink/5 rounded-xl p-4 border border-border/50">
            <div className="font-mono text-xs text-accent/70 uppercase tracking-widest mb-1.5">📊 System Design</div>
            <p className="text-muted text-xs leading-relaxed font-light">{project.systemDesign}</p>
          </div>

        </div>

        {/* Links */}
        <div className="flex gap-3 mt-6 pt-5 border-t border-border flex-wrap">
          <a
            href={project.demo}
            onClick={handleDemoClick}
            className="inline-flex items-center gap-2 bg-ink text-cream text-xs font-medium font-sans px-4 py-2 rounded-full border-2 border-ink transition-all hover:bg-accent hover:border-accent no-underline"
          >
            🔗 Live Demo
          </a>
          <a
            href={project.github}
            className="inline-flex items-center gap-2 text-ink text-xs font-medium font-sans px-4 py-2 rounded-full border-2 border-border transition-all hover:border-ink no-underline"
          >
            ⌥ GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const prev = () => setCurrent(i => (i - 1 + projects.length) % projects.length)
  const next = () => setCurrent(i => (i + 1) % projects.length)

  return (
    <section id="projects" className="py-28 px-16 max-lg:px-8 max-md:px-5 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className={`fade-up ${inView ? 'in-view' : ''} flex items-end justify-between mb-12 flex-wrap gap-6`}>
          <div>
            <div className="section-label">Work</div>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight">Featured Projects</h2>
            <p className="text-muted font-light mt-3 max-w-xl">
              Each project is a system — engineered with purpose, optimised under pressure.
            </p>
          </div>

          {/* Counter + nav arrows */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-muted">
              <span className="font-serif text-2xl text-ink">{String(current + 1).padStart(2, '0')}</span>
              <span className="mx-1">/</span>
              {String(projects.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border-2 border-border flex items-center justify-center text-ink text-lg bg-transparent hover:border-ink hover:bg-ink hover:text-cream transition-all duration-200"
              >←</button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border-2 border-border flex items-center justify-center text-ink text-lg bg-transparent hover:border-ink hover:bg-ink hover:text-cream transition-all duration-200"
              >→</button>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-8">
          {projects.map((p, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full border-none transition-all duration-300 ${
                i === current ? 'bg-accent w-8' : 'bg-border w-4 hover:bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Project card — key forces remount on change so video resets */}
        <div
          key={current}
          className="animate-[fadeIn_.4s_ease_forwards]"
        >
          <ProjectCard project={projects[current]} />
        </div>

        {/* Mobile bottom nav */}
        <div className="flex justify-between items-center mt-6 md:hidden">
          <button
            onClick={prev}
            className="font-mono text-sm text-muted border border-border rounded-full px-5 py-2 bg-transparent hover:border-ink hover:text-ink transition-all"
          >← Prev</button>
          <span className="font-mono text-xs text-muted">{current + 1} / {projects.length}</span>
          <button
            onClick={next}
            className="font-mono text-sm text-muted border border-border rounded-full px-5 py-2 bg-transparent hover:border-ink hover:text-ink transition-all"
          >Next →</button>
        </div>

      </div>
    </section>
  )
}