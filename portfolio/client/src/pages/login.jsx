import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../utils/api'
import toast from 'react-hot-toast'

export default function Login() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async () => {
    if (!password) { toast.error('Enter password'); return }
    setLoading(true)
    try {
      const res = await authAPI.login(password)
      localStorage.setItem('admin_token', res.data.token)
      toast.success('Welcome back, Guransh.')
      navigate('/admin')
    } catch {
      toast.error('Wrong password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-serif text-3xl text-cream mb-2">
            G<span className="text-accent">.</span>Singh
          </div>
          <div className="font-mono text-xs text-cream/35 uppercase tracking-widest">Admin Access</div>
        </div>

        <div className="bg-white/4 border border-white/10 rounded-2xl p-8">
          <div className="mb-6">
            <label className="font-mono text-xs text-cream/35 uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="Enter admin password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-cream text-sm outline-none focus:border-accent transition-colors font-sans placeholder:text-white/20"
              autoFocus
            />
          </div>
          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-accent text-cream py-3.5 rounded-xl text-sm font-medium font-sans border-none hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Enter Dashboard'}
          </button>
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="font-mono text-xs text-cream/30 hover:text-accent transition-colors no-underline"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}