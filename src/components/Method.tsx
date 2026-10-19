import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { METHOD } from '../data/content'
import { useInView } from '../hooks'

export default function Method() {
  const [ref, inView] = useInView<HTMLDivElement>({})

  return (
    <section className="section border-t border-line" aria-labelledby="method-title">
      <div className="container-page">
        <SectionHeading
          index="07"
          label="How I think"
          title={<span id="method-title">The same sequence, most problems.</span>}
          intro="Seniority isn’t a headline, it’s having a repeatable way to move from an unclear problem to a system other people can work in."
        />

        <div ref={ref} className="relative">
          <div className="relative mb-8 h-px w-full bg-line" aria-hidden>
            <span
              className="absolute left-0 top-0 h-px origin-left bg-accent transition-transform duration-[1600ms] ease-out-expo"
              style={{ width: '100%', transform: `scaleX(${inView ? 1 : 0})` }}
            />
          </div>

          <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((step, i) => (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 90}
                className="group h-full border-b border-line pb-6 pt-2"
              >
                <div className="flex h-full flex-col">
                  <span className="label tabular text-ink-faint transition-colors duration-300 group-hover:text-accent-deep">
                    {String(i + 1).padStart(2, '0')}
                    {i < METHOD.length - 1 ? (
                      <span aria-hidden className="ml-2 text-ink-faint">
                        →
                      </span>
                    ) : null}
                  </span>
                  <h3 className="mt-3 text-[17px] font-medium leading-snug tracking-tight">
                    {step.step}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
