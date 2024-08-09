/* eslint-disable prefer-const */
import styles from './CopilotApplicationPage.module.less'
import { useEffect, useRef, useState } from 'react'
import MessageList from './components/MessageList/MessageList'
import MessageInput from './components/MessageInput/MessageInput'
import Header from './components/Header/Header'
import { useSelector, useDispatch } from 'react-redux'
import { selectInterview, setSessionId } from '@/store/slice'
import { useMediaStream } from '../../MediaStreamContext'
import ExitDialog from './components/ExitDialog/ExitDialog'
import { SERVER_ENDPOINT } from '../../config'
import { useNavigate } from 'react-router-dom'

function CopilotApplicationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { storedMediaStream, setStoredMediaStream } = useMediaStream()
  const [messages, setMessages] = useState<{ text: string; role: string }[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const backendUrl = SERVER_ENDPOINT
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const transcriptionRef = useRef<string>('')
  const { sessionId, locale } = useSelector(selectInterview)
  const [recordingStatus, setRecordingStatus] = useState('start')
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const transcribeQueueRef = useRef<Promise<void>>(Promise.resolve()) // 队列管理
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    clearTimeout(timeout.current)
    const userMessage = {
      text: transcriptionRef.current,
      role: 'user',
    }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    transcriptionRef.current = ''

    setIsGenerating(true)

    const encodedMessage = encodeURIComponent(userMessage.text)
    const eventSourceUrl = `${backendUrl}/chat/?prompt=${encodedMessage}&session_id=${sessionId}`
    const eventSource = new EventSource(eventSourceUrl)

    eventSource.onmessage = (event) => {
      clearTimeout(timeout.current)
      let count = 0
      const message = JSON.parse(event.data)
      const singleSpacedText = message.data
      const botMessage = { text: singleSpacedText, role: 'bot' }

      setMessages((prevMessages) => {
        let newMessages = [...prevMessages]
        if (
          newMessages.length > 0 &&
          newMessages[newMessages.length - 1].role === 'bot'
        ) {
          count += 1
          if (count == 1) {
            newMessages[newMessages.length - 1].text += botMessage.text
          }
        } else {
          newMessages.push(botMessage)
        }
        return newMessages
      })

      setIsGenerating(false)
    }

    eventSource.onerror = () => {
      eventSource.close()
      setIsGenerating(false)
      setRecordingStatus('generate')
    }
  }

  const startRecording = async () => {
    let stream

    if (storedMediaStream) {
      stream = storedMediaStream
    } else {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    }

    const AudioContext = (window.AudioContext ||
      (window as any).webkitAudioContext) as typeof window.AudioContext
    const audioContext = new AudioContext()
    const source = audioContext.createMediaStreamSource(stream)

    const processor = audioContext.createScriptProcessor(4096, 1, 1)
    source.connect(processor)
    processor.connect(audioContext.destination)

    let firstSilenceDetection = true // 标志变量

    processor.onaudioprocess = (event) => {
      const inputBuffer = event.inputBuffer
      const inputData = inputBuffer.getChannelData(0)

      let total = 0
      for (let i = 0; i < inputData.length; i++) {
        total += inputData[i] * inputData[i]
      }
      const rms = Math.sqrt(total / inputData.length)
      const silenceThreshold = 0.05
      // console.log(rms)

      if (rms < silenceThreshold) {
        // 没声音走这里
        if (!silenceTimeoutRef.current) {
          const timeoutDuration = firstSilenceDetection ? 1500 : 10000
          silenceTimeoutRef.current = setTimeout(() => {
            transcribe(false, !firstSilenceDetection)
            silenceTimeoutRef.current = null
            console.log('执行transcribe')
            firstSilenceDetection = false // 之后使用10秒的间隔
          }, timeoutDuration)
        }
      } else {
        //有声音了走这里
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
          silenceTimeoutRef.current = null
        }
        firstSilenceDetection = true // 重置标志变量
      }
    }

    mediaRecorderRef.current = new MediaRecorder(stream)
    mediaRecorderRef.current.onstart = () => {
      console.log('recordingStart')
    }

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data)
    }

    mediaRecorderRef.current.start(200)
    clearTimeout(timeout.current)
    setRecordingStatus('generate')
  }

  const transcribe = async (isSubmit: boolean, isMute: boolean) => {
    // 使用队列确保顺序
    transcribeQueueRef.current = transcribeQueueRef.current.then(async () => {
      if (mediaRecorderRef.current) {
        const recordBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        })
        audioChunksRef.current = audioChunksRef.current.slice(0, 1)
        if (!isMute) {
          try {
            const textFromSpeech = await speechToText(recordBlob)
            transcriptionRef.current += ' ' + textFromSpeech
            console.log('调用了一次')
            if (isSubmit) {
              handleSubmit()
            }
          } catch (error) {
            setIsGenerating(false)
            console.error('An error occurred while fetching the audio:', error)
          }
        }
      }
    })
    await transcribeQueueRef.current // 等待当前的转录任务完成
  }

  const speechToText = async (recordBlob: Blob) => {
    const formData = new FormData()
    formData.append('file', recordBlob)
    if (locale === 'en') {
      formData.append('lang', 'en-US')
    }
    if (locale === 'zh') {
      formData.append('lang', 'zh-CN')
    }

    const response = await fetch(`${backendUrl}/speech_to_text/`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.text
  }

  const handleExit = async () => {
    setStoredMediaStream(null)
    dispatch(setSessionId(null))
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      setOpenDialog(true)
      return ''
    }

    const handleBeforeExit = (event) => {
      event.preventDefault()
      window.history.pushState(null, document.title, window.location.href)
      setOpenDialog(true)

      return ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handleBeforeExit)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.addEventListener('popstate', handleBeforeExit)
    }
  }, [])

  useEffect(() => {
    if (!sessionId) {
      navigate('/interviewCopilot')
    }
  }, [navigate, sessionId])

  return (
    <div
      className={`${styles.wrapper} flex flex-col w-screen h-screen overflow-x-hidden`}
    >
      <ExitDialog
        open={openDialog}
        setOpen={setOpenDialog}
        handleExit={handleExit}
      />
      <Header setOpen={setOpenDialog} />
      <div className={`p-3 flex-1 flex flex-col`}>
        <MessageList messages={messages} isGenerating={isGenerating} />
        <MessageInput
          startMeeting={startRecording}
          transcribe={transcribe}
          recordingStatus={recordingStatus}
          setRecordingStatus={setRecordingStatus}
        />
      </div>
    </div>
  )
}

export default CopilotApplicationPage
