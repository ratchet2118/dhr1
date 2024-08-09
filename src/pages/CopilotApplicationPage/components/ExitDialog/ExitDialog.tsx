// author limbo
import { Box } from '@mui/material'
import styles from './ExitDialog.module.less'
import { Modal } from '@mui/material'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ExitDialogProps {
  open: boolean
  setOpen: (value: boolean) => void
  handleExit: () => void
}

const style = {
  position: 'absolute',
  top: '25%',
  left: '33%',
  // transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  p: '32px 24px',
  borderRadius: '16px',
}

function ExitDialog({ open, setOpen, handleExit }: ExitDialogProps) {
  const navigate = useNavigate()
  const handleContinue = () => {
    setOpen(false)
  }

  const clickExit = async () => {
    handleExit()
    setOpen(false)
    navigate('/home')
    window.location.reload()
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.title}>Exit Copilot Session</div>
        </div>
        <div className={styles.text}>
          Are you sure you want to Exit the Copilot?
        </div>
        <div className={styles.bottom}>
          <Button className={styles.exitButton} onClick={clickExit}>
            <span className={styles.exitText}>Exit</span>
          </Button>
          <Button
            className={styles.continueButton}
            variant="outlined"
            onClick={handleContinue}
          >
            <span className={styles.continueText}>Continue</span>
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default ExitDialog
