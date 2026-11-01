import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Project } from '@types'
import { dataService } from '@services/data-service'
import { LoadingState } from '@components/LoadingState'
import { Button } from '@components/Button'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])

  useEffect(() => {
    async function loadData() {
      if (!slug) return

      try {
        setIsLoading(true)
        const proj = await dataService.getProjectBySlug(slug)
        
        if (!proj) {
          setError('Project not found')
          return
        }

        setProject(proj)

        // Get all projects for navigation
        const all = await dataService.getProjects()
        setAllProjects(all)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [slug])

  if (isLoading) {
    return <LoadingState message="Loading project..." />
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Project Not Found</h1>
          <p className="text-text-secondary mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
        </div>
      </div>
    )
  }

  // Find current project index for navigation
  const currentIndex = allProjects.findIndex(p => p.slug === project.slug)
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-blue-bright text-sm font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            {project.status && (
              <span className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                project.status === 'active'
                  ? 'bg-green-900/20 text-green-400'
                  : project.status === 'maintained'
                    ? 'bg-blue-900/20 text-blue-400'
                    : project.status === 'archived'
                      ? 'bg-gray-700/20 text-gray-400'
                      : 'bg-yellow-900/20 text-yellow-400'
              }`}>
                {project.status}
              </span>
            )}
          </div>
          <h1 className="text-5xl font-bold text-text-primary mb-4">{project.title}</h1>
          <p className="text-xl text-text-secondary">{project.shortDescription}</p>
        </div>
      </section>

      {/* Main Image */}
      {project.thumbnailUrl && (
        <section className="py-12 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-primary/20 to-blue-bright/10 rounded-lg h-96 flex items-center justify-center border border-border-default overflow-hidden">
              <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Overview */}
              {project.overview && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Overview</h2>
                  <p className="text-text-secondary leading-relaxed">{project.overview}</p>
                </div>
              )}

              {/* Problem Statement */}
              {project.problemStatement && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Problem Statement</h2>
                  <p className="text-text-secondary leading-relaxed">{project.problemStatement}</p>
                </div>
              )}

              {/* Target Users */}
              {project.targetUsers && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Target Users</h2>
                  <p className="text-text-secondary leading-relaxed">{project.targetUsers}</p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Solution</h2>
                  <p className="text-text-secondary leading-relaxed">{project.solution}</p>
                </div>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Features</h2>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-secondary">
                        <span className="text-blue-bright mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Development Process */}
              {project.developmentProcess && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Development Process</h2>
                  <p className="text-text-secondary leading-relaxed">{project.developmentProcess}</p>
                </div>
              )}

              {/* Technical Decisions */}
              {project.technicalDecisions && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Technical Decisions</h2>
                  <p className="text-text-secondary leading-relaxed">{project.technicalDecisions}</p>
                </div>
              )}

              {/* Challenges */}
              {project.challenges && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Challenges & Solutions</h2>
                  <p className="text-text-secondary leading-relaxed">{project.challenges}</p>
                </div>
              )}

              {/* Lessons Learned */}
              {project.lessonsLearned && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Lessons Learned</h2>
                  <p className="text-text-secondary leading-relaxed">{project.lessonsLearned}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="bg-bg-card/80 rounded-lg border border-border-default p-6 mb-6">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="bg-blue-primary/20 text-blue-light text-xs font-semibold px-3 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="bg-bg-card/80 rounded-lg border border-border-default p-6 space-y-3 mb-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Links</h3>
                {project.projectUrl ? (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-light hover:text-blue-bright transition-colors"
                  >
                    <span>🔗 Visit Project</span>
                  </a>
                ) : (
                  <p className="text-text-muted text-sm">No live demo available</p>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-light hover:text-blue-bright transition-colors"
                  >
                    <span>🔗 View on GitHub</span>
                  </a>
                )}
              </div>

              {/* Contact CTA */}
              <div className="bg-bg-card/80 rounded-lg border border-border-default p-6">
                <h3 className="text-lg font-bold text-text-primary mb-3">Interested?</h3>
                <p className="text-text-secondary text-sm mb-4">
                  Let's discuss this project or work together on something new.
                </p>
                <Button onClick={() => navigate('/contact')} size="sm">
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {allProjects.length > 0 && (
        <section className="py-20 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-text-primary mb-8">More Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {allProjects.slice(0, 2).map(related => (
                <a
                  key={related.id}
                  href={`/projects/${related.slug}`}
                  className="bg-bg-card/80 rounded-lg border border-border-default p-6 hover:border-blue-bright transition-colors group"
                >
                  <p className="text-blue-bright text-xs font-semibold uppercase tracking-wider mb-2">
                    {related.category}
                  </p>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-blue-bright transition-colors mb-2">
                    {related.title}
                  </h3>
                  <p className="text-text-secondary text-sm line-clamp-2">{related.shortDescription}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      {(previousProject || nextProject) && (
        <section className="py-12 border-t border-border-default/50 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {previousProject ? (
                <a
                  href={`/projects/${previousProject.slug}`}
                  className="group flex items-start gap-3 text-left hover:text-blue-bright transition-colors"
                >
                  <span className="text-2xl mt-1">←</span>
                  <div>
                    <p className="text-text-muted text-sm mb-1">Previous Project</p>
                    <p className="text-lg font-semibold text-text-primary group-hover:text-blue-bright">
                      {previousProject.title}
                    </p>
                  </div>
                </a>
              ) : (
                <div />
              )}
              {nextProject ? (
                <a
                  href={`/projects/${nextProject.slug}`}
                  className="group flex items-start gap-3 text-right justify-end hover:text-blue-bright transition-colors"
                >
                  <div>
                    <p className="text-text-muted text-sm mb-1">Next Project</p>
                    <p className="text-lg font-semibold text-text-primary group-hover:text-blue-bright">
                      {nextProject.title}
                    </p>
                  </div>
                  <span className="text-2xl mt-1">→</span>
                </a>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Back Link */}
      <section className="py-12 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/projects')}
            className="text-blue-light hover:text-blue-bright transition-colors flex items-center gap-2"
          >
            ← Back to Projects
          </button>
        </div>
      </section>
    </div>
  )
}
