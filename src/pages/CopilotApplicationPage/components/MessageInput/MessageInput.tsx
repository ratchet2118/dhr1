import styles from './MessageInput.module.less'
import { Button } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import { useIntl } from 'react-intl'

export default function MessageInput({
  startMeeting,
  transcribe,
  recordingStatus,
  setRecordingStatus,
}) {
  const intl = useIntl()
  return (
    <div className={styles.container}>
      {recordingStatus === 'start' ? (
        <>
          <Button
            onClick={startMeeting}
            className={styles.buttonContainer}
            variant="contained"
          >
            <div className={styles.content}>
              <MicIcon className={styles.icon} />
              <div className={styles.text}>
                {intl.formatMessage({ id: 'ca.messageInput.start' })}
              </div>
            </div>
          </Button>
          <div className={styles.startButtonText}>
            {intl.formatMessage({ id: 'ca.messageInput.startText' })}
          </div>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              setRecordingStatus('loading')
              transcribe(true,false)
            }}
            className={
              recordingStatus === 'loading'
                ? styles.buttonContainer2
                : styles.buttonContainer
            }
            disabled={recordingStatus === 'loading'}
            variant="contained"
          >
            <div className={styles.content}>
              <GraphicEqIcon className={styles.icon} />
              {recordingStatus === 'loading' ? (
                <div className={styles.text}>
                  {intl.formatMessage({ id: 'ca.messageInput.loading' })}
                </div>
              ) : (
                <div className={styles.text}>
                  {intl.formatMessage({ id: 'ca.messageInput.generate' })}
                </div>
              )}
            </div>
          </Button>
          {recordingStatus != 'loading' ? (
            <div className={styles.bottomText}>
              {intl.formatMessage({ id: 'ca.meaageInput.generateText' })}
            </div>
          ) : (
            <div className={styles.bottomText3}>{'.'}</div>
          )}
        </>
      )}
    </div>
  )
}
