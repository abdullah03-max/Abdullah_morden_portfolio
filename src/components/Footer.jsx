export default function Footer() {
  return (
    <footer style={{
      padding: '2rem 4vw',
      borderTop: '1px solid rgba(99, 102, 241, 0.15)',
      textAlign: 'center',
      color: '#8b86b5',
      fontSize: '0.8rem',
      position: 'relative',
      zIndex: 1
    }}>
      <p>
        Crafted with ❤️ by{' '}
        <span style={{ color: 'var(--neon)' }}>Abdullah Aftab</span>
        {' '}· 2026
      </p>
      <p style={{ marginTop: '0.4rem', fontSize: '0.72rem', opacity: 0.5 }}>
        Web &amp; App Developer · Available for Freelance
      </p>
    </footer>
  )
}
