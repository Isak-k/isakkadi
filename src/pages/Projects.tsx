import { useEffect, useState } from 'react'
import type { Project } from '@types'
import { dataService } from '@services/data-service'
import { LoadingState } from '@components/LoadingState'
import { EmptyState } from '@components/EmptyState'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const allProjects = await dataService.getProjects()
        setProjects(allProjects)
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(allProjects.map(p => p.category)))
        setCategories(uniqueCategories.sort())
        
        setFilteredProjects(allProjects)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter projects when category or search changes
  useEffect(() => {
    let filtered = projects

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.technologies?.some(t => t.toLowerCase().includes(query))
      )
    }

    setFilteredProjects(filtered)
  }, [selectedCategory, searchQuery, projects])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-text-primary mb-6">My Projects</h1>
          <p className="text-xl text-text-secondary">
            A collection of my work showcasing design, development, and problem-solving
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-transparent border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-bg-card border border-border-default rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-blue-bright"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-bg-card border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-bright"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-text-secondary text-sm mt-4">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <LoadingState message="Loading projects..." />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <EmptyState
              title="No projects found"
              description={
                searchQuery || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Check back soon for new projects'
              }
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <div
                  key={project.id}
                  className="bg-bg-card/80 rounded-lg border border-border-default overflow-hidden hover:border-blue-bright transition-all duration-fast group flex flex-col justify-between"
                >
                  {/* Thumbnail */}
                  {project.thumbnailUrl ? (
                    <div className="relative bg-gradient-to-br from-blue-primary/20 to-blue-bright/10 h-48 flex items-center justify-center border-b border-border-default group-hover:from-blue-primary/30 group-hover:to-blue-bright/20 transition-colors overflow-hidden">
                      <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
                      
                      {/* Action Icons Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-3 bg-white/20 hover:bg-white/40 rounded-lg backdrop-blur-sm transition-all transform hover:scale-110"
                            title="View on GitHub"
                          >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-3 bg-white/20 hover:bg-white/40 rounded-lg backdrop-blur-sm transition-all transform hover:scale-110"
                            title="View Live Demo"
                          >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-blue-primary/20 to-blue-bright/10 h-48 flex items-center justify-center border-b border-border-default group-hover:from-blue-primary/30 group-hover:to-blue-bright/20 transition-colors">
                      <p className="text-text-muted text-sm text-center px-4">{project.title}</p>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="mb-3">
                      <p className="text-blue-bright text-xs font-semibold uppercase tracking-wider">
                        {project.category}
                      </p>
                      <h3 className="text-xl font-bold text-text-primary group-hover:text-blue-bright transition-colors mt-1">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.shortDescription}</p>

                    {/* Status Badge */}
                    {project.status && (
                      <div className="mb-4">
                        <span className={`inline-block text-xs font-semibold px-2 py-1 rounded capitalize ${
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
                      </div>
                    )}

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border-default">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span
                            key={tech}
                            className="bg-blue-primary/20 text-blue-light text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-text-muted text-xs px-2 py-1">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Card Actions */}
                    {(project.projectUrl || project.githubUrl) && (
                      <div className="flex items-center gap-4 pt-4 border-t border-border-default/60 text-xs">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-blue-light hover:text-blue-bright font-medium transition-colors"
                          >
                            <span>Live Demo ↗</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-text-muted hover:text-white transition-colors"
                          >
                            <span>GitHub ↗</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
