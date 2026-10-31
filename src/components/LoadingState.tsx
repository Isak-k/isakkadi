import { Container } from './Container'

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <Container className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12">
            <div className="w-8 h-8 border-4 border-blue-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
        <p className="text-text-secondary">{message}</p>
      </div>
    </Container>
  )
}
