import { Outlet } from 'react-router-dom'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'

export default function Layout() {
  return (
    <div className="min-h-screen text-text-primary flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
