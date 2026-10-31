import { Outlet } from 'react-router-dom'
import { Header, Footer } from '@components/index'

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen relative z-0">
      <Header />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
