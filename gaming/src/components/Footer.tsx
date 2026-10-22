import { ArrowUpRight, Clock3, Instagram, MapPin, MessageCircle, Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="location" className="border-t border-white/[.07] bg-[rgba(8,9,14,.88)]">
      <div className="section-wrap grid gap-10 py-14 md:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
        <div>
          <a href="#home" className="inline-flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan"><Zap size={19} fill="currentColor" /></span><span className="display-font text-sm font-bold leading-[.95] tracking-[.12em]"><span className="text-gradient">AURA</span><br /><span className="text-[10px] tracking-[.29em] text-white/60">ARENA</span></span></a>
          <p className="mt-4 max-w-[250px] text-xs leading-5 text-white/40">A place for your crew, your game, your next great night. Play beyond ordinary.</p>
          <div className="mt-4 flex gap-2"><a href="https://instagram.com" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 hover:border-pink/40 hover:text-pink"><Instagram size={15} /></a><a href="https://wa.me/" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 hover:border-cyan/40 hover:text-cyan"><MessageCircle size={15} /></a></div>
        </div>
        <div><h3 className="mb-4 text-[10px] font-bold tracking-[.18em] text-white/75">EXPLORE</h3><div className="space-y-3 text-xs text-white/45"><a href="#games" className="block hover:text-cyan">Games catalog</a><a href="#booking" className="block hover:text-cyan">Book a station</a><a href="#pricing" className="block hover:text-cyan">Pricing & deposits</a><a href="#location" className="block hover:text-cyan">Find the lounge</a></div></div>
        <div><h3 className="mb-4 text-[10px] font-bold tracking-[.18em] text-white/75">COME THROUGH</h3><div className="space-y-3 text-xs text-white/45"><p className="flex items-start gap-2"><MapPin size={14} className="shrink-0 text-cyan" /> Your neighborhood, your city<br /><span className="pl-[22px]">Location details coming soon</span></p><p className="flex items-center gap-2"><Clock3 size={14} className="text-cyan" /> Daily · 10:00 AM – 12:00 AM</p></div></div>
        <div><h3 className="mb-4 text-[10px] font-bold tracking-[.18em] text-white/75">GOOD TO KNOW</h3><div className="space-y-3 text-xs text-white/45"><a href="#booking" className="flex items-center gap-1.5 hover:text-cyan">Cancellation policy <ArrowUpRight size={12} /></a><p>Bookings are prototypes; no real payment is taken.</p><a href="#games" className="block hover:text-cyan">PS5 gaming lounge</a><a href="#games" className="block hover:text-cyan">4K gaming experience</a></div></div>
      </div>
      <div className="border-t border-white/[.06]"><div className="section-wrap flex flex-col justify-between gap-2 py-4 text-[10px] text-white/30 sm:flex-row"><span>© 2026 Aura Arena. Play nice. Play hard.</span><span className="flex items-center gap-1">Built for the next player <Zap size={10} className="text-cyan" fill="currentColor" /></span></div></div>
    </footer>
  )
}
