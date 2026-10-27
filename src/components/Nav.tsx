import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, PROFILE } from '../data/content'
import { useActiveSection, useScrollProgress } from '../hooks'

const NAV_IDS: string[] = [...NAV_LINKS.map((link) => link.id), 'github', 'contact']

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const progress = useScrollProgress()
  const location = useLocation()
  const active = useActiveSection(NAV_IDS, location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector('a')?.focus()
    } else if (wasOpen.current && window.innerWidth < 768) {
      toggleRef.current?.focus()
    }
    wasOpen.current = open
  }, [open])

  return (
    <>
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
        style={{ height: 'var(--nav-h)' }}
      >
        <nav
          className="container-page flex h-full items-center justify-between gap-6"
          aria-label="Primary"
        >
          <Link
            to="/#top"
            className="group flex min-h-10 items-center gap-2.5 py-2 text-[15px] font-medium tracking-tight"
          >
            <span
              aria-hidden
              className="h-4 w-4 rounded-[5px] bg-ink transition-transform duration-500 ease-out-expo group-hover:rotate-90"
            />
            {PROFILE.name}
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <Link
                    to={`/#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block px-3.5 py-2 text-[13.5px] transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ease-out-expo ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href={PROFILE.resume} download className="btn-ghost group hidden h-9 px-4 text-[13.5px] sm:inline-flex" target="_blank" rel="noreferrer">
              Resume
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5">
                ↓
              </span>
            </a>
            <Link to="/#contact" className="btn-ghost group hidden h-9 px-4 text-[13.5px] sm:inline-flex">
              Let’s talk
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <button
              type="button"
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-full bg-ink transition-all duration-300 ease-out-expo ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-ink transition-all duration-300 ease-out-expo ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent/70 transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {open ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper pt-[var(--nav-h)] md:hidden"
        >
        <div className="container-page flex flex-1 flex-col justify-between pb-10 pt-8">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.id}
                className={open ? 'animate-menu-in' : ''}
                style={{ animationDelay: `${60 + i * 45}ms` }}
              >
                <Link
                  to={`/#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-line py-5 text-3xl font-medium tracking-tightest"
                >
                  {link.label}
                  <span className="label tabular">{String(i + 1).padStart(2, '0')}</span>
                </Link>
              </li>
            ))}
            <li
              className={open ? 'animate-menu-in' : ''}
              style={{ animationDelay: `${60 + NAV_LINKS.length * 45}ms` }}
            >
              <a
                href={PROFILE.resume}
                download
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-line py-5 text-3xl font-medium tracking-tightest text-accent"
                target="_blank"
                rel="noreferrer"
              >
                Resume
                <span aria-hidden>↓</span>
              </a>
            </li>
            <li
              className={open ? 'animate-menu-in' : ''}
              style={{ animationDelay: `${60 + (NAV_LINKS.length + 1) * 45}ms` }}
            >
              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-line py-5 text-3xl font-medium tracking-tightest text-accent"
              >
                Let’s talk
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <a href={PROFILE.resume} className="code-chip hover:border-ink" download target="_blank" rel="noreferrer">
              Resume ↓
            </a>
            <a href={PROFILE.github} className="code-chip hover:border-ink" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a
              href={PROFILE.linkedin}
              className="code-chip hover:border-ink"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href={`mailto:${PROFILE.email}`} className="code-chip hover:border-ink">
              Email
            </a>
          </div>
        </div>
      </div>
      ) : null}
    </>
  )
}
