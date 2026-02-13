import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: "Gamid's personal website" },
      {
        name: 'description',
        content: "Gamid's personal website.",
      },
      { property: 'og:title', content: "Gamid's personal website" },
      {
        property: 'og:description',
        content: "Gamid's personal website.",
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: "Gamid's personal website" },
      { name: 'twitter:description', content: "Gamid's personal website." },
    ],
  }),
  component: () => (
    <div className="app-shell">
      <HeadContent />
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
})
