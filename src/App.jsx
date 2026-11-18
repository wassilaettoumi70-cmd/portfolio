import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cursor, Particles, CursorGlow, ScrollBar, Typing, Counter, Rings, Tilt, useSpot } from './fx'
import { Github, Linkedin, MessageCircle, Mail, ArrowUpRight, Layers, Monitor, Server, Smartphone, Database, Users } from 'lucide-react'
import { profile as p, tools, stats, projects, experience, services } from './data'

const up = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.7, delay: d } })
const COLORS = { React: '#22d3ee', JavaScript: '#facc15', HTML5: '#f4522a', CSS3: '#3b82f6', 'Tailwind CSS': '#38bdf8', PHP: '#a78bfa', Laravel: '#ff2d20', 'Node.js': '#4ade80', 'Express.js': '#e5e7eb', Python: '#fbbf24', MySQL: '#60a5fa', MongoDB: '#22c55e', Git: '#f97316', Jira: '#2684ff', Postman: '#fb923c' }
const ICONS = [Layers, Monitor, Server, Smartphone, Database, Users]
const links = ['Home', 'About', 'Projects', 'Experience', 'Services', 'Contact']

function Title({ n, label, title, sub }) {
  return (
    <motion.div {...up()} className="mb-12">
      <div className="font-mono text-xs text-cyan">// {n}. {label}</div>
      <h2 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-slate-400">{sub}</p>}
      <div className="mt-4 h-px w-20 bg-gradient-to-r from-cyan to-transparent" />
    </motion.div>
  )
}

function Photo({ big }) {
  const [ok, setOk] = useState(true)
  const size = big ? 'h-72 w-72 md:h-80 md:w-80' : 'h-40 w-40'
  return (
    <div className={`relative ${size} shrink-0`}>
      {big ? <Rings /> : <div className="ring absolute -inset-1 rounded-full blur-[2px]" />}
      <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-bg bg-card">
        {ok ? <img src={p.photo} alt={p.firstName} onError={() => setOk(false)} className="h-full w-full object-cover" />
            : <div className="flex h-full w-full items-center justify-center text-6xl font-bold grad-text">WE</div>}
      </div>
    </div>
  )
}

function Contact() {
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '' })
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const send = () => {
    const body = `${f.message}\n\n— ${f.name} (${f.email})`
    window.location.href = `mailto:${p.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`
  }
  const input = 'w-full rounded-lg border border-line bg-card px-4 py-3 text-sm outline-none focus:border-cyan'
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="space-y-3">
        <p className="mb-6 text-slate-400">Je suis ouverte aux stages et aux projets freelance. Écrivez-moi, je réponds vite.</p>
        {[[Github, p.github], [Linkedin, p.linkedin], [MessageCircle, p.whatsapp], [Mail, `mailto:${p.email}`]].map(([I, h], i) => (
          <motion.a key={i} href={h} target="_blank" rel="noreferrer" aria-label="contact" {...up(i * 0.08)} whileHover={{ x: 8 }} className="spot group flex items-center justify-between rounded-xl border border-line bg-card px-6 py-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan transition duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(34,211,238,.5)]"><I size={20} /></span>
            <ArrowUpRight className="text-slate-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan" />
          </motion.a>
        ))}
      </div>
      <div className="space-y-4">
        <label className="font-mono text-xs text-slate-500">Nom complet</label><input className={input} placeholder="Votre nom" value={f.name} onChange={set('name')} />
        <label className="font-mono text-xs text-slate-500">Adresse email</label><input className={input} placeholder="vous@exemple.com" value={f.email} onChange={set('email')} />
        <label className="font-mono text-xs text-slate-500">Sujet</label><input className={input} placeholder="Que construisez-vous ?" value={f.subject} onChange={set('subject')} />
        <label className="font-mono text-xs text-slate-500">Message</label><textarea rows={5} className={input} placeholder="Parlez-moi de votre projet…" value={f.message} onChange={set('message')} />
        <button onClick={send} className="grad-btn w-full rounded-lg py-3 font-semibold">Ouvrir l’application email →</button>
      </div>
    </div>
  )
}

export default function App() {
  useSpot()
  return (
    <main className="relative overflow-x-hidden">
      <Cursor /><CursorGlow /><ScrollBar />
      <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="font-mono font-bold grad-text">WE.</a>
          <div className="hidden gap-7 text-sm text-slate-300 md:flex">{links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-cyan">{l}</a>)}</div>
          <a href={p.cv} target="_blank" rel="noreferrer" className="rounded border border-cyan px-4 py-1.5 font-mono text-xs text-cyan hover:bg-cyan/10">CV</a>
        </nav>
      </header>

      <section id="home" className="relative">
        <div className="grid-bg absolute inset-0" /><Particles />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:py-32">
          <div>
            <motion.div {...up()} className="font-mono text-xs uppercase tracking-widest text-cyan">● Disponible pour un stage</motion.div>
            <motion.h1 {...up(0.1)} className="mt-5 text-6xl font-extrabold leading-none md:text-8xl">{p.firstName}<br /><span className="grad-text">{p.lastName}</span></motion.h1>
            <motion.p {...up(0.2)} className="mt-5 font-mono text-cyan"><Typing words={[p.role, 'Front-end React', 'Back-end PHP / Laravel']} /></motion.p>
            <motion.p {...up(0.3)} className="mt-4 max-w-lg text-lg text-slate-300">{p.headline}</motion.p>
            <motion.p {...up(0.35)} className="mt-3 max-w-lg text-sm text-slate-500">{p.sub}</motion.p>
            <motion.div {...up(0.4)} className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="grad-btn rounded-lg px-6 py-3 text-sm font-semibold">Voir les projets</a>
              <a href={p.cv} download className="rounded-lg border border-line bg-card px-6 py-3 text-sm">Télécharger le CV</a>
            </motion.div>
            <motion.div {...up(0.5)} className="mt-8 flex gap-5 font-mono text-xs text-slate-500">
              <a href={p.github} className="hover:text-cyan">GitHub</a><a href={p.linkedin} className="hover:text-cyan">LinkedIn</a><a href={`mailto:${p.email}`} className="hover:text-cyan">Email</a>
            </motion.div>
          </div>
          <motion.div {...up(0.2)} className="flex justify-center"><Photo big /></motion.div>
        </div>
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-widest text-slate-500 md:flex">SCROLL<span className="relative h-6 w-px bg-line"><span className="scrolldot absolute left-[-1px] top-0 h-1.5 w-1.5 rounded-full bg-cyan" /></span></div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <Title n="01" label="about" title="Qui suis-je" sub="Un peu sur moi et sur ce que je fais." />
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div {...up()} className="flex flex-col gap-6">
            <Photo />
            <p className="text-slate-300">{p.about}</p>
            <div className="font-mono text-xs text-cyan">// basée à {p.city}</div>
            <div className="flex gap-3">
              {[['GitHub', p.github, Github], ['LinkedIn', p.linkedin, Linkedin]].map(([n, h, I]) => (
                <a key={n} href={h} target="_blank" rel="noreferrer" className="group flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2 font-mono text-xs transition hover:-translate-y-1 hover:border-cyan hover:text-cyan hover:shadow-[0_0_18px_rgba(34,211,238,.3)]">
                  <I size={15} className="transition group-hover:rotate-12 group-hover:scale-110" />{n}<ArrowUpRight size={13} className="opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div {...up(0.1)}>
            <div className="font-mono text-xs text-slate-500">// outils que j’utilise</div>
            <div className="mt-4 flex flex-wrap gap-2">{tools.map(t => <span key={t} style={{ '--c': COLORS[t] || '#22d3ee' }} className="chip rounded-md px-3 py-1.5 font-mono text-xs">{t}</span>)}</div>
            <div className="mt-8 grid grid-cols-3 gap-3">{stats.map(s => <div key={s.l} className="spot rounded-lg border border-line bg-card p-5 text-center"><div className="text-2xl font-bold grad-text"><Counter value={s.v} /></div><div className="mt-1 text-xs text-slate-500">{s.l}</div></div>)}</div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
        <Title n="02" label="projects" title="Projets" sub="Une sélection de ce que j’ai construit." />
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((pr, i) => (
            <motion.div key={pr.title} {...up(i * 0.1)} className={i === projects.length - 1 && projects.length % 2 ? 'md:col-span-2' : ''}>
              <Tilt className="spot group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-cyan/25 via-bg to-violet/30">
                  {pr.image && <img src={pr.image} alt={pr.title} className="absolute inset-0 z-[5] h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />}
                  <div className="grid-bg absolute inset-0 opacity-60" />
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-bg/80 px-3 py-1 font-mono text-[11px] backdrop-blur">0{i + 1} / 0{projects.length}</span>
                  <div className="absolute inset-x-8 bottom-0 top-14 rounded-t-xl border border-line bg-bg/80 p-3 transition duration-500 group-hover:-translate-y-2">
                    <div className="flex gap-1.5">{['#f87171', '#facc15', '#4ade80'].map(c => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}</div>
                    <div className="mt-4 space-y-2"><div className="h-2 w-3/4 rounded bg-cyan/30" /><div className="h-2 w-1/2 rounded bg-violet/30" /><div className="h-2 w-2/3 rounded bg-slate-600/40" /></div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between"><span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{pr.cat}</span><span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_#22d3ee]" /></div>
                  <h3 className="mt-3 text-2xl font-bold transition group-hover:text-cyan">{pr.title}</h3>
                  <p className="mt-3 flex-1 text-slate-400">{pr.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{pr.stack.map(t => <span key={t} style={{ '--c': COLORS[t] || '#94a3b8' }} className="chip rounded-md px-3 py-1.5 font-mono text-xs">{t}</span>)}</div>
                  <div className="mt-6 flex gap-3">
                    <a href={pr.github || p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 font-mono text-xs transition hover:-translate-y-1 hover:border-cyan hover:text-cyan">GitHub <ArrowUpRight size={13} /></a>
                    {pr.demo && <a href={pr.demo} target="_blank" rel="noreferrer" className="grad-btn flex items-center gap-1.5 rounded-lg px-4 py-2 font-mono text-xs font-semibold">Démo <ArrowUpRight size={13} /></a>}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
        <Title n="03" label="experience" title="Mon parcours" />
        <div className="relative grid gap-10 md:grid-cols-2 md:gap-x-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan/60 via-line to-transparent md:block" />
          {[['Formation', 'left'], ['Stage', 'right']].map(([k, side]) => (
            <div key={k} className={`space-y-6 ${side === 'right' ? 'md:pt-24' : ''}`}>
              <div className={`font-mono text-xs text-cyan ${side === 'right' ? 'md:text-left' : 'md:text-right'}`}>// {k.toLowerCase()}</div>
              {experience.filter(e => e.kind === k).map((e, i) => (
                <motion.div key={e.title} initial={{ opacity: 0, x: side === 'left' ? -60 : 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay: i * 0.12 }} whileHover={{ y: -6 }}
                  className="spot group relative rounded-2xl border border-line bg-card p-6">
                  <span className={`absolute top-8 hidden h-3.5 w-3.5 rounded-full border-2 border-cyan bg-bg transition group-hover:scale-150 group-hover:bg-cyan md:block ${side === 'left' ? '-right-[2.45rem]' : '-left-[2.45rem]'}`} />
                  <div className="flex flex-wrap items-start justify-between gap-2"><h3 className="max-w-[75%] font-semibold">{e.title}</h3><span className={`rounded-full border px-3 py-1 font-mono text-[11px] ${k === 'Stage' ? 'border-cyan/30 bg-cyan/10 text-cyan' : 'border-amber-400/30 bg-amber-400/10 text-amber-300'}`}>{e.kind}</span></div>
                  <div className="mt-1 text-sm text-slate-400">{e.place}</div>
                  <div className="mt-1 font-mono text-xs text-slate-500">{e.date}</div>
                  {e.points.length > 0 && <ul className="mt-4 space-y-2 text-sm text-slate-300">{e.points.map(x => <li key={x} className="flex gap-2"><span className="text-cyan transition group-hover:translate-x-1">▸</span>{x}</li>)}</ul>}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-24">
        <Title n="04" label="services" title="Ce que je fais" sub="Une boîte à outils pour transformer vos idées en produits utiles." />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map(([t, d], i) => { const I = ICONS[i]; return (
            <motion.div key={t} {...up(i * 0.08)} whileHover={{ y: -8 }} className="spot group flex min-h-[260px] flex-col rounded-2xl border border-line bg-card p-8">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(34,211,238,.5)]"><I size={24} /></span>
                <span className="font-mono text-xs text-slate-600 transition group-hover:text-cyan">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-xl font-bold">{t}</h3>
              <p className="mt-3 text-slate-400">{d}</p>
              <div className="mt-auto h-px w-0 bg-gradient-to-r from-cyan to-violet pt-0 transition-all duration-500 group-hover:w-full" />
            </motion.div>) })}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <Title n="05" label="contact" title="Travaillons ensemble" sub="Un projet en tête ? J’aimerais en discuter." />
        <Contact />
      </section>

      <footer className="border-t border-line px-6 py-8 text-center font-mono text-xs text-slate-500">© {new Date().getFullYear()} {p.firstName} {p.lastName} · {p.city}</footer>
    </main>
  )
}
