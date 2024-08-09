import { Button } from '@mui/material'
import styles from './BlueButton.module.less'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface BlueButtonProps {
  title: string
  onClick: () => void
  disabled?: boolean
  padding?: string
}

export default function BlueButton(props: BlueButtonProps) {
  const buttonStyle = {
    padding: props.padding || '8px 22px',
  }
  return (
    <Button
      className={styles.buttonContainer}
      style={buttonStyle}
      variant="contained"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span className={styles.title}>{props.title}</span>
      <ArrowForwardIcon className={styles.icon} />
    </Button>
  )
}
