import { BadgeCheck, Clock3, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export default function TrustStrip() {
  const benefits: { icon: LucideIcon; title: string; copy: string }[] = [
    { icon: Clock3, title: 'No wait, all play', copy: 'Instant booking confirmation' },
    { icon: ShieldCheck, title: '256-bit encrypted', copy: 'Protected checkout experience' },
    { icon: BadgeCheck, title: 'Gear you can trust', copy: 'Verified PS5 & 4K equipment' },
  ]

  return (
    <section className="section-wrap py-12">
      <div className="grid gap-3 sm:grid-cols-3">
        {benefits.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/[.07] bg-white/[.025] px-5 py-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan/15 bg-cyan/[.07] text-cyan"><Icon size={18} /></span>
            <div><p className="text-xs font-bold">{title}</p><p className="mt-1 text-[10px] text-white/40">{copy}</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}
