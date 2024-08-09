import styles from './Footer.module.less'
import DataLynnIcon from '@/assets/images/icon-blue.png'
import DataLynnTextIcon from '@/assets/images/text-black.png'
import { TextField } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { styled } from '@mui/material/styles'
import DiscordIcon from '@/assets/images/Icon-discord.svg'
import EmailIcon from '@/assets/images/Icon-email.svg'
import YoutubeIcon from '@/assets/images/icon-youTube.svg'
import LinkedinIcon from '@/assets/images/icon-linkedIn.svg'
import TwitterIcon from '@/assets/images/icon-twitter.svg'
import FaceBookIcon from '@/assets/images/icon-facebook.svg'
import InstagramIcon from '@/assets/images/icon-instagram.svg'
import { useState, useEffect } from 'react'
import { getAddContactEmailApi } from '@/services/api/emailApi'
import { useIntl } from 'react-intl'
const StyledTextField = styled(TextField)({
  width: '255px',
  height: '48px',
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
    '&:hover fieldset': {
      borderColor: '@datalynn-blue1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '@datalynn-blue1',
    },
    '& input': {
      backgroundColor: 'transparent',
      height: '100%',
      color: '@datalynn-light2',
      fontSize: 16,
      fontFamily: 'Poppins',
      fontWeight: 400,
      lineHeight: '24px',
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
    },
  },
})
function Footer() {
  const intl = useIntl()
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [placeholderText, setPlaceholderText] = useState(
    intl.formatMessage({id: 'lp.footer.email'}),
  )
  useEffect(() => {
    setPlaceholderText(intl.formatMessage({ id: 'lp.footer.email' }))
  }, [intl])
  const handleSendEmail = async () => {
    //验证email的格式
    const valiad = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
    if (!valiad) {
      setIsEmailValid(false)
      setEmail('')
    } else {
      setIsEmailValid(true)
      const res = await getAddContactEmailApi(email)
      if (res.message === 'OK') {
        setEmail('')
        setPlaceholderText(intl.formatMessage({id: 'lp.footer.subscribed'}),)
      }
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.companyContainer}>
            <div className={styles.company}>
              <img src={DataLynnIcon} alt="" className={styles.logo} />
              <img src={DataLynnTextIcon} alt="" className={styles.name} />
            </div>
            <div className={styles.description}>
              {intl.formatMessage({id: 'lp.footer.info'})}{' '}
            </div>
          </div>
          <div className={styles.copilotContainer}>
            <div className={styles.text}>Live Interview Copilot</div>
            <div className={styles.text}>Mock Interview Copilot</div>
          </div>
          <div className={styles.communityContainer}>
            <div className={styles.joinText}>{intl.formatMessage({id: 'lp.footer.join'})}</div>
            <StyledTextField
              placeholder={
                isEmailValid ? placeholderText : 'Please Check Your Email'
              }
              error={!isEmailValid}
              variant="outlined"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                endAdornment: (
                  <div
                    className={styles.iconContainer}
                    onClick={handleSendEmail}
                  >
                    <ArrowForwardIcon className={styles.icon} />
                  </div>
                ),
              }}
            />
            <div className={styles.communityIconContainer}>
              <a
                className={styles.communityIcon}
                href="mailto:contact@datalynn.com"
              >
                <img src={EmailIcon} alt="" className={styles.communityIcon} />
              </a>
              <img
                src={DiscordIcon}
                alt=""
                className={styles.communityIcon}
                onClick={() => {
                  window.open('https://discord.com/invite/FTazyxzr')
                }}
              />
              <img src={YoutubeIcon} alt="" className={styles.communityIcon} />
              <img src={LinkedinIcon} alt="" className={styles.communityIcon} />
              <img src={TwitterIcon} alt="" className={styles.communityIcon} />
              <img src={FaceBookIcon} alt="" className={styles.communityIcon} />
              <img
                src={InstagramIcon}
                alt=""
                className={styles.communityIcon}
              />
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomText}>
            © 2024 DataLynn. {intl.formatMessage({id:'lp.footer.copyright'})}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
