import { cn } from '@utils/cn'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg'
}

export function Section({
  className,
  spacing = 'lg',
  children,
  ...props
}: SectionProps) {
  const spacings = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
  }

  return (
    <section
      className={cn('w-full', spacings[spacing], className)}
      {...props}
    >
      {children}
    </section>
  )
}
