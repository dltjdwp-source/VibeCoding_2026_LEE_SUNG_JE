import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import MainSections from './components/MainSections.jsx'
import MobileMenu from './components/MobileMenu.jsx'
import ScrollMotionToggle from './components/ScrollMotionToggle.jsx'
import SiteEnhancements from './components/SiteEnhancements.jsx'

function App() {
  return (
    <>
      <ScrollMotionToggle />
      <Header />
      <MainSections />
      <Footer />
      <MobileMenu />
      <SiteEnhancements />
    </>
  )
}

export default App
