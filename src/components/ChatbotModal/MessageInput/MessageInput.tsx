import styles from './MessageInput.module.less'
import { Button } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'

export default function MessageInput({
  startMeeting,
  transcribe,
  recordingStatus,
}) {
  return (
    <div className={styles.container}>
      {recordingStatus === 'start' ? (
        <>
          <Button onClick={startMeeting} className={styles.buttonContainer}>
            <div className={styles.content}>
              <MicIcon className={styles.icon} />
              <div className={styles.text}>Start Recording</div>
            </div>
          </Button>
          <div className={styles.bottomText}>
            Ensure the interviewer is ready in the meeting room since his voice
            is required to initiate copilot session.{' '}
          </div>
        </>
      ) : (
        <>
          <Button
            onClick={() => transcribe(true)}
            className={styles.buttonContainer}
          >
            <div className={styles.content}>
              <GraphicEqIcon className={styles.icon} />
              <div className={styles.text}>Generate Answer</div>
            </div>
          </Button>
          <div className={styles.bottomText2}>Recording In Progress</div>
        </>
      )}
    </div>
  )
}
