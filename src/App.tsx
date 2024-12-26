import './index.css'
import BackgroundVideo from './components/BckVid/Background.tsx'
import Land from './components/Landing Page/land'
import Nav from './components/Nav/nav'
import Footer from './components/Footer/foot'
import { ContactUs } from './components/Contact/Contact'
import AbMe from './components/AboutMe/aboutMe'
import TechScroller from './components/TechStack/tech'
import ProjectShowcase from './components/Projects/projects'

function App() {
  return (
    <>
      <header className="relative z-10 bg-custom-bg">
        <Nav />
      </header>
      <section className="landing-section relative h-screen">
        <BackgroundVideo />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <Land />
        </div>
      </section>
      <section className='bg-white'>
        <AbMe/>
      </section>
      <section className="py-4 relative z-10">
        <TechScroller /> 
      </section>
      <section>
      <div>
      <h1>My Projects</h1>
      <ProjectShowcase />
    </div>
      </section>
      <section className="bg-slate-900">
        <ContactUs />
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App
