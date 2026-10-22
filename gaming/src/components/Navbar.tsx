import { useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'

const links = [
  ['Home', '#home'],
  ['Games catalog', '#games'],
  ['Book a station', '#booking'],
  ['Pricing', '#pricing'],
  ['Location', '#location'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#090a10]/80 backdrop-blur-xl">
      <div className="section-wrap flex h-[76px] items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5" aria-label="Aura Arena home">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan neon-shadow">
            <Zap size={19} fill="currentColor" />
          </span>
          <span className="display-font text-[15px] font-bold leading-[.95] tracking-[.12em]">
            <span className="text-gradient">AURA</span><br />
            <span className="text-[11px] tracking-[.29em] text-white/65">ARENA</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] font-medium text-white/60 transition hover:text-cyan">{label}</a>
          ))}
        </nav>

        <a href="#booking" className="hidden items-center gap-2 rounded-full bg-cyan px-5 py-2.5 text-[13px] font-bold text-[#071015] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_25px_rgba(102,245,255,.35)] md:flex">
          Book now <Zap size={14} />
        </a>
        <button className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-[#0c0d14] px-6 py-4 md:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-white/[.06] py-3 text-sm text-white/70 last:border-0">{label}</a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)} className="mt-4 block rounded-xl bg-cyan px-4 py-3 text-center text-sm font-bold text-ink">Book your station</a>
        </nav>
      )}
    </header>
  )
}
