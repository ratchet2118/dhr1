import styles from './LandingPage.module.less'
import Footer from '@/components/Footer/Footer.tsx'
import Header from '@/components/Header/Header'
import Hero from './components/Hero/Hero'
import Tutorial from './components/Tutorial/Tutorial'
import Pricing from './components/Pricing/Pricing'
import CodeDialog from '@/components/CodeDialog/CodeDialog'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, setCommonSnackbar } from '@/store/index'

function LandingPage() {
  const dispatch = useDispatch()
  const [showDialog, setShowDialog] = useState(false)
  const [searchParams] = useSearchParams()
  const couponId = searchParams.get('coupon_id')

  const handleCloseDialog = () => {
    setShowDialog(false)
  }
  const handleGoInterview = (code: string) => {
    window.location.href = 'https://meeting-copilot.datalynn.com?token=' + code
  }
  const pricingRef = useRef<HTMLDivElement>(null)

  const handleScrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const paid = searchParams.get('paid')
    if (paid === 'true') {
      dispatch(
        setCommonSnackbar({
          severity: 'success',
          message:
            'Payment Successful. Please check the latest email for the access token.',
          duration: 10000,
          open: true,
        }),
      )
    } else if (paid === 'false') {
      dispatch(
        setCommonSnackbar({
          severity: 'error',
          message: 'Payment Cancelled. Please buy again.',
          duration: 10000,
          open: true,
        }),
      )
    }
  }, [dispatch, searchParams])
  return (
    <div
      className={`${styles.wrapper} w-full flex flex-col items-center justify-start overflow-hidden max-w-[100vw] `}
    >
      <Header />
      <div className="max-w-[1024px] w-full flex flex-col justify-center items-center lg:p-0 xs:px-10">
        <CodeDialog
          open={showDialog}
          handleClose={handleCloseDialog}
          handleGoInterview={handleGoInterview}
        ></CodeDialog>
        <Hero
          open={showDialog}
          setOpen={setShowDialog}
          handleScrollToPricing={handleScrollToPricing}
        />
        <Tutorial />
        <Pricing
          open={showDialog}
          setOpen={setShowDialog}
          ref={pricingRef}
          couponId={couponId}
        />
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage
