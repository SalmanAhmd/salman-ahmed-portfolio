import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { PROFILE } from '../data/content'

const PRINCIPLES = [
  {
    title: 'Complexity belongs in the architecture',
    body: 'Not in the developer’s head, not in a wiki page, not in a Slack thread. If a system only works when the right person is in the room, the design is unfinished.',
  },
  {
    title: 'Performance is a product decision',
    body: 'Bundle size, render cost and route weight shape whether people trust the product. They are engineering work with product consequences.',
  },
  {
    title: 'Reuse has to be earned',
    body: 'Shared components and modules exist to remove real duplication, abstraction that doesn’t pay for itself is just indirection.',
  },
  {
    title: 'Constraints come first',
    body: 'Team shape, data shape, deadlines and the existing system decide what “good” looks like. Architecture is choosing where complexity is allowed to live.',
  },
  {
    title: 'Accessibility is part of done',
    body: 'Keyboard paths, focus, semantics and contrast are not a final pass. They are how the interface is built in the first place.',
  },
  {
    title: 'Product thinking, not ticket thinking',
    body: 'The best frontend work happens with backend, product and design in the same conversation, before the implementation, not after it.',
  },
]

export default function Philosophy() {
  return (
    <section id="about" className="section border-t border-line" aria-labelledby="about-title">
      <div className="container-page">
        <SectionHeading
          index="01"
          label="Engineering Philosophy"
          title={
            <span id="about-title">
              I enjoy the part of frontend where the problem is{' '}
              <em className="font-serif italic text-accent">structural</em>.
            </span>
          }
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="body-lg text-ink">
                I’m a frontend engineer based in {PROFILE.location}, with {PROFILE.experience} in
                production software.
              </p>
              <p className="body-lg mt-5">
                I’ve spent most of it on large-scale InsurTech products, building React and React
                Native applications, leading frontend development, reviewing architecture and code,
                and mentoring developers. The work I care about most is the kind that has to keep
                working as the product, the team and the rules around it all grow.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <figure className="mt-8 rounded-xl border border-line bg-paper-raised p-6">
                <blockquote className="font-serif text-[22px] leading-snug text-ink sm:text-[26px]">
                  “Complexity should live in the architecture, not in the developer’s head.”
                </blockquote>
                <figcaption className="label mt-4">Working principle</figcaption>
              </figure>
            </Reveal>

            <Reveal delay={160}>
              <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-line pt-6">
                {[
                  ['Based in', PROFILE.location],
                  ['Experience', '7+ years'],
                  ['Focus', 'React · React Native'],
                  ['Domain', 'InsurTech platforms'],
                ].map(([term, detail]) => (
                  <div key={term}>
                    <dt className="label">{term}</dt>
                    <dd className="mt-1.5 text-[15px] text-ink">{detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-line">
              {PRINCIPLES.map((principle, i) => (
                <Reveal as="li" key={principle.title} delay={i * 60} className="group">
                  <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-line py-5 transition-colors duration-300 hover:bg-paper-raised sm:gap-6 sm:py-6">
                    <span className="label tabular pt-1 text-ink-faint transition-colors group-hover:text-accent-deep">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-medium tracking-tight sm:text-lg">
                        {principle.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
