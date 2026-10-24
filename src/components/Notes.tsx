import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { formatPostDate, NOTE_TOPICS, POSTS } from '../data/content'

export default function Notes() {
  return (
    <section id="notes" className="section border-t border-line" aria-labelledby="notes-title">
      <div className="container-page">
        <SectionHeading
          index="10"
          label="Notes"
          title={<span id="notes-title">Writing, when it’s worth writing.</span>}
          intro="Short pieces on the things I keep re-explaining to teams, architecture decisions, performance trade-offs and lessons from a codebase that got big."
        />

        <Reveal>
          <div className="grid gap-8 border-y border-line py-10 sm:grid-cols-12 sm:gap-10">
            <div className="sm:col-span-5">
              <Link
                to="/blog"
                className="group flex h-full flex-col justify-between rounded-xl border border-line bg-paper-raised p-6 transition-all duration-300 ease-out-expo hover:border-line-strong hover:shadow-[0_18px_50px_-32px_rgba(17,17,16,0.45)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="label">Blog</span>
                    <span className="flex items-center gap-2">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                      <span className="font-mono text-[11px] uppercase tracking-label text-accent-deep">
                        {POSTS.length > 0 ? 'Published' : 'Drafting'}
                      </span>
                    </span>
                  </div>
                  <p className="mt-5 text-xl font-medium tracking-tightest">Read the notes</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {POSTS.length > 0
                      ? `${POSTS.length} ${POSTS.length === 1 ? 'note' : 'notes'} on architecture, performance and building frontend systems that last.`
                      : 'The first notes will appear here.'}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-label text-ink transition-colors group-hover:text-accent-deep">
                  Visit the blog
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </div>

            <div className="sm:col-span-7">
              <p className="label mb-4">Topics in progress</p>
              <ul className="flex flex-wrap gap-2">
                {NOTE_TOPICS.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-md border border-line bg-paper-sunk px-3 py-1.5 font-mono text-[11.5px] text-ink-muted"
                  >
                    {topic}
                  </li>
                ))}
              </ul>

              {POSTS.length > 0 ? (
                <div className="mt-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="label">Latest notes</p>
                    <Link
                      to="/blog"
                      className="link-underline inline-flex items-center gap-1 py-0.5 font-mono text-[11px] uppercase tracking-label text-ink-muted hover:text-ink"
                    >
                      View all <span aria-hidden>→</span>
                    </Link>
                  </div>

                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {POSTS.slice(0, 4).map((post) => (
                      <li key={post.slug}>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="group flex h-full flex-col justify-between gap-4 rounded-lg border border-line bg-paper-sunk/50 p-4 transition-all duration-300 ease-out-expo hover:border-line-strong hover:bg-paper-raised"
                        >
                          <div>
                            <p className="label">{formatPostDate(post.date)}</p>
                            <p className="mt-2 line-clamp-2 text-[14.5px] font-medium leading-snug tracking-tight">
                              {post.title}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-label text-ink-faint transition-colors group-hover:text-accent-deep">
                            {post.readingTime}
                            <span
                              aria-hidden
                              className="transition-transform duration-300 group-hover:translate-x-0.5"
                            >
                              →
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
