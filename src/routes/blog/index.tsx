import { Link, createFileRoute } from '@tanstack/react-router'
import { List } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FlickerUnderline } from '@/components/FlickerUnderline/FlickerUnderline'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

export const Route = createFileRoute('/blog/')({
  head: () => ({
    meta: [{ title: 'Blog | Gamid Muratbekov' }],
  }),
  loader: () => getAllPosts(),
  component: BlogIndexPage,
})

function BlogIndexPage() {
  const posts = Route.useLoaderData()
  const tags = useMemo(() => getAllTags(posts), [posts])
  const [showTags, setShowTags] = useState(false)

  return (
    <section className="blog-page">
      <header className="blog-header">
        <h1 className="text-3xl font-semibold normal-case">Posts</h1>
        <button
          type="button"
          className="category-toggle"
          onClick={() => setShowTags((current) => !current)}
          aria-expanded={showTags}
        >
          <List className="h-4 w-4" aria-hidden="true" />
          <span>View by category</span>
        </button>
      </header>

      <div className="blog-tags">
        <div className="tag-list" data-open={showTags ? 'true' : 'false'}>
          {tags.map((tag, index) => (
            <Link
              key={tag}
              to="/blog/tags/$tag"
              params={{ tag }}
              className="tag-item tag-link"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="space-y-2">
            <h2 className="post-title normal-case font-semibold text-[24.5px]">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="no-underline"
              >
                <FlickerUnderline color="emerald">
                  {post.title}
                </FlickerUnderline>
              </Link>
            </h2>
            <div className="text-xs">
              <span>{formatDate(post.date)}</span>
              {post.tags.length > 0 && (
                <span>
                  {'  '}
                  {post.tags.map((tag, idx) => (
                    <span key={tag}>
                      <Link
                        to="/blog/tags/$tag"
                        params={{ tag }}
                        className="tag-link"
                      >
                        #{tag}
                      </Link>
                      {idx < post.tags.length - 1 && <span>, </span>}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </article>
        ))}
        {posts.length === 0 ? <p>No posts yet.</p> : null}
      </div>
    </section>
  )
}
