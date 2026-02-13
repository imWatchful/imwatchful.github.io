import { Link, createFileRoute } from '@tanstack/react-router'
import { FlickerUnderline } from '@/components/FlickerUnderline/FlickerUnderline'
import { getAllPosts } from '@/lib/blog'
import { getAllProjects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: 'Home | Gamid Muratbekov' }],
  }),
  loader: () => {
    return {
      posts: getAllPosts().slice(0, 7),
      projects: getAllProjects().slice(0, 4),
    }
  },
  component: HomePage,
})

function HomePage() {
  const { posts, projects } = Route.useLoaderData()

  return (
    <section className="space-y-10">
      <div className="space-y-6">
        <header className="no-flow flex items-baseline gap-[2ch]">
          <h2 className="normal-case text-[26px] !m-0 font-bold">
            Latest Posts
          </h2>
          <Link to="/blog" className="text-sm whitespace-nowrap">
            <FlickerUnderline>View posts →</FlickerUnderline>
          </Link>
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
        </div>
      </div>

      <div className="space-y-6">
        <header className="no-flow flex items-baseline gap-[2ch]">
          <h2 className="normal-case text-[26px] !m-0 font-bold">
            Active Projects
          </h2>
          <Link to="/projects" className="text-sm whitespace-nowrap">
            <FlickerUnderline>View projects →</FlickerUnderline>
          </Link>
        </header>

        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.title} className="project-row">
              <Link
                to={project.link ?? '/projects'}
                className="no-underline"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={project.image}
                  alt={`${project.title} cover`}
                  className="aspect-square h-[131px] w-[131px] object-cover flex-shrink-0 grayscale hover:grayscale-0 transition duration-200"
                  loading="lazy"
                />
              </Link>
              <div className="project-text">
                <h3 className="text-lg font-semibold leading-tight">
                  <Link
                    to={project.link ?? '/projects'}
                    className="no-underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="flex flex-1 items-center text-sm">
                  {project.description}
                </p>
                <div className="text-xs uppercase tracking-wide">
                  {project.status.replace('-', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
