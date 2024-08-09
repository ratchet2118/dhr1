// author limbo
import { Typography } from '@mui/material'
import styles from './Header.module.less'
import HouseIcon from '@mui/icons-material/House'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useIntl } from 'react-intl'

function Header() {
  const navigate = useNavigate()
  const intl = useIntl()
  const [searchParams] = useSearchParams()
  const couponId = searchParams.get('coupon_id')
  const handleGoHome = () => {
    if (couponId) {
      navigate(`/home?coupon_id=${couponId}`)
    } else {
      navigate('/home')
    }
  }
  return (
    <div
      className={`${styles.wrapper} flex justify-between w-full items-center`}
    >
      <div
        className={`flex items-center gap-2 text-white h-full cursor-pointer`}
        onClick={handleGoHome}
      >
        <HouseIcon />
        <Typography className={`${styles.text}`}>
          {intl.formatMessage({ id: 'ic.header.home' })}
        </Typography>
      </div>
      <div className={`flex justify-center items-center flex-1 text-white`}>
        <Typography className={`${styles.title}`}>
          {intl.formatMessage({ id: 'ic.header.title' })}
        </Typography>
      </div>
    </div>
  )
}

export default Header
