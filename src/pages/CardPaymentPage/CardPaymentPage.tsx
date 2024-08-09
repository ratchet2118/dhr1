import BillingInfo from './components/BillingInfo/BillingInfo'
import Summary from './components/Summary/Summary'
import Header from '@/components/Header/Header'
import styles from './CardPaymentPage.module.less'
import { Stepper, Step, StepLabel } from '@mui/material'
import { useState } from 'react'
import PaymentInfo from './components/PaymentInfo/PaymentInfo'
import Confirmed from './components/Confirmed/Confirmed'

const steps = ['Billing Information', 'Payment Informations', 'Confirmation']

function CardPaymentPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [completed] = useState<{
    [k: number]: boolean
  }>({})
  return (
    <div
      className={`${styles.wrapper} w-screen flex flex-col items-center overflow-hidden max-w-full`}
    >
      <Header />
      <div className={`flex justify-center max-w-[1488px] w-full`}>
        <Summary />
        <div
          className={`${styles.infoContainer} flex-1 py-8 px-12 flex flex-col gap-8`}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={completed[index]}
                style={{ paddingLeft: index === 0 ? '0' : '8px' }}
              >
                <StepLabel color="inherit">{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && <BillingInfo setActiveStep={setActiveStep} />}
          {activeStep === 1 && <PaymentInfo />}
          {activeStep === 2 && <Confirmed />}
        </div>
      </div>
    </div>
  )
}

export default CardPaymentPage
