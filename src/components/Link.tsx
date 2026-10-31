import { Link as RouterLink } from 'react-router-dom'
import { cn } from '@utils/cn'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string
  variant?: 'primary' | 'secondary' | 'subtle'
}

export function Link({
  to,
  className,
  variant = 'primary',
  children,
  ...props
}: LinkProps) {
  const baseStyles = 'transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary'

  const variants = {
    primary: 'text-blue-bright hover:text-blue-light underline',
    secondary: 'text-text-secondary hover:text-text-primary',
    subtle: 'text-text-muted hover:text-text-secondary',
  }

  if (to) {
    return (
      <RouterLink
        to={to}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </RouterLink>
    )
  }

  return (
    <a
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </a>
  )
}
