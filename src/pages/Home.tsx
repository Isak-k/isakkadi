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

  // Two distinct project sequences for dual-direction continuous streams
  const row1Projects = allProjects.length > 0
    ? (() => {
        let base = [...allProjects]
        while (base.length < 6) {
          base = [...base, ...allProjects]
        }
        return [...base, ...base]
      })()
    : []

  const row2Projects = allProjects.length > 0
    ? (() => {
        // Shift sequence by half so vertically aligned cards are different
        const offset = Math.floor(allProjects.length / 2)
        const shifted = [...allProjects.slice(offset), ...allProjects.slice(0, offset)]
        let base = [...shifted]
        while (base.length < 6) {
          base = [...base, ...shifted]
        }
        return [...base, ...base]
      })()
    : []

  // Get unique skill categories
  const skillCategories = Array.from(new Set(skillsPreview.map(s => s.category)))

  const renderCard = (project: Project, keyPrefix: string, index: number) => (
    <div
      key={`${keyPrefix}-${project.id}-${index}`}
      className="w-[240px] sm:w-[285px] shrink-0 bg-bg-card/75 rounded-xl border border-border-default/70 hover:border-blue-bright transition-all duration-300 hover:shadow-lg hover:shadow-blue-bright/15 backdrop-blur-md overflow-hidden flex flex-col group/card"
    >
      {/* Project Image */}
      {project.thumbnailUrl ? (
        <div className="relative h-32 sm:h-36 overflow-hidden bg-bg-secondary/70">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-80" />
          <span className="absolute top-2.5 left-2.5 bg-blue-primary/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      ) : (
        <div className="h-32 sm:h-36 bg-gradient-to-br from-blue-primary/20 to-blue-bright/10 flex items-center justify-center p-3">
          <span className="text-blue-light text-sm font-medium">{project.title}</span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-text-primary mb-1.5 group-hover/card:text-blue-bright transition-colors line-clamp-1">
            {project.title}
          </h4>
          <p className="text-text-secondary text-xs mb-3 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tech tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies.slice(0, 3).map(tech => (
                <span key={tech} className="bg-blue-primary/15 text-blue-light text-[10px] px-1.5 py-0.5 rounded border border-blue-primary/20">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-text-muted text-[10px] px-1 py-0.5">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="flex items-center justify-between pt-2.5 border-t border-border-default/60 text-xs">
          <a
            href={`/projects/${project.slug}`}
            className="text-blue-light hover:text-blue-bright font-medium transition-colors"
          >
            Details →
          </a>
          <div className="flex gap-2.5">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors"
                title="Live Demo"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors"
                title="Source Code"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden">
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

      {/* About Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Bio */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-blue-bright text-sm font-semibold uppercase tracking-wider mb-2">About Me</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
                  Who I Am & What I Do
                </h2>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed">
                I'm <span className="text-white font-medium">Isak Kadi</span>, an Information Technology student at Haramaya University, Ethiopia, with a strong passion for software development, cloud systems, and innovation.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I enjoy engineering practical digital solutions that solve real-world problems—focusing on web platforms, mobile applications, database architecture, and modern technologies. My mission is to build scalable, clean, and user-centric software that creates lasting positive impact.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="/about" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-primary text-white font-medium rounded-lg hover:bg-blue-bright transition-colors text-sm">
                  <span>Read Full Story</span>
                  <span>→</span>
                </a>
                {portfolioConfig.cvUrl && (
                  <a 
                    href={portfolioConfig.cvUrl}
                    download="ISAK_KADI_CV.pdf"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-bg-card/70 border border-border-default hover:border-blue-bright text-text-primary hover:text-white rounded-lg transition-colors text-sm font-medium backdrop-blur-sm"
                  >
                    <svg className="w-4 h-4 text-blue-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-9-2m9 2l9-2m-9-8l9 2m-9-2l-9 2" />
                    </svg>
                    Download CV
                  </a>
                )}
              </div>
            </div>

            {/* Right Pillars / Stats Grid */}
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
              <div className="bg-bg-card/60 rounded-xl border border-border-default/70 p-6 backdrop-blur-md hover:border-blue-bright/60 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-blue-primary/20 text-blue-bright flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Software Engineering</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Building maintainable, high-performance web applications with clean architecture and design patterns.
                </p>
              </div>

              <div className="bg-bg-card/60 rounded-xl border border-border-default/70 p-6 backdrop-blur-md hover:border-blue-bright/60 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7M4 7c0-2 1.5-3 3.5-3h9c2 0 3.5 1 3.5 3M4 7h16m-8 4v6m-4-3h8" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Database Systems</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Design, optimization, and real-time syncing using Firebase, Firestore, PostgreSQL, and modern APIs.
                </p>
              </div>

              <div className="bg-bg-card/60 rounded-xl border border-border-default/70 p-6 backdrop-blur-md hover:border-blue-bright/60 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Mobile & Cross-Platform</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Crafting fluid, intuitive mobile experiences using Flutter, React Native, and responsive web technology.
                </p>
              </div>

              <div className="bg-bg-card/60 rounded-xl border border-border-default/70 p-6 backdrop-blur-md hover:border-blue-bright/60 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Academic Foundation</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Information Technology studies at Haramaya University, bridging theory with continuous practical execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Dual Direction Continuous Streams */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-blue-bright text-sm font-semibold uppercase tracking-wider mb-2">Portfolio</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">Featured Projects</h2>
              <p className="text-text-secondary mt-2">Dual-direction continuous showcase — hover over any card to pause and inspect</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted bg-bg-card/60 border border-border-default/60 px-3.5 py-1.5 rounded-full w-fit backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-bright animate-ping" />
              <span>Dual-direction flow • Hover to pause</span>
            </div>
          </div>
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
          <div className="relative w-full group">
            {/* Subtle left & right gradient masks to blend cards with canvas */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-[#050716] via-[#050716]/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-[#050716] via-[#050716]/60 to-transparent z-10 pointer-events-none" />

            {/* Dual Direction Continuous Streams */}
            <div className="space-y-4 sm:space-y-5">
              {/* Row 1: Flowing Left */}
              <div className="overflow-hidden w-full py-1">
                <div className="animate-marquee-continuous flex gap-4 sm:gap-5 px-4 hover:[animation-play-state:paused]">
                  {row1Projects.map((project, idx) => renderCard(project, 'r1', idx))}
                </div>
              </div>

              {/* Row 2: Flowing Right (Opposite Direction) */}
              <div className="overflow-hidden w-full py-1">
                <div className="animate-marquee-reverse flex gap-4 sm:gap-5 px-4 hover:[animation-play-state:paused]">
                  {row2Projects.map((project, idx) => renderCard(project, 'r2', idx))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-blue-bright text-sm font-semibold uppercase tracking-wider mb-2">What I Offer</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">Services & Expertise</h2>
              <p className="text-text-secondary mt-2">Specialized technical solutions to bring your ideas and digital vision to life</p>
            </div>
            <a href="/services" className="text-blue-light hover:text-blue-bright transition-colors text-sm font-medium inline-flex items-center gap-1.5">
              <span>View All Services</span>
              <span>→</span>
            </a>
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
                  className="group relative"
                  style={{
                    animation: `slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                    animationDelay: `${idx * 50}ms`,
                    opacity: 0,
                  }}
                >
                  <div className="bg-bg-card/70 rounded-xl border border-border-default/70 p-8 hover:border-blue-bright transition-all duration-300 hover:shadow-xl hover:shadow-blue-bright/10 h-full flex flex-col justify-between backdrop-blur-md">
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-blue-primary/20 text-blue-bright flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {idx === 0 ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ) : idx === 1 ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-blue-bright transition-colors">
                        {service.name}
                      </h3>
                      {service.description && (
                        <p className="text-text-secondary leading-relaxed text-sm">
                          {service.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-8 pt-6 border-t border-border-default/60 flex items-center justify-between">
                      <a href="/contact" className="text-blue-light hover:text-blue-bright transition-colors text-sm font-medium inline-flex items-center gap-1.5">
                        <span>Request Service</span>
                        <span>→</span>
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
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-blue-bright text-sm font-semibold uppercase tracking-wider mb-2">Technologies</p>
            <h2 className="text-4xl font-bold text-text-primary mb-4">Skills & Tools</h2>
            <p className="text-text-secondary">Core technologies and frameworks I use to build scalable products</p>
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
                          <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border-default/70 bg-bg-card/40 hover:bg-bg-card/80 transition-all duration-300 hover:border-text-secondary/50 group-hover:scale-105 group-hover:-translate-y-1 cursor-pointer backdrop-blur-sm">
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
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-bg-card/40 border border-border-default/60 rounded-2xl p-10 sm:p-14 backdrop-blur-md">
          <h2 className="text-4xl font-bold text-text-primary mb-6">Let's Collaborate</h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
            I'm interested in employment opportunities, internships, freelance projects, and collaborations. Let's build something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.href = '/contact'} className="px-8 py-3">
              Get in Touch
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/about'} className="px-8 py-3">
              Learn More About Me
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
