import styles from './InfoCard.module.less'
interface InfoCardProps {
  num: string
  title: string
  subtitle: string
  color: string
}

export default function InfoCard(props: InfoCardProps) {
  const { num, title, subtitle, color } = props
  return (
    <div className={styles.container}>
      <div className={styles.numContainer} style={{ background: color }}>
        {num}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  )
}
