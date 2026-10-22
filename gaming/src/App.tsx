import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GamesCatalog from './components/GamesCatalog'
import BookingWizard from './components/BookingWizard'
import TrustStrip from './components/TrustStrip'
import Footer from './components/Footer'
import NeonScene from './components/NeonScene'

export default function App() {
  const [selectedGame, setSelectedGame] = useState('')

  function bookGame(game: string) {
    setSelectedGame(game)
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <NeonScene />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,16,.12),rgba(9,10,16,.38)_50%,rgba(9,10,16,.65))]" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <GamesCatalog onBookGame={bookGame} />
          <div className="sr-only" aria-live="polite">{selectedGame ? `${selectedGame} selected. Choose a station below.` : ''}</div>
          <BookingWizard selectedGame={selectedGame} />
          <TrustStrip />
        </main>
        <Footer />
      </div>
    </div>
  )
}
