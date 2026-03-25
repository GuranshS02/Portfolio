import { useInView } from 'react-intersection-observer'

const skillGroups = [
  { label: 'Languages',           skills: ['C++','Python','JavaScript','SQL','HTML5','CSS3'] },
  { label: 'Frameworks & Libraries',          skills: ['React.js','Node.js','Express.js','Tailwind CSS','jQuery'] },
  { label: 'Databases & Storage',      skills: ['MongoDB','MySQL','Redis'] },
  { label: 'DevOps & Cloud',     skills: ['Docker', 'Git', 'GitHub', 'Vercel', 'Render'] },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" className="py-28 px-16 max-lg:px-8 max-md:px-5 bg-ink text-cream" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div className={`fade-up ${inView ? 'in-view' : ''}`}>
          <div className="section-label-light">About Me</div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight tracking-tight mb-8">
            Passionate about<br/>elegant solutions
          </h2>
          <blockquote className="font-serif text-xl italic text-cream/80 border-l-2 border-accent pl-6 mb-8 leading-relaxed">
            "I don't just build apps — I engineer experiences with measurable impact."
          </blockquote>
          <p className="text-cream/60 font-light leading-relaxed mb-4">
            I'm a final-year Information Technology student at GGSIPU, New Delhi, with a deep passion for building scalable systems and solving complex engineering challenges. My approach blends strong algorithmic foundations with production-grade full-stack development.
          </p>
          <p className="text-cream/60 font-light leading-relaxed">
            Currently focused on mastering system design, performance optimisation, and distributed systems — the building blocks for high-impact engineering at scale. Actively preparing for FAANG-level roles with a structured approach to DSA and architecture.
          </p>

          {/* Achievement row */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10">
            {[['200+','LeetCode Problems'],['20%','Sprint Velocity ↑'],['4 wks','IBM Team Lead']].map(([n,l]) => (
              <div key={l} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="font-serif text-2xl text-accent leading-none">{n}</div>
                <div className="font-mono text-xs text-cream/40 mt-1 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — skills */}
        <div className={`fade-up delay-200 ${inView ? 'in-view' : ''}`}>
          <div className="space-y-7">
            {skillGroups.map(({ label, skills }) => (
              <div key={label}>
                <div className="font-mono text-xs text-cream/35 uppercase tracking-widest mb-3">{label}</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s} className="skill-pill">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education card */}
          <div className="mt-10 bg-white/4 border border-white/10 rounded-2xl p-6">
            <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Education</div>
            <div className="font-sans text-base font-semibold text-cream">Guru Tegh Bahadur Institute of Technology</div>
            <div className="font-sans text-sm text-cream/60 mt-1">B.Tech in Information Technology · GGSIPU, New Delhi</div>
            <div className="font-mono text-xs text-cream/35 mt-2">Expected June 2026</div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="font-mono text-xs text-cream/35 uppercase tracking-widest mb-2">Certifications</div>
              <ul className="space-y-1.5">
                {['Complete 2024 Web Dev Bootcamp — Udemy','IBM SkillsBuild: Web Development','Intro to Generative AI — Google Cloud'].map(c => (
                  <li key={c} className="flex items-start gap-2 text-xs text-cream/50">
                    <span className="text-accent mt-0.5 flex-shrink-0">▸</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}