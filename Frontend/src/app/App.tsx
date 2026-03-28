import Navbar from "../components/layout/Navbar.tsx";
import Home from "../components/sections/Home.tsx";
import About from "../components/sections/About.tsx";
import Skills from "../components/sections/Skills.tsx";
import Projects from "../components/sections/Projects.tsx";
import Experience from "../components/sections/Experience.tsx";
import Contact from "../components/sections/Contact.tsx";
import "./global.css";
import Achievements from "../components/sections/Achievements.tsx";
import Footer from "../components/layout/footer.tsx";

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
      <Footer />
    </>
  );
}

export default App;
