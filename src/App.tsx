import './index.css'
import BackgroundVideo from './components/BckVid/backvid'
import Land from './components/Landing Page/land'
import Nav from './components/Nav/nav'
import Footer from './components/Footer/foot'
import { ContactUs } from './components/Contact/Contact'
import Typer from './components/AbMe/typer'

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
      <section className="bg-custom-bg bg-opacity-50 py-16">
        <div className="max-w-4xl mx-auto text-center  text-white">
          <Typer
            phrases={['A little about Matt', 'Forever a learner']}
            speed={150} // Typing speed
            deleteSpeed={100} // Deleting speed
            displayTime={4000} // Time to display each phrase before deleting
          />
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
