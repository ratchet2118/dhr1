import styles from './LandingPageV2.module.less'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Explore from './components/Explore/Explore'
import PremiumService from './components/PremiumService/PremiumService'
import Students from './components/Students/Students'
import Social from './components/Social/Social'
import Pricing from './components/Pricing/Pricing'
import Subscribe from './components/Subscribe/Subscribe'
import { useState, useEffect } from 'react'
import MobilePopup from './components/MobilePopup/MobilePopup'
// import ChatBot from './components/ChatBot/ChatBot'

function LandingPageV2() {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleResize = (): void => {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <MobilePopup open={isOpen} handleClose={() => setIsOpen(false)} />
      <Header isVisible={isVisible} setIsVisible={setIsVisible} />
      {/* <ChatBot draggable={false}/> */}
      <Hero isVisible={isVisible} handleChange={() => setIsOpen(true)} />
      <About isMobile={isMobile} handleChange={() => setIsOpen(true)} />
      <Explore />
      <PremiumService
        isMobile={isMobile}
        handleChange={() => setIsOpen(true)}
      />
      <Students />
      <Social />
      <Pricing />
      <Subscribe />
      <Footer />
    </div>
  )
}

export default LandingPageV2
