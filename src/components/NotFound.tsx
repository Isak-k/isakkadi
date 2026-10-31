import { useNavigate } from 'react-router-dom'
import { Container } from './Container'
import { Button } from './Button'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <div className="text-center py-12">
        <h1 className="text-6xl md:text-7xl font-bold text-blue-bright mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate('/')}
          variant="primary"
        >
          Back to Home
        </Button>
      </div>
    </Container>
  )
}
