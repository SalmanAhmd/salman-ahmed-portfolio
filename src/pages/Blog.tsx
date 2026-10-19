import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { formatPostDate as formatDate, POSTS, PROFILE } from '../data/content'
import { useDocumentTitle } from '../hooks'

export default function Blog() {
  useDocumentTitle(`Notes — ${PROFILE.name}`)

  return (
    <div className="section pt-[calc(var(--nav-h)+56px)]">
      <div className="container-page">
        <Reveal className="section-index">
          <span className="tabular text-accent-deep">09</span>
          <span>Notes</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="headline-lg max-w-3xl">
            Writing, when it’s worth writing.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="body-lg mt-6 max-w-2xl">
            Short pieces on the things I keep re-explaining to teams architecture decisions,
            performance trade-offs and lessons from a codebase that got big.
          </p>
        </Reveal>

        {POSTS.length > 0 ? (
          <ul className="mt-14 border-t border-line">
            {POSTS.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 70} className="group border-b border-line">
                <Link
                  to={`/blog/${post.slug}`}
                  className="grid gap-3 py-8 transition-colors duration-300 hover:bg-paper-raised sm:grid-cols-12 sm:gap-8"
                >
                  <div className="sm:col-span-3">
                    <p className="label">{formatDate(post.date)}</p>
                    <p className="label mt-1 text-ink-faint">{post.readingTime}</p>
                  </div>

                  <div className="sm:col-span-8">
                    <h2 className="text-xl font-medium tracking-tightest sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                      {post.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li key={tag} className="code-chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden justify-end sm:col-span-1 sm:flex">
                    <span
                      aria-hidden
                      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-all duration-300 ease-out-expo group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal delay={240}>
            <div className="mt-14 rounded-xl border border-dashed border-line-strong bg-paper-raised/60 p-8">
              <p className="label">Coming soon</p>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
                No published articles yet. The first notes will appear here.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={160}>
          <Link
            to="/"
            className="link-underline mt-12 inline-flex min-h-8 items-center gap-1.5 py-1.5 font-mono text-[11.5px] uppercase tracking-label text-ink-muted hover:text-ink"
          >
            <span aria-hidden>←</span> Back to portfolio
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
