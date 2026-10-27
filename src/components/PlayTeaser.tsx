import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function PlayTeaser() {
  return (
    <section className="border-t border-line py-12 sm:py-16" aria-labelledby="play-teaser-title">
      <div className="container-page">
        <Reveal>
          <Link
            to="/play"
            className="group flex flex-col justify-between gap-6 rounded-xl border border-line-dark bg-[#101113] p-6 text-white transition-colors hover:border-emerald-400/40 sm:flex-row sm:items-center sm:px-8"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">A tiny side quest</p>
              <h2 id="play-teaser-title" className="mt-3 text-2xl font-medium tracking-tightest sm:text-3xl">
                Taking a break?
              </h2>
              <p className="mt-2 font-mono text-xs text-white/50">
                A tiny game. A quick break. Back to building.
              </p>
            </div>
            <span className="inline-flex min-h-11 items-center gap-3 self-start rounded-md border border-white/10 px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/75 transition-colors group-hover:border-emerald-400/40 group-hover:text-emerald-200 sm:self-auto">
              Play Snake
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
