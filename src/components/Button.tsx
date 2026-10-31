import { cn } from '@utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  asChild = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-blue-primary hover:bg-blue-bright text-white',
    secondary: 'bg-bg-card hover:bg-border-default text-text-primary',
    ghost: 'hover:bg-bg-card text-text-secondary hover:text-text-primary',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const classes = cn(baseStyles, variants[variant], sizes[size], className)

  if (asChild) {
    return (
      <a
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {isLoading ? <span className="animate-spin mr-2">⟳</span> : null}
        {children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="animate-spin mr-2">⟳</span> : null}
      {children}
    </button>
  )
}
