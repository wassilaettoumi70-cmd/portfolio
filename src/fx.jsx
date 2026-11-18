import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useInView, animate } from 'framer-motion'

// Particules flottantes reliées entre elles
export function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d'); let raf, W, H
    const fit = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight }
    fit(); window.addEventListener('resize', fit)
    const pts = Array.from({ length: 55 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .6 }))
    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach((a, i) => {
        a.x += a.vx; a.y += a.vy
        if (a.x < 0 || a.x > W) a.vx *= -1
        if (a.y < 0 || a.y > H) a.vy *= -1
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 7); ctx.fillStyle = 'rgba(34,211,238,.7)'; ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) { ctx.strokeStyle = `rgba(139,92,246,${.25 * (1 - d / 120)})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
        }
      })
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', fit) }
  }, [])
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />
}

// Lueur qui suit la souris
export function CursorGlow() {
  const x = useMotionValue(-500), y = useMotionValue(-500)
  const sx = useSpring(x, { damping: 30, stiffness: 150 }), sy = useSpring(y, { damping: 30, stiffness: 150 })
  useEffect(() => {
    const m = e => { x.set(e.clientX - 250); y.set(e.clientY - 250) }
    window.addEventListener('mousemove', m); return () => window.removeEventListener('mousemove', m)
  }, [])
  return <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,.12),transparent_65%)]" />
}

// Barre de progression du scroll
export function ScrollBar() {
  const { scrollYProgress } = useScroll()
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gradient-to-r from-cyan to-violet" />
}

// Texte qui s'écrit tout seul
export function Typing({ words }) {
  const [i, setI] = useState(0), [t, setT] = useState(''), [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i]
    const id = setTimeout(() => {
      if (!del && t === w) return setDel(true)
      if (del && t === '') { setDel(false); return setI((i + 1) % words.length) }
      setT(del ? w.slice(0, t.length - 1) : w.slice(0, t.length + 1))
    }, !del && t === w ? 1400 : del ? 35 : 70)
    return () => clearTimeout(id)
  }, [t, del, i])
  return <span>{t}<span className="animate-pulse text-cyan">|</span></span>
}

// Chiffre qui monte de 0 à la valeur
export function Counter({ value }) {
  const ref = useRef(null), inView = useInView(ref, { once: true })
  const [n, setN] = useState(0), target = parseInt(value)
  useEffect(() => { if (inView) animate(0, target, { duration: 1.6, ease: 'easeOut', onUpdate: v => setN(Math.round(v)) }) }, [inView])
  return <span ref={ref}>{n}</span>
}

// Anneaux qui tournent + point en orbite autour de la photo
export function Rings() {
  return (
    <div className="pointer-events-none absolute -inset-8">
      <motion.div className="absolute inset-0 rounded-full border-2 border-transparent" style={{ borderTopColor: '#8b5cf6', borderRightColor: '#8b5cf6' }} animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute inset-3 rounded-full border border-transparent" style={{ borderBottomColor: '#22d3ee', borderLeftColor: '#22d3ee' }} animate={{ rotate: -360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_#22d3ee]" />
      </motion.div>
      <motion.div className="absolute inset-8 rounded-full" animate={{ boxShadow: ['0 0 30px rgba(34,211,238,.25)', '0 0 70px rgba(139,92,246,.45)', '0 0 30px rgba(34,211,238,.25)'] }} transition={{ duration: 3.5, repeat: Infinity }} />
    </div>
  )
}

// Effet "spotlight" sur les cartes (classe .spot)
export function useSpot() {
  useEffect(() => {
    const m = e => {
      const el = e.target.closest?.('.spot'); if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--x', `${e.clientX - r.left}px`); el.style.setProperty('--y', `${e.clientY - r.top}px`)
    }
    document.addEventListener('mousemove', m); return () => document.removeEventListener('mousemove', m)
  }, [])
}

// Curseur : point + anneau + petits points en orbite
export function Cursor() {
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const rx = useSpring(x, { damping: 22, stiffness: 220 }), ry = useSpring(y, { damping: 22, stiffness: 220 })
  const [hover, setHover] = useState(false)
  useEffect(() => {
    if (!fine) return
    const m = e => { x.set(e.clientX); y.set(e.clientY) }
    const o = e => setHover(!!e.target.closest?.('a,button,input,textarea,.spot'))
    window.addEventListener('mousemove', m); window.addEventListener('mouseover', o)
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', o) }
  }, [])
  if (!fine) return null
  const dot = (l, t, c, s) => <span className={`absolute rounded-full ${c}`} style={{ left: l, top: t, width: s, height: s }} />
  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x: rx, y: ry }} className="absolute left-0 top-0">
        <motion.div animate={{ scale: hover ? 1.7 : 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
          <div className="-ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-cyan/60 bg-cyan/5" />
          <motion.div className="absolute left-0 top-0" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
            {dot(30, -22, 'bg-violet/80', 5)}{dot(-34, 8, 'bg-cyan/70', 4)}
          </motion.div>
          <motion.div className="absolute left-0 top-0" animate={{ rotate: -360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}>
            {dot(6, 40, 'bg-slate-400/70', 4)}{dot(-24, -34, 'bg-violet/60', 3)}
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <div className="-ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_14px_#22d3ee]" />
      </motion.div>
    </div>
  )
}

// Carte qui s'incline en 3D selon la souris
export function Tilt({ children, className }) {
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 180, damping: 18 }), sy = useSpring(ry, { stiffness: 180, damping: 18 })
  const move = e => { const r = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - r.left) / r.width - .5) * 10); rx.set(-((e.clientY - r.top) / r.height - .5) * 10) }
  return <motion.div onMouseMove={move} onMouseLeave={() => { rx.set(0); ry.set(0) }} style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }} className={className}>{children}</motion.div>
}
