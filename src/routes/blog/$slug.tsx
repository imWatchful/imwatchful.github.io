import { Link, createFileRoute } from '@tanstack/react-router'
import { FlickerUnderline } from '@/components/FlickerUnderline/FlickerUnderline'
import { getPostBySlug } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => getPostBySlug(params.slug),
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? 'Post'
    return {
      meta: [{ title: `${title} | Gamid Muratbekov` }],
    }
  },
  component: BlogPostPage,
})

function BlogPostPage() {
  const post = Route.useLoaderData()

  if (!post) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="text-[color:var(--text-color-alt)]">
          The post you are looking for does not exist yet.
        </p>
        <Link to="/blog" className="no-underline">
          <FlickerUnderline>Back to blog</FlickerUnderline>
        </Link>
      </section>
    )
  }

  const PostContent = post.component

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <div className="font-semibold text-[54.4px] leading-[1.1] normal-case">
          {post.title}
        </div>
        <div className="text-xs">
          <span>{formatDate(post.date)}</span>
          {post.tags.length > 0 ? (
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
          ) : (
            <span>{'  '}</span>
          )}
        </div>
      </header>

      <div className="prose max-w-none">
        <PostContent />
      </div>
    </article>
  )
}
