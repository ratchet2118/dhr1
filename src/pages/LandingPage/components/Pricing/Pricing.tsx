// author mike
import { Button } from '@mui/material'
import styles from './Pricing.module.less'
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { forwardRef, useState } from 'react'
import TokenPayModal from '@/components/TokenPayModal/TokenPayModal'
import PricingCard from '../PricingCard/PricingCard'

interface PricingProps {
  open: boolean
  setOpen: (value: boolean) => void
  couponId: string | null
}
const info = [
  {
    title: 'Benefits',
    description1: 'Cost-Effective: Start with minimal investment to experience high-quality interview assistance.',
    description2: 'Flexibility: Purchase tokens only when you need them, without any recurring fees.',
    description3: 'No Waste: Use each token for a full interview session pay only for what you use.',
  },
  {
    title: 'Features',
    description1: 'One-Hour Service: Pay only for the time you use.',
    description2: 'AI-Enhanced Copilot Models: Leverage advanced AI technology to provide tailored models for specific job positions.',
    description3: '24/7 Priority Support: Access around-the-clock priority support to assist you whenever you need.',
  },
]

const Pricing = forwardRef<HTMLDivElement, PricingProps>((props, ref) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // const { setOpen } = props
  const { couponId } = props
  return (
    <>
      <TokenPayModal
        open={open}
        handleClose={handleClose}
        couponId={couponId}
      />
      <div className={styles.pricingContainer} ref={ref}>
        <div className={styles.header}>Pricing</div>
        <div className={styles.info}>
          Unlock your potential with just a token. Each token grants you one
          complete use of our interview copilot service, allowing you to pay as
          you go. Buy tokens as needed and use them whenever you're ready for
          your next interview. No subscriptions, no commitments—just
          straightforward, affordable access to help you succeed.
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <PricingCard
              title={info[0].title}
              description1={info[0].description1}
              description2={info[0].description2}
              description3={info[0].description3}
            />
            <div className={styles.divider} />
            <PricingCard
              title={info[1].title}
              description1={info[1].description1}
              description2={info[1].description2}
              description3={info[1].description3}
            />
          </div>
          <div className={styles.middle}>
            <div className={styles.priceText}>$25.00</div>
            <div className={styles.tokenText}>per token</div>
          </div>
          <div className={styles.bottom}>
            <Button
              className={styles.buyButton}
              variant="contained"
              onClick={handleOpen}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </>
  )
})

export default Pricing
