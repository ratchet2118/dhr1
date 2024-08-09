// author limbo

import styles from './Summary.module.less'
import { Typography, TextField, Button } from '@mui/material'
import serviceImg from '@/assets/images/img-service.svg'
import { useState } from 'react'

function Summary() {
  const [showPromotion, setShowPromotionCode] = useState(true)
  const [promotionCode, setPromotionCode] = useState('')
  const handleApplyPromotionCode = () => {
    setShowPromotionCode(true)
  }
  return (
    <div className={`${styles.wrapper} p-12 flex flex-col flex-1 gap-9`}>
      <Typography className={`${styles.title} text-custom-Text`}>
        Payment Summary
      </Typography>
      <div
        className={`${styles.price} flex flex-col h-[278px] justify-between`}
      >
        <div className={`flex justify-between`}>
          <Typography className={`${styles.text} text-custom-Text`}>
            Interview Copilot
          </Typography>
          <Typography className={`${styles.text} text-custom-Text`}>
            $20.00
          </Typography>
        </div>
        <img src={serviceImg} className={`w-full h-[229px]`} />
      </div>
      {showPromotion && (
        <>
          <div className={`${styles.divider}`} />
          <div className={`flex justify-between w-full gap-[50px]`}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Promotion Code"
              className={`flex-1`}
              value={promotionCode}
              onChange={(e) => setPromotionCode(e.target.value)}
            />
            <Button
              onClick={handleApplyPromotionCode}
              size="medium"
              color="primary"
              className={`text-custom-actionDisabled bg-custom-actionDisabledBackground rounded-buttonRadius`}
            >
              Apply
            </Button>
          </div>
          <div className={`${styles.divider}`} />
          <div className={`h-[49px] flex justify-between`}>
            <Typography
              className={`${styles.text2} text-custom-Text flex items-end`}
            >
              Subtotal
            </Typography>
            <Typography
              className={`${styles.text2} text-custom-Text flex items-end`}
            >
              $20.80
            </Typography>
          </div>
        </>
      )}
      {!showPromotion && (
        <>
          <div
            className={`flex flex-col h-[66px] gap-2 pt-2 border-t border-[#ACACAC]`}
          >
            <div className={`h-[25px] flex justify-between`}>
              <Typography
                className={`${styles.text2} text-custom-Text flex items-end`}
              >
                Subtotal
              </Typography>
              <Typography
                className={`${styles.text2} text-custom-Text flex items-end`}
              >
                $20.00
              </Typography>
            </div>
            <div className={`h-[25px] flex justify-between`}>
              <Typography
                className={`${styles.text2} ${styles.discount}  flex items-end`}
              >
                Promotion Code - 25% Off
              </Typography>
              <Typography
                className={`${styles.text2} ${styles.discount}  flex items-end`}
              >
                -$5.00
              </Typography>
            </div>
          </div>
        </>
      )}
      <div className={`${styles.divider}`} />
      <div className={`h-[79px] flex justify-between pt-6`}>
        <Typography className={`${styles.text2} text-custom-Text`}>
          Total
        </Typography>
        <Typography
          className={`${styles.text3} text-custom-Text flex items-center`}
        >
          USD {showPromotion ? `$20.00` : '$15.00'}
        </Typography>
      </div>
    </div>
  )
}

export default Summary
