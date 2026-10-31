import { cn } from '@utils/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
}

export function Badge({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full font-medium transition-colors duration-fast'

  const variants = {
    default: 'bg-bg-card text-text-secondary border border-border-default',
    primary: 'bg-blue-primary text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-amber-600 text-white',
    error: 'bg-red-600 text-white',
  }

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  )
}
