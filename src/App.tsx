import './index.css'
import BackgroundVideo from './components/BckVid/backvid'
import Land from './components/Landing Page/land'
import Nav from './components/Nav/nav'
import Footer from './components/Footer/foot'
import { ContactUs } from './components/Contact/Contact'

function App() {
  return (
    <>
      <header className="relative z-10">
        <Nav />
      </header>
      <section className="landing-section relative h-screen">
        <BackgroundVideo />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <Land />
        </div>
      </section>
      <main className="bg-slate-900">
        <ContactUs />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App
