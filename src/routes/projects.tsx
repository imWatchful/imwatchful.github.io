import { Link, createFileRoute } from '@tanstack/react-router'
import { getAllProjects } from '@/lib/projects'

export const Route = createFileRoute('/projects')({
  head: () => ({
    meta: [
      { title: 'Projects | Gamid Muratbekov' },
    ],
  }),
  loader: () => getAllProjects(),
  component: ProjectsPage,
})

function ProjectsPage() {
  const projects = Route.useLoaderData()

  return (
    <section className="space-y-6">
      <header className="blog-header">
        <h1 className="text-3xl font-semibold normal-case">Projects</h1>
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
    </section>
  )
}
