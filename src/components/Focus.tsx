import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { HORIZONS } from '../data/content'

export default function Focus() {
  return (
    <section className="section border-t border-line" aria-labelledby="focus-title">
      <div className="container-page">
        <SectionHeading
          index="09"
          label="What I’m building toward"
          title={<span id="focus-title">From frontend implementation to frontend systems.</span>}
          intro="A roadmap, not a course checklist, organised by what it adds to the work: depth in the tools, a wider frame around them, and leverage for the team."
        />

        <div className="relative">
          <span
            aria-hidden
            className="absolute left-[7px] top-3 bottom-8 w-px bg-line sm:left-[9px]"
          />

          <div className="space-y-6">
            {HORIZONS.map((group, i) => (
              <Reveal as="div" key={group.horizon} delay={i * 110} className="relative pl-9 sm:pl-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-6 h-[15px] w-[15px] rounded-full border-4 border-paper bg-accent sm:left-[2px]"
                  style={{ boxShadow: '0 0 0 1px rgba(212,84,30,0.3)' }}
                />

                <div className="rounded-xl border border-line bg-paper-raised p-5 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-mono text-[11px] uppercase tracking-label text-accent-deep">
                      {group.horizon}
                    </h3>
                    <span className="label">Horizon {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-3 text-[17px] font-medium tracking-tight sm:text-lg">
                    {group.caption}
                  </p>

                  <dl className="mt-6 grid gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <div key={item.area} className="group/item">
                        <dt className="text-[15px] font-medium text-ink transition-colors group-hover/item:text-accent-deep">
                          {item.area}
                        </dt>
                        <dd className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                          {item.note}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
