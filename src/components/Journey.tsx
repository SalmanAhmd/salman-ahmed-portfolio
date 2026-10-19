import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { JOURNEY } from '../data/content'

export default function Journey() {
  const listRef = useRef<HTMLOListElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const viewport = window.innerHeight
        const total = rect.height + viewport * 0.35
        const travelled = viewport * 0.7 - rect.top
        setProgress(Math.min(1, Math.max(0, travelled / total)))
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section id="journey" className="section border-t border-line" aria-labelledby="journey-title">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
            <SectionHeading
              index="04"
              label="Technical journey"
              title={<span id="journey-title">How the work kept widening.</span>}
              intro="Not a list of jobs, the sequence of problems that reshaped how I build software."
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <ol ref={listRef} className="relative">
            <span
              aria-hidden
              className="absolute left-[7px] top-2 bottom-2 w-px bg-line sm:left-[9px]"
            />
            <span
              aria-hidden
              className="absolute left-[7px] top-2 w-px origin-top bg-accent transition-transform duration-200 ease-out sm:left-[9px]"
              style={{ height: 'calc(100% - 16px)', transform: `scaleY(${progress})` }}
            />

            {JOURNEY.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 45} className="group relative pl-9 sm:pl-12">
                <span
                  aria-hidden
                  className={`absolute left-0 top-[9px] h-[15px] w-[15px] rounded-full border-4 border-paper bg-line-strong transition-colors duration-300 group-hover:border-accent/25 group-hover:bg-accent sm:left-[2px]`}
                  style={{ boxShadow: '0 0 0 1px rgba(17,17,16,0.06)' }}
                />
                <div className="border-b border-line py-5 transition-colors duration-300 group-hover:border-line-strong">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    {item.year ? (
                      <span className="label tabular text-accent-deep">{item.year}</span>
                    ) : (
                      <span className="label tabular" aria-hidden>
                        &nbsp;
                      </span>
                    )}
                    <h3 className="text-[17px] font-medium tracking-tight sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-[14.5px] text-ink-muted">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
