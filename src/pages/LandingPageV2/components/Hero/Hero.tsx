import styles from './Hero.module.less'
import gifBackground from './images/background.gif'
import smallBackground from './images/smallBackground.png'
import smallBackgroundPic from './images/smallBackgroundPic.png'
import googleMeetIcon from '@/pages/LandingPageV2/components/Hero/images/google-meet-icon.png'
import zoomIcon from '@/pages/LandingPageV2/components/Hero/images/zoom-icon.png'
import teamsIcon from '@/pages/LandingPageV2/components/Hero/images/teams-icon.png'
import webexIcon from '@/pages/LandingPageV2/components/Hero/images/webex-icon.png'
import tencentIcon from './images/tencent-icon.png'
import dingIcon from './images/ding-icon.png'
import feiIcon from './images/feishu-icon.png'
import BlueButton from '@/components/BlueButton/BlueButton'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import placeholderImage from './images/backgroundPic.png'
import { useDispatch, useSelector } from 'react-redux'
import { selectInterview, setStatus, setTrial } from '@/store/index'
import { useNavigate } from 'react-router-dom'
import { getFreeTrialApi } from '@/services/api/emailApi'
import { useIntl } from 'react-intl'

interface HeroProps {
  isVisible: boolean
  handleChange: () => void
}

const StyledTextField = styled(TextField)({
  width: '60%',
  height: '42px',
  borderRadius: 90,
  border: '1px @datalynn-blue1',
  '& .MuiOutlinedInput-root': {
    height: '100%',
    borderRadius: 90,
    paddingLeft: 16,
    paddingRight: 16,
    background: '#FCFCFD',
    '& fieldset': {
      borderColor: '@datalynn-blue1)',
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
    },
    '&:hover fieldset': {
      borderColor: '@datalynn-blue1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '@datalynn-blue1',
    },
    '& input': {
      height: '9px',
      color: '@datalynn-light2',
      fontSize: 16,
      fontFamily: 'Poppins',
      fontWeight: 400,
      lineHeight: '24px',
    },
  },
})

function Hero(props: HeroProps) {
  const intl = useIntl()
  const [isGifLoaded, setIsGifLoaded] = useState(false)
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const { isVisible } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [placeholderText, setPlaceholderText] = useState(
    intl.formatMessage({ id: 'lp.hero.email' }),
  )
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)

  const handleResize = (): void => {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setPlaceholderText(intl.formatMessage({ id: 'lp.hero.email' }))
  }, [intl])

  const handleTry = async () => {
    if (isMobile) {
      props.handleChange()
      return
    }
    //验证email的格式
    const valiad = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
    if (!valiad) {
      setIsEmailValid(false)
      setEmail('')
      setPlaceholderText(intl.formatMessage({ id: 'lp.hero.emailInvalid' }))
    } else {
      setIsEmailValid(true)
      const res = await getFreeTrialApi(email)
      if (!res.has_tried) {
        dispatch(setTrial(true))
        dispatch(setStatus('information'))
        navigate('/interviewCopilot')
        return
      }
      if (res.has_tried) {
        setEmail('')
        setPlaceholderText(intl.formatMessage({ id: 'lp.hero.emailUsed' }))
      }
    }
  }

  useEffect(() => {
    const img = new Image()
    img.src = gifBackground
    img.onload = () => {
      setIsGifLoaded(true)
    }
  }, [])

  const iconMap = {
    en: [
      { src: googleMeetIcon, alt: 'Google Meet' },
      { src: zoomIcon, alt: 'Zoom' },
      { src: teamsIcon, alt: 'Teams' },
      { src: webexIcon, alt: 'Webex' },
    ],
    zh: [
      { src: tencentIcon, alt: 'Tencent' },
      { src: teamsIcon, alt: 'Teams' },
      { src: dingIcon, alt: 'Ding' },
      { src: webexIcon, alt: 'Webex' },
      { src: feiIcon, alt: 'Fei' },
    ],
  }

  const { locale } = useSelector(selectInterview)
  const icons = iconMap[locale] || iconMap['en']

  return (
    <div
      className={styles.wrapper}
      id="Hero"
      style={{ marginTop: isVisible ? '105px' : '65px' }}
    >
      <div className={styles.backgroundContainer}>
        <div className={styles.background}>
          {isMobile ? (
            <img
              src={smallBackground}
              className={styles.imageContainer}
              alt="Background"
            />
          ) : (
            <div className={styles.videoContainer}>
              <img
                src={isGifLoaded ? gifBackground : placeholderImage}
                className={styles.gifBackground}
                alt="Background"
              />
              <div className={styles.overlay}></div>
            </div>
          )}
        </div>

        <div
          className={styles.contentContainer}
          style={{ top: locale === 'zh' ? '118px' : '54px' }}
        >
          {!isMobile && (
            <div className={styles.subtitle}>
              {intl.formatMessage({ id: 'lp.hero.ace' })}
            </div>
          )}
          <div className={styles.textContainer}>
            <div className={styles.title}>
              {intl.formatMessage({ id: 'lp.hero.title' })}
            </div>
            <div className={styles.description}>
              {intl.formatMessage({ id: 'lp.hero.subtitle' })}
            </div>
          </div>
          <div className={styles.emailContainer}>
            <StyledTextField
              placeholder={placeholderText}
              variant="outlined"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!isEmailValid}
            />
            <div className={styles.button}>
              <BlueButton
                title={intl.formatMessage({ id: 'lp.hero.try' })}
                onClick={handleTry}
              />
            </div>
          </div>
        </div>
      </div>
      {isMobile && (
        <div className={styles.imageHolder}>
          <img
            src={smallBackgroundPic}
            className={styles.image}
            alt="Background"
          />
        </div>
      )}
      <div className={styles.supportContainer}>
        <div className={styles.supportText}>
          {intl.formatMessage({ id: 'lp.hero.download' })}
        </div>
        <div className={styles.iconContainer}>
          {icons.map((icon, index) => (
            <img
              key={index}
              src={icon.src}
              alt={icon.alt}
              className={styles.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
