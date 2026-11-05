import { Button } from '@components/Button'
import { portfolioConfig } from '@config/navigation'

export default function Contact() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-text-primary mb-6">Get in Touch</h1>
          <p className="text-xl text-text-secondary">
            I'd love to hear from you. Let's discuss opportunities and ideas.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bg-card/80 rounded-lg border border-border-default p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Contact Information</h2>

            <div className="space-y-6">
              {/* Email */}
              {portfolioConfig.contactEmail && (
                <div>
                  <h3 className="text-blue-bright font-semibold mb-2">Email</h3>
                  <a
                    href={`mailto:${portfolioConfig.contactEmail}`}
                    className="text-blue-light hover:text-blue-bright transition-colors"
                  >
                    {portfolioConfig.contactEmail}
                  </a>
                </div>
              )}

              {/* Social Links */}
              {portfolioConfig.socialLinks && portfolioConfig.socialLinks.length > 0 && (
                <div>
                  <h3 className="text-blue-bright font-semibold mb-4">Social Links</h3>
                  <div className="flex flex-wrap gap-6">
                    {portfolioConfig.socialLinks.map(link => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-blue-light hover:text-blue-bright transition-all duration-300 hover:scale-110"
                        title={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                      >
                        {link.platform === 'github' && (
                          <>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="text-base font-medium">GitHub</span>
                          </>
                        )}
                        {link.platform === 'linkedin' && (
                          <>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.13.597-.13.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.708 0-.951.77-1.708 1.96-1.708 1.188 0 1.914.757 1.938 1.708 0 .95-.75 1.708-1.983 1.708zm1.946 11.019H3.39V9.724h3.893v10.728zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z" />
                            </svg>
                            <span className="text-base font-medium">LinkedIn</span>
                          </>
                        )}
                        {link.platform === 'telegram' && (
                          <>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                            <span className="text-base font-medium">Telegram</span>
                          </>
                        )}
                        {link.platform === 'whatsapp' && (
                          <>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.951 1.494c.33-.053.645-.08.945-.08 2.49 0 4.817 1.058 6.45 2.754.21.205.413.412.604.624-1.595-2.431-4.192-4.065-7.048-4.065z" />
                            </svg>
                            <span className="text-base font-medium">WhatsApp</span>
                          </>
                        )}
                        {link.platform === 'instagram' && (
                          <>
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                            </svg>
                            <span className="text-base font-medium">Instagram</span>
                          </>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* CV */}
              {portfolioConfig.cvUrl && (
                <div>
                  <h3 className="text-blue-bright font-semibold mb-2">Curriculum Vitae</h3>
                  <a 
                    href={portfolioConfig.cvUrl} 
                    download="ISAK_KADI_CV.pdf"
                    className="inline-block"
                  >
                    <Button variant="secondary">
                      Download CV
                    </Button>
                  </a>
                </div>
              )}
            </div>

            {!portfolioConfig.contactEmail && !portfolioConfig.socialLinks && !portfolioConfig.cvUrl && (
              <p className="text-text-muted">Contact information coming soon.</p>
            )}
          </div>

          {/* Additional CTA */}
          <div className="text-center mt-12">
            <p className="text-text-secondary text-lg mb-6">
              Or explore more about my work and skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
