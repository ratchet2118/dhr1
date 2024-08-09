// author mike
import styles from './TitleComponent.module.less'
import displayVideo from '@/pages/LandingPage/images/display.mp4'
import googleMeetIcon from '@/assets/images/meetingIcon/googleMeetIcon.png'
import zoomIcon from '@/assets/images/meetingIcon/zoomIcon.png'
import teamsIcon from '@/assets/images/meetingIcon/teamsIcon.png'
import webexIcon from '@/assets/images/meetingIcon/webexIcon.png'
import StepComponent from '../StepComponent/StepComponent'
import { useIntl } from 'react-intl';

interface TitleComponentProps {
  platform: string
}
function TitleComponent(props: TitleComponentProps) {
  const { platform } = props
  const intl = useIntl()
  return (
    <div className={styles.container}>
      <video
        src={displayVideo}
        className={styles.video}
        controls
        muted
        autoPlay
      ></video>
      <div className={styles.infoContainer}>
        <div className={styles.infoText}>
          {intl.formatMessage({ id: 'ic.title_component.no_download' })}
        </div>
        <div className={styles.infoLogoContainer}>
          <div className={styles.logoContent}>
            <img src={googleMeetIcon} alt="" className={styles.logo} />
            <div className={styles.text}>
              {intl.formatMessage({ id: 'ic.title_component.google_meet' })}
            </div>
          </div>
          <div className={styles.logoContent}>
            <img src={zoomIcon} alt="" className={styles.logo} />
            <div className={styles.text}>
              {intl.formatMessage({ id: 'ic.title_component.zoom' })}
            </div>
          </div>
          <div className={styles.logoContent}>
            <img src={teamsIcon} alt="" className={styles.logo} />
            <div className={styles.text}>
              {intl.formatMessage({ id: 'ic.title_component.ms_teams' })}
            </div>
          </div>
          <div className={styles.logoContent}>
            <img src={webexIcon} alt="" className={styles.logo} />
            <div className={styles.text}>
              {intl.formatMessage({ id: 'ic.title_component.webex' })}
            </div>
          </div>
        </div>
      </div>
      <StepComponent platform={platform} />
    </div>
  );
}

export default TitleComponent
