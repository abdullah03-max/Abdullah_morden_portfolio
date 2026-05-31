import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReveal } from '../hooks/useReveal'

const projects = [
  {
    title: 'Luxury Stay',
    type: 'Premium UI / Hotel Management',
    desc: 'An elegant hotel and hospitality platform featuring immersive layouts, premium visual states, and booking flow interfaces.',
    image: '/images/luxarystay.png',
    tech: ['React', 'Framer Motion', 'Tailwind CSS'],
    color: '#ec4899', // Pink
    demo: 'https://luxuarystay.netlify.app/',
    github: 'https://github.com/abdullah03-max/hotel-management-system.git',
  },
  {
    title: 'Cool Care AC Tech',
    type: 'Business / Service Platform',
    desc: 'Modern on-demand appliance service website with structured request bookings, responsive tables, and custom-styled grids.',
    image: '/images/cool care.png',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    color: '#6366f1', // Indigo
    demo: 'https://cool-care-ac-tech.vercel.app/',
    github: 'https://github.com/abdullah03-max/AC-Service.git',
  },
  {
    title: 'Vertex Digital',
    type: 'Agency Showcase Website',
    desc: 'Business-focused high-end interactive agency landing page showcasing services, team dynamics, and portfolios with GSAP.',
    image: '/images/vertex digital.png',
    tech: ['React', 'Tailwind CSS', 'GSAP'],
    color: '#a855f7', // Purple
    demo: 'https://vertex-digital47.vercel.app/',
    github: 'https://github.com/abdullah03-max/Vertex-Digital.git',
  },
  {
    title: 'Notexa AI Smart Notes',
    type: 'Mobile Application / Generative AI',
    desc: 'A smart AI notes generator. Translates raw inputs into structured markdown notes instantly. Download APK below.',
    image: '/images/notexa.jpeg',
    isMobile: true,
    tech: ['Flutter', 'Generative AI', 'Firebase'],
    color: '#00ffb3', // Aqua/Green
    apk: '/apk/Notexa.apk',
    github: 'https://github.com/abdullah03-max/Smart_AI_Nots_genrator.git',
  }
]

export default function Projects() {
  const headerRef = useReveal()
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  // 3D Tilt handler
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left - box.width / 2
    const y = e.clientY - box.top - box.height / 2
    
    const rx = -(y / (box.height / 2)) * 12
    const ry = (x / (box.width / 2)) * 12
    
    card.style.setProperty('--rx', `${rx}deg`)
    card.style.setProperty('--ry', `${ry}deg`)
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
  }

  return (
    <div ref={sectionRef} id="projects">
      <div 
        ref={pinRef} 
        className="projects-pin-container" 
        style={isDesktop ? {
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#04020f',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '5rem'
        } : {
          background: '#04020f', 
          position: 'relative'
        }}
      >
        {/* Glow highlight */}
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
        }} />

        {/* Header (Visual title cards) */}
        <div style={{
          padding: '0 4vw',
          zIndex: 2,
          position: 'relative',
          marginBottom: '2rem'
        }}>
          <div ref={headerRef}>
            <div className="section-label">Featured Work</div>
            <h2 className="section-title" style={{ marginTop: '0.5rem', marginBottom: 0 }}>Projects</h2>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div 
          ref={trackRef}
          className="projects-track"
          style={isDesktop ? {
            display: 'flex',
            gap: '2.5rem',
            padding: '1rem 4vw 2rem 4vw',
            width: 'max-content',
            zIndex: 2,
            position: 'relative',
            perspective: '1500px'
          } : {}}
        >
          {projects.map((p) => (
            <div 
              key={p.title}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="perspective-3d-card"
              style={{
                width: '380px',
                flexShrink: 0,
                background: 'rgba(15, 10, 36, 0.45)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(99, 102, 241, 0.18)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(99, 102, 241, 0.03)',
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(1, 1, 1)',
                transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s'
              }}
            >
              {/* Card Visual / Mockup Container */}
              <div style={{
                height: '165px',
                overflow: 'hidden',
                position: 'relative',
                background: p.isMobile ? 'linear-gradient(135deg, #150920, #0a0412)' : 'rgba(2, 4, 10, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: p.isMobile ? '0.75rem 0' : '0',
                transform: 'translateZ(20px)'
              }}>
                {p.isMobile ? (
                  // Beautiful framed vertical smartphone layout
                  <div style={{
                    width: '85px',
                    height: '150px',
                    borderRadius: '14px',
                    border: '2.5px solid rgba(255, 255, 255, 0.15)',
                    background: '#040d1a',
                    overflow: 'hidden',
                    boxShadow: '0 6px 15px rgba(0, 255, 179, 0.2)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Speaker slot */}
                    <div style={{
                      position: 'absolute', top: '4px', left: '50%', transform: 'translateX(-50%)',
                      width: '22px', height: '2px', background: 'rgba(255, 255, 255, 0.25)', borderRadius: '2px',
                      zIndex: 4
                    }} />
                    {/* Screenshot Image */}
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                ) : (
                  // Mockup Image Showcase for Web projects
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      display: 'block'
                    }}
                  />
                )}
                {/* Overlay styling */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(4, 2, 15, 0.9) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* Card Content body */}
              <div style={{ padding: '1.25rem', transform: 'translateZ(30px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: p.color }}>
                    {p.type}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', fontWeight: 700,
                  color: '#ffffff', marginBottom: '0.6rem', marginTop: 0
                }}>
                  {p.title}
                </h3>
                
                <p style={{ fontSize: '0.84rem', color: '#8b86b5', lineHeight: 1.55, height: '65px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                  {p.desc}
                </p>

                {/* Technologies chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                  {p.tech.map(t => (
                    <span key={t} style={{
                      fontSize: '0.65rem',
                      color: p.color,
                      background: `${p.color}12`,
                      border: `1px solid ${p.color}25`,
                      borderRadius: '100px',
                      padding: '0.2rem 0.65rem',
                      fontWeight: 600
                    }}>{t}</span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                  <a 
                    href={p.github} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      flex: 1, padding: '0.75rem 0', borderRadius: '12px',
                      border: '1px solid rgba(99, 102, 241, 0.25)', background: 'transparent',
                      color: '#f3f1fd', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none',
                      textAlign: 'center', transition: 'all 0.2s ease', fontFamily: 'DM Sans'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)'; e.currentTarget.style.background = 'transparent' }}
                  >
                    GitHub Code
                  </a>

                  {p.isMobile ? (
                    <a 
                      href={p.apk} 
                      download
                      style={{
                        flex: 1, padding: '0.75rem 0', borderRadius: '12px',
                        background: 'linear-gradient(90deg, #ec4899, #6366f1)', border: 'none',
                        color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none',
                        textAlign: 'center', transition: 'all 0.2s ease', fontFamily: 'DM Sans',
                        boxShadow: '0 5px 15px rgba(236, 72, 153, 0.2)'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 5px 25px rgba(236, 72, 153, 0.4)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 5px 15px rgba(236, 72, 153, 0.2)' }}
                    >
                      Download APK
                    </a>
                  ) : (
                    <a 
                      href={p.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{
                        flex: 1, padding: '0.75rem 0', borderRadius: '12px',
                        background: 'linear-gradient(90deg, #ec4899, #6366f1)', border: 'none',
                        color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none',
                        textAlign: 'center', transition: 'all 0.2s ease', fontFamily: 'DM Sans',
                        boxShadow: `0 5px 15px rgba(236, 72, 153, 0.2)`
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 5px 25px rgba(236, 72, 153, 0.4)` }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 5px 15px rgba(236, 72, 153, 0.2)` }}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .perspective-3d-card:hover {
          border-color: rgba(236, 72, 153, 0.4) !important;
          box-shadow: 0 30px 60px rgba(236, 72, 153, 0.15) !important;
        }

        @media (min-width: 901px) {
          .projects-pin-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
            padding-top: 5rem;
          }
          .projects-track {
            display: flex;
            gap: 2.5rem;
            padding: 1rem 4vw 2rem 4vw;
            width: max-content;
            z-index: 2;
            position: relative;
            perspective: 1500px;
          }
        }

        @media (max-width: 900px) {
          .projects-pin-container {
            height: auto;
            padding: 6rem 0 3rem 0;
            overflow: visible;
          }
          .projects-track {
            display: flex;
            gap: 1.5rem;
            padding: 1rem 4vw 3rem 4vw;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            width: 100%;
            position: relative;
            z-index: 2;
          }
          .projects-track::-webkit-scrollbar {
            display: none;
          }
          .perspective-3d-card {
            width: 340px !important;
            scroll-snap-align: center;
          }
        }

        @media (max-width: 380px) {
          .perspective-3d-card {
            width: 290px !important;
          }
        }
      `}</style>
    </div>
  )
}
