import { useSearchParams } from 'react-router-dom'
import styles from './Pricing.module.less'
import PricingCard from './components/PricingCard/PricingCard'
import TokenPayModal from '@/components/TokenPayModal/TokenPayModal'
import { useState } from 'react'
import { useIntl } from 'react-intl'

function Pricing() {
  const intl = useIntl()
  const [searchParams] = useSearchParams()
  const couponId = searchParams.get('coupon_id')
  const [isopen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleContact = () => {
    window.location.href = 'mailto:datalynn.contact@gmail.com'
  }
  const cardList = [
    {
      type: intl.formatMessage({id : 'lp.pricing.starterType'}),
      description: intl.formatMessage({id : 'lp.pricing.starterDescription'}),
      price: intl.formatMessage({id : 'lp.pricing.starterPrice'}),
      featureList: [
        intl.formatMessage({id : 'lp.pricing.starterfeature1'}),
        intl.formatMessage({id : 'lp.pricing.starterfeature2'}),
        intl.formatMessage({id : 'lp.pricing.starterfeature3'}),
        intl.formatMessage({id : 'lp.pricing.starterfeature4'}),
        intl.formatMessage({id : 'lp.pricing.starterfeature5'}),
      ],
    },
    {
      type: intl.formatMessage({id : 'lp.pricing.enterpriseType'}),
      description: intl.formatMessage({id : 'lp.pricing.enterpriseDescription'}),
      price: intl.formatMessage({id : 'lp.pricing.enterprisePrice'}),
      featureList: [
        intl.formatMessage({id : 'lp.pricing.enterprisefeature1'}),
        intl.formatMessage({id : 'lp.pricing.enterprisefeature2'}),
        intl.formatMessage({id : 'lp.pricing.enterprisefeature3'}),
        intl.formatMessage({id : 'lp.pricing.enterprisefeature4'})
      ],
    },
  ]
  return (
    <>
      <TokenPayModal
        open={isopen}
        handleClose={handleClose}
        couponId={couponId}
      />
      <div className={styles.wrapper} id="Pricing">
        <div className={styles.top}>
          <div className={styles.title}>{intl.formatMessage({id : 'lp.pricing.title'})}</div>
          <div className={styles.subtitle}>
            {intl.formatMessage({id : 'lp.pricing.subtitle'})}
          </div>
        </div>
        <div className={styles.bottom}>
          <PricingCard
            type={cardList[0].type}
            description={cardList[0].description}
            price={cardList[0].price}
            features={cardList[0].featureList}
            handleOpen={handleOpen}
            handleContact={handleContact}
          />
          <PricingCard
            type={cardList[1].type}
            description={cardList[1].description}
            price={cardList[1].price}
            features={cardList[1].featureList}
            handleOpen={handleOpen}
            handleContact={handleContact}
          />
        </div>
      </div>
    </>
  )
}

export default Pricing
