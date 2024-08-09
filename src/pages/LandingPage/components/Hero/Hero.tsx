// author mike
import { Button, Typography } from '@mui/material'
import styles from './Hero.module.less'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface HeroProps {
  open: boolean
  setOpen: (value: boolean) => void
  handleScrollToPricing: () => void
}

function Hero(props: HeroProps) {
  // const { setOpen } = props
  const [searchParams] = useSearchParams()
  const couponId = searchParams.get('coupon_id')
  const navigate = useNavigate()

  const handleClick = () => {
    if (couponId) {
      navigate(`/interviewCopilot?coupon_id=${couponId}`)
    } else {
      navigate('/interviewCopilot')
    }
  }
  return (
    <>
      <div
        className={`${styles.heroContainer} lg:gap-10 xs:gap-6 xs:leading-[30px] md:leading-[35px]`}
      >
        <div className={styles.textContainer}>
          <div className={`${styles.subTitle}`}>
            Empower Your Interview, Elevate Your Future
          </div>
          <div className={`${styles.title}  md:text-[110px] xs:text-[32px]`}>
            Interview Copilot
          </div>
          <div
            className={`${styles.content} xs:text-[16px] md:text-[20px] xs:leading-6 md:leading-[35px]`}
          >
            Interview Copilot leverages an advanced large language model
            specifically fine-tuned for the interview domain, especially in key
            areas such as behavioral interview questions, self-introductions,
            and case study discussions, ensuring you perform your best at every
            stage of the interview process
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            className={styles.startButton}
            variant="contained"
            onClick={handleClick}
          >
            <Typography className={styles.startText}>
              Start Interview
            </Typography>
            <ArrowForwardIcon style={{ color: '#fff' }} />
          </Button>
          <Button
            className={styles.pricingButton}
            variant="outlined"
            onClick={props.handleScrollToPricing}
          >
            <Typography className={styles.pricingText}>View Pricing</Typography>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Hero
