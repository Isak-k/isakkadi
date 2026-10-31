import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@layouts/AppLayout'
import { NotFound } from '@components/index'
import { AnimatedBackground } from '@components/AnimatedBackground'
import Home from '@pages/Home'
import About from '@pages/About'
import Services from '@pages/Services'
import Projects from '@pages/Projects'
import ProjectDetail from '@pages/ProjectDetail'
import Skills from '@pages/Skills'
import Contact from '@pages/Contact'

export function App() {
  return (
    <>
      <AnimatedBackground />
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="skills" element={<Skills />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}
