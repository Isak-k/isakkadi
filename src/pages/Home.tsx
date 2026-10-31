import { useEffect, useState } from 'react'
import { Button } from '@components/Button'
import type { Project, Skill, Service } from '@types'
import { dataService } from '@services/data-service'
import { portfolioConfig } from '@config/navigation'

export default function Home() {
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [skillsPreview, setSkillsPreview] = useState<Skill[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const [projects, skills, servicesData] = await Promise.all([
          dataService.getProjects(),
          dataService.getSkills(),
          dataService.getServices(),
        ])
        setAllProjects(projects)
        setSkillsPreview(skills)
        setServices(servicesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Get unique project categories
  const projectCategories = Array.from(new Set(allProjects.map(p => p.category)))
  // Get unique skill categories
  const skillCategories = Array.from(new Set(skillsPreview.map(s => s.category)))

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-bg-primary/80 via-transparent to-transparent">
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <p className="text-blue-bright text-lg font-medium mb-6">Hello, I am</p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
                Isak Kadi
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8">
                Full Stack Developer
              </h2>
              <p className="text-base md:text-lg text-gray-400 mb-12 leading-relaxed max-w-xl">
                Building modern web applications, designing useful systems, and solving real-world problems with technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Button onClick={() => window.location.href = '/projects'} className="px-8 py-3 text-base">
                  View Projects
                </Button>
                <Button variant="secondary" onClick={() => window.location.href = '/contact'} className="px-8 py-3 text-base">
                  Contact Me
                </Button>
                {portfolioConfig.cvUrl && (
                  <a 
                    href={portfolioConfig.cvUrl}
                    download="ISAK_KADI_CV.pdf"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-primary to-blue-bright text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-bright/50 transition-all duration-300 text-base"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-9-2m9 2l9-2m-9-8l9 2m-9-2l-9 2" />
                    </svg>
                    Download CV
                  </a>
                )}
                <a 
                  href="https://github.com/Isak-k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
              <div className="flex gap-6 mt-12">
                <a href="https://github.com/Isak-k" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-bright transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/isak-kadi-98b39839b" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-bright transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.13.597-.13.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.708 0-.951.77-1.708 1.96-1.708 1.188 0 1.914.757 1.938 1.708 0 .95-.75 1.708-1.983 1.708zm1.946 11.019H3.39V9.724h3.893v10.728zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z" />
                  </svg>
                </a>
                <a href="mailto:hisakkedi@gmail.com" className="text-gray-400 hover:text-blue-bright transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right - Profile Photo */}
            <div className="hidden md:flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animation: 'breathe 8s ease-in-out infinite' }} />
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-2 border-blue-primary/40 shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dk2aonbwf/image/upload/v1793391068/isak_new_dftrch.jpg"
                  alt="Isak Kadi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/20" />
              </div>
              <div className="absolute w-80 h-80 rounded-full border border-blue-primary/20 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              <div className="absolute w-96 h-96 rounded-full border border-blue-primary/10 animate-spin" style={{ animationDuration: '30s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-bg-secondary/30 to-bg-primary/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">Projects</h2>
            <p className="text-text-secondary">Showcase of my work organized by category</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-text-muted">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : allProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted">No projects yet.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {projectCategories.map((category) => {
                const categoryProjects = allProjects.filter(p => p.category === category)
                
                return (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-6">{category}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryProjects.map(project => (
                        <div
                          key={project.id}
                          className="group bg-bg-card rounded-lg border border-border-default overflow-hidden hover:border-blue-bright transition-all duration-300 hover:shadow-lg"
                        >
                          {/* Project Image */}
                          {project.thumbnailUrl && (
                            <div className="relative h-48 overflow-hidden bg-bg-secondary">
                              <img
                                src={project.thumbnailUrl}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/40 group-hover:to-blue-900/20 transition-all duration-300" />
                            </div>
                          )}
                          
                          {/* Project Content */}
                          <div className="p-6">
                            <h4 className="text-xl font-bold text-text-primary mb-2">{project.title}</h4>
                            <p className="text-text-secondary text-sm mb-4 line-clamp-3">{project.shortDescription}</p>
                            
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.slice(0, 3).map(tech => (
                                  <span key={tech} className="bg-blue-primary/20 text-blue-light text-xs px-2 py-1 rounded">
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 3 && (
                                  <span className="text-text-muted text-xs">+{project.technologies.length - 3} more</span>
                                )}
                              </div>
                            )}
                            
                            <div className="flex flex-wrap gap-3">
                              {project.projectUrl && (
                                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-light hover:text-blue-bright transition-colors text-sm font-medium">
                                  Live Demo
                                </a>
                              )}
                              {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-light hover:text-blue-bright transition-colors text-sm font-medium">
                                  View Code
                                </a>
                              )}
                              <a href={`/projects/${project.slug}`} className="text-blue-light hover:text-blue-bright transition-colors text-sm font-medium">
                                Details →
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="text-center mt-16">
            <a href="/projects" className="text-blue-light hover:text-blue-bright transition-colors inline-block py-2 text-lg">
              View More Projects →
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-bg-secondary/30 to-bg-primary/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">Services</h2>
            <p className="text-text-secondary">Specialized solutions to help bring your ideas to life</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-text-muted">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg">No services available yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div
                  key={service.id}
                  className="group relative overflow-hidden"
                  style={{
                    animation: `slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                    animationDelay: `${idx * 50}ms`,
                    opacity: 0,
                  }}
                >
                  <div className="bg-bg-card rounded-lg border border-border-default p-8 hover:border-blue-bright transition-all duration-300 hover:shadow-lg hover:shadow-blue-bright/10 h-full flex flex-col">
                    <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-blue-bright transition-colors">{service.name}</h3>
                    {service.description && (
                      <p className="text-text-secondary leading-relaxed flex-1">{service.description}</p>
                    )}
                    <div className="mt-6 pt-6 border-t border-border-default">
                      <a href="/services" className="text-blue-light hover:text-blue-bright transition-colors text-sm font-medium inline-flex items-center gap-2">
                        Learn More →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills & Technologies Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-bg-primary/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">Skills & Technologies</h2>
            <p className="text-text-secondary">Tools and technologies I work with</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border border-text-secondary border-t-text-primary"></div>
              <p className="text-text-muted mt-4">Loading skills...</p>
            </div>
          ) : skillsPreview.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted">Skills coming soon.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {skillCategories.map((category) => {
                const categorySkills = skillsPreview.filter(s => s.category === category)
                
                return (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">{category}</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                      {categorySkills.map((skill, skillIdx) => (
                        <div
                          key={skill.id}
                          className="group relative"
                          style={{
                            animation: `slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                            animationDelay: `${skillIdx * 30}ms`,
                            opacity: 0,
                          }}
                        >
                          <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border-default bg-bg-card/30 hover:bg-bg-card/80 transition-all duration-300 hover:border-text-secondary/50 group-hover:scale-105 group-hover:-translate-y-1 cursor-pointer">
                            {skill.icon && (
                              <img 
                                src={skill.icon} 
                                alt={skill.name}
                                className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none'
                                }}
                              />
                            )}
                            <span className="text-xs font-medium text-text-primary text-center group-hover:text-text-secondary transition-colors duration-300 line-clamp-2">
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-20 bg-gradient-to-b from-transparent via-bg-secondary/30 to-bg-primary/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">Let's Collaborate</h2>
          <p className="text-lg text-text-secondary mb-8">
            I'm interested in employment opportunities, internships, freelance projects, and collaborations. Let's build something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.href = '/contact'}>
              Get in Touch
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/about'}>
              Learn More About Me
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
