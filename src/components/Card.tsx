import { cn } from '@utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated'
}

export function Card({
  className,
  variant = 'default',
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-lg border border-border-default bg-bg-card/80 transition-all duration-fast'

  const variants = {
    default: 'p-6',
    elevated: 'p-6 shadow-lg hover:shadow-xl',
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}
