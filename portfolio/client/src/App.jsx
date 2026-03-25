import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Admin from './pages/Admin'
import { analyticsAPI } from './utils/api'
import Login from './pages/login'

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    const onMove = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX+'px'; dot.current.style.top = e.clientY+'px' }
      setTimeout(() => { if (ring.current) { ring.current.style.left = e.clientX+'px'; ring.current.style.top = e.clientY+'px' } }, 55)
    }
    const onOver = (e) => { if (e.target.closest('a,button,[data-hover]')) { dot.current?.classList.add('hovered'); ring.current?.classList.add('hovered') } }
    const onOut = () => { dot.current?.classList.remove('hovered'); ring.current?.classList.remove('hovered') }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); document.removeEventListener('mouseout', onOut) }
  }, [])
  return (<><div className="cursor" ref={dot}/><div className="cursor-ring" ref={ring}/></>)
}

export default function App() {
  useEffect(() => { analyticsAPI.trackVisit().catch(() => {}) }, [])
  return (
    <>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="bottom-right" toastOptions={{ style: { background:'#0f0e0c', color:'#f5f0e8', border:'1px solid rgba(245,240,232,0.12)', fontFamily:"'Outfit',sans-serif", fontSize:'14px' }, success:{ iconTheme:{ primary:'#c8531a', secondary:'#f5f0e8' } } }} />
    </>
  )
}
