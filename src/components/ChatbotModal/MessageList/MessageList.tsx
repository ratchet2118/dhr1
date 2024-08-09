import { useEffect, useRef, useState } from 'react'
import Message from '../Message/Message'
import styles from './MessageList.module.less'

interface Message {
  role: string
  data: any
}

interface MessageListProps {
  messages: Message[]
  isGenerating: boolean
  isInit: boolean
  handleSendMessage: Function
}


export default function MessageList({ messages, isGenerating, isInit, handleSendMessage }: MessageListProps) {
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const lastUpdateIndex = useRef<number>(0);
  const [addedAmount, setAddedAmount] = useState<number>(0);


  useEffect(() => {
    if (!isUserScrolling || isGenerating) {
      scrollToBottom()
    }

    if (lastUpdateIndex.current != null) {
      // Get the number of newly addded messages
      setAddedAmount(messages.length - 1 - lastUpdateIndex.current);
      lastUpdateIndex.current = messages.length - 1;
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

  const lastMessageIndex = messages.length - addedAmount;

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer} ref={messageContainerRef} onScroll={handleScroll}>
        {messages.map((msg, index) => (
        <Message key={index} index={index} lastMessageIndex={lastMessageIndex} role={msg.role} data={msg.data} handleSendMessage={handleSendMessage}
          />
        ))}
        {isGenerating ? <Message key={messages.length + 1} index={messages.length + 1} lastMessageIndex={lastUpdateIndex} role={"bot"} data = {{text: isInit ? "Preparing for your chating experience..." : "Generating...", type:"text"}} handleSendMessage={handleSendMessage}/>:null}
      </div>
    </div>
  )
}
