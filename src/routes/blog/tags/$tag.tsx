import { Link, createFileRoute } from '@tanstack/react-router'
import { FlickerUnderline } from '@/components/FlickerUnderline/FlickerUnderline'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

export const Route = createFileRoute('/blog/tags/$tag')({
  loader: ({ params }) => {
    const posts = getAllPosts().filter((post) => post.tags.includes(params.tag))
    return { tag: params.tag, posts }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `#${loaderData?.tag ?? 'Tag'} | Gamid Muratbekov` }],
  }),
  component: TagPostsPage,
})

function TagPostsPage() {
  const { tag, posts } = Route.useLoaderData()

  return (
    <section className="blog-page">
      <header className="blog-header">
        <h1 className="text-3xl font-semibold normal-case flex items-center gap-[1ch]">
          #{tag}
          <span className="text-sm font-normal text-[color:var(--text-color-alt)]">
            {posts.length} post{posts.length === 1 ? '' : 's'}
          </span>
        </h1>
      </header>

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
                  {post.tags.map((t, idx) => (
                    <span key={t}>
                      <Link
                        to="/blog/tags/$tag"
                        params={{ tag: t }}
                        className="tag-link"
                      >
                        #{t}
                      </Link>
                      {idx < post.tags.length - 1 && <span>, </span>}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </article>
        ))}
        {posts.length === 0 ? <p>No posts for this tag yet.</p> : null}
      </div>
    </section>
  )
}
