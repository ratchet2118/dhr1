/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './Header.module.less'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTrial } from '@/store/index'
import { selectInterview } from '@/store/slice'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import { useIntl } from 'react-intl'

interface HeaderProps {
  setOpen: (value: boolean) => void
}

export default function Header(props: HeaderProps) {
  const { setOpen } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector(selectInterview)
  const [timeLeft, setTimeLeft] = useState(300)
  const intl = useIntl()

  useEffect(() => {
    if (selector.trial) {
      setTimeLeft(300)
    } else {
      setTimeLeft(3600)
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId)
          dispatch(setTrial(false))
          navigate('/interviewCopilot')
          window.location.reload()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className={styles.container}>
      <div className={styles.exitContainer} onClick={() => setOpen(true)}>
        <ArrowBackIcon className={styles.icon} />
        <div className={styles.exitText}>
          {intl.formatMessage({ id: 'ca.header.exit' })}
        </div>
      </div>
      <div className={styles.title}>
        {intl.formatMessage({ id: 'ca.header.title' })}
      </div>
      <div className={styles.rightContent}>
        <span className={styles.timerText}>
          <QueryBuilderIcon />
          <span>
            {minutes} : {seconds}
          </span>
        </span>
      </div>
      <div></div>
    </div>
  )
}
