import BlueButton from '@/components/BlueButton/BlueButton'
import styles from './About.module.less'
import InfoCard from './InfoCard/InfoCard'
import WhiteButton from '@/components/WhiteButton/WhiteButton'
import YouTube from 'react-youtube'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'

function About({ isMobile, handleChange }) {
  const videoId = 'nKI1Qpc5SMU'
  const navigate = useNavigate()

  const intl = useIntl()

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  }

  const handlePractice = () => {
    if (isMobile) {
      handleChange()
      return
    }
    navigate('/interviewCopilot')
  }

  const handleViewPricing = () => {
    document.querySelector('#Pricing')?.scrollIntoView({ behavior: 'smooth' })
  }
  const infoContent = [
    {
      num: '01',
      title: intl.formatMessage({ id: 'lp.about.infoCard1-title' }),
      subtitle: intl.formatMessage({ id: 'lp.about.infoCard1-subtitle' }),
      color: '#8BC5E5',
    },
    {
      num: '02',
      title: intl.formatMessage({ id: 'lp.about.infoCard2-title' }),
      subtitle: intl.formatMessage({ id: 'lp.about.infoCard2-subtitle' }),
      color: '#3B71FE',
    },
    {
      num: '03',
      title: intl.formatMessage({ id: 'lp.about.infoCard3-title' }),
      subtitle: intl.formatMessage({ id: 'lp.about.infoCard3-subtitle' }),
      color: '#58C27D',
    },
    {
      num: '04',
      title: intl.formatMessage({ id: 'lp.about.infoCard4-title' }),
      subtitle: intl.formatMessage({ id: 'lp.about.infoCard4-subtitle' }),
      color: '#FA8F54',
    },
  ]
  return (
    <div className={styles.wrapper}>
      <div className={styles.topContainer}>
        <div className={styles.title}>
          {intl.formatMessage({ id: 'lp.about.title' })}
        </div>
        <div className={styles.subtitle}>
          {intl.formatMessage({ id: 'lp.about.subtitle' })}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.left}>
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <InfoCard
                num={infoContent[0].num}
                title={infoContent[0].title}
                subtitle={infoContent[0].subtitle}
                color={infoContent[0].color}
              />
              <InfoCard
                num={infoContent[1].num}
                title={infoContent[1].title}
                subtitle={infoContent[1].subtitle}
                color={infoContent[1].color}
              />
            </div>
            <div className={styles.info}>
              <InfoCard
                num={infoContent[2].num}
                title={infoContent[2].title}
                subtitle={infoContent[2].subtitle}
                color={infoContent[2].color}
              />
              <InfoCard
                num={infoContent[3].num}
                title={infoContent[3].title}
                subtitle={infoContent[3].subtitle}
                color={infoContent[3].color}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <BlueButton
              title={intl.formatMessage({ id: 'lp.about.start' })}
              onClick={handlePractice}
            />
            <WhiteButton
              title={intl.formatMessage({ id: 'lp.about.pricing' })}
              onClick={handleViewPricing}
            />
          </div>
        </div>
        <YouTube
          videoId={videoId}
          opts={opts}
          className={styles.video}
          iframeClassName={styles.video}
        />
      </div>
    </div>
  )
}

export default About
