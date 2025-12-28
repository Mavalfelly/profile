import { useEffect } from 'react'
import './index.css'
import BackgroundVideo from './components/Back'
import Land from './components/Landing Page/land'
import Nav from './components/Nav/nav'
import Footer from './components/Footer/foot'
import { ContactUs } from './components/Contact/Contact'
import AbMe from './components/AboutMe/aboutMe'
import TechScroller from './components/TechStack/tech'
import ProjectShowcase from './components/Projects/projects'
import ObjectivesSection from './components/Objectives/Objectives'
import CareerHistory from './components/Career History/history'

function App() {
  useEffect(() => {
    document.title = 'Matthew Feliciano | DevOps Engineer & Cloud Infrastructure Specialist';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Matthew Feliciano - DevOps Engineer specializing in Azure DevOps, AWS, Terraform, Kubernetes. Led 70+ repo Spring migration and built custom Renovate automation pipelines.');
    }
  }, []);

  return (
    <>
      <Nav />
      <section className="landing-section relative min-h-screen">
        <BackgroundVideo />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <Land />
        </div>
      </section>
      <section className='bg-custom-bg'>
        <AbMe/>
      </section>
      <section className="py-4 relative z-10">
        <TechScroller /> 
      </section>
      <section className='bg-custom-bg'>
        <CareerHistory/>
      </section>
      <section>
        <ProjectShowcase />
      </section>
      <section>
        <ObjectivesSection/>
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
