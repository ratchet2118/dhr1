import WhiteButton from '@/components/WhiteButton/WhiteButton'
import styles from './PricingCard.module.less'
import blueCheck from '../../images/blueCheck.png'
import { useIntl } from 'react-intl'
import { Typography } from '@mui/material';
interface PricingCardProps {
  type: string
  description: string
  price: string
  features: string[]
  handleOpen: () => void
  handleContact: () => void
}
export default function PricingCard(props: PricingCardProps) {
  const { type, description, price, features, handleOpen, handleContact } =
    props
  const intl = useIntl()
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.textContainer}>
          <div className={styles.typeText}>{type}</div>
          <div className={styles.descriptionText}>{description}</div>
        </div>
        <div className={styles.priceContainer}>
          {type === 'Starter' || type === '初级' ? (
            <div className={styles.priceText}>{price} {' '}
            <Typography
            component="span"
            sx={{
              color: 'var(--Neutrals-2, #23262F)',
              fontFamily: '"DM Sans"',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '115%',
            }}
          >
            / Token
          </Typography></div>
          ) : (
            <div className={styles.priceText}>{price}</div>
          )}
        </div>
      </div>
      {type === 'Starter' || type === '初级' ? (
        <WhiteButton title={intl.formatMessage({ id: 'lp.pricing.starterStart' })} onClick={handleOpen} width="100%" />
      ) : (
        <WhiteButton
          title={intl.formatMessage({ id: 'lp.pricing.enterpriseContact' })}
          onClick={handleContact}
          width="100%"
        />
      )}
      <div className={styles.featureContainer}>
        {type === 'Starter' || type === '初级' ? (
          <div className={styles.title}>
            {intl.formatMessage({ id: 'lp.pricing.starterInfo' })}
          </div>) : (
          <div className={styles.title}>
            {intl.formatMessage({ id: 'lp.pricing.enterpriseInfo' })}
          </div>
        )}
        {features.map((feature, index) => (
          <div className={styles.feature} key={index}>
            <img src={blueCheck} alt="" className={styles.icon} />
            <div className={styles.featureText}>{feature}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
