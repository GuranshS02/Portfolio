import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { contactAPI, blogAPI, analyticsAPI, authAPI } from '../utils/api'
import toast from 'react-hot-toast'

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="font-serif text-3xl text-accent leading-none">{value}</div>
      <div className="font-mono text-xs text-cream/45 uppercase tracking-widest mt-1">{label}</div>
      {sub && <div className="font-mono text-xs text-cream/30 mt-1">{sub}</div>}
    </div>
  )
}

export default function Admin() {
  const [tab, setTab] = useState('messages')
  const [messages, setMessages] = useState([])
  const [posts, setPosts] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { navigate('/login'); return }

    authAPI.verify(token)
      .then(() => {
        setAuthed(true)
        return Promise.all([
          contactAPI.getAll(),
          blogAPI.getAll(),
          analyticsAPI.getSummary(),
        ])
      })
      .then(([c, b, a]) => {
        setMessages(c.data.data || [])
        setPosts(b.data.data || [])
        setStats(a.data.data || null)
      })
      .catch(() => {
        localStorage.removeItem('admin_token')
        navigate('/login')
      })
      .finally(() => setLoading(false))
  }, [])

  const logout = () => {
    localStorage.removeItem('admin_token')
    navigate('/login')
  }

  const markRead = async (id) => {
    try {
      await contactAPI.markRead(id)
      setMessages(m => m.map(msg => msg._id === id ? { ...msg, read: true } : msg))
      toast.success('Marked as read')
    } catch { toast.error('Failed') }
  }

  const deleteMsg = async (id) => {
    try {
      await contactAPI.delete(id)
      setMessages(m => m.filter(msg => msg._id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed') }
  }

  const deletePost = async (id) => {
    try {
      await blogAPI.delete(id)
      setPosts(p => p.filter(post => post._id !== id))
      toast.success('Post deleted')
    } catch { toast.error('Failed') }
  }

  if (!authed) return null

  return (
    <div className="min-h-screen bg-ink text-cream">

      {/* Header */}
      <header className="border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="font-serif text-xl">G<span className="text-accent">.</span>Singh</div>
          <div className="font-mono text-xs text-cream/35 uppercase tracking-widest">Admin Dashboard</div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="font-mono text-xs text-red-400/60 hover:text-red-400 bg-transparent border-none transition-colors"
          >
            Logout
          </button>
          <Link
            to="/"
            className="font-mono text-xs text-cream/45 hover:text-accent no-underline transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Visits" value={stats?.totalVisits ?? '—'} />
          <StatCard
            label="Contact Msgs"
            value={messages.length}
            sub={`${messages.filter(m => !m.read).length} unread`}
          />
          <StatCard label="Blog Posts" value={posts.length} />
          <StatCard
            label="This Week"
            value={stats ? stats.weeklyData.reduce((s, d) => s + d.visits, 0) : '—'}
            sub="visits"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 w-fit">
          {['messages', 'blog', 'analytics'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg border-none transition-all
                ${tab === t ? 'bg-accent text-cream' : 'text-cream/45 hover:text-cream/70 bg-transparent'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/5 rounded-xl h-20 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Messages tab */}
            {tab === 'messages' && (
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <div className="border border-dashed border-white/15 rounded-xl p-10 text-center text-cream/35 text-sm">
                    No messages yet.
                  </div>
                ) : messages.map(msg => (
                  <div
                    key={msg._id}
                    className={`bg-white/4 border rounded-xl p-5 ${msg.read ? 'border-white/8' : 'border-accent/40'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span className="font-sans font-semibold text-cream text-sm">{msg.name}</span>
                          <span className="font-mono text-xs text-cream/40">{msg.email}</span>
                          {!msg.read && (
                            <span className="font-mono text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">New</span>
                          )}
                        </div>
                        {msg.subject && (
                          <div className="font-sans text-xs text-accent/70 mb-2">{msg.subject}</div>
                        )}
                        <p className="text-cream/60 text-sm font-light leading-relaxed">{msg.message}</p>
                        <div className="font-mono text-xs text-cream/25 mt-3">
                          {new Date(msg.createdAt).toLocaleString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {!msg.read && (
                          <button
                            onClick={() => markRead(msg._id)}
                            className="font-mono text-xs text-green-400 bg-transparent border border-green-400/30 rounded-lg px-3 py-1.5 hover:bg-green-400/10 transition-colors whitespace-nowrap"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteMsg(msg._id)}
                          className="font-mono text-xs text-red-400/70 bg-transparent border border-red-400/20 rounded-lg px-3 py-1.5 hover:bg-red-400/10 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Blog tab */}
            {tab === 'blog' && (
              <div className="space-y-3">
                {posts.length === 0 ? (
                  <div className="border border-dashed border-white/15 rounded-xl p-10 text-center text-cream/35 text-sm">
                    No blog posts yet.
                  </div>
                ) : posts.map(post => (
                  <div
                    key={post._id}
                    className="bg-white/4 border border-white/10 rounded-xl p-5 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs text-accent uppercase tracking-widest mb-1">{post.tag}</div>
                      <div className="font-sans font-semibold text-cream text-sm mb-1">{post.title}</div>
                      <div className="flex items-center gap-4 font-mono text-xs text-cream/30">
                        <span>
                          {new Date(post.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="font-mono text-xs text-red-400/70 bg-transparent border border-red-400/20 rounded-lg px-3 py-1.5 hover:bg-red-400/10 transition-colors flex-shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Analytics tab */}
            {tab === 'analytics' && stats && (
              <div className="space-y-6">
                <div className="bg-white/4 border border-white/10 rounded-xl p-6">
                  <div className="font-mono text-xs text-cream/40 uppercase tracking-widest mb-6">
                    Weekly Visit Breakdown
                  </div>
                  <div className="space-y-3">
                    {stats.weeklyData.map((d, i) => {
                      const max = Math.max(...stats.weeklyData.map(x => x.visits), 1)
                      const pct = (d.visits / max) * 100
                      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                      return (
                        <div key={d.date} className="flex items-center gap-4">
                          <div className="font-mono text-xs text-cream/40 w-8">{days[i]}</div>
                          <div className="flex-1 bg-white/5 rounded-full h-2">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${i === 6 ? 'bg-accent' : 'bg-white/25'}`}
                              style={{ width: `${Math.max(2, pct)}%` }}
                            />
                          </div>
                          <div className="font-mono text-xs text-cream/50 w-8 text-right">{d.visits}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}