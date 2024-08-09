import styles from './PricingCard.module.less'
import blueCheck from '../../images/blueCheck.png'
interface PricingCardProps {
  title: string
  description1: string
  description2: string
  description3: string
}
export default function PricingCard(props: PricingCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{props.title}:</div>
      <div className={styles.infoContainer}>
        <img src={blueCheck} alt="" className={styles.icon} />
        <div className={styles.text}>{props.description1}</div>
      </div>
      <div className={styles.infoContainer}>
        <img src={blueCheck} alt="" className={styles.icon} />
        <div className={styles.text}>{props.description2}</div>
      </div>
      <div className={styles.infoContainer}>
        <img src={blueCheck} alt="" className={styles.icon} />
        <div className={styles.text}>{props.description3}</div>
      </div>
    </div>
  )
}
