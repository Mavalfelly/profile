import './index.css'
import BackgroundVideo from './components/bckVid/backvid'
import Land from './components/Landing Page/land'
import Nav from './components/Nav/nav'
import Footer from './components/Footer/foot'

function App() {
  

  return (
    <>
      <header>
        <BackgroundVideo/>
        <Nav></Nav>
        <Land></Land>
      </header>





      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default App
