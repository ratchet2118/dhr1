import { Button } from '@mui/material'
import styles from './WhiteButton.module.less'

interface WhiteButtonProps {
  title: string
  onClick: () => void
  disabled?: boolean
  padding?: string
  width?: string
}

export default function WhiteButton(props: WhiteButtonProps) {
  const buttonStyle = {
    padding: props.padding || '8px 22px',
    width: props.width && props.width,
  }
  return (
    <Button
      style={buttonStyle}
      className={styles.buttonContainer}
      onClick={props.onClick}
      disabled={props.disabled}
      variant="outlined"
    >
      {props.title}
    </Button>
  )
}
