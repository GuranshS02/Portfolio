
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { contactAPI } from '../utils/api'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const set = (k) => (e) => setForm(f => ({...f, [k]: e.target.value}))

  const submit = async () => {
    if (!form.name || !form.email || !form.message) { toast.error('Name, email and message required'); return }
    setLoading(true)
    try {
      await contactAPI.send(form)
      toast.success('Message sent! I\'ll reply within 24 hours.')
      setForm({ name:'', email:'', subject:'', message:'' })
    } catch {
      toast.error('Failed to send. Try emailing directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28 px-16 max-lg:px-8 max-md:px-5 bg-ink text-cream" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div className={`fade-up ${inView ? 'in-view' : ''}`}>
          <div className="section-label-light">Contact</div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight tracking-tight mb-6">
            Let's build<br/>something great
          </h2>
          <p className="text-cream/55 font-light leading-relaxed mb-10">
            Open to internships, and full-time opportunities. Whether you have a project in mind or just want to chat about systems and code — I'd love to connect.
          </p>

          <div className="space-y-5">
            {[
              { icon: '✉', label: 'Email', val: 'gransha.8singh@gmail.com', href: 'mailto:gransha.8singh@gmail.com' },
              { icon: 'in', label: 'LinkedIn', val: 'linkedin.com/in/singhguransh', href: 'https://linkedin.com/in/singhguransh' },
              { icon: '☎', label: 'Phone', val: '+91 9996296026', href: 'tel:+919996296026' },
              { icon: '📍', label: 'Location', val: 'Panipat, Haryana, India', href: null },
            ].map(({ icon, label, val, href }) => {
              const inner = (
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-white/7 rounded-xl flex items-center justify-center text-sm flex-shrink-0">{icon}</div>
                  <div>
                    <div className="text-sm font-medium text-cream">{label}</div>
                    <div className="text-xs text-cream/50 font-light">{val}</div>
                  </div>
                </div>
              )
              return href ? (
                <a key={label} href={href} className="block no-underline hover:translate-x-1 transition-transform duration-200">{inner}</a>
              ) : (
                <div key={label}>{inner}</div>
              )
            })}
          </div>
        </div>

        {/* Right — form */}
        <div className={`fade-up delay-200 ${inView ? 'in-view' : ''}`}>
          <div className="space-y-4">
            {[
              { key:'name',    label:'Your Name',      type:'text',  placeholder:'name' },
              { key:'email',   label:'Email Address',  type:'email', placeholder:'your.email@example.com' },
              { key:'subject', label:'Subject',        type:'text',  placeholder:'Internship / Project Collab / Just saying hi' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="font-mono text-xs text-cream/35 uppercase tracking-widest block mb-2">{label}</label>
                <input type={type} value={form[key]} onChange={set(key)} placeholder={placeholder} className="form-input"/>
              </div>
            ))}
            <div>
              <label className="font-mono text-xs text-cream/35 uppercase tracking-widest block mb-2">Message</label>
              <textarea value={form.message} onChange={set('message')} placeholder="Tell me about the role or project..." rows={5} className="form-input resize-y"/>
            </div>
            <button onClick={submit} disabled={loading}
              className="w-full bg-cream text-ink py-4 rounded-xl text-sm font-semibold font-sans border-none hover:bg-accent hover:text-cream transition-all duration-200 disabled:opacity-50 mt-2">
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
