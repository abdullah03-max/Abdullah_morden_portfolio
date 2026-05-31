import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'

function Counter({ target, suffix = '+' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let cur = 0
        const step = Math.ceil(target / 40)
        const iv = setInterval(() => {
          cur += step
          if (cur >= target) { cur = target; clearInterval(iv) }
          setVal(cur)
        }, 40)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <div ref={ref} style={{
    fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1,
    background: 'linear-gradient(135deg,#00d4ff,#0080ff)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
  }}>{val}{suffix}</div>
}

export default function About() {
  const ref = useReveal()
  const ref2 = useReveal()

  return (
    <section id="about" style={{ padding: '8rem 4vw', position: 'relative', zIndex: 1 }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px,1fr))',
        gap: '4rem', alignItems: 'center'
      }}>
        {/* Image + Stats */}
        <div ref={ref}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '100%', maxWidth: 420, aspectRatio: '1',
              borderRadius: 28, overflow: 'hidden',
              background: 'linear-gradient(135deg, #0a1628, #050c16)',
              border: '1px solid rgba(0,212,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Glow ring */}
              <div style={{
                position: 'absolute', inset: -2, borderRadius: 30,
                background: 'linear-gradient(135deg,var(--neon),transparent,var(--neon2))',
                zIndex: -1
              }} />
              {/* Personal Photo */}
              <img
                src="/images/abdullah.png"
                alt="Abdullah Aftab"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.9,
                  borderRadius: 26,
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              />
              
              {/* Glass overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(10, 22, 40, 0.05), rgba(5, 12, 22, 0.4))',
                pointerEvents: 'none'
              }} />
              
              {/* Decorative scan line */}
              <div style={{
                position: 'absolute', left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg,transparent,rgba(0,242,254,0.4),transparent)',
                animation: 'scanSlide 3s linear infinite', top: 0
              }} />
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2rem' }}>
            {[{ n: 15, label: 'Projects' }, { n: 2, label: 'Years Exp.' }, { n: 10, label: 'Technologies' }].map(s => (
              <div key={s.label}>
                <Counter target={s.n} />
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a9ab5', marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div ref={ref2}>
          <div className="section-label">About Me</div>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            Building the Future<br />
            <span style={{
              background: 'linear-gradient(135deg,#00d4ff,#0080ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>One App at a Time</span>
          </h2>
          <p style={{ color: '#7a9ab5', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1.05rem' }}>
            I build <span style={{ color: '#e8f4ff' }}>modern web applications</span>, mobile apps, and AI-powered
            solutions with a focus on performance and user experience.
          </p>
          <p style={{ color: '#7a9ab5', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1.05rem' }}>
            Passionate about <span style={{ color: '#e8f4ff' }}>clean code</span>, intuitive interfaces, and
            leveraging cutting-edge technologies to solve real-world problems.
          </p>
          <p style={{ color: '#7a9ab5', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem' }}>
            From <span style={{ color: '#e8f4ff' }}>React frontends</span> to Flutter mobile apps
            and Python backends — I ship products that users love.
          </p>
          <button
            className="btn-primary"
            style={{ padding: '0.8rem 2rem', fontSize: '0.85rem' }}
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            See My Work
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scanSlide { 0% { top: -5% } 100% { top: 105% } }
      `}</style>
    </section>
  )
}
