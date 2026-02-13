import { Link, useRouterState } from '@tanstack/react-router'
import { MoonStar, Sun } from 'lucide-react'
import { useState } from 'react'
import { FlickerUnderline } from '@/components/FlickerUnderline/FlickerUnderline'

function Header() {
  const applyTheme = (value: 'light' | 'dark') => {
    if (typeof window === 'undefined') {
      return
    }

    document.documentElement.setAttribute('data-theme', value)
    window.localStorage.setItem('theme', value)
  }

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const storedTheme = window.localStorage.getItem('theme')
    const initialTheme = storedTheme === 'light' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', initialTheme)
    return initialTheme
  })

  const { location } = useRouterState()
  const pathname = location.pathname

  const items = [
    { label: 'Home', to: '/', match: (path: string) => path === '/' },
    {
      label: 'Blog',
      to: '/blog',
      match: (path: string) => path === '/blog' || path.startsWith('/blog/'),
    },
    {
      label: 'Projects',
      to: '/projects',
      match: (path: string) => path === '/projects',
    },
  ]

  return (
    <header className="no-flow mt-line-2 mb-line-half">
      <div className="flex items-baseline justify-between gap-4">
        <div className="no-flow flex flex-col gap-[2px]">
          <h1 className="!m-0 translate-y-[30px]">Gamid</h1>
          <nav aria-label="Primary" className="no-flow">
            <ul className="header-nav list-none p-0 m-0">
              {items.map((item) => {
                const isActive = item.match(pathname)
                const content = isActive ? (
                  <FlickerUnderline color="emerald" alwaysOn>
                    {item.label}
                  </FlickerUnderline>
                ) : (
                  item.label
                )

                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`nav-link ${isActive ? 'font-bold' : ''}`}
                      viewTransition
                    >
                      {content}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          className="theme-toggle translate-y-[30px]"
          aria-label={
            theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
          }
          aria-pressed={theme === 'dark'}
          onClick={() => {
            const nextTheme = theme === 'dark' ? 'light' : 'dark'
            setTheme(nextTheme)
            applyTheme(nextTheme)
          }}
        >
          {theme === 'dark' ? (
            <Sun size={18} aria-hidden="true" />
          ) : (
            <MoonStar size={18} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  )
}

export { Header }
