import { useEffect, useMemo, useState } from 'react'
import Reveal from './Reveal'
import { GITHUB_ACTIVITY, GITHUB_SECTION } from '../data/content'

type Level = 0 | 1 | 2 | 3 | 4

type ContributionDay = {
  date: string
  count: number
  level: Level
}

type ContributionData = {
  total: Record<string, number>
  contributions: ContributionDay[]
}

type Status = 'loading' | 'ready' | 'fallback'

type Week = (ContributionDay | null)[]

type MonthLabel = {
  month: number
  label: string
  start: number
  span: number
}

type CacheEntry = {
  savedAt: number
  data: ContributionData
}

const LEVEL_CLASS: Record<Level, string> = {
  0: 'bg-white/[0.07]',
  1: 'bg-accent/25',
  2: 'bg-accent/45',
  3: 'bg-accent/70',
  4: 'bg-accent',
}

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

function parseDate(date: string): Date {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatDay(date: string): string {
  return parseDate(date).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatCount(value: number): string {
  return value.toLocaleString('en-US')
}

function isContributionDay(value: unknown): value is ContributionDay {
  if (!value || typeof value !== 'object') return false
  const day = value as Record<string, unknown>
  return (
    typeof day.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
    typeof day.count === 'number' &&
    Number.isFinite(day.count) &&
    day.count >= 0 &&
    typeof day.level === 'number' &&
    day.level >= 0 &&
    day.level <= 4
  )
}

function normalize(payload: unknown): ContributionData | null {
  if (!payload || typeof payload !== 'object') return null
  const raw = payload as Record<string, unknown>
  if (!raw.total || typeof raw.total !== 'object') return null
  if (!Array.isArray(raw.contributions)) return null

  const total: Record<string, number> = {}
  for (const [key, value] of Object.entries(raw.total as Record<string, unknown>)) {
    if (/^\d{4}$/.test(key) && typeof value === 'number' && Number.isFinite(value)) {
      total[key] = value
    }
  }

  const contributions = raw.contributions
    .filter(isContributionDay)
    .map((day) => ({ ...day, level: Math.round(day.level) as Level }))

  if (Object.keys(total).length === 0 || contributions.length === 0) return null

  return { total, contributions }
}

function readCache(): ContributionData | null {
  try {
    const raw = sessionStorage.getItem(GITHUB_ACTIVITY.cacheKey)
    if (!raw) return null

    const entry = JSON.parse(raw) as CacheEntry
    if (
      !entry ||
      typeof entry.savedAt !== 'number' ||
      Date.now() - entry.savedAt > GITHUB_ACTIVITY.cacheTtlMs
    ) {
      sessionStorage.removeItem(GITHUB_ACTIVITY.cacheKey)
      return null
    }

    return normalize(entry.data)
  } catch {
    return null
  }
}

function writeCache(data: ContributionData): void {
  try {
    sessionStorage.setItem(
      GITHUB_ACTIVITY.cacheKey,
      JSON.stringify({ savedAt: Date.now(), data } satisfies CacheEntry),
    )
  } catch {
    /* Storage can be unavailable in private mode or when full. */
  }
}

function buildWeeks(year: number, contributions: ContributionDay[]): Week[] {
  const byDate = new Map(
    contributions.filter((day) => day.date.startsWith(`${year}-`)).map((day) => [day.date, day]),
  )

  const first = new Date(year, 0, 1)
  const last = new Date(year, 11, 31)
  const totalDays = Math.round((last.getTime() - first.getTime()) / 86_400_000) + 1
  const offset = first.getDay()
  const weekCount = Math.ceil((offset + totalDays) / 7)

  const weeks: Week[] = []

  for (let weekIndex = 0; weekIndex < weekCount; weekIndex += 1) {
    const week: Week = []

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const index = weekIndex * 7 + dayIndex - offset

      if (index < 0 || index >= totalDays) {
        week.push(null)
        continue
      }

      const date = new Date(year, 0, 1 + index)
      const key = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate(),
      ).padStart(2, '0')}`

      week.push(byDate.get(key) ?? { date: key, count: 0, level: 0 })
    }

    weeks.push(week)
  }

  return weeks
}

function buildMonthLabels(weeks: Week[]): MonthLabel[] {
  const labels: MonthLabel[] = []

  weeks.forEach((week, index) => {
    const firstDay = week.find((day): day is ContributionDay => Boolean(day))
    if (!firstDay) return

    const month = Number(firstDay.date.slice(5, 7)) - 1
    const previous = labels[labels.length - 1]

    if (previous && previous.month === month) {
      previous.span += 1
      return
    }

    labels.push({ month, label: MONTH_LABELS[month], start: index, span: 1 })
  })

  return labels
}

function Stat({
  label,
  value,
  active,
}: {
  label: string
  value: string
  active: boolean
}) {
  return (
    <div>
      <p
        className={`tabular text-2xl font-medium tracking-tight sm:text-3xl ${
          active ? 'text-white' : 'text-white/35'
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-[10.5px] uppercase tracking-label text-white/40">{label}</p>
    </div>
  )
}

export default function GitHubActivity() {
  const [status, setStatus] = useState<Status>('loading')
  const [data, setData] = useState<ContributionData | null>(null)
  const [year, setYear] = useState(() => new Date().getFullYear())
  const [hovered, setHovered] = useState<{ date: string; count: number } | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), GITHUB_ACTIVITY.requestTimeoutMs)
    let active = true

    const load = async () => {
      const cached = readCache()
      if (cached) {
        setData(cached)
        setStatus('ready')
        return
      }

      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setStatus('fallback')
        return
      }

      try {
        const response = await fetch(GITHUB_ACTIVITY.apiUrl, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })

        if (!response.ok) throw new Error(`Request failed with ${response.status}`)

        const parsed = normalize(await response.json())
        if (!parsed) throw new Error('Unexpected contribution payload')

        if (!active) return

        writeCache(parsed)
        setData(parsed)
        setStatus('ready')
      } catch {
        if (active) setStatus('fallback')
      } finally {
        window.clearTimeout(timer)
      }
    }

    void load()

    return () => {
      active = false
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [])

  const totals = data?.total ?? GITHUB_ACTIVITY.fallbackTotals

  const years = useMemo(
    () =>
      Object.keys(totals)
        .map(Number)
        .filter((value) => Number.isFinite(value))
        .sort((a, b) => a - b),
    [totals],
  )

  useEffect(() => {
    if (years.length > 0 && !years.includes(year)) {
      setYear(years[years.length - 1])
    }
  }, [years, year])

  const allTime = years.reduce((sum, value) => sum + (totals[String(value)] ?? 0), 0)
  const yearTotal = totals[String(year)] ?? 0
  const bestYear = years.reduce(
    (best, value) => ((totals[String(value)] ?? 0) > (totals[String(best)] ?? 0) ? value : best),
    years[0] ?? year,
  )

  const weeks = useMemo(
    () => (data ? buildWeeks(year, data.contributions) : []),
    [data, year],
  )
  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks])
  const activeDays = useMemo(
    () =>
      data
        ? data.contributions.filter(
            (day) => day.date.startsWith(`${year}-`) && day.count > 0,
          ).length
        : 0,
    [data, year],
  )

  const statusLabel = status === 'ready' ? 'live' : status === 'loading' ? 'syncing' : 'snapshot'
  const imageSrc = `${import.meta.env.BASE_URL}${GITHUB_ACTIVITY.fallbackImage}`

  return (
    <section
      id="github"
      className="section relative overflow-hidden bg-panel text-white"
      aria-labelledby="github-title"
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

      <div className="container-page relative">
        <Reveal className="section-index">
          <span className="tabular text-accent">{GITHUB_SECTION.index}</span>
          <span className="text-white/50">{GITHUB_SECTION.label}</span>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="github-title" className="headline-lg mt-6 max-w-3xl">
            {GITHUB_SECTION.title}
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="body-lg mt-6 max-w-2xl text-white/55">{GITHUB_SECTION.intro}</p>
        </Reveal>

        <Reveal delay={220} className="mt-10 sm:mt-14">
          <figure className="rounded-2xl border border-line-dark bg-panel-raised p-5 sm:p-7 lg:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-label text-white/40">
                fig. {GITHUB_SECTION.index} — github.com/{GITHUB_ACTIVITY.username}
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-label text-white/40">
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-full ${
                    status === 'ready'
                      ? 'bg-accent animate-pulse-dot'
                      : status === 'loading'
                        ? 'bg-white/40 animate-pulse'
                        : 'bg-white/30'
                  }`}
                />
                {statusLabel}
              </span>
            </div>

            <div
              className={`mt-7 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line-dark pt-7 sm:gap-x-10 ${
                status === 'ready' ? 'sm:grid-cols-4' : 'sm:grid-cols-3'
              }`}
            >
              <Stat
                label="All-time contributions"
                value={status === 'loading' ? '—' : formatCount(allTime)}
                active={status !== 'loading'}
              />
              <Stat
                label={`${year}${year === new Date().getFullYear() ? ' so far' : ''}`}
                value={status === 'loading' ? '—' : formatCount(yearTotal)}
                active={status !== 'loading'}
              />
              <Stat
                label={`Best year · ${bestYear}`}
                value={status === 'loading' ? '—' : formatCount(totals[String(bestYear)] ?? 0)}
                active={status !== 'loading'}
              />
              {status === 'ready' ? (
                <Stat label={`Active days · ${year}`} value={formatCount(activeDays)} active />
              ) : null}
            </div>

            {status === 'loading' ? (
              <div className="mt-8 animate-pulse" aria-hidden>
                <div className="mb-2 h-3.5 w-40 rounded bg-white/[0.07]" />
                <div className="flex gap-2.5 overflow-hidden">
                  <div className="mt-0.5 w-6" />
                  <div
                    className="grid gap-[3px]"
                    style={{
                      gridTemplateColumns: 'repeat(53, 10px)',
                      gridTemplateRows: 'repeat(7, 10px)',
                    }}
                  >
                    {Array.from({ length: 53 * 7 }).map((_, index) => (
                      <span key={index} className="rounded-[2px] bg-white/[0.06]" />
                    ))}
                  </div>
                </div>
              </div>
            ) : status === 'fallback' ? (
              <div className="mt-7">
                <div className="max-h-[520px] overflow-y-auto rounded-xl border border-line-dark bg-panel">
                  <img
                    src={imageSrc}
                    alt={`GitHub contribution graph for ${GITHUB_ACTIVITY.username} from ${
                      years[0]
                    } to ${years[years.length - 1]}, ${formatCount(allTime)} contributions in total`}
                    className="w-full"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[10px] text-white/40">
                    Static snapshot · scroll to explore
                  </p>
                  <a
                    href={imageSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10px] uppercase tracking-label text-white/50 transition-colors hover:text-white"
                  >
                    Open full image ↗
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-7">
                <div
                  className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
                  role="group"
                  aria-label="Contribution year"
                >
                  {years.map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={value === year}
                      onClick={() => {
                        setYear(value)
                        setHovered(null)
                      }}
                      className={`shrink-0 rounded-md border px-2.5 py-1 font-mono text-[11px] tabular transition-colors duration-200 ${
                        value === year
                          ? 'border-accent/60 bg-accent/15 text-white'
                          : 'border-line-dark text-white/45 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>

                <div className="mt-5">
                  <div className="flex gap-2.5 [--cell:clamp(10px,0.95vw,14px)] [--gap:3px]">
                    <div
                      aria-hidden
                      className="mt-5 grid shrink-0 text-right font-mono text-[9px] leading-none text-white/35"
                      style={{
                        gridTemplateRows: 'repeat(7, var(--cell))',
                        gap: 'var(--gap)',
                      }}
                    >
                      {WEEKDAY_LABELS.map((label, index) => (
                        <span key={index} className="flex items-center justify-end">
                          {label}
                        </span>
                      ))}
                    </div>

                    <div className="min-w-0 flex-1 overflow-x-auto pb-1 scrollbar-none">
                      <div className="min-w-max">
                        <div
                          className="mb-1.5 grid h-3.5 font-mono text-[9px] uppercase tracking-wide text-white/35"
                          style={{
                            gridTemplateColumns: `repeat(${weeks.length}, calc(var(--cell) + var(--gap)))`,
                          }}
                        >
                          {monthLabels.map((month) => (
                            <span
                              key={`${month.label}-${month.start}`}
                              className="whitespace-nowrap"
                              style={{ gridColumn: `${month.start + 1} / span ${month.span}` }}
                            >
                              {month.label}
                            </span>
                          ))}
                        </div>

                        <div
                          role="img"
                          aria-label={`GitHub contribution graph for ${year}: ${formatCount(
                            yearTotal,
                          )} contributions`}
                          className="grid"
                          style={{
                            gridTemplateColumns: `repeat(${weeks.length}, var(--cell))`,
                            gridTemplateRows: 'repeat(7, var(--cell))',
                            gap: 'var(--gap)',
                            gridAutoFlow: 'column',
                          }}
                          onPointerOver={(event) => {
                            const target = event.target
                            if (!(target instanceof HTMLElement)) return
                            const cell = target.closest<HTMLElement>('[data-date]')
                            if (!cell?.dataset.date) return
                            setHovered({
                              date: cell.dataset.date,
                              count: Number(cell.dataset.count ?? 0),
                            })
                          }}
                          onPointerLeave={() => setHovered(null)}
                        >
                          {weeks.flatMap((week, weekIndex) =>
                            week.map((day, dayIndex) =>
                              day ? (
                                <div
                                  key={day.date}
                                  data-date={day.date}
                                  data-count={String(day.count)}
                                  title={`${day.count} contribution${
                                    day.count === 1 ? '' : 's'
                                  } on ${formatDay(day.date)}`}
                                  className={`rounded-[2px] transition-colors duration-150 hover:ring-1 hover:ring-white/50 ${
                                    LEVEL_CLASS[day.level]
                                  }`}
                                />
                              ) : (
                                <div
                                  key={`empty-${weekIndex}-${dayIndex}`}
                                  aria-hidden
                                  className="rounded-[2px] bg-transparent"
                                />
                              ),
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/40">
                      <span>Less</span>
                      {[0, 1, 2, 3, 4].map((level) => (
                        <span
                          key={level}
                          aria-hidden
                          className={`h-2.5 w-2.5 rounded-[2px] ${LEVEL_CLASS[level as Level]}`}
                        />
                      ))}
                      <span>More</span>
                    </div>
                    <p role="status" className="font-mono text-[10px] text-white/55">
                      {hovered
                        ? `${hovered.count} contribution${
                            hovered.count === 1 ? '' : 's'
                          } on ${formatDay(hovered.date)}`
                        : GITHUB_ACTIVITY.readoutDefault}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line-dark pt-5">
              <p className="font-mono text-[10px] text-white/35">
                {status === 'fallback'
                  ? GITHUB_ACTIVITY.fallbackNote
                  : status === 'loading'
                    ? 'Fetching the contribution calendar from GitHub.'
                    : `Public contributions across ${years.length} years.`}
              </p>
              <a
                href={GITHUB_ACTIVITY.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-label text-white/60 transition-colors hover:text-white"
              >
                View profile on GitHub
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
