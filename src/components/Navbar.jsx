import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
        background: scrolled ? 'rgba(2,4,9,0.95)' : 'rgba(2,4,9,0.65)',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
        transition: 'background 0.4s'
      }}
    >
      <div style={{
        fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', fontWeight: 800,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg,#00d4ff,#0080ff)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        cursor: 'pointer'
      }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Abdullah Aftab
      </div>

      {/* Desktop Links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }} className="nav-desktop-links">
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

      {/* Desktop Hire Me button */}
      <button
        onClick={() => scrollTo('Contact')}
        className="btn-primary nav-hire-btn"
        style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}
      >
        Hire Me
      </button>

      {/* Mobile Hamburger Toggle Button */}
      <button 
        className={`nav-hamburger-btn ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(4, 2, 15, 0.98)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(0, 212, 255, 0.15)',
              padding: '2.5rem 4vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              alignItems: 'center',
              zIndex: 999,
              overflow: 'hidden'
            }}
          >
            {links.map((l, index) => (
              <motion.button
                key={l}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => scrollTo(l)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#7a9ab5',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'DM Sans, sans-serif',
                  padding: '0.4rem 0',
                  width: '100%',
                  textAlign: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#00d4ff'}
                onMouseLeave={e => e.target.style.color = '#7a9ab5'}
              >
                {l}
              </motion.button>
            ))}
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              onClick={() => scrollTo('Contact')}
              className="btn-primary"
              style={{
                padding: '0.75rem 2.5rem',
                fontSize: '0.85rem',
                width: '70%',
                marginTop: '1rem',
                textAlign: 'center'
              }}
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop-links {
          display: flex;
        }
        .nav-hire-btn {
          display: block;
        }
        .nav-hamburger-btn {
          display: none;
        }

        @media (max-width: 820px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-hire-btn {
            display: none !important;
          }
          .nav-hamburger-btn {
            display: flex !important;
            flex-direction: column;
            justify-content: space-between;
            width: 26px;
            height: 18px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1001;
          }
          .nav-hamburger-btn span {
            display: block;
            width: 100%;
            height: 2px;
            background-color: #ffffff;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border-radius: 2px;
          }
          .nav-hamburger-btn.open span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
            background-color: #00d4ff;
          }
          .nav-hamburger-btn.open span:nth-child(2) {
            opacity: 0;
            transform: scale(0);
          }
          .nav-hamburger-btn.open span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
            background-color: #00d4ff;
          }
        }
      `}</style>
    </motion.nav>
  )
}
