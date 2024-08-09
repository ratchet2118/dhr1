import styles from './TutorialCard.module.less'

interface TutoiralCardProps {
  title: string
  Icon: any
  description: string
}

function TutoiralCard({ title, Icon, description }: TutoiralCardProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{Icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  )
}

export default TutoiralCard
