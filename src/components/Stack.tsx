import { useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { STACK, type StackItem } from '../data/content'

const DEFAULT_READOUT = 'Hover or focus a technology to see where I actually stand with it.'

export default function Stack() {
  const [readout, setReadout] = useState(DEFAULT_READOUT)

  return (
    <section id="engineering" className="section border-t border-line" aria-labelledby="stack-title">
      <div className="container-page">
        <SectionHeading
          index="07"
          label="Engineering stack"
          title={<span id="stack-title">The instruments, honestly labelled.</span>}
          intro="No bars, no percentages. Just the tools I work with daily, and a clear note where something is still becoming a strength rather than one already."
        />

        <Reveal>
          <div
            className="mb-8 flex min-h-[52px] items-center gap-3 rounded-lg border border-line bg-paper-raised px-4 py-3 sm:mb-10"
            aria-live="polite"
          >
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <p className="text-[14.5px] text-ink-muted">{readout}</p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {STACK.map((group, gi) => {
            const span =
              group.group === 'Core' || group.group === 'Architecture'
                ? 'lg:col-span-3'
                : 'lg:col-span-2'
            return (
              <Reveal
                key={group.group}
                delay={gi * 70}
                className={`${span} rounded-xl border border-line bg-paper-raised p-5 sm:p-6`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[15px] font-medium tracking-tight">{group.group}</h3>
                  <span className="label tabular">{String(gi + 1).padStart(2, '0')}</span>
                </div>
                <p className="label mt-1.5 normal-case tracking-normal text-ink-faint">
                  {group.caption}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item: StackItem) => {
                    const interactive = Boolean(item.note)
                    const cls = `inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[11.5px] transition-all duration-200 ${
                      item.state === 'learning'
                        ? 'border-dashed border-accent/60 bg-accent-tint text-accent-deep'
                        : interactive
                          ? 'border-line bg-paper-sunk text-ink-muted hover:border-ink hover:text-ink'
                          : 'border-line bg-transparent text-ink-faint'
                    }`

                    const body = (
                      <>
                        {item.name}
                        {item.state === 'learning' ? (
                          <span className="uppercase tracking-wider opacity-70">learning</span>
                        ) : null}
                      </>
                    )

                    if (!interactive) {
                      return (
                        <li key={item.name}>
                          <span className={cls}>{body}</span>
                        </li>
                      )
                    }

                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          className={cls}
                          onMouseEnter={() => setReadout(`${item.name} — ${item.note}`)}
                          onFocus={() => setReadout(`${item.name} — ${item.note}`)}
                          onMouseLeave={() => setReadout(DEFAULT_READOUT)}
                          onBlur={() => setReadout(DEFAULT_READOUT)}
                        >
                          {body}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
