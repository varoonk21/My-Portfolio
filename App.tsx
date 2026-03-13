
import Navbar from './src/components/layout/Navbar.tsx'
import Home from './src/components/sections/Home.tsx'
import About from './src/components/sections/About.tsx'
import Skills from './src/components/sections/Skills.tsx'
import Projects from './src/components/sections/Projects.tsx'
import Experience from './src/components/sections/Experience.tsx'
import Contact from './src/components/sections/Contact.tsx'
import './global.css'
import Achievements from './src/components/sections/Achievements.tsx'


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
