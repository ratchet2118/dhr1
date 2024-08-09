// author :renzhou
import styles from './Students.module.less'
import nyuLogo from './UniversityImage/nyu-logo.png'
import harvardLogo from './UniversityImage/harvard-logo.png'
import stanfordLogo from './UniversityImage/stanford-logo.png'
import mitLogo from './UniversityImage/mit-logo.png'
import caltechLogo from './UniversityImage/caltech-logo.png'
import princetonLogo from './UniversityImage/princeton-logo.png'
import tsinghuaLogo from './UniversityImage/Tsinghua-logo.png'
import pekingLogo from './UniversityImage/Peking-logo.png'
import HKSTLogo from './UniversityImage/HKST-logo.png'
import tongjiLogo from './UniversityImage/Tongji-logo.png'
import fudanLogo from './UniversityImage/Fudan-logo.png'
import jiaotongLogo from './UniversityImage/Jiaotong-logo.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'

function Students() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)

  const handleResize = (): void => {
    setIsMobile(window.innerWidth < 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const intl = useIntl()

  const logoMap = {
    en: [
      { src: nyuLogo, alt: 'NYU' },
      { src: harvardLogo, alt: 'Harvard' },
      { src: stanfordLogo, alt: 'Standford' },
      { src: mitLogo, alt: 'MIT' },
      { src: caltechLogo, alt: 'CalTech' },
      { src: princetonLogo, alt: 'Princeton' },
    ],
    zh: [
      { src: tsinghuaLogo, alt: 'Tsinghua' },
      { src: pekingLogo, alt: 'Peking' },
      { src: HKSTLogo, alt: 'HKST' },
      { src: tongjiLogo, alt: 'Tongji' },
      { src: fudanLogo, alt: 'Fudan' },
      { src: jiaotongLogo, alt: 'Jiaotong' },
    ],
  }

  const locale = intl.locale
  const logos = logoMap[locale] || logoMap['en']

  return (
    <div className={styles.wrapper} id="Students">
      <div className={styles.headline}>
        {intl.formatMessage({id : 'lp.student.title'})}
      </div>
      {!isMobile && (
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={1}
          className={styles.logos}
        >
          {logos.map((logo, index) => (
            <SwiperSlide className={styles.logo} key={index}>
              <img key={index} src={logo.src} alt={logo.alt} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {isMobile && (
        <div className={styles.logos}>
          {logos.map((logo, index) => (
            <img
              key={index}
              className={styles.logo}
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Students