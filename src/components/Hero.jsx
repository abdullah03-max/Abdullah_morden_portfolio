import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function Hero() {
  const heroRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showUnmuteHint, setShowUnmuteHint] = useState(true)

  // Autoplay immediately on mount (Muted to bypass browser security)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    setMuted(true)
    
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.log("Muted autoplay failed:", e)
        })
    }
  }, [])

  // Parallax + Scroll Play/Pause IntersectionObserver / GSAP
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log('Observer play failed:', e))
      } else {
        video.pause()
        setIsPlaying(false)
      }
    }, {
      threshold: 0.2
    })

    observer.observe(video)

    // GSAP Parallax scroll animations (Desktop only)
    let ctx = gsap.context(() => {
      if (window.innerWidth > 900) {
        gsap.to(leftColRef.current, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })

        gsap.to(rightColRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })
      }
    }, heroRef)

    return () => {
      observer.unobserve(video)
      ctx.revert()
    }
  }, [])

  const toggleMute = () => {
    if (!videoRef.current) return
    const currentMute = videoRef.current.muted
    videoRef.current.muted = !currentMute
    setMuted(!currentMute)
    if (currentMute) {
      setShowUnmuteHint(false) // Hide hint once they unmute
    }
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log(e))
    }
  }

  return (
    <section id="hero" ref={heroRef} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', position: 'relative', overflow: 'hidden',
      padding: '8rem 4vw 5rem 4vw', background: '#04020f'
    }}>
      {/* 3D Grid Accent */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        transform: 'perspective(500px) rotateX(60deg) translateY(-200px) translateZ(-100px)',
        opacity: 0.8,
        pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: '3rem',
        alignItems: 'center',
        zIndex: 2,
        position: 'relative'
      }} className="hero-split-grid">
        
        {/* Left Side: Personal Branding and 3D CTAs */}
        <div ref={leftColRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          
          <motion.div {...fadeUp(0.1)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.18)',
            borderRadius: 100, padding: '0.4rem 1.25rem', marginBottom: '1.5rem',
            fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ec4899',
            fontWeight: 700, boxShadow: '0 4px 15px rgba(236,72,153,0.1)'
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#ec4899',
              boxShadow: '0 0 12px #ec4899', display: 'inline-block',
              animation: 'pulseGlow 2s infinite'
            }} />
            Design Space v3.0
          </motion.div>

          <motion.h1 {...fadeUp(0.2)} style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            margin: '0 0 1.25rem 0',
            color: '#ffffff',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            Abdullah <br />
            <span style={{
              background: 'linear-gradient(90deg, #ec4899 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Aftab
            </span>
          </motion.h1>

          <motion.h2 {...fadeUp(0.3)} style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: '#00ffb3',
            fontWeight: 600,
            letterSpacing: '0.04em',
            margin: '0 0 1.5rem 0',
            textShadow: '0 2px 10px rgba(0,255,179,0.15)'
          }}>
            Creative Web &amp; Mobile Engineer
          </motion.h2>

          <motion.p {...fadeUp(0.4)} style={{
            color: '#8b86b5',
            fontSize: '1rem',
            lineHeight: 1.75,
            maxWidth: '520px',
            margin: '0 0 2.5rem 0'
          }}>
            Crafting premium interactive products with Flutter, next-gen React applications, and custom AI implementations. Focused on high-fidelity designs and 3D fluid animations.
          </motion.p>

          <motion.div {...fadeUp(0.5)} style={{
            display: 'flex', gap: '1.25rem', flexWrap: 'wrap'
          }}>
            <button
              className="btn-primary"
              style={{
                padding: '1rem 2.5rem', fontSize: '0.88rem',
                border: 'none', fontWeight: 700
              }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Projects
            </button>
            <button
              className="btn-outline"
              style={{
                padding: '1rem 2.5rem', fontSize: '0.88rem',
                fontWeight: 600
              }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* Right Side: Interactive 3D Angled Screen */}
        <div ref={rightColRef} style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1200px'
        }} className="video-column-container">
          
          <motion.div 
            {...fadeUp(0.3)}
            className="interactive-3d-screen"
            style={{
              width: '100%',
              position: 'relative',
              borderRadius: '24px',
              border: '2px solid rgba(99, 102, 241, 0.35)',
              background: '#08051a',
              boxShadow: '0 30px 100px rgba(99, 102, 241, 0.22), 0 10px 40px rgba(236, 72, 153, 0.15)',
              overflow: 'hidden',
              aspectRatio: '16/9',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(8deg) rotateY(-12deg) rotateZ(2deg)',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s'
            }}
          >
            {/* Glowing inner border */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '22px',
              boxShadow: 'inset 0 0 45px rgba(99, 102, 241, 0.3)',
              pointerEvents: 'none', zIndex: 3
            }} />

            {/* Video element */}
            <video
              ref={videoRef}
              src="/video/PixVerse_V6_Image_Text_360P_Create_a_15second_.mp4"
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* HUD Cyber Brackets */}
            <div style={{ position: 'absolute', top: 16, left: 16, borderLeft: '3px solid #ec4899', borderTop: '3px solid #ec4899', width: 18, height: 18, zIndex: 3 }} />
            <div style={{ position: 'absolute', top: 16, right: 16, borderRight: '3px solid #ec4899', borderTop: '3px solid #ec4899', width: 18, height: 18, zIndex: 3 }} />
            <div style={{ position: 'absolute', bottom: 16, left: 16, borderLeft: '3px solid #ec4899', borderBottom: '3px solid #ec4899', width: 18, height: 18, zIndex: 3 }} />
            <div style={{ position: 'absolute', bottom: 16, right: 16, borderRight: '3px solid #ec4899', borderBottom: '3px solid #ec4899', width: 18, height: 18, zIndex: 3 }} />

            {/* Tap to Unmute Overlay Hint */}
            {showUnmuteHint && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                onClick={toggleMute}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 4,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '100px',
                  background: 'rgba(8, 5, 26, 0.9)',
                  border: '1px solid #ec4899',
                  color: '#ffffff',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  boxShadow: '0 8px 25px rgba(236, 72, 153, 0.45)',
                  animation: 'bounceSlow 2s infinite'
                }}
              >
                <span>🔊</span> Tap to Hear
              </motion.div>
            )}

            {/* Video Control Buttons Overlay */}
            <div style={{
              position: 'absolute',
              right: 16,
              bottom: 16,
              zIndex: 4,
              display: 'flex',
              gap: '0.5rem'
            }}>
              {/* Play/Pause */}
              <button 
                onClick={togglePlay}
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(8, 5, 26, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)', color: '#ffffff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem', transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#ec4899'; e.currentTarget.style.background = 'rgba(236, 72, 153, 0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.background = 'rgba(8, 5, 26, 0.8)' }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              {/* Mute/Unmute */}
              <button 
                onClick={toggleMute}
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(8, 5, 26, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)', color: '#ffffff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem', transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#ec4899'; e.currentTarget.style.background = 'rgba(236, 72, 153, 0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.background = 'rgba(8, 5, 26, 0.8)' }}
              >
                {muted ? '🔇' : '🔊'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 10px #ec4899; }
          50% { opacity: 0.5; transform: scale(0.85); box-shadow: 0 0 4px #ec4899; }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }
        .interactive-3d-screen:hover {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.02) !important;
          border-color: #ec4899 !important;
          box-shadow: 0 40px 120px rgba(236, 72, 153, 0.25), 0 0 50px rgba(99, 102, 241, 0.12) !important;
        }
        @media (max-width: 900px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 3.5rem !important;
          }
          .hero-split-grid > div {
            align-items: center !important;
            justify-content: center !important;
          }
          .interactive-3d-screen {
            transform: none !important;
          }
          .interactive-3d-screen:hover {
            transform: scale(1.01) !important;
          }
        }
      `}</style>
    </section>
  )
}
