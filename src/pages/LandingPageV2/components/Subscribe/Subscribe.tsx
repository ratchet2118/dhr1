import { TextField } from '@mui/material'
import styles from './Subscribe.module.less'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { styled } from '@mui/material/styles'
import images from './images/Bitmap.png'
import { useEffect, useState } from 'react'
import { getAddContactEmailApi } from '@/services/api/emailApi'
import { useIntl } from 'react-intl'
const StyledTextField = styled(TextField)({
  width: '448px',
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
    '&:hover fieldset': {
      borderColor: '@datalynn-blue1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '@datalynn-blue1',
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
    },
    '& input': {
      height: '100%',
      color: '@datalynn-light2',
      fontSize: 16,
      fontFamily: 'Poppins',
      fontWeight: 400,
      lineHeight: '24px',
    },
  },
})
const Subscribe = () => {
  const intl = useIntl()
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [placeholderText, setPlaceholderText] = useState(
    intl.formatMessage({ id: 'lp.subscribe.email' }),
  )
  useEffect(() => {
    setPlaceholderText(intl.formatMessage({ id: 'lp.subscribe.email' }))
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
        setPlaceholderText(intl.formatMessage({id:'lp.subscribe.subscribed'}))
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.textContainer}>
            <div className={styles.top}>
              <div className={styles.subtitle}>
                {intl.formatMessage({id:'lp.subscribe.smalltitle'})}
              </div>
              <div className={styles.title}>{intl.formatMessage({id:'lp.subscribe.title'})}</div>
            </div>
            <div className={styles.bottom}>
            {intl.formatMessage({id:'lp.subscribe.subtitle'})}
            </div>
          </div>
          <StyledTextField
            placeholder={
              isEmailValid ? placeholderText : intl.formatMessage({id:'lp.subscribe.email'})
            }
            error={!isEmailValid}
            variant="outlined"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <div className={styles.iconContainer} onClick={handleSendEmail}>
                  <ArrowForwardIcon className={styles.icon} />
                </div>
              ),
            }}
          />
        </div>
        <img src={images} alt="" className={styles.img} />
      </div>
    </div>
  )
}

export default Subscribe
