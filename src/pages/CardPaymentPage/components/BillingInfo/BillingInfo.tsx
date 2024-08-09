// author limbo

import styles from './BillingInfo.module.less'
import { Typography, Button } from '@mui/material'
import InfoItem from '../InfoItem/InfoItem'

interface BillingInfoInterface {
  setActiveStep: (value: number) => void
}

function BillingInfo(props: BillingInfoInterface) {
  const { setActiveStep } = props
  const handleSubmit = () => {
    setActiveStep(1)
  }
  return (
    <form
      className={`${styles.wrapper} flex-1 flex flex-col gap-8`}
      onSubmit={handleSubmit}
    >
      <div className={`${styles.billingWrapper} flex flex-col gap-4`}>
        <Typography className={`${styles.text1}  text-custom-Text h-full`}>
          Billing Information
        </Typography>
        <div className={`${styles.name} flex justify-between w-full gap-4`}>
          <InfoItem
            label={`First Name`}
            isRequired={true}
            placeHolder={`First Name`}
          />
          <InfoItem
            label={`Last Name`}
            isRequired={true}
            placeHolder={`Last Name`}
          />
        </div>
        <InfoItem
          label={`Street`}
          isRequired={true}
          placeHolder={`Street Address`}
        />
        <InfoItem
          label={`Apt, Suite, Building`}
          isRequired={false}
          placeHolder={`Apt, Suite, Building (Optional)`}
        />
        <div className={`flex justify-between w-full gap-4`}>
          <InfoItem
            label={`Zip Code`}
            isRequired={true}
            placeHolder={`Zip Code`}
          />
          <InfoItem
            label={`City, State`}
            isRequired={true}
            placeHolder={`City, State`}
          />
        </div>
        <InfoItem
          label={`Country/Region`}
          isRequired={true}
          placeHolder={`Country/Region`}
        />
      </div>
      <div className={`${styles.ContactWrapper} flex flex-col gap-4`}>
        <Typography className={`${styles.title} text-custom-Text`}>
          Contact Information
        </Typography>
        <div className={`${styles.divider}`} />
        <InfoItem
          label={`Email Address`}
          isRequired={true}
          placeHolder={`Email Address`}
        />
      </div>
      <Button
        type="submit"
        size="large"
        color="primary"
        className={`text-custom-actionDisabled bg-custom-actionDisabledBackground rounded-buttonRadius`}
      >
        Payment Information
      </Button>
    </form>
  )
}

export default BillingInfo
