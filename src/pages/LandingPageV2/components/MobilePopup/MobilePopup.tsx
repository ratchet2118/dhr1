import styles from './MobilePopup.module.less'
import { Box, Button, Modal, Typography } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '8px',
}

export default function MobilePopup({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={styles.purchaseHeader}>
          <Typography className={styles.purchaseTitle}>
            Interview Copilot
          </Typography>
        </div>
        <div className={styles.purchaseText}>
          For a better experience with Interview Copilot, please use a desktop
          browser.
        </div>
        <div className={styles.purchasebottom}>
          <Button
            type="submit"
            className={styles.purchaseButton}
            onClick={handleClose}
          >
            <Typography className={styles.purchaseButtonText}>
              Got It
            </Typography>
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
