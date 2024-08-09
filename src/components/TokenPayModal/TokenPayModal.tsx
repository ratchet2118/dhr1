import { useState } from 'react'
import styles from './TokenPayModal.module.less'
import { Box, Button, Modal, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '16px',
}

export default function TokenPayModal({ open, handleClose, couponId }) {
  const [num, setNum] = useState(1)
  const handleChange = (event: any) => {
    const inputValue = event.target.value
    // 使用正则表达式验证输入是否为数字正数
    if (/^\d*\.?\d+$/.test(inputValue)) {
      setNum(inputValue)
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={styles.purchaseHeader}>
          <div className={styles.purchaseTitle}>Interview Copilot</div>
          <div onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.purchaseText}>
          Please enter the number of tokens you would like to buy.
        </div>
        <div className={styles.purchasebottom}>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            variant="outlined"
            type="number"
            value={num}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 1, // 设置最小值为0，确保只能输入正数
              },
            }}
          />
          <form
            action={`https://payment-system-z5xqzpyb7q-uc.a.run.app/stripe/create-checkout-session?times=${num}&coupon_id=${couponId}`}
            method="POST"
          >
            <Button type="submit" className={styles.purchaseButton}>
              <span className={styles.purchaseButtonText}>Buy Now</span>
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  )
}
