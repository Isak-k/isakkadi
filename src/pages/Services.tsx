import { useEffect, useState } from 'react'
import type { Service } from '@types'
import { dataService } from '@services/data-service'

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      try {
        setIsLoading(true)
        const data = await dataService.getServices()
        setServices(data)
      } finally {
        setIsLoading(false)
      }
    }
    loadServices()
  }, [])

  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-text-primary mb-6">Services</h1>
          <p className="text-xl text-text-secondary">
            Specialized solutions to help bring your ideas to life
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {services.map(service => (
                <div
                  key={service.id}
                  className="bg-bg-card/80 rounded-lg border border-border-default p-8 hover:border-blue-bright transition-colors hover:shadow-lg hover:shadow-blue-bright/10"
                >
                  <h2 className="text-2xl font-bold text-text-primary mb-4">{service.name}</h2>
                  {service.description && (
                    <p className="text-text-secondary leading-relaxed">{service.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
