import { useEffect, useState } from 'react'
import type { EducationEntry } from '@types'
import { dataService } from '@services/data-service'
import { portfolioConfig } from '@config/navigation'
import { Button } from '@components/Button'

export default function About() {
  const [education, setEducation] = useState<EducationEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const edu = await dataService.getEducation()
        setEducation(edu)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-bg-primary/80 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-text-primary mb-6">About Me</h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            I'm a passionate Information Technology student dedicated to creating software solutions that make a real impact.
          </p>
        </div>
      </section>

      {/* Personal Introduction */}
      <section className="py-16 bg-gradient-to-b from-transparent to-bg-primary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Who I Am</h2>
          <div className="space-y-4">
            <p className="text-text-secondary text-lg leading-relaxed">
              I'm Isak Kadi, an Information Technology student at Haramaya University, Ethiopia, with a strong passion for software development, technology, and innovation. I enjoy building practical digital solutions that solve real-world problems, particularly through web and mobile application development, database management, and modern technologies.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              I am continuously improving my development skills, exploring new technologies, and turning ideas into functional applications. My goal is to become a skilled software engineer and build innovative solutions that create meaningful impact locally and internationally.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              My journey in technology is driven by curiosity and a desire to understand how things work. I believe in learning by doing, and I'm committed to staying current with industry trends and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* CV Download */}
      {portfolioConfig.cvUrl && (
        <section className="py-16 bg-gradient-to-b from-transparent to-bg-primary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-6">View My Resume</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Download my comprehensive CV to learn more about my education, experience, and qualifications.
            </p>
            <a 
              href={portfolioConfig.cvUrl}
              download="ISAK_KADI_CV.pdf"
              className="inline-block"
            >
              <Button>
                Download CV
              </Button>
            </a>
          </div>
        </section>
      )}

      {/* Education */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Education</h2>

          {isLoading ? (
            <p className="text-text-muted">Loading education...</p>
          ) : education.length === 0 ? (
            <p className="text-text-muted">Education details coming soon.</p>
          ) : (
            <div className="space-y-8">
              {education.map(edu => (
                <div key={edu.id} className="border-l-4 border-blue-bright pl-6">
                  <h3 className="text-2xl font-bold text-text-primary">{edu.program}</h3>
                  <p className="text-blue-bright font-semibold mt-1">{edu.institution}</p>
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-text-secondary text-sm mt-2">
                      {edu.startDate && edu.endDate
                        ? `${edu.startDate} - ${edu.endDate}`
                        : edu.startDate
                          ? `Starting ${edu.startDate}`
                          : edu.endDate
                            ? `Until ${edu.endDate}`
                            : 'Date range not specified'}
                    </p>
                  )}
                  {edu.description && (
                    <p className="text-text-secondary mt-4">{edu.description}</p>
                  )}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="text-text-secondary mt-4 space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-bright mr-3 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Software Engineering Interest */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Software Engineering</h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            I'm deeply interested in software engineering principles, design patterns, and best practices. I enjoy:
          </p>
          <ul className="text-text-secondary space-y-2 mb-4">
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Building clean, maintainable code with proper architecture</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Understanding and applying design patterns appropriately</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Creating user-centric applications that solve real problems</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Collaborating with teams and learning from experienced developers</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Database Management Interest */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Database Management</h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            I have a keen interest in database design, optimization, and management. I'm exploring various database systems and approaches to ensure efficient data storage and retrieval for scalable applications.
          </p>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-6">My Learning Journey</h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            I believe in continuous learning and self-improvement. My journey includes:
          </p>
          <ul className="text-text-secondary space-y-2">
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Formal education in Information Technology at Haramaya University</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Self-directed learning through online courses and resources</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Hands-on project experience building real applications</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Active engagement with development communities</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Professional Goals */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Professional Goals</h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            My goal is to become a skilled software engineer who creates high-quality, scalable solutions that positively impact users and businesses. I aim to work in an environment where I can continuously learn, collaborate with talented engineers, and grow my expertise in modern software development practices.
          </p>
        </div>
      </section>

      {/* Development Philosophy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Development Philosophy</h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-4">
            I believe in:
          </p>
          <ul className="text-text-secondary space-y-2">
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Writing code that is readable and maintainable</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Prioritizing user experience and accessibility</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Testing thoroughly to ensure quality and reliability</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-bright mr-3 mt-1">•</span>
              <span>Embracing modern development tools and practices</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-secondary text-lg mb-6">
            Want to know more about what I can do?
          </p>
          <a href="/contact" className="text-blue-light hover:text-blue-bright transition-colors inline-block py-2">
            Get in Touch →
          </a>
        </div>
      </section>
    </div>
  )
}
