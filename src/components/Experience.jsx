import { useReveal } from '../hooks/useReveal'

const items = [
  {
    year: '2024 — Present',
    role: 'Freelance Web & App Developer',
    company: 'Independent / Self-Employed',
    desc: 'Building custom web applications and mobile apps for clients across different industries. Specialized in React, Flutter, and AI-powered solutions.',
    color: '#00d4ff',
  },
  {
    year: '2023 — 2024',
    role: 'Full Stack Developer',
    company: 'Various Client Projects',
    desc: 'Developed responsive websites and backend systems using React, PHP, Python and Firebase. Delivered business websites and service platforms.',
    color: '#0080ff',
  },
  {
    year: '2022 — 2023',
    role: 'Started Programming Journey',
    company: 'Self-Taught Developer',
    desc: 'Began learning web development through online resources and personal projects. Mastered HTML, CSS, JavaScript, then expanded into React and backend technologies.',
    color: '#00ffb3',
  },
  {
    year: 'Near Future',
    role: 'Launching SaaS Products',
    company: 'Upcoming Projects',
    desc: 'Building AI-powered SaaS products including Notexa — smart notes generator, and more products in the pipeline.',
    color: 'rgba(255,255,255,0.3)',
    future: true,
  },
]

export default function Experience() {
  const headerRef = useReveal()
  const wrapRef = useReveal(0.05)

  return (
    <section id="experience" style={{ padding: '8rem 4vw', position: 'relative', zIndex: 1 }}>
      <div ref={headerRef}>
        <div className="section-label">My Journey</div>
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>Experience &amp; Timeline</h2>
      </div>

      <div ref={wrapRef} style={{
        maxWidth: 700, margin: '0 auto',
        position: 'relative',
        paddingLeft: '3.5rem'
      }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: 18, top: 0, bottom: 0, width: 1,
          background: 'linear-gradient(to bottom, #00d4ff, rgba(0,212,255,0.05))'
        }} />

        {items.map((item, i) => (
          <div key={i} style={{ position: 'relative', paddingBottom: i < items.length - 1 ? '3rem' : 0 }}>
            {/* Dot */}
            <div style={{
              position: 'absolute', left: -41, top: 4,
              width: 13, height: 13, borderRadius: '50%',
              background: item.color,
              boxShadow: item.future ? 'none' : `0 0 14px ${item.color}`,
              border: '2px solid #020409'
            }} />

            <div style={{
              fontSize: '0.63rem', letterSpacing: '0.15em', color: item.future ? '#7a9ab5' : item.color,
              textTransform: 'uppercase', marginBottom: '0.5rem'
            }}>
              {item.year}
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {item.role}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#7a9ab5', marginBottom: '0.75rem' }}>
              {item.company}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#7a9ab5', lineHeight: 1.75 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
