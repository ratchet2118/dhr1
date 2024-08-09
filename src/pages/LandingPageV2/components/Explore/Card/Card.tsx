import styles from './Card.module.less'
import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

interface cardProps {
  questionNum: string
  img: string
  name: string
  interviewNum: string
}

const Card: React.FC<{ props: cardProps }> = ({ props }) => {
  const intl = useIntl()
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.title1}>
        <Typography className={styles.text1}>
          {props.questionNum} {intl.formatMessage({id: 'lp.explore.questions'})}
        </Typography>
      </div>
      <img src={props.img}></img>
      <Typography className={styles.text2}>{props.name}</Typography>
      <Typography className={styles.text3}>
        {props.interviewNum} {intl.formatMessage({id: 'lp.explore.realinterview'})}
      </Typography>
    </div>
  )
}

export default Card
