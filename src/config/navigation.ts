import type { NavLink, PortfolioConfig } from '@types'

export const mainNavigation: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Contact', href: '/contact' },
]

export const portfolioConfig: PortfolioConfig = {
  name: 'Isak Kadi',
  tagline: 'Full Stack Developer',
  cvUrl: '/ISAK_KADI_CV.pdf',
  contactEmail: 'hisakkedi@gmail.com',
  socialLinks: [
    { platform: 'github', url: 'https://github.com/Isak-k' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/isak-kadi-98b39839b' },
    { platform: 'whatsapp', url: 'https://wa.me/qr/TYFLC4CTQRM7I1' },
    { platform: 'instagram', url: 'https://www.instagram.com/isakkadi?dlrf=MWJ1NjR6cHlzNGU4cQ==' },
  ],
}
