/* eslint-disable no-empty-pattern */
// athor mike
import { Button, TextField, Typography } from '@mui/material'
import styles from './TokenComponent.module.less'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import TokenPayModal from '@/components/TokenPayModal/TokenPayModal'
import { useState } from 'react'
import { authenticate } from '../../../../services/auth'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl';

interface TokenComponentProps {
  setStatus: any
  couponId: string | null
}

function TokenComponent(props: TokenComponentProps) {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const [tokenError, setTokenError] = useState(false)
  const [token, setToken] = useState('')
  const [key, setKey] = useState(0)
  const dispatch = useDispatch()
  const intl = useIntl()

  const handleClick = async () => {
    const res = await authenticate(token)
    if (res) {
      setTokenError(false)
      dispatch(props.setStatus('information'))
    }
    // setOpen(true);
    setTokenError(true)
    setKey((prevKey) => prevKey + 1)
  }
  return (
    <>
      <TokenPayModal
        open={open}
        handleClose={handleClose}
        couponId={props.couponId}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          {intl.formatMessage({ id: 'ic.header.title' })}
        </div>
        <div className={styles.tokenContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.title}>
              {intl.formatMessage({ id: 'ic.token_component.enter_token' })}{' '}
              <span style={{ color: '#F00' }}>*</span>
            </div>
            <TextField
              required
              id="outlined-required"
              label={intl.formatMessage({ id: 'ic.token_component.token_label' })}
              placeholder={intl.formatMessage({ id: 'ic.token_component.token_placeholder' })}
              fullWidth
              onChange={(e) => setToken(e.target.value)}
              helperText={
                tokenError ? (
                  <div
                    // style={{
                    //   color: 'rgba(255, 0, 0, 0.60)',
                    //   fontFeatureSettings: "'clig' off, 'liga' off",
                    //   fontFamily: 'Inter',
                    //   fontSize: '12px',
                    //   fontStyle: 'normal',
                    //   fontWeight: 400,
                    //   lineHeight: '166%', // 19.92px
                    // }}
                    className={styles.errorText}
                    key={key}
                  >
                    {token ? intl.formatMessage({ id: 'ic.token_component.invalid_token' }) : intl.formatMessage({ id: 'ic.token_component.enter_token_prompt' })}
                  </div>
                ) : (
                  <></>
                )
              }
            />
          </div>
          <div className={styles.tips}>
            {intl.formatMessage({ id: 'ic.token_component.fields_required' })}
          </div>
          <div className={styles.startContainer}>
            <Button
              className={styles.startButton}
              variant="contained"
              onClick={handleClick}
            >
              <Typography className={styles.startText}>
                {intl.formatMessage({ id: 'ic.token_component.start_interview' })}
              </Typography>
              <ArrowForwardIcon style={{ color: '#fff' }} />
            </Button>
            <Button onClick={handleOpen} className={styles.purchaseToken}>
              <span className={styles.purchaseTokenText}>
                {intl.formatMessage({ id: 'ic.token_component.purchase_token' })}
              </span>
            </Button>
          </div>
          <div className={styles.divider} />
          <div className={styles.noTokenContainer}>
            <div className={styles.left}>
              {intl.formatMessage({ id: 'ic.token_component.dont_have_token' })}
            </div>
            <Button onClick={handleOpen} className={styles.right}>
              {intl.formatMessage({ id: 'ic.token_component.buy_now' })}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenComponent
