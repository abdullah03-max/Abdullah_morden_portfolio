# Abdullah Aftab — Portfolio

A premium futuristic portfolio built with React + Vite, featuring:

- ⚡ **React 18** + **Vite 5**
- 🎨 **Tailwind CSS** — utility-first styling
- 🎬 **Framer Motion** — cinematic animations
- 🌀 **GSAP ScrollTrigger** — scroll-driven effects
- 🌐 **React Three Fiber / Three.js** — 3D hero scene
- 🔮 **Lenis** — buttery smooth scrolling
- ✨ **Custom cursor**, particle canvas, glassmorphism

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Background.jsx     # Particle canvas
│   ├── Contact.jsx        # Contact form + socials
│   ├── Cursor.jsx         # Custom cursor
│   ├── Experience.jsx     # Timeline
│   ├── Footer.jsx
│   ├── Hero.jsx           # 3D hero with R3F
│   ├── Loader.jsx         # Loading screen
│   ├── Navbar.jsx
│   ├── Projects.jsx       # Project cards
│   └── Skills.jsx         # Skill cards w/ drag scroll
├── hooks/
│   └── useReveal.js       # Scroll reveal hook
├── App.jsx                # Root + Lenis setup
├── main.jsx
└── index.css              # Global styles + Tailwind
```

## Customization

- **Personal info**: Update `src/components/Hero.jsx`, `About.jsx`, `Contact.jsx`
- **Projects**: Edit the `projects` array in `src/components/Projects.jsx`
- **Skills**: Edit the `skills` array in `src/components/Skills.jsx`
- **Experience**: Edit `items` array in `src/components/Experience.jsx`
- **Colors**: CSS variables in `src/index.css` under `:root`
- **Profile image**: Replace the `AA` placeholder in `About.jsx` with an `<img>` tag

## Tech Stack

| Category | Tech |
|----------|------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion + GSAP |
| 3D | Three.js + React Three Fiber |
| Smooth Scroll | Lenis |
| 3D Helpers | @react-three/drei |
