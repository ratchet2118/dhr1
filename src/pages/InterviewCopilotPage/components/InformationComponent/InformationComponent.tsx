/* eslint-disable @typescript-eslint/ban-ts-comment */
// author mike
import { Button, Checkbox, MenuItem, TextField } from '@mui/material'
import styles from './InformationComponent.module.less'
import { useRef, useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import googleMeetIcon from '@/assets/images/meetingIcon/googleMeetIcon.png'
import zoomIcon from '@/assets/images/meetingIcon/zoomIcon.png'
import teamsIcon from '@/assets/images/meetingIcon/teamsIcon.png'
import webexIcon from '@/assets/images/meetingIcon/webexIcon.png'
import { selectInterview, setSessionId } from '@/store/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMediaStream } from '../../../../MediaStreamContext'
import CaptureError from './captureError/CaptureError'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { postInitModelApi } from '@/services/api/meetCopilotApi'
import { useIntl } from 'react-intl'

interface InformationComponentProps {
  platform: string
  setPlatform: (value: string) => void
}

const InformationComponent = (props: InformationComponentProps) => {
  const intl = useIntl()
  const userAgent = window.navigator.userAgent
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState(0)
  const { setStoredMediaStream } = useMediaStream()
  const dispatch = useDispatch()
  const { platform, setPlatform } = props
  const [isJobTitleError, setIsJobTitleError] = useState(false)
  const resumeFileInputRef = useRef(null)
  const decriptionFileInputRef = useRef(null)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState(false)
  const [descriptionFile, setDescriptionFile] = useState(null)
  const [isPlatformError, setIsPlatformError] = useState(false)
  const [mediaStream, setMediaStream] = useState<null | MediaStream>(null)
  const [googleChromeChecked, setGoogleChromeChecked] = useState(false)
  const [googleChromeCheckedError, setGoogleChromeCheckedError] =
    useState(false)
  const [headsetChecked, setHeadsetChecked] = useState(false)
  const [headsetCheckedError, setHeadsetCheckedError] = useState(false)
  const navigate = useNavigate()
  const { locale } = useSelector(selectInterview)
  const handleChange = (event: any) => {
    setPlatform(event.target.value)
    if (event.target.value) {
      setIsPlatformError(false)
    }
  }

  const handleGoogleChromeCheckboxChange = (e) => {
    setGoogleChromeChecked(e.target.checked)
    if (e.target.checked === true) {
      setGoogleChromeCheckedError(false)
    }
  }

  const handleHeadsetCheckboxChange = (e: any) => {
    setHeadsetChecked(e.target.checked)
    if (e.target.checked === true) {
      setHeadsetCheckedError(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = async (event: any) => {
    let error = false
    event.preventDefault()
    setKey((prevKey) => prevKey + 1)

    const jobTitle = event.target.jobTitle.value

    if (!jobTitle) {
      setIsJobTitleError(true)
      error = true
    }
    if (!platform) {
      setIsPlatformError(true)
      error = true
    }
    if (!resumeFile) {
      setResumeError(true)
      error = true
    }

    if (platform.includes('Web Meeting Software') && mediaStream === null) {
      setOpen(true)
      error = true
      // return
    }

    if (!googleChromeChecked) {
      setGoogleChromeCheckedError(true)
      error = true
      // return
    }

    if (platform.includes('Local') && !headsetChecked) {
      setHeadsetCheckedError(true)
      error = true
    }

    if (
      !jobTitle ||
      !platform ||
      !resumeFile ||
      open ||
      googleChromeCheckedError ||
      error
    ) {
      return
    }

    //发送逻辑
    const formData = new FormData()
    formData.append('job_title', jobTitle)
    if (resumeFile) {
      formData.append('resume', resumeFile)
    }
    if (descriptionFile) {
      formData.append('job_description', descriptionFile)
    }
    if (locale === 'en') {
      formData.append('lang', 'en-US')
    }
    if (locale === 'zh') {
      formData.append('lang', 'zh-CN')
    }
    try {
      const res = await postInitModelApi(formData)
      if (res.session_id) {
        dispatch(setSessionId(res.session_id))
        navigate('/copilotApplication')
      }
    } catch (error) {
      console.error(error)
    }

    setStoredMediaStream(mediaStream)
  }
  const handleResumeButtonClick = () => {
    if (resumeFileInputRef.current) {
      //@ts-ignore
      resumeFileInputRef.current.click()
    }
  }
  const handleDescriptionButtonClick = () => {
    if (decriptionFileInputRef.current) {
      //@ts-ignore
      decriptionFileInputRef.current.click()
    }
  }
  const handleResumeFileChange = (event: any) => {
    const file = event.target.files[0]
    setResumeFile(file)
    setResumeError(false)
    console.log(resumeFile === null)
  }
  const handleDescriptionFileChange = (event: any) => {
    const file = event.target.files[0]
    setDescriptionFile(file)
  }
  const renderIcon = (platform: string) => {
    return (
      <>
        {open ? <CaptureError open={open} handleClose={handleClose} /> : <></>}
        {!platform && (
          <>
            <img src={googleMeetIcon} alt="" className={styles.icon} />
            <img src={zoomIcon} alt="" className={styles.icon} />
            <img src={teamsIcon} alt="" className={styles.icon} />
            <img src={webexIcon} alt="" className={styles.icon} />
          </>
        )}
        {platform.includes('Google') && (
          <img src={googleMeetIcon} alt="" className={styles.icon} />
        )}
        {platform.includes('Zoom') && (
          <img src={zoomIcon} alt="" className={styles.icon} />
        )}
        {platform.includes('Teams') && (
          <img src={teamsIcon} alt="" className={styles.icon} />
        )}
        {platform.includes('Webex') && (
          <img src={webexIcon} alt="" className={styles.icon} />
        )}
      </>
    )
  }

  const capture = async () => {
    try {
      const systemStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })
      const audioTracks = systemStream.getAudioTracks()
      const systemAudioStream = new MediaStream(audioTracks)
      //const systemAudioRecorder = new MediaRecorder(systemAudioStream);
      setMediaStream(systemAudioStream)
    } catch (error) {
      console.error('Error capturing microphone:', error)
      return null
    }
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.title}>
            {intl.formatMessage({ id: 'ic.information_component.title' })}
          </div>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.jobTitleContainer}>
              <label className={styles.label}>
                {intl.formatMessage({
                  id: 'ic.information_component.jobTitle',
                })}
                <span style={{ color: '#F00' }}>*</span>
              </label>
              <TextField
                fullWidth
                size="small"
                placeholder={intl.formatMessage({
                  id: 'ic.information_component.jobTitle_placeholder',
                })}
                name="jobTitle"
                variant="outlined"
                onChange={(event: any) => {
                  if (event.target.value) {
                    setIsJobTitleError(false)
                  }
                }}
                helperText={
                  isJobTitleError ? (
                    <div className={styles.errorText1} key={key}>
                      {intl.formatMessage({
                        id: 'ic.information_component.jobTitle_placeholder',
                      })}
                    </div>
                  ) : (
                    <></>
                  )
                }
                error={isJobTitleError}
              />
            </div>
            <div className={styles.bottomContainer}>
              <div
                onClick={handleResumeButtonClick}
                className={styles.uploadContainer}
              >
                <input
                  type="file"
                  ref={resumeFileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleResumeFileChange}
                  accept=".docx,.pdf"
                />
                <div className={styles.left}>
                  <UploadFileIcon style={{ color: '#fff' }} />
                </div>
                <div>
                  <div>
                    {/* @ts-ignore */}
                    {resumeFile ? (
                      resumeFile.name
                    ) : (
                      <span
                        key={key}
                        className={
                          resumeError
                            ? styles.uploadTextError
                            : styles.uploadText
                        }
                        style={{
                          color:
                            resumeError && resumeFile == null
                              ? 'red'
                              : 'inherit',
                        }}
                      >
                        {intl.formatMessage({
                          id: 'ic.information_component.resume_title',
                        })}
                        <span key={key} className={styles.blink}>
                          *
                        </span>
                      </span>
                    )}
                  </div>
                  <div
                    key={key}
                    className={
                      resumeError ? styles.subtitleError : styles.subtitle
                    }
                    style={{
                      color:
                        resumeError && resumeFile == null ? 'red' : 'inherit',
                    }}
                  >
                    {resumeFile ? (
                      <span>
                        {intl.formatMessage({
                          id: 'ic.information_component.reupload.helptext',
                        })}
                      </span>
                    ) : (
                      <span>
                        {intl.formatMessage({
                          id: 'ic.information_component.resume.helptext',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div
                onClick={handleDescriptionButtonClick}
                className={styles.uploadContainer}
              >
                <input
                  type="file"
                  ref={decriptionFileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleDescriptionFileChange}
                  accept=".docx,.pdf"
                />
                <div className={styles.left}>
                  <UploadFileIcon style={{ color: '#fff' }} />
                </div>
                <div>
                  <div className={styles.uploadText}>
                    {/* @ts-ignore */}
                    {descriptionFile ? (
                      //  @ts-ignore
                      descriptionFile.name
                    ) : (
                      <span>
                        {intl.formatMessage({
                          id: 'ic.information_component.jobDescription.title',
                        })}
                      </span>
                    )}
                  </div>
                  <div className={styles.subtitle}>
                    {descriptionFile
                      ? intl.formatMessage({
                          id: 'ic.information_component.reupload.helptext',
                        })
                      : intl.formatMessage({
                          id: 'ic.information_component.jobDescription.helptext',
                        })}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.selectContainer}>
              <div className={styles.top}>
                <div className={styles.selectText}>
                  {intl.formatMessage({
                    id: 'ic.information_component.platform.title',
                  })}
                  <span style={{ color: '#f00' }}>*</span>
                </div>
                {renderIcon(platform)}
              </div>
              {!/Windows/.test(userAgent) ? (
                <TextField
                  label={intl.formatMessage({
                    id: 'ic.information_component.platform.placeholder',
                  })}
                  id={`platform`}
                  size="small"
                  placeholder={`Select`}
                  fullWidth={true}
                  select={true}
                  defaultValue={``}
                  onChange={handleChange}
                  required={true}
                  error={isPlatformError}
                >
                  <MenuItem value={'Web Meeting Software Google Meet'}>
                    Google Meet
                  </MenuItem>
                  <MenuItem value={'Local Meeting Software Zoom'}>
                    Zoom
                  </MenuItem>
                  <MenuItem value={'Local Meeting Software Microsoft Teams'}>
                    Microsoft Teams (Local)
                  </MenuItem>
                  <MenuItem value={'Web Meeting Software Microsoft Teams'}>
                    Microsoft Teams (Web Page)
                  </MenuItem>
                  <MenuItem value={'Local Meeting Software Webex'}>
                    Webex (Local)
                  </MenuItem>
                  <MenuItem value={'Web Meeting Software Webex'}>
                    Webex (Web Page)
                  </MenuItem>
                  <MenuItem value={'Local Meeting Software Others'}>
                    Other Local Meeting Platforms
                  </MenuItem>
                  <MenuItem value={'Web Meeting Software Others'}>
                    Other Web Meeting Platforms
                  </MenuItem>
                </TextField>
              ) : (
                <TextField
                  label={intl.formatMessage({
                    id: 'ic.information_component.platform.placeholder',
                  })}
                  id={`platform`}
                  size="small"
                  placeholder={`Select`}
                  fullWidth={true}
                  select={true}
                  defaultValue={``}
                  onChange={handleChange}
                  required={true}
                  error={isPlatformError}
                  className="blink-text"
                >
                  <MenuItem value={'Web Meeting Software Google'}>
                    Google Meet
                  </MenuItem>
                  <MenuItem value={'Web Meeting Software Microsoft Teams'}>
                    Microsoft Teams
                  </MenuItem>
                  <MenuItem value={'Web Meeting Software Zoom'}>Zoom</MenuItem>
                  <MenuItem value={'Web Meeting Software Webex'}>
                    Webex
                  </MenuItem>
                  <MenuItem value={'Web Meeting Software Others'}>
                    Others
                  </MenuItem>
                </TextField>
              )}
            </div>
            <div className={styles.optionContainer}>
              {platform.includes('Web Meeting') && (
                <div className={styles.webContainer}>
                  <div className={styles.text}>
                    {intl.formatMessage({
                      id: 'ic.information_component.shareMeeting',
                    })}
                  </div>
                  <Button
                    className={styles.captureButton}
                    variant="outlined"
                    onClick={capture}
                  >
                    {intl.formatMessage({
                      id: 'ic.information_component.button.shareMeeting',
                    })}
                  </Button>
                  <div className={styles.radioContainer}>
                    <Checkbox
                      className={googleChromeCheckedError ? styles.blink : ''}
                      key={key}
                      onChange={handleGoogleChromeCheckboxChange}
                      checked={googleChromeChecked}
                    />
                    <div className={styles.radioText}>
                      {intl.formatMessage({
                        id: 'ic.information_component.checkbox.browser',
                      })}
                      <span style={{ color: '#f00' }}>*</span>
                    </div>
                  </div>
                </div>
              )}
              {platform.includes('Local Meeting') && (
                <div className={styles.localContainer}>
                  <div className={styles.radioContainer}>
                    <Checkbox
                      className={googleChromeCheckedError ? styles.blink : ''}
                      key={key}
                      onChange={handleGoogleChromeCheckboxChange}
                      checked={googleChromeChecked}
                    />
                    <div className={styles.radioText}>
                      {intl.formatMessage({
                        id: 'ic.information_component.checkbox.browser',
                      })}
                      <span style={{ color: '#f00' }}>*</span>
                    </div>
                  </div>
                  <div className={styles.radioContainer}>
                    <Checkbox
                      className={headsetCheckedError ? styles.blink : ''}
                      key={key}
                      onChange={handleHeadsetCheckboxChange}
                      checked={headsetChecked}
                    />
                    <div className={styles.radioText}>
                      {intl.formatMessage({
                        id: 'ic.information_component.checkbox.earphone',
                      })}
                      <span style={{ color: '#f00' }}>*</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.tipText}>
              {intl.formatMessage({
                id: 'ic.information_component.checkbox.inquire1',
              })}
              <span style={{ color: '#f00' }}>*</span>
              {intl.formatMessage({
                id: 'ic.information_component.checkbox.inquire2',
              })}
            </div>
            <div className={styles.buttonContainer}>
              <Button
                type="submit"
                variant="contained"
                className={styles.button}
              >
                <div className={styles.buttonText}>
                  {intl.formatMessage({
                    id: 'ic.information_component.button.start',
                  })}
                </div>
                <ArrowForwardIcon
                  style={{
                    color: '#fff',
                    width: '24px',
                    height: '24px',
                    flexShrink: 0,
                  }}
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default InformationComponent
