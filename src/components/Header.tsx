import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { portfolioConfig, mainNavigation } from '@config/navigation'
import { Container } from './Container'
import { cn } from '@utils/cn'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-bg-primary border-b border-border-default backdrop-blur-md bg-opacity-95">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <RouterLink
            to="/"
            className="text-xl font-bold text-text-primary hover:text-blue-bright transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright rounded px-2"
          >
            {portfolioConfig.name}
          </RouterLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {mainNavigation.map((link) => (
              <RouterLink
                key={link.href}
                to={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary focus-visible:ring-blue-bright rounded px-2"
              >
                {link.label}
              </RouterLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-text-primary hover:text-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright rounded transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="block w-6 h-5 relative">
              <span
                className={cn(
                  'block absolute w-full h-0.5 bg-current transition-all duration-fast',
                  mobileMenuOpen ? 'rotate-45 top-2' : 'top-1'
                )}
              />
              <span
                className={cn(
                  'block absolute w-full h-0.5 bg-current top-2.5 transition-all duration-fast',
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'block absolute w-full h-0.5 bg-current transition-all duration-fast',
                  mobileMenuOpen ? '-rotate-45 top-2' : 'top-4'
                )}
              />
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border-default pt-4 -mx-4 px-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {mainNavigation.map((link) => (
              <RouterLink
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                className="block py-2 text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright rounded px-2"
              >
                {link.label}
              </RouterLink>
            ))}
          </nav>
        )}
      </Container>
    </header>
  )
}
