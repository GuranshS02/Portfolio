
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Blog from '../components/Blog'
import Analytics from '../components/Analytics'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Blog />
      <Analytics />
      <Contact />
      <Footer />
    </div>
  )
}
