
import Navbar from './src/components/Navbar.tsx'
import Home from './src/components/Home.tsx'
import About from './src/components/About.tsx'
import Skills from './src/components/Skills.tsx'
import Projects from './src/components/Projects.tsx'
import Experience from './src/components/Experience.tsx'
import Contact from './src/components/Contact.tsx'
import './global.css'
import Achievements from './src/components/Achievements.tsx'

function App() {

  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </>
  )
}

export default App
