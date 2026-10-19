import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { EXPERIENCE_POINTS, PROFILE } from '../data/content'

const TRAJECTORY = [
  'Developer',
  'Builder',
  'Problem Solver',
  'Frontend Engineer',
  'Technical Lead',
  'Frontend Architect / Systems Engineer',
]

export default function Experience() {
  return (
    <section id="experience" className="section border-t border-line" aria-labelledby="experience-title">
      <div className="container-page">
        <SectionHeading
          index="05"
          label="Experience"
          title={<span id="experience-title">Where the depth was built.</span>}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
              <Reveal>
                <div className="rounded-xl border border-line bg-paper-raised p-6 sm:p-7">
                  <p className="label">Current</p>
                  <p className="mt-3 text-xl font-medium tracking-tight">{PROFILE.company}</p>
                  <p className="mt-1 text-[15px] text-ink-muted">{PROFILE.role}</p>

                  <dl className="mt-6 space-y-4 border-t border-line pt-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="label">Location</dt>
                      <dd className="text-sm">{PROFILE.location}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="label">Started</dt>
                      <dd className="text-sm">{PROFILE.since}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="label">Focus</dt>
                      <dd className="text-right text-sm">React · React Native</dd>
                    </div>
                  </dl>

                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-6 inline-flex min-h-10 items-center gap-1.5 border-t border-line pt-5 text-sm font-medium text-ink"
                  >
                    LinkedIn profile
                    <span aria-hidden className="text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-deep">
                      ↗
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="body-lg max-w-2xl">
                At FynTune I’ve worked on the same hard problem for years, a benefits platform that
                keeps growing in tenants, rules and surface area, which means the work naturally
                moved from writing features to deciding how features get written.
              </p>
            </Reveal>

            <ul className="mt-9 border-t border-line">
              {EXPERIENCE_POINTS.map((point, i) => (
                <Reveal as="li" key={point} delay={i * 40} className="group">
                  <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-line py-4 transition-all duration-300 sm:gap-6 sm:py-[18px]">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong transition-colors duration-300 group-hover:bg-accent"
                    />
                    <p className="text-[15.5px] leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-ink">
                      {point}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <div className="mt-10 rounded-xl border border-line bg-paper-raised p-6 sm:p-7">
                <p className="label">Trajectory</p>
                <ol className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-3">
                  {TRAJECTORY.map((step, i) => (
                    <li key={step} className="flex items-center gap-2.5">
                      <span
                        className={`text-[13.5px] ${
                          i === TRAJECTORY.length - 1 ? 'font-medium text-accent-deep' : 'text-ink-muted'
                        }`}
                      >
                        {step}
                      </span>
                      {i < TRAJECTORY.length - 1 ? (
                        <span aria-hidden className="text-ink-faint">
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
