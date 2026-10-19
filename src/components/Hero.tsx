import HeroVisual from './HeroVisual'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import { PROFILE } from '../data/content'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[calc(var(--nav-h)+56px)] pb-16 sm:pb-24 lg:pt-[calc(var(--nav-h)+96px)]">
      <div aria-hidden className="grid-bg mask-fade-b pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'radial-gradient(circle, #D4541E 0%, transparent 70%)' }}
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-raised px-3.5 py-1.5">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                <span className="font-mono text-[11px] uppercase tracking-label text-ink-muted">
                  {PROFILE.experience}
                </span>
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="headline-xl mt-7 max-w-[16ch]">
                Building frontend systems that{' '}
                <em className="font-serif italic text-accent">scale</em>.
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="body-lg mt-7 max-w-xl">
                I’m <span className="text-ink">Salman Ahmed Ansari</span> a Senior Lead Frontend Developer
                from Mumbai, focused on React, React Native, JavaScript, and frontend architecture.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic to="/#work" className="btn-solid group">
                  View my work
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </Magnetic>
                <Magnetic to="/#contact" className="btn-ghost group" strength={0.1}>
                  Let’s talk
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { label: 'GitHub', href: PROFILE.github, external: true },
                  { label: 'LinkedIn', href: PROFILE.linkedin, external: true },
                  { label: 'Email', href: `mailto:${PROFILE.email}`, external: false },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="group inline-flex min-h-10 items-center gap-1.5 py-2 font-mono text-[12px] uppercase tracking-label text-ink-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                      <span aria-hidden className="text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-accent">
                        {item.external ? '↗' : '→'}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <HeroVisual />
            </Reveal>
          </div>
        </div>

        <Reveal delay={400}>
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 sm:mt-20">
            <span className="label">{PROFILE.location}</span>
            <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
            <span className="label">{PROFILE.role}</span>
            <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
            <span className="label">React · React Native · Architecture</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
