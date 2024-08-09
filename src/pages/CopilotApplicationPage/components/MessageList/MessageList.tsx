import { useEffect, useRef, useState } from 'react'
import Message from '../Message/Message'
import styles from './MessageList.module.less'

interface Message {
  role: string
  text: string
}

interface MessageListProps {
  messages: Message[]
  isGenerating: boolean
}

export default function MessageList({ messages, isGenerating }: MessageListProps) {
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const [isUserScrolling, setIsUserScrolling] = useState(false)

  useEffect(() => {
    if (!isUserScrolling || isGenerating) {
      scrollToBottom()
    }
  }, [messages, isGenerating])


  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight
    }
  }

  const handleScroll = () => {
    if (messageContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current
      if (scrollHeight - scrollTop <= clientHeight + 50) {
        setIsUserScrolling(false)
      } else {
        setIsUserScrolling(true)
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer} ref={messageContainerRef} onScroll={handleScroll}>
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} text={msg.text} />
        ))}
      </div>
    </div>
  )
}
