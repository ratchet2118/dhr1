import styles from './PositionCard.module.less'
import { Typography } from '@mui/material'
interface cardProps {
  img: string
  name: string
  num: string
}
export default function PositionCard(props: cardProps) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={props.img} />
      <div className={styles.right}>
        <div className={styles.text1}>{props.name}</div>
        <div className={styles.text2}>
          <Typography className={styles.typo}>{props.num} Questions</Typography>
        </div>
      </div>
    </div>
  )
}
