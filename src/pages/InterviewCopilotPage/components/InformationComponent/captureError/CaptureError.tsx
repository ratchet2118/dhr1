import styles from './CaptureError.module.less'
import { Box, Button, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useIntl } from 'react-intl'

const style = {
  position: 'absolute',
  top: '25%',
  left: '33%',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '16px',
}

export default function CaptureError({ open, handleClose }) {
  const intl = useIntl()
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={styles.purchaseHeader}>
          <div className={styles.purchaseTitle}>{intl.formatMessage({ id: 'ic.captureerror.title' })}</div>
          <div onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.purchaseText}>{intl.formatMessage({ id: 'ic.captureerror.text' })}</div>
        <div className={styles.purchasebottom}>
          <Button
            type="submit"
            className={styles.purchaseButton}
            onClick={handleClose}
          >
            <span className={styles.purchaseButtonText}>{intl.formatMessage({ id: 'ic.captureerror.button' })}</span>
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
