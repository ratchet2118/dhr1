//author haowen (yizhen version)
import styles from './PremiumService.module.less'
import chatBoxImage from './assets/chatBox.png'
import BlueButton from '../../../../components/BlueButton/BlueButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import image1 from './assets/position1.png'
import image2 from './assets/position2.png'
import image3 from './assets/position3.png'
import PositionCard from './PositionCard/PositionCard'
import type SwiperCore from 'swiper'
import { useRef, useState, useEffect } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useIntl } from 'react-intl'

interface cardProps {
  img: string
  name: string
  num: string
}

const cardList: cardProps[] = [
  { img: image1, name: 'Consultant', num: '9326' },
  { img: image2, name: 'Quantitative Analyst', num: '9326' },
  { img: image3, name: 'Marketing', num: '9326' },
]

function PremiumService({ isMobile, handleChange }) {
  const swiperRef = useRef<SwiperCore>()
  const [reachedEnd, setReachedEnd] = useState(false)
  const [reachedStart, setReachedStart] = useState(true)

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
      setReachedStart(false)
      if (swiperRef.current.isEnd) {
        setReachedEnd(true)
      }
    }
  }

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
      setReachedEnd(false)
      if (swiperRef.current.isBeginning) {
        setReachedStart(true)
      }
    }
  }

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current

      const handleTouch = () => {
        if (swiperRef.current?.isBeginning) {
          setReachedStart(true)
        } else {
          setReachedStart(false)
        }
        if (swiperRef.current?.isEnd) {
          setReachedEnd(true)
        } else {
          setReachedEnd(false)
        }
      }
      swiperInstance.on('touchEnd', handleTouch)

      return () => {
        swiperInstance.off('touchEnd', handleTouch)
      }
    }
  }, [])

  const intl = useIntl()

  const handleClick = () => {
    if (isMobile) {
      handleChange()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          {intl.formatMessage({ id: 'lp.premium.title' })}
        </div>
        <div className={styles.subtitle}>
          {intl.formatMessage({ id: 'lp.premium.subtitle' })}
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.image}>
          <img src={chatBoxImage} />
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.box}>
              <div className={styles.dot1}></div>
              <div className={styles.textBox}>
                <div className={styles.text1}>10x</div>
                <div className={styles.text2}>
                  {intl.formatMessage({ id: 'lp.premium.accuracy' })}
                </div>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.dot2}></div>
              <div className={styles.textBox}>
                <div className={styles.text1}>15+</div>
                <div className={styles.text2}>
                  {intl.formatMessage({ id: 'lp.premium.position' })}
                </div>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.dot3}></div>
              <div className={styles.textBox}>
                <div className={styles.text1}>1000+</div>
                <div className={styles.text2}>
                  {intl.formatMessage({ id: 'lp.premium.question' })}
                </div>
              </div>
            </div>
          </div>
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            slidesPerView={'auto'}
            spaceBetween={32}
            className={styles.swiperContainer}
          >
            {cardList.map((card, index) => (
              <SwiperSlide className={styles.slide} key={index}>
                <PositionCard
                  name={card.name}
                  img={card.img}
                  num={card.num}
                ></PositionCard>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.arrowsContainer}>
            <div
              className={reachedStart ? styles.arrowBack : styles.arrowForward}
              onClick={slidePrev}
            >
              <ArrowBackIcon className={styles.icon} />
            </div>
            <div
              className={reachedEnd ? styles.arrowBack : styles.arrowForward}
              onClick={slideNext}
            >
              <ArrowForwardIcon className={styles.icon} />
            </div>
          </div>

          <div className={styles.button}>
            <BlueButton
              title={intl.formatMessage({ id: 'lp.premium.start' })}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumService
