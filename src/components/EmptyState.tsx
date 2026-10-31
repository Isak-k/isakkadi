import { Container } from './Container'

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Container className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="mb-4 text-4xl">📭</div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
        {description && (
          <p className="text-text-secondary mb-6">{description}</p>
        )}
        {action && <div>{action}</div>}
      </div>
    </Container>
  )
}
