import { ArrowUpRight, Gamepad2, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const games = [
  { title: "Marvel's Spider-Man 2", tag: 'PS5 EXCLUSIVE', genre: 'Action · Adventure', players: '1 player', art: 'spider', artLabel: "Marvel's Spider-Man 2 game artwork", image: 'https://cdn.akamai.steamstatic.com/steam/apps/2651280/header.jpg' },
  { title: 'WWE 2K', tag: 'FAN FAVORITE', genre: 'Sports · Fighting', players: '1–4 players', art: 'wwe', artLabel: 'WWE 2K25 game artwork', image: 'https://cdn.akamai.steamstatic.com/steam/apps/2878960/header.jpg' },
  { title: 'Need for Speed', tag: 'RACE NIGHT', genre: 'Racing · Action', players: '1–2 players', art: 'racing', artLabel: 'Need for Speed Unbound game artwork', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1846380/header.jpg' },
  { title: 'Grand Theft Auto V', tag: 'GTA VI COUNTDOWN', genre: 'Open world · Action', players: '1 player', art: 'gta', artLabel: 'Grand Theft Auto V game artwork', image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg' },
  { title: 'Tekken 8', tag: 'HEAD-TO-HEAD', genre: 'Fighting · Versus', players: '1–2 players', art: 'tekken', artLabel: 'Tekken 8 game artwork', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1778820/header.jpg' },
  { title: 'EA SPORTS FC', tag: 'SQUAD UP', genre: 'Sports · Football', players: '1–4 players', art: 'fc', artLabel: 'EA SPORTS FC 25 game artwork', image: 'https://cdn.akamai.steamstatic.com/steam/apps/2669320/header.jpg' },
]

type GamesCatalogProps = { onBookGame: (game: string) => void }

export default function GamesCatalog({ onBookGame }: GamesCatalogProps) {
  return (
    <section id="games" className="section-wrap py-24 sm:py-28">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[.23em] text-cyan"><span className="h-px w-7 bg-cyan" /> THE LINEUP</p>
          <h2 className="display-font text-3xl font-bold tracking-[-.05em] sm:text-4xl">Pick your <span className="text-gradient">next obsession.</span></h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">Your favorites, ready to play. Choose a game and we’ll save you a seat.</p>
        </div>
        <span className="w-fit rounded-full border border-white/10 px-3 py-2 text-[11px] text-white/50"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#66f5ff]" /> 20+ titles in rotation</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game, index) => (
          <motion.article key={game.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .4, delay: index * .05 }} className="group overflow-hidden rounded-[22px] border border-white/[.09] bg-[#11121a] transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_14px_42px_rgba(0,0,0,.3)]">
            <div role="img" aria-label={game.artLabel} className={`game-art ${game.art} relative h-[210px] overflow-hidden`}>
              <img src={game.image} alt="" loading="lazy" decoding="async" className="game-art-image absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="game-art-overlay absolute inset-0 transition duration-500" />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-2.5 py-1.5 text-[9px] font-bold tracking-[.12em] text-white/85 backdrop-blur-md">{game.tag}</span>
              <span className="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/20 text-white/80 backdrop-blur-md transition group-hover:border-cyan group-hover:text-cyan"><ArrowUpRight size={17} /></span>
            </div>
            <div className="p-5">
              <h3 className="display-font text-lg font-semibold tracking-[-.03em]">{game.title}</h3>
              <p className="mt-1 text-xs text-white/45">{game.genre}</p>
              <div className="mt-4 flex items-center justify-between border-t border-white/[.07] pt-4">
                <span className="flex items-center gap-1.5 text-[11px] text-white/45"><Users size={14} /> {game.players}</span>
                <span className="flex items-center gap-1 text-[11px] text-white/35"><Gamepad2 size={14} /> PS5</span>
                <button onClick={() => onBookGame(game.title)} className="rounded-full border border-cyan/25 bg-cyan/[.06] px-3 py-2 text-[10px] font-bold text-cyan transition hover:bg-cyan hover:text-ink">Book this game</button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
