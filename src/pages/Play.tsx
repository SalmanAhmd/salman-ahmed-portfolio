import { Link } from 'react-router-dom'
import SnakeGame from '../components/SnakeGame'
import { PROFILE } from '../data/content'
import { useDocumentTitle } from '../hooks'

export default function Play() {
  useDocumentTitle(`Snake — ${PROFILE.name}`)

  return (
    <div className="section pt-[calc(var(--nav-h)+56px)]">
      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <p className="section-index">
            <span className="tabular text-accent-deep">∞</span>
            <span>Off the clock</span>
          </p>
          <h1 className="headline-lg max-w-3xl">Snake — Terminal Edition</h1>
          <p className="body-lg mt-5 max-w-2xl">
            A tiny game. A quick break. Back to building.
          </p>
          <div className="mt-10">
            <SnakeGame />
          </div>
          <Link
            to="/"
            className="link-underline mt-8 inline-flex min-h-8 items-center gap-1.5 py-1.5 font-mono text-[11.5px] uppercase tracking-label text-ink-muted hover:text-ink"
          >
            <span aria-hidden>←</span> Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
