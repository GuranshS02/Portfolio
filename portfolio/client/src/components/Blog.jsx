
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { blogAPI } from '../utils/api'
import toast from 'react-hot-toast'

function BlogModal({ post, onClose }) {
  if (!post) return null
  return (
    <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 bg-border rounded-full flex items-center justify-center text-ink text-sm border-none hover:bg-ink hover:text-cream transition-colors">✕</button>
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">{post.tag || 'Engineering'}</div>
        <h2 className="font-serif text-2xl mb-4 leading-tight">{post.title}</h2>
        <div className="font-mono text-xs text-muted mb-6">{new Date(post.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</div>
        <div className="text-muted text-sm leading-relaxed font-light whitespace-pre-wrap">{post.content}</div>
      </div>
    </div>
  )
}

function BlogEditor({ onClose, onSave }) {
  const [form, setForm] = useState({ title: '', tag: '', content: '' })
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!form.title || !form.content) { toast.error('Title and content required'); return }
    setLoading(true)
    try {
      const res = await blogAPI.create(form)
      toast.success('Post published!')
      onSave(res.data.data)
      onClose()
    } catch {
      toast.error('Failed to publish')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-card rounded-2xl max-w-xl w-full p-8 relative max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 bg-border rounded-full flex items-center justify-center text-ink text-sm border-none hover:bg-ink hover:text-cream transition-colors">✕</button>
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">New Blog Post</div>
        <div className="space-y-4">
          <div>
            <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              placeholder="e.g. How I optimised MongoDB queries by 40%"
              className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-ink text-sm outline-none focus:border-accent transition-colors font-sans placeholder:text-muted/50"/>
          </div>
          <div>
            <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">Tag</label>
            <input value={form.tag} onChange={e => setForm({...form, tag: e.target.value})}
              placeholder="e.g. Backend, DSA, System Design"
              className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-ink text-sm outline-none focus:border-accent transition-colors font-sans placeholder:text-muted/50"/>
          </div>
          <div>
            <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">Content</label>
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})}
              placeholder="Write your article..."
              rows={8}
              className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-ink text-sm outline-none focus:border-accent transition-colors font-sans placeholder:text-muted/50 resize-y"/>
          </div>
          <button onClick={submit} disabled={loading}
            className="w-full bg-ink text-cream py-3 rounded-xl text-sm font-medium border-none hover:bg-accent transition-colors disabled:opacity-50">
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [selected, setSelected] = useState(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    blogAPI.getAll()
      .then(r => setPosts(r.data.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="blog" className="py-28 px-16 max-lg:px-8 max-md:px-5 bg-ink text-cream" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`fade-up ${inView ? 'in-view' : ''} flex items-end justify-between mb-12 flex-wrap gap-4`}>
          <div>
            <div className="section-label-light">Writing</div>
            <h2 className="font-serif text-4xl md:text-5xl text-cream tracking-tight">Technical Blog</h2>
            <p className="text-cream/50 font-light mt-3">Thoughts on systems, performance, and the craft of engineering.</p>
          </div>
          <button onClick={() => setEditorOpen(true)}
            className="bg-accent text-cream font-sans text-sm font-medium px-6 py-2.5 rounded-full border-none hover:bg-accent/90 transition-colors hover:-translate-y-0.5 transition-transform">
            ✍ Write a Post
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3].map(i => <div key={i} className="bg-white/4 rounded-2xl h-48 animate-pulse"/>)}
          </div>
        ) : posts.length === 0 ? (
          <div className={`fade-up ${inView ? 'in-view' : ''} border border-dashed border-white/15 rounded-2xl p-12 text-center`}>
            <p className="text-cream/40 text-sm mb-4">No posts yet. Be the first to write something.</p>
            <button onClick={() => setEditorOpen(true)} className="font-mono text-xs text-accent underline bg-transparent border-none">Write your first post →</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p, i) => (
              <div key={p._id} onClick={() => setSelected(p)} data-hover
                className={`fade-up ${inView ? 'in-view' : ''} ${i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : ''} bg-white/4 border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/7 hover:border-white/20 hover:-translate-y-1 transition-all duration-200`}>
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">{p.tag || 'Engineering'}</div>
                <h3 className="font-serif text-lg text-cream leading-snug mb-3">{p.title}</h3>
                <p className="text-cream/45 text-xs leading-relaxed font-light line-clamp-3">{p.excerpt || p.content?.substring(0, 120) + '...'}</p>
                <div className="flex justify-between items-center mt-5 font-mono text-xs text-cream/30">
                  <span>{new Date(p.createdAt).toLocaleDateString('en-IN', { month:'short', day:'numeric', year:'numeric' })}</span>
                  <span>Read →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && <BlogModal post={selected} onClose={() => setSelected(null)} />}
      {editorOpen && <BlogEditor onClose={() => setEditorOpen(false)} onSave={p => setPosts(prev => [p, ...prev])} />}
    </section>
  )
}
