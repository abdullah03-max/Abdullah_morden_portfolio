import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const skills = [
  { cat: 'Frontend', icon: '⚛️', name: 'React', level: 90 },
  { cat: 'Frontend', icon: '🟨', name: 'JavaScript', level: 88 },
  { cat: 'Frontend', icon: '🎨', name: 'Tailwind CSS', level: 92 },
  { cat: 'Mobile', icon: '📱', name: 'Flutter', level: 82 },
  { cat: 'Backend', icon: '🐍', name: 'Python', level: 85 },
  { cat: 'Backend', icon: '🐘', name: 'PHP', level: 75 },
  { cat: 'Database', icon: '🔥', name: 'Firebase', level: 85 },
  { cat: 'Database', icon: '🗄️', name: 'Supabase', level: 80 },
  { cat: 'AI / Tools', icon: '🤖', name: 'AI Solutions', level: 88 },
  { cat: 'Integration', icon: '🔗', name: 'API Connect', level: 90 },
]

function SkillCard({ skill, index }) {
  const barRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && barRef.current) {
        setTimeout(() => {
          if (barRef.current) barRef.current.style.width = skill.level + '%'
        }, index * 80)
      }
    }, { threshold: 0.2 })
    if (barRef.current) observer.observe(barRef.current.parentElement)
    return () => observer.disconnect()
  }, [skill.level, index])

  return (
    <div 
      className="skill-card-3d"
      style={{
        flex: '0 0 240px',
        background: 'rgba(15, 10, 36, 0.45)',
        border: '1px solid rgba(99, 102, 241, 0.18)',
        borderRadius: 20,
        padding: '2rem 1.5rem',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--neon)'
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)'
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(236, 72, 153, 0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.18)'
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--neon)', marginBottom: '0.8rem', fontWeight: 700 }}>
        {skill.cat}
      </div>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>{skill.icon}</div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>{skill.name}</div>
      
      <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 3, marginTop: '1.5rem' }}>
        <div ref={barRef} style={{
          height: '100%',
          background: 'linear-gradient(90deg, var(--neon), var(--neon2))',
          borderRadius: 3, width: 0, transition: 'width 1.4s cubic-bezier(0.25,1,0.5,1)'
        }} />
      </div>
      <div style={{ fontSize: '0.72rem', color: '#8b86b5', marginTop: '0.5rem', textAlign: 'right', fontWeight: 500 }}>
        {skill.level}%
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (window.innerWidth > 900) {
        const track = trackRef.current
        const totalScrollWidth = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.08)

        gsap.to(track, {
          x: -totalScrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${totalScrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef}>
      <div ref={pinRef} style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        overflow: 'hidden', 
        position: 'relative',
        background: '#04020f'
      }}>
        {/* Decorative parallax glowing orb */}
        <div style={{
          position: 'absolute', top: '10%', left: '-10%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 60%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />

        <div style={{ padding: '0 4vw', marginBottom: '4rem', position: 'relative', zIndex: 3 }}>
          <div className="section-label">What I Use</div>
          <h2 className="section-title">Skills &amp; Technologies</h2>
        </div>

        {/* Horizontal Track container */}
        <div 
          ref={trackRef} 
          style={{
            display: 'flex', 
            gap: '2rem', 
            padding: '0.5rem 4vw 2rem 4vw',
            width: 'max-content',
            position: 'relative',
            zIndex: 3
          }}
        >
          {skills.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} />)}
        </div>
      </div>
    </div>
  )
}
