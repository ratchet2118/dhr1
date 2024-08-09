//author :yizhen
import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import styles from './Explore.module.less'
import background from './assets/background.png'
import Card from './Card/Card'
import type SwiperCore from 'swiper'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BA from './assets/BA.png'
import Consulting from './assets/Consulting.png'
import DA from './assets/DA.png'
import DS from './assets/DS.png'
import MLE from './assets/MLE.png'
import PM from './assets/PM.png'
import QA from './assets/QA.png'
import SDE from './assets/SDE.png'
import { useIntl } from 'react-intl'

interface cardProps {
  questionNum: string
  img: string
  name: string
  interviewNum: string
}

function Explore() {
const intl = useIntl()

const cardList: cardProps[] = [
  {
    questionNum: '5,200',
    img: BA,
    name: intl.formatMessage({ id: 'lp.explore.BA' }),
    interviewNum: '500+',
  },
  {
    questionNum: '6,000',
    img: Consulting,
    name: intl.formatMessage({ id: 'lp.explore.consulting' }),
    interviewNum: '4000+',
  },
  {
    questionNum: '3,400',
    img: DA,
    name: intl.formatMessage({ id: 'lp.explore.DA' }),
    interviewNum: '1500+',
  },
  {
    questionNum: '6,200',
    img: DS,
    name: intl.formatMessage({ id: 'lp.explore.DS' }),
    interviewNum: '700+',
  },
  {
    questionNum: '5,100',
    img: MLE,
    name: intl.formatMessage({ id: 'lp.explore.MLE' }),
    interviewNum: '1000+',
  },
  {
    questionNum: '3,000',
    img: PM,
    name: intl.formatMessage({ id: 'lp.explore.PM' }),
    interviewNum: '1500+',
  },
  {
    questionNum: '7,000',
    img: QA,
    name: intl.formatMessage({ id: 'lp.explore.QA' }),
    interviewNum: '1500+',
  },
  {
    questionNum: '5,500',
    img: SDE,
    name: intl.formatMessage({ id: 'lp.explore.SDE' }),
    interviewNum: '1300+',
  },
]

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

  return (
    <div className={styles.wrapper}>
      <img src={background} className={styles.background} />
      <div className={styles.innerWrapper}>
        <div className={styles.header}>
          <div className={styles.title}>{intl.formatMessage({ id: 'lp.explore.title' })}</div>
          <div className={styles.subtitle}>
            <p>
            {intl.formatMessage({ id: 'lp.explore.subtitle1' })}
            </p>
            <p>
            {intl.formatMessage({ id: 'lp.explore.subtitle2' })}
            </p>
          </div>
        </div>
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

        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          slidesPerView={'auto'}
          spaceBetween={32}
          className={styles.cards}
        >
          {cardList.map((card, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <Card props={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Explore
