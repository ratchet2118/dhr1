// author mike
//
import { Button, Typography } from '@mui/material'
import styles from './Tutorial.module.less'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import back from '@/pages/LandingPage/images/back.jpg'
import displayVideo from '@/pages/LandingPage/images/display.mp4'
import TutoiralCard from '../TutorialCard/TutoiralCard'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import SmsIcon from '@mui/icons-material/Sms'
import PeopleIcon from '@mui/icons-material/People'
import StarIcon from '@mui/icons-material/Star'
import { useNavigate, useSearchParams } from 'react-router-dom'

const TutoiralCardData = [
  {
    icon: <FlashOnIcon className={styles.icon} />,
    title: 'Instant Reference Answers',
    description:
      'Generate reference answers with the click of a button, offering you a rapid response capability during your interview.',
  },
  {
    icon: <SmsIcon className={styles.icon} />,
    title: 'Conversational AI Technology',
    description:
      'Integrates advanced conversational AI technologies to significantly enhance the quality of reference answers.',
  },
  {
    icon: <PeopleIcon className={styles.icon} />,
    title: 'Universal Compatibility',
    description:
      'Works across all operating systems and meeting platforms, ensuring you can perform optimally no matter the technical setup.',
  },
  {
    icon: <StarIcon className={styles.icon} />,
    title: 'Big Data Support',
    description:
      'Utilizes big data to tailor our database specifically for each position, ensuring relevance and precision.',
  },
]

function Tutorial() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const couponId = searchParams.get('coupon_id')
  const handleClick = () => {
    if (couponId) {
      navigate(`/interviewCopilot?coupon_id=${couponId}`)
    } else {
      navigate('/interviewCopilot')
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <img src={back} alt="" className="lg:flex hidden" />
        <video
          src={displayVideo}
          className="lg:absolute lg:left-[144px] left-0 lg:w-[730px] w-full flex"
          controls
          muted
          autoPlay
          loop
        ></video>
      </div>
      <div className={styles.featureContainer}>
        <div className={styles.title}>
          unlock you Success with our expert secrets
        </div>
        <div
          className={`${styles.cardContainer} grid md:grid-cols-2 gap-x-5 md:gap-y-6 gap-y-5 grid-cols-1`}
        >
          {TutoiralCardData.map((item) => {
            return (
              <TutoiralCard
                key={item.title}
                Icon={item.icon}
                title={item.title}
                description={item.description}
              />
            )
          })}
        </div>
        <Button
          className={styles.startButton}
          onClick={handleClick}
          variant="contained"
        >
          <Typography className={styles.startText}>Start Interview</Typography>
          <ArrowForwardIcon style={{ color: '#fff' }} />
        </Button>
      </div>
    </div>
  )
}

export default Tutorial
