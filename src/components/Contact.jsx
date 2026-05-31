import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const contactMethods = [
  { 
    icon: '📧', 
    label: 'Email Address', 
    value: 'abdullahaftab861@gmail.com', 
    href: 'mailto:abdullahaftab861@gmail.com' 
  },
  { 
    icon: '💬', 
    label: 'WhatsApp / Call', 
    value: '+92 319 7784575', 
    href: 'https://wa.me/923197784575' 
  },
  { 
    icon: '🐙', 
    label: 'GitHub Profile', 
    value: 'github.com/abdullah03-max', 
    href: 'https://github.com/abdullah03-max' 
  },
  { 
    icon: '💼', 
    label: 'LinkedIn Profile', 
    value: 'linkedin.com/in/abdullah-aftab', 
    href: 'https://www.linkedin.com/in/abdullah-aftab-1385683b0?utm_source=share_via&utm_content=profile&utm_medium=member_android' 
  }
]

export default function Contact() {
  const headerRef = useReveal()
  const wrapRef = useReveal(0.05)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section id="contact" style={{
      padding: '8rem 4vw',
      background: '#020306',
      position: 'relative',
      zIndex: 2
    }}>
      {/* Background neon orb */}
      <div style={{
        position: 'absolute', top: '40%', left: '10%',
        width: '40vw', height: '40vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79, 172, 254, 0.03) 0%, transparent 60%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
      }} />

      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 2, position: 'relative' }}>
        <div className="section-label" style={{ display: 'inline-block' }}>Get In Touch</div>
        <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
          Let's Build Something<br />
          <span style={{
            background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Together</span>
        </h2>
      </div>

      <div ref={wrapRef} style={{
        maxWidth: '920px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
        gap: '4rem', alignItems: 'start', zIndex: 2, position: 'relative'
      }}>
        {/* Info Panel */}
        <div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.7rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2, color: '#ffffff' }}>
            Have a project in mind?
          </h3>
          <p style={{ color: '#7a9ab5', lineHeight: 1.75, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            I'm always open to discussing new projects, design systems, mobile applications, or AI-powered setups. Shoot me an email or call/message on WhatsApp directly!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contactMethods.map(m => (
              <a key={m.label} href={m.href} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                color: '#7a9ab5', textDecoration: 'none', fontSize: '0.88rem',
                padding: '1rem', borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.03)',
                background: 'rgba(255,255,255,0.01)',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#00f2fe'
                  e.currentTarget.style.borderColor = 'rgba(0,242,254,0.2)'
                  e.currentTarget.style.background = 'rgba(0,242,254,0.04)'
                  e.currentTarget.style.transform = 'translateX(5px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#7a9ab5'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.01)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: 'rgba(0,242,254,0.08)',
                  border: '1px solid rgba(0,242,254,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem', flexShrink: 0
                }}>{m.icon}</div>
                <div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a9ab5', marginBottom: 3 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#e8f4ff', fontWeight: 500 }}>{m.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(10, 18, 36, 0.4)', border: '1px solid rgba(0,242,254,0.15)',
          borderRadius: '24px', padding: '2.5rem', backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 45px rgba(0,0,0,0.15)'
        }}>
          {[
            { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
            { id: 'project', label: 'Project Type', type: 'text', placeholder: 'Web App / Mobile App / AI Bot' },
          ].map(f => (
            <div key={f.id} style={{ marginBottom: '1.25rem' }}>
              <label htmlFor={f.id} style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a9ab5', marginBottom: '0.5rem', fontWeight: 600 }}>
                {f.label}
              </label>
              <input id={f.id} required type={f.type} placeholder={f.placeholder} style={{
                width: '100%', background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12,
                padding: '0.85rem 1.1rem', color: '#e8f4ff',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none',
                transition: 'all 0.3s ease'
              }}
                onFocus={e => { e.target.style.borderColor = '#00f2fe'; e.target.style.background = 'rgba(0,242,254,0.02)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.02)' }}
              />
            </div>
          ))}

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="message" style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a9ab5', marginBottom: '0.5rem', fontWeight: 600 }}>
              Message
            </label>
            <textarea id="message" required placeholder="Tell me about your project..." style={{
              width: '100%', height: 120,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12,
              padding: '0.85rem 1.1rem', color: '#e8f4ff',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none',
              resize: 'none', transition: 'all 0.3s ease'
            }}
              onFocus={e => { e.target.style.borderColor = '#00f2fe'; e.target.style.background = 'rgba(0,242,254,0.02)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.02)' }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%', padding: '0.95rem',
              fontSize: '0.88rem', fontWeight: 700, border: 'none',
              background: sent ? 'linear-gradient(90deg,#00ffb3,#00f2fe)' : 'linear-gradient(90deg, #00f2fe, #4facfe)',
              color: '#020306',
              boxShadow: '0 5px 15px rgba(0, 242, 254, 0.2)',
              transition: 'all 0.3s ease', cursor: 'pointer'
            }}
            disabled={sent}
          >
            {sent ? '✓ Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
