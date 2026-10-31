import { useEffect, useState } from 'react'
import type { Skill } from '@types'
import { dataService } from '@services/data-service'

export default function Skills() {
  const [skillsByCategory, setSkillsByCategory] = useState<Map<string, Skill[]>>(new Map())
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const skills = await dataService.getSkills()

        const grouped = new Map<string, Skill[]>()
        skills.forEach(skill => {
          if (!grouped.has(skill.category)) {
            grouped.set(skill.category, [])
          }
          grouped.get(skill.category)!.push(skill)
        })

        grouped.forEach(categorySkills => {
          categorySkills.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        })

        setSkillsByCategory(grouped)
        setCategories(Array.from(grouped.keys()))
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-16 border-b border-border-default bg-gradient-to-b from-bg-primary/80 to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-primary mb-3">Technologies & Tools</h1>
          <p className="text-text-secondary text-lg">A comprehensive toolkit for building exceptional products</p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 bg-gradient-to-b from-transparent to-bg-primary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border border-text-secondary border-t-text-primary"></div>
              <p className="text-text-muted mt-4">Loading skills...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg">No skills available yet.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {categories.map((category) => {
                const categorySkills = skillsByCategory.get(category) || []

                return (
                  <div key={category}>
                    {/* Category Header */}
                    <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-6">{category}</h2>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {categorySkills.map((skill, idx) => (
                        <div
                          key={skill.id}
                          className="group relative"
                          style={{
                            animation: `fadeInUp 0.5s ease-out forwards`,
                            animationDelay: `${idx * 40}ms`,
                            opacity: 0,
                          }}
                        >
                          <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border-default bg-bg-card/50 hover:bg-bg-card transition-all duration-300 hover:border-text-secondary">
                            {/* Icon */}
                            {skill.icon && (
                              <img 
                                src={skill.icon} 
                                alt={skill.name}
                                className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none'
                                }}
                              />
                            )}
                            
                            {/* Name */}
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
    </div>
  )
}
