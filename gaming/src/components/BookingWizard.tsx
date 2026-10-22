import { FormEvent, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, CreditCard, LockKeyhole, ShieldCheck, Smartphone, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const times = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM']
const stations = [
  { id: 'screen-1', name: 'Screen 1', detail: '65-inch OLED · PS5 Pro', rate: 600, badge: 'MOST POPULAR' },
  { id: 'screen-2', name: 'Screen 2', detail: 'Dual Battle Station · 2 screens', rate: 450, badge: 'SQUAD READY' },
]
const hoursOptions = [1, 2, 3]
const payOptions = ['UPI / QR', 'Credit / Debit Card', 'Net Banking']
const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

function formatDay(date: Date) {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

type BookingWizardProps = { selectedGame: string }

export default function BookingWizard({ selectedGame }: BookingWizardProps) {
  const [step, setStep] = useState(1)
  const [stationId, setStationId] = useState(stations[0].id)
  const [date, setDate] = useState(() => {
    const next = new Date()
    next.setDate(next.getDate() + 1)
    return next
  })
  const [selectedTime, setSelectedTime] = useState('')
  const [hours, setHours] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [payment, setPayment] = useState(payOptions[0])
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [lockSeconds, setLockSeconds] = useState(600)
  const station = stations.find((item) => item.id === stationId) ?? stations[0]
  const subtotal = station.rate * hours
  const deposit = Math.round(subtotal * 0.25)
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + tax
  const dateOptions = useMemo(() => Array.from({ length: 7 }, (_, index) => {
    const next = new Date()
    next.setDate(next.getDate() + index + 1)
    return next
  }), [])

  useEffect(() => {
    if (!checkoutOpen || confirmed) return
    setLockSeconds(600)
    const timer = window.setInterval(() => setLockSeconds((remaining) => Math.max(0, remaining - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [checkoutOpen, confirmed])

  const slotStatus = (time: string, day: Date) => {
    if (time === '12:00 PM' && day.getDate() % 2 === 0) return 'Booked'
    if (time === '6:00 PM' && day.getDate() % 2 !== 0) return 'Filling fast'
    return 'Available'
  }

  function changeDay(direction: number) {
    const currentIndex = dateOptions.findIndex((day) => day.toDateString() === date.toDateString())
    const nextIndex = Math.min(dateOptions.length - 1, Math.max(0, currentIndex + direction))
    setDate(dateOptions[nextIndex])
    setSelectedTime('')
  }

  function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCheckoutOpen(true)
    setConfirmed(false)
  }

  return (
    <section id="booking" className="relative overflow-hidden border-y border-white/[.06] bg-[rgba(11,12,19,.75)] py-24 sm:py-28 backdrop-blur-[2px]">
      <div className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-cyan/[.06] blur-[100px]" />
      <div className="section-wrap relative">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-bold tracking-[.24em] text-pink">YOUR NIGHT, YOUR RULES</p>
          <h2 className="display-font text-3xl font-bold tracking-[-.05em] sm:text-4xl">Lock in your <span className="text-gradient">play time.</span></h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/45">Three quick steps to your seat. No surprises, just game time.</p>
        </div>

        <div className="mx-auto grid max-w-[1040px] gap-5 lg:grid-cols-[1fr_310px]">
          <div className="glass rounded-[24px] p-5 sm:p-8">
            <div className="mb-8 flex items-center gap-2">
              {['Station', 'Time slot', 'Your details'].map((label, index) => (
                <div key={label} className="flex flex-1 items-center gap-2 last:flex-none sm:gap-3">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-bold ${step > index + 1 ? 'border-cyan bg-cyan text-ink' : step === index + 1 ? 'border-cyan bg-cyan/10 text-cyan' : 'border-white/15 text-white/35'}`}>{step > index + 1 ? <Check size={15} /> : `0${index + 1}`}</span>
                  <span className={`hidden text-[11px] font-semibold sm:block ${step === index + 1 ? 'text-white' : 'text-white/35'}`}>{label}</span>
                  {index < 2 && <span className="h-px flex-1 bg-white/10" />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <div className="mb-5"><h3 className="display-font text-lg font-semibold">Choose your setup</h3><p className="mt-1 text-xs text-white/45">Every station comes with a PS5 and a fresh controller.{selectedGame && <span className="text-cyan"> Game pick: {selectedGame}</span>}</p></div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {stations.map((item) => (
                    <button key={item.id} onClick={() => setStationId(item.id)} className={`relative rounded-2xl border p-5 text-left transition ${stationId === item.id ? 'border-cyan/55 bg-cyan/[.07] neon-shadow' : 'border-white/10 bg-white/[.02] hover:border-white/25'}`}>
                      <span className="absolute right-4 top-4 rounded-full bg-white/[.07] px-2 py-1 text-[8px] font-bold tracking-[.1em] text-white/55">{item.badge}</span>
                      <span className={`mb-5 grid h-11 w-11 place-items-center rounded-xl ${stationId === item.id ? 'bg-cyan/15 text-cyan' : 'bg-white/[.07] text-white/50'}`}><CalendarDays size={20} /></span>
                      <p className="display-font font-semibold">{item.name}</p>
                      <p className="mt-1 text-xs text-white/45">{item.detail}</p>
                      <p className="mt-4 text-sm font-bold text-cyan">{currency.format(item.rate)}<span className="font-normal text-white/40"> / hour</span></p>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 rounded-full bg-cyan px-5 py-3 text-xs font-bold text-ink transition hover:bg-white">Pick a time <ArrowRight size={15} /></button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="mb-5"><h3 className="display-font text-lg font-semibold">Find your play time</h3><p className="mt-1 text-xs text-white/45">Slots shown in local time. Booked slots can’t be selected.</p></div>
                <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/[.08] bg-white/[.025] p-3">
                  <button aria-label="Previous date" onClick={() => changeDay(-1)} disabled={date.toDateString() === dateOptions[0].toDateString()} className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-white/70 transition hover:border-cyan/40 disabled:opacity-30"><ChevronLeft size={17} /></button>
                  <div className="text-center"><p className="text-[9px] font-bold tracking-[.15em] text-white/40">SELECTED DATE</p><p className="mt-1 text-sm font-semibold">{formatDay(date)}</p></div>
                  <button aria-label="Next date" onClick={() => changeDay(1)} disabled={date.toDateString() === dateOptions[dateOptions.length - 1].toDateString()} className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-white/70 transition hover:border-cyan/40 disabled:opacity-30"><ChevronRight size={17} /></button>
                </div>
                <div className="mb-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {dateOptions.map((day) => (
                    <button key={day.toISOString()} onClick={() => { setDate(day); setSelectedTime('') }} className={`min-w-[76px] rounded-xl border px-3 py-2.5 text-center transition ${date.toDateString() === day.toDateString() ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-white/10 text-white/55 hover:border-white/25'}`}>
                      <span className="block text-[9px] uppercase">{day.toLocaleDateString('en-IN', { weekday: 'short' })}</span><span className="mt-1 block text-sm font-semibold">{day.getDate()}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {times.map((time) => {
                    const status = slotStatus(time, date)
                    const booked = status === 'Booked'
                    return <button key={time} disabled={booked} onClick={() => setSelectedTime(time)} className={`rounded-xl border px-3 py-3 text-left transition ${booked ? 'cursor-not-allowed border-white/[.05] bg-white/[.015] opacity-40' : selectedTime === time ? 'border-cyan/50 bg-cyan/10' : 'border-white/10 hover:border-white/25'}`}>
                      <span className={`block text-xs font-semibold ${selectedTime === time ? 'text-cyan' : 'text-white/80'}`}>{time}</span>
                      <span className={`mt-1 block text-[9px] ${booked ? 'text-white/35' : status === 'Filling fast' ? 'text-amber-300' : 'text-emerald-300'}`}>{status}</span>
                    </button>
                  })}
                </div>
                <div className="mt-7 flex justify-between">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-xs font-semibold text-white/65 hover:border-white/25"><ArrowLeft size={15} /> Back</button>
                  <button disabled={!selectedTime} onClick={() => setStep(3)} className="flex items-center gap-2 rounded-full bg-cyan px-5 py-3 text-xs font-bold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35">Your details <ArrowRight size={15} /></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={submitDetails}>
                <div className="mb-5"><h3 className="display-font text-lg font-semibold">Who’s playing?</h3><p className="mt-1 text-xs text-white/45">Enter your details so we can hold your station.</p></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-[11px] font-semibold text-white/65">Your name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Player name" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan/50" /></label>
                  <label className="text-[11px] font-semibold text-white/65">Phone number<input required type="tel" inputMode="tel" pattern="[0-9+() -]{8,16}" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91 98765 43210" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan/50" /></label>
                </div>
                <fieldset className="mt-6"><legend className="mb-3 text-[11px] font-semibold text-white/65">How long are you playing?</legend><div className="grid grid-cols-3 gap-2">{hoursOptions.map((option) => <button type="button" key={option} onClick={() => setHours(option)} className={`rounded-xl border px-3 py-3 text-xs font-semibold transition ${hours === option ? 'border-cyan/50 bg-cyan/10 text-cyan' : 'border-white/10 text-white/55 hover:border-white/25'}`}>{option} {option === 1 ? 'hour' : 'hours'}</button>)}</div></fieldset>
                <div className="mt-5 rounded-xl border border-white/[.08] bg-white/[.025] p-4 text-xs text-white/60">Your 25% deposit holds the slot. Remaining balance is payable at the lounge.</div>
                <div className="mt-7 flex justify-between">
                  <button type="button" onClick={() => setStep(2)} className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-xs font-semibold text-white/65 hover:border-white/25"><ArrowLeft size={15} /> Back</button>
                  <button type="submit" className="flex items-center gap-2 rounded-full bg-cyan px-5 py-3 text-xs font-bold text-ink transition hover:bg-white">Continue to checkout <ArrowRight size={15} /></button>
                </div>
              </form>
            )}
          </div>

          <aside id="pricing" className="glass h-fit rounded-[24px] p-6">
            <div className="flex items-center justify-between"><h3 className="display-font font-semibold">Booking summary</h3><span className="rounded-full bg-cyan/10 px-2.5 py-1 text-[9px] font-bold text-cyan">PREVIEW</span></div>
            <div className="mt-5 space-y-4 border-b border-white/[.08] pb-5 text-xs">
              <div className="flex justify-between gap-3"><span className="text-white/45">Station</span><span className="text-right font-medium">{station.name}<br /><span className="text-[10px] text-white/35">{station.detail}</span></span></div>
              <div className="flex justify-between"><span className="text-white/45">Date & time</span><span className="font-medium text-right">{formatDay(date)}{selectedTime && <><br /><span className="text-[10px] text-white/45">{selectedTime}</span></>}</span></div>
              <div className="flex justify-between"><span className="text-white/45">Duration</span><span className="font-medium">{hours} {hours === 1 ? 'hour' : 'hours'}</span></div>
            </div>
            <div className="space-y-3 py-5 text-xs">
              <div className="flex justify-between"><span className="text-white/45">Play time · {currency.format(station.rate)}/hr</span><span>{currency.format(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-white/45">Taxes · GST 18%</span><span>{currency.format(tax)}</span></div>
              <div className="flex justify-between border-t border-white/[.08] pt-4 text-sm font-bold"><span>Total</span><span className="text-cyan">{currency.format(total)}</span></div>
            </div>
            <div className="rounded-xl border border-cyan/15 bg-cyan/[.05] p-3.5">
              <div className="flex justify-between text-xs font-semibold"><span>Due now · 25% deposit</span><span className="text-cyan">{currency.format(deposit)}</span></div>
              <p className="mt-1.5 text-[10px] leading-4 text-white/40">Remaining {currency.format(total - deposit)} payable at the lounge.</p>
            </div>
            <p className="mt-4 flex items-center gap-2 text-[10px] text-white/40"><LockKeyhole size={12} className="text-cyan" /> Secure, encrypted checkout</p>
          </aside>
        </div>
        <div className="mx-auto mt-6 grid max-w-[1040px] gap-3 sm:grid-cols-3">
          {[['Instant confirmation', 'Your slot details, straight away.'], ['Protected checkout', 'Your payment details stay secure.'], ['Gear guaranteed', 'Verified PS5 & 4K equipment.']].map(([title, desc]) => (
            <div key={title} className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.02] p-4"><ShieldCheck size={18} className="shrink-0 text-cyan" /><div><p className="text-[11px] font-semibold">{title}</p><p className="mt-1 text-[10px] text-white/40">{desc}</p></div></div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {checkoutOpen && (
          <motion.div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false) }}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="relative my-auto w-full max-w-[470px] rounded-[26px] border border-white/10 bg-[#12131c] p-6 shadow-2xl sm:p-8" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .97 }}>
              <button onClick={() => setCheckoutOpen(false)} aria-label="Close checkout" className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/55 hover:text-white"><X size={16} /></button>
              {confirmed ? (
                <div className="py-8 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/10 text-emerald-300"><Check size={27} /></span><h2 id="checkout-title" className="display-font mt-5 text-2xl font-bold">You’re on the roster.</h2><p className="mt-2 text-sm text-white/50">This is a demo checkout. No payment was taken.</p><button onClick={() => { setCheckoutOpen(false); setStep(1) }} className="mt-7 rounded-full bg-cyan px-6 py-3 text-xs font-bold text-ink">Back to Aura Arena</button></div>
              ) : (
                <>
                  <div className="mb-6"><p className="text-[10px] font-bold tracking-[.2em] text-cyan">ALMOST GAME TIME</p><h2 id="checkout-title" className="display-font mt-2 text-2xl font-bold">Secure your slot</h2><p className="mt-2 text-xs text-white/45">{lockSeconds > 0 ? <>Your station is held for <span className="font-semibold text-amber-300">{String(Math.floor(lockSeconds / 60)).padStart(2, '0')}:{String(lockSeconds % 60).padStart(2, '0')}</span> once checkout starts.</> : <span className="font-semibold text-pink">Your slot hold has expired. Close checkout to choose a new time.</span>}</p></div>
                  <div className="mb-5 rounded-2xl border border-white/[.08] bg-white/[.025] p-4"><div className="flex justify-between text-xs"><span className="text-white/50">{station.name} · {hours} {hours === 1 ? 'hour' : 'hours'}</span><span>{formatDay(date)}</span></div><div className="mt-2 flex justify-between text-xs"><span className="text-white/50">{selectedTime}</span><span className="font-semibold text-cyan">Deposit {currency.format(deposit)}</span></div></div>
                  <fieldset><legend className="mb-3 text-[11px] font-semibold text-white/65">Choose payment method</legend><div className="space-y-2">
                    {payOptions.map((option, index) => <button key={option} onClick={() => setPayment(option)} className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition ${payment === option ? 'border-cyan/50 bg-cyan/[.07]' : 'border-white/10 hover:border-white/25'}`}><span className={`grid h-9 w-9 place-items-center rounded-lg ${payment === option ? 'bg-cyan/10 text-cyan' : 'bg-white/[.06] text-white/50'}`}>{index === 0 ? <Smartphone size={17} /> : index === 1 ? <CreditCard size={17} /> : <ArrowRight size={17} />}</span><span className="flex-1 text-xs font-medium">{option}</span><span className={`h-4 w-4 rounded-full border ${payment === option ? 'border-cyan bg-cyan shadow-[inset_0_0_0_4px_#12131c]' : 'border-white/25'}`} /></button>)}
                  </div></fieldset>
                  <div className="mt-5 flex items-center gap-2 text-[10px] text-white/40"><LockKeyhole size={12} className="text-cyan" /> Demo checkout only — payment is not processed.</div>
                  <button disabled={lockSeconds === 0} onClick={() => setConfirmed(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-cyan py-3.5 text-xs font-bold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">{lockSeconds > 0 ? <>Pay {currency.format(deposit)} · {payment} <ArrowRight size={15} /></> : 'Slot hold expired'}</button>
                  <p className="mt-3 text-center text-[10px] text-white/35">By continuing, you agree to our cancellation policy.</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
