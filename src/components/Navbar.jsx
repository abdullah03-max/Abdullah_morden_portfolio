import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000, padding: '1.1rem 4vw',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(16px)',
        background: scrolled ? 'rgba(2,4,9,0.92)' : 'rgba(2,4,9,0.6)',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
        transition: 'background 0.4s'
      }}
    >
      <div style={{
        fontFamily: 'Syne, sans-serif', fontSize: '1.15rem', fontWeight: 800,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg,#00d4ff,#0080ff)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>
        Abdullah Aftab
      </div>

      {/* Desktop */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }} className="hidden-mobile">
        {links.map(l => (
          <li key={l}>
            <button onClick={() => scrollTo(l)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '0.75rem', fontWeight: 500, color: '#7a9ab5',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              fontFamily: 'DM Sans, sans-serif', transition: 'color 0.3s'
            }}
              onMouseEnter={e => e.target.style.color = '#00d4ff'}
              onMouseLeave={e => e.target.style.color = '#7a9ab5'}
            >{l}</button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => scrollTo('Contact')}
        className="btn-primary"
        style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}
      >
        Hire Me
      </button>
    </motion.nav>
  )
}
