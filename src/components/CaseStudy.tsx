import { useState } from 'react'
import Reveal from './Reveal'
import { CASE_CHALLENGES, CASE_LAYERS, CASE_METRICS } from '../data/content'
import { useCounter, useInView } from '../hooks'

function Metric({
  value,
  suffix,
  label,
  meaning,
  active,
}: {
  value: number
  suffix: string
  label: string
  meaning: string
  active: boolean
}) {
  const count = useCounter(value, active, 1200)

  return (
    <div className="border-t border-line-dark pt-5">
      <div className="flex items-baseline gap-1">
        <span className="tabular text-4xl font-medium tracking-tightest text-white sm:text-5xl">
          {count}
        </span>
        <span className="text-2xl font-medium text-accent sm:text-3xl">{suffix}</span>
      </div>
      <p className="label mt-2 text-white/70">{label}</p>
      <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{meaning}</p>
    </div>
  )
}

export default function CaseStudy() {
  const [metricsRef, metricsInView] = useInView<HTMLDivElement>()
  const [activeLayer, setActiveLayer] = useState(1)

  const layer = CASE_LAYERS[activeLayer]

  return (
    <section id="case-study" className="section relative bg-panel text-white" aria-labelledby="case-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '84px 84px',
        }}
      />

      <div className="container-page relative">
        <header className="mb-14 sm:mb-20">
          <Reveal className="section-index">
            <span className="tabular text-accent">02</span>
            <span className="text-white/60">Signature case study</span>
          </Reveal>

          <Reveal delay={80}>
            <p className="label mt-6 text-white/60">FynTune Solution Private Limited · InsurTech platform</p>
            <h2 id="case-title" className="headline-xl mt-4 max-w-[14ch]">
              Employee Benefit Platform
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
              Designing and scaling a multi-tenant employee benefits platform.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-white/60">
              One React application serving many insurance organizations their products, branding,
              permissions and rules without forking the codebase. The scale numbers below are only
              interesting because of what they force architecturally: every one of them changes how
              you load, split and structure a frontend.
            </p>
          </Reveal>
        </header>

        <div ref={metricsRef} className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {CASE_METRICS.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 90}>
              <Metric {...metric} active={metricsInView} />
            </Reveal>
          ))}
        </div>

        {/* ---------------- interactive architecture ---------------- */}
        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="label mb-6 text-white/60">Architecture · hover a layer</p>
            </Reveal>

            <ul className="space-y-2">
              {CASE_LAYERS.map((item, i) => {
                const isActive = i === activeLayer
                return (
                  <Reveal as="li" key={item.id} delay={i * 50}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveLayer(i)}
                      onFocus={() => setActiveLayer(i)}
                      onClick={() => setActiveLayer(i)}
                      aria-pressed={isActive}
                      className={`flex w-full items-center gap-4 rounded-lg border px-4 py-3.5 text-left transition-all duration-300 ease-out-expo ${
                        isActive
                          ? 'border-accent/60 bg-accent/[0.08]'
                          : 'border-line-dark bg-panel-raised hover:border-white/20'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-6 w-[3px] rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-accent' : 'bg-white/15'
                        }`}
                      />
                      <span className="flex-1">
                        <span className="block text-[15px] font-medium tracking-tight text-white sm:text-base">
                          {item.title}
                        </span>
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-label text-white/55">
                        {item.meta}
                      </span>
                      <span
                        aria-hidden
                        className={`font-mono text-[11px] transition-colors duration-300 ${
                          isActive ? 'text-accent' : 'text-white/55'
                        }`}
                      >
                        {`0${i + 1}`}
                      </span>
                    </button>
                    {i < CASE_LAYERS.length - 1 ? (
                      <div aria-hidden className="flex justify-start pl-[26px]">
                        <svg width="12" height="16" viewBox="0 0 12 16" className="text-white/20">
                          <path
                            d="M6 0v12m0 0l-4-4m4 4l4-4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            fill="none"
                          />
                        </svg>
                      </div>
                    ) : null}
                  </Reveal>
                )
              })}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)]">
              <Reveal delay={120}>
                <div
                  className="rounded-xl border border-line-dark bg-panel-raised p-6 sm:p-8"
                  aria-live="polite"
                >
                  <div className="flex items-center justify-between">
                    <span className="label text-white/55">Layer detail</span>
                    <span className="label tabular text-accent">
                      {`0${activeLayer + 1} / 0${CASE_LAYERS.length}`}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-medium tracking-tightest text-white sm:text-3xl">
                    {layer.title}
                  </h3>
                  <div className="mt-4 h-px w-10 bg-accent" aria-hidden />
                  <p className="mt-5 text-[15px] leading-relaxed text-white/60 sm:text-base">
                    {layer.detail}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Multi-tenant', 'React', 'Vite', 'Lazy loading', 'Code review', 'Testing'].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="rounded-md border border-line-dark px-2.5 py-1 font-mono text-[11px] text-white/60"
                      >
                        {chip}
                      </span>
                    ),
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ---------------- challenges ---------------- */}
        <div className="mt-20 lg:mt-28">
          <Reveal className="section-index">
            <span className="text-white/60">Engineering challenges</span>
          </Reveal>

          <ul className="grid gap-x-10 md:grid-cols-2">
            {CASE_CHALLENGES.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 2) * 70} className="group">
                <div className="h-full border-t border-line-dark py-6 transition-colors duration-300 hover:border-accent/50">
                  <div className="flex items-start gap-4">
                    <span className="label tabular pt-1 text-white/55 transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-medium tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
