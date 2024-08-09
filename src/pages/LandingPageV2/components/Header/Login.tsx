import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.less'
import { useIntl } from 'react-intl'

function Login() {
  const navigate = useNavigate()

  // const handleLogin = () => {
  //     navigate('/login');
  // };

  const handleGetStarted = () => {
    navigate('/interviewCopilot')
  }

  const intl = useIntl()

  return (
    <div className={`${styles.login}`}>
      {/* <Button className={`${styles.loginButton}`} onClick={handleLogin}>
       {intl.formatMessage({ id: 'lp.header.login'})}
       </Button> */}

      <Button
        className={`${styles.getStartButton}`}
        variant="contained"
        style={{ borderRadius: '90px' }}
        onClick={handleGetStarted}
      >
        {intl.formatMessage({ id: 'lp.header.start' })}
      </Button>
    </div>
  )
}

export default Login
