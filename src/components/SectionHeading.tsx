import { cn } from '@utils/cn'

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 'h1' | 'h2' | 'h3'
  subtitle?: string
}

export function SectionHeading({
  className,
  level = 'h2',
  subtitle,
  children,
  ...props
}: SectionHeadingProps) {
  const baseStyles = 'text-text-primary font-bold tracking-tight'

  const sizes = {
    h1: 'text-4xl md:text-5xl',
    h2: 'text-3xl md:text-4xl',
    h3: 'text-2xl md:text-3xl',
  }

  const Element = level

  return (
    <div>
      <Element
        className={cn(baseStyles, sizes[level], className)}
        {...props}
      >
        {children}
      </Element>
      {subtitle && (
        <p className="mt-2 text-text-secondary text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
