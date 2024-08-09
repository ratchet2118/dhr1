/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import styles from './CodeDialog.module.less'
import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  Button,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'

interface CodeDialogProps {
  open: boolean
  handleClose: () => void
  handleGoInterview: (value: string) => void
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: '40px 24px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function CodeDialog(props: CodeDialogProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const { open, handleClose, handleGoInterview } = props

  const handleClick = () => {
    if (code.trim() === '') {
      setErrorText('Invalid Token')
      setError(true)
    } else {
      setErrorText('')
      handleGoInterview(code)
    }
  }

  useEffect(() => {
    if (code.trim() !== '') {
      setError(false)
      setErrorText('')
    }
  }, [code])
  return (
    <BootstrapDialog open={open}>
      <DialogContent className={`${styles.wrapper} flex flex-col gap-6`}>
        <header className={`${styles.header} flex justify-between`}>
          <Typography className={`${styles.title}`}>
            Interview Copilot
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              width: 24,
              height: 24,
              color: () => '#000',
            }}
          >
            <CloseIcon />
          </IconButton>
        </header>
        <div className={`${styles.content} flex flex-col gap-4 items-center`}>
          <div className={`flex flex-col gap-2 w-full`}>
            <Typography className={`${styles.label}`}>
              Enter The 6 Digits Token
            </Typography>
            <TextField
              label="Token"
              error={error}
              helperText={errorText}
              id="outlined-basic"
              placeholder="Please Enter 6 Digits Token"
              variant="outlined"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            className={`${styles.startButton}`}
            onClick={handleClick}
          >
            Start
          </Button>
          <form
            className={`w-full`}
            action={`https://payment-system-z5xqzpyb7q-uc.a.run.app/stripe/create-checkout-session`}
            method="POST"
          >
            <div className={`flex w-full gap-[9px]`}>
              <Typography className={`${styles.contentText}`}>
                Don’t have a Token?
              </Typography>
              <button type="submit">
                <Typography
                  className={`${styles.contentImportantText} cursor-pointer`}
                >
                  Buy Now!
                </Typography>
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </BootstrapDialog>
  )
}

export default CodeDialog
