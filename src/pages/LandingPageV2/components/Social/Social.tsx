// yizhen
import styles from './Social.module.less'
import { Typography } from '@mui/material'
// import placeholder from './asset/placeholder.png'
import VideoCard from './VideoCard/VideoCard'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRef, useState } from 'react'
import video1 from './asset/video1.mp4'
import video2 from './asset/video2.mp4'
import video3 from './asset/video3.mp4'
import video4 from './asset/video4.mp4'
import video5 from './asset/video5.mp4'
import { useIntl } from 'react-intl'

const videoList: string[] = [video1, video2, video3, video4, video5]

function Social() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [enlargeIndex, setEnlargeIndex] = useState(1)
  const [isScrolling, setIsScrolling] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [reachedStart, setReachedStart] = useState(true)

  const scrollToEnlargeIndex = (index: number) => {
    const container = scrollContainerRef.current
    if (container) {
      setIsScrolling(true) // Start scrolling
      const amt =
        window.innerWidth < 1024 ? (window.innerWidth < 768 ? 100 : 230) : 280
      const amount = amt * (index - 1) // Ensure we scroll the correct amount for each index
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      const newScrollLeft = Math.min(amount, maxScrollLeft)
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
      setTimeout(() => {
        setEnlargeIndex(index)
        setIsScrolling(false)
      }, 400)
    }
  }

  const handleForward = () => {
    console.log(enlargeIndex)
    if (!isScrolling && enlargeIndex + 1 < videoList.length) {
      scrollToEnlargeIndex(enlargeIndex + 1)
      if (reachedStart) {
        setReachedStart(false)
      }
    }
    if (enlargeIndex + 2 >= videoList.length) {
      setReachedEnd(true)
    }
  }

  const handleBack = () => {
    if (!isScrolling && enlargeIndex - 1 >= 0) {
      scrollToEnlargeIndex(enlargeIndex - 1)
      if (reachedEnd) {
        setReachedEnd(false)
      }
    }
    if (enlargeIndex - 2 < 0) {
      setReachedStart(true)
    }
  }
  const intl = useIntl()

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Typography className={styles.text1}>{intl.formatMessage({id : 'lp.social.title'})}</Typography>
      </div>
      <div className={styles.title}>
        <Typography className={styles.text2}>
          {intl.formatMessage({id : 'lp.social.subtitle'})}
        </Typography>
      </div>
      <div className={styles.media} ref={scrollContainerRef}>
        {videoList.map((video, index) => (
          <VideoCard
            video={video}
            enlarge={index == enlargeIndex ? true : false}
            key={index}
          />
        ))}
      </div>
      <div className={styles.arrowsContainer}>
        <div
          className={reachedStart ? styles.arrowBack : styles.arrowForward}
          onClick={handleBack}
        >
          <ArrowBackIcon className={styles.icon} />
        </div>
        <div
          className={reachedEnd ? styles.arrowBack : styles.arrowForward}
          onClick={handleForward}
        >
          <ArrowForwardIcon className={styles.icon} />
        </div>
      </div>
    </div>
  )
}

export default Social
