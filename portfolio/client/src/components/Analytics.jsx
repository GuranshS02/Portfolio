
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { analyticsAPI } from '../utils/api'

export default function Analytics() {
  const [data, setData] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    analyticsAPI.getSummary()
      .then(r => setData(r.data.data))
      .catch(() => {})
  }, [])

  const maxVisits = data ? Math.max(...data.weeklyData.map(d => d.visits), 1) : 1

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

  return (
    <section id="analytics" className="py-28 px-16 max-lg:px-8 max-md:px-5 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`fade-up ${inView ? 'in-view' : ''} mb-14`}>
          <div className="section-label">Insights</div>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight">Portfolio Analytics</h2>
          <p className="text-muted font-light mt-3">Real-time tracking powered by MongoDB Atlas.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Visits', value: data?.totalVisits ?? '—', badge: 'Live' },
            { label: 'This Week',    value: data ? data.weeklyData.reduce((s,d)=>s+d.visits,0) : '—', badge: 'Tracked' },
            { label: 'Contact Msgs', value: data?.contactCount ?? '—', badge: `${data?.unreadCount ?? 0} unread` },
            { label: 'Blog Posts',   value: data?.blogCount ?? '—', badge: 'Growing' },
          ].map((s, i) => (
            <div key={s.label} className={`fade-up ${inView ? 'in-view' : ''} ${i===1?'delay-100':i===2?'delay-200':i===3?'delay-300':''} bg-card border border-border rounded-2xl p-6`}>
              <div className="font-serif text-3xl text-ink leading-none mb-1">{s.value}</div>
              <div className="font-mono text-xs text-muted uppercase tracking-widest">{s.label}</div>
              <span className="inline-block mt-3 font-mono text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">↑ {s.badge}</span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className={`fade-up ${inView ? 'in-view' : ''} bg-card border border-border rounded-2xl p-6`}>
          <div className="font-mono text-xs text-muted uppercase tracking-widest mb-6">Weekly Visit Trend</div>
          <div className="flex items-end gap-2 h-40">
            {data ? data.weeklyData.map((d, i) => {
              const pct = maxVisits > 0 ? (d.visits / maxVisits) * 100 : 0
              const isToday = i === 6
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative flex items-end" style={{height:'130px'}}>
                    <div
                      className={`w-full rounded-t-md transition-all duration-700 ${isToday ? 'bg-accent' : 'bg-ink/10 hover:bg-ink/20'}`}
                      style={{height: `${Math.max(4, pct)}%`}}
                      title={`${d.visits} visits`}
                    />
                  </div>
                  <div className="font-mono text-xs text-muted">{days[i]}</div>
                </div>
              )
            }) : days.map(d => (
              <div key={d} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-ink/5 rounded-t-md animate-pulse" style={{height:'40px'}}/>
                <div className="font-mono text-xs text-muted">{d}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3 text-xs font-mono text-muted">
            <span className="w-3 h-3 bg-accent rounded-sm inline-block"/>Today
            <span className="w-3 h-3 bg-ink/10 rounded-sm inline-block ml-4"/>Previous days
          </div>
        </div>
      </div>
    </section>
  )
}
