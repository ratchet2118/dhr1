import { TextField, Typography } from '@mui/material'
import styles from './InfoItem.module.less'

interface InfoItemProps {
  label: string
  isRequired: boolean
  placeHolder: string
}

function InfoItem(props: InfoItemProps) {
  const { label, isRequired, placeHolder } = props
  return (
    <div className={`${styles.wrapper} flex flex-col gap-2 flex-1`}>
      <div className={`flex gap-1 flex-1`}>
        <Typography variant="body1" className={`text-custom-primary`}>
          {label}
        </Typography>
        {isRequired && (
          <Typography variant="body1" className={`text-custom-errorMain`}>
            *
          </Typography>
        )}
      </div>
      <TextField
        variant="outlined"
        size="small"
        className={`flex-1`}
        placeholder={placeHolder}
      ></TextField>
    </div>
  )
}

export default InfoItem
