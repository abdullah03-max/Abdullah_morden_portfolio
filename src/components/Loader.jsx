import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onEnter }) {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let val = 0
    const iv = setInterval(() => {
      val += Math.random() * 12 + 4
      if (val >= 100) {
        val = 100
        clearInterval(iv)
        setTimeout(() => {
          setDone(true)
          if (onEnter) onEnter()
        }, 300)
      }
      setPct(Math.min(100, Math.round(val)))
    }, 60)
    return () => clearInterval(iv)
  }, [onEnter])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0, background: '#020306',
            zIndex: 10000, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '2rem',
            overflow: 'hidden'
          }}
        >
          {/* Cyber grid background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(0, 242, 254, 0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px', opacity: 0.7, pointerEvents: 'none', zIndex: 0
          }} />

          {/* Glowing orbs */}
          <div style={{
            position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '40vw', height: '40vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 242, 254, 0.06) 0%, rgba(79, 172, 254, 0.02) 50%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0, filter: 'blur(40px)'
          }} />

          <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(3rem,8vw,5.5rem)',
                fontWeight: 800, letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                textAlign: 'center', lineHeight: 1
              }}
            >
              ABDULLAH AFTAB
            </motion.div>
            
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', letterSpacing: '0.3em', color: '#7a9ab5', textTransform: 'uppercase' }}>
              Creative Web & Mobile Engineer
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: 240 }}>
              <div style={{ width: '100%', height: 2, background: 'rgba(255,255,255,0.04)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                <motion.div
                  style={{ height: '100%', background: 'linear-gradient(90deg, #00f2fe, #4facfe)', borderRadius: 2 }}
                  animate={{ width: pct + '%' }}
                  transition={{ ease: 'linear', duration: 0.05 }}
                />
              </div>
              <div style={{ fontFamily: 'DM Sans', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', color: '#00f2fe' }}>
                {pct}%
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
