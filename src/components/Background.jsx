import { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, orbs = [], raf

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Orb {
      constructor() {
        this.reset()
        // Randomize initial positions across viewport
        this.x = Math.random() * W
        this.y = Math.random() * H
      }

      reset() {
        this.size = Math.random() * 250 + 150 // Giant soft metaballs
        this.x = Math.random() > 0.5 ? -this.size : W + this.size
        this.y = Math.random() * H
        this.speedX = (Math.random() - 0.5) * 0.45
        this.speedY = (Math.random() - 0.5) * 0.45
        this.opacity = Math.random() * 0.08 + 0.03
        // Theme gradient colors: pink/magenta or indigo
        this.color = Math.random() > 0.5 ? '236, 72, 153' : '99, 102, 241'
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around boundaries
        if (
          this.x < -this.size * 1.5 || 
          this.x > W + this.size * 1.5 || 
          this.y < -this.size * 1.5 || 
          this.y > H + this.size * 1.5
        ) {
          this.reset()
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        )
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity * 0.4})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    // Create a pool of giant dynamic 3D-effect orbs
    const orbCount = Math.min(6, Math.floor((W * H) / 200000) + 2)
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new Orb())
    }

    const animate = () => {
      ctx.fillStyle = '#04020f' // Match background variables
      ctx.fillRect(0, 0, W, H)

      // Draw subtle grid mesh pattern over the background
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.015)'
      ctx.lineWidth = 1
      const gridSize = 45
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      orbs.forEach(orb => {
        orb.update()
        orb.draw()
      })

      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none'
    }} />
  )
}
