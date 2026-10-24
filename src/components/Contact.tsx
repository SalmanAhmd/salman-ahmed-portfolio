import Magnetic from './Magnetic'
import Reveal from './Reveal'
import { PROFILE } from '../data/content'

const LINKS: { label: string; href: string; kind: 'solid' | 'ghost'; external?: boolean }[] = [
  { label: 'Email me', href: `mailto:${PROFILE.email}`, kind: 'solid' },
  { label: 'LinkedIn', href: PROFILE.linkedin, kind: 'ghost', external: true },
  { label: 'GitHub', href: PROFILE.github, kind: 'ghost', external: true },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="section relative overflow-hidden bg-panel text-white"
      aria-labelledby="contact-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[380px] w-[560px] -translate-x-1/2 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: 'radial-gradient(circle, #D4541E 0%, transparent 70%)' }}
      />

      <div className="container-page relative">
        <Reveal className="section-index">
          <span className="tabular text-accent">11</span>
          <span className="text-white/50">Contact</span>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="contact-title" className="headline-lg mt-6 max-w-[18ch]">
            Have a complex frontend problem?
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Let’s talk about architecture, performance, product engineering, or building frontend
            systems that can scale.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {LINKS.map((link, i) => (
              <Magnetic
                key={link.label}
                href={link.href}
                external={link.external ?? false}
                strength={i === 0 ? 0.14 : 0.1}
                className={
                  link.kind === 'solid'
                    ? 'group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-panel transition-colors duration-300 hover:bg-accent hover:text-white'
                    : 'group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-7 text-sm font-medium text-white transition-all duration-300 ease-out-expo hover:border-white/70 hover:bg-white/5'
                }
              >
                {link.label}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                  {link.external ? '↗' : '→'}
                </span>
              </Magnetic>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-10 font-mono text-[12px] tracking-wide text-white/55">
            {PROFILE.email}
            <span className="mx-3 text-white/45">·</span>
            {PROFILE.location}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
