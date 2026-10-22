import { FormEvent, useState } from 'react'
import { ArrowDown, ArrowUpRight, Bell, Check, Gamepad2, Headphones, MonitorPlay, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  return (
    <section id="home" className="relative isolate min-h-[790px] overflow-hidden border-b border-white/[.06] pt-[76px]">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_80%_37%,rgba(103,45,135,.2),transparent_42%),radial-gradient(ellipse_at_12%_32%,rgba(34,129,145,.13),transparent_38%),linear-gradient(180deg,rgba(10,10,17,.1),rgba(9,10,16,.34)_85%)]" />
      <div className="grid-fade absolute inset-0 -z-10 opacity-30" />
      <div className="section-wrap relative z-10 grid min-h-[710px] items-center gap-10 py-16 lg:grid-cols-[1.03fr_.97fr]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/[.07] px-3.5 py-2 text-[11px] font-semibold tracking-[.07em] text-cyan">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" /></span>
            NEXT-GEN GAMING LOUNGE <span className="text-white/30">/</span> PS5 + 4K 120HZ
          </div>
          <h1 className="display-font max-w-[700px] text-[clamp(3.25rem,7.4vw,6.7rem)] font-bold leading-[.98] tracking-[-.075em]">
            Step into<br />the arena.<br /><span className="text-gradient">Own the game.</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-[15px] leading-7 text-white/55 sm:text-base">
            Your next-level night starts here. Squad up on PS5, feel every frame on 4K OLED, and make the leaderboard yours.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#booking" className="group inline-flex items-center gap-3 rounded-full bg-cyan px-6 py-3.5 text-sm font-bold text-[#061015] transition hover:-translate-y-0.5 hover:shadow-[0_8px_35px_rgba(102,245,255,.3)]">
              Find your station <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#games" className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/75 transition hover:border-white/40 hover:text-white">Explore games</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/50">
            <span className="flex items-center gap-2"><MonitorPlay size={15} className="text-cyan" /> 4K OLED · 120Hz</span>
            <span className="flex items-center gap-2"><Gamepad2 size={15} className="text-pink" /> PS5 & PS5 Pro</span>
            <span className="flex items-center gap-2"><Headphones size={15} className="text-[#c69cff]" /> Immersive audio</span>
          </div>
        </motion.div>

        <motion.div className="relative z-10 mt-8 lg:mt-0" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}>
          <div className="absolute -inset-10 -z-10 rounded-full bg-pink/10 blur-[90px]" />
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#120c1b]/65 shadow-[0_30px_100px_rgba(0,0,0,.5)] backdrop-blur-[2px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_50%,rgba(255,65,151,.3),transparent_46%),linear-gradient(135deg,rgba(91,42,126,.28),transparent_48%,rgba(20,110,132,.25))]" />
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(transparent 95%,rgba(255,91,173,.25) 96%),linear-gradient(90deg,transparent 95%,rgba(255,91,173,.25) 96%)', backgroundSize: '32px 32px', transform: 'perspective(400px) rotateX(56deg) scale(1.6) translateY(100px)' }} />
            <div className="relative min-h-[390px] px-6 pb-6 pt-6 sm:min-h-[440px] sm:px-8 sm:pb-8 sm:pt-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-pink/25 bg-pink/10 px-3 py-1.5 text-[10px] font-bold tracking-[.15em] text-[#ff91be]"><Sparkles size={12} /> LAUNCH NIGHT // PRE-BOOK</span>
                <span className="text-[10px] font-semibold tracking-[.18em] text-white/35">COMING SOON</span>
              </div>
              <div className="absolute left-6 top-[26%] sm:left-8">
                <p className="display-font text-xs font-bold tracking-[.45em] text-cyan drop-shadow-[0_0_10px_rgba(102,245,255,.7)]">VICE CITY CALLING</p>
                <h2 className="display-font mt-2 text-[clamp(2.8rem,7vw,5.3rem)] font-bold leading-none tracking-[-.09em] text-white drop-shadow-[0_4px_24px_rgba(255,45,139,.7)]">GTA <span className="text-[#ff63a5]">VI</span></h2>
                <p className="mt-2 text-xs tracking-[.2em] text-white/60">THE NIGHT IS YOURS.</p>
              </div>
              <div className="palm palm-left" aria-hidden="true"><span /><i /><b /></div>
              <div className="palm palm-right" aria-hidden="true"><span /><i /><b /></div>
              <div className="absolute bottom-8 left-6 right-6 sm:left-8 sm:right-8">
                <p className="mb-3 text-xs font-medium text-white/65">Be first in line when the city opens.</p>
                <form className="flex gap-2" onSubmit={handleSubscribe}>
                  <label htmlFor="alert-email" className="sr-only">Email address for GTA VI launch alert</label>
                  <input id="alert-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-xs text-white outline-none placeholder:text-white/35 focus:border-cyan/50" />
                  <button type="submit" aria-label="Sign up for launch alert" className="grid w-12 shrink-0 place-items-center rounded-xl bg-pink text-white transition hover:bg-[#ff77b1]">{subscribed ? <Check size={18} /> : <Bell size={17} />}</button>
                </form>
                {subscribed && <p role="status" className="mt-2 text-[11px] text-cyan">You’re on the list — launch updates are coming your way.</p>}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#15151d]/90 px-4 py-3 shadow-xl sm:flex">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan/10 text-cyan"><Gamepad2 size={18} /></div>
            <div><p className="text-[11px] font-bold">Launch night slots</p><p className="mt-0.5 text-[10px] text-white/45">Get notified when they drop</p></div>
          </div>
        </motion.div>
      </div>
      <a href="#games" aria-label="Scroll to games" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.25em] text-white/35 md:flex"><ArrowDown size={13} /> Scroll to explore</a>
    </section>
  )
}
