import styles from './ChatBot.module.less'
import question from './asset/chatbot.png'
import {useState, useRef} from "react"
import ChatbotModal from '@/components/ChatbotModal/ChatbotModal';

function ChatBot({draggable}) {

  const [modalVisiable, setModalVisible] = useState(false);

  // For Button Toggle CSS control
  const [isMouseDown , setIsMouseDown] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{x: number, y: number}>({x: -1, y:-1})
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef<any>(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    setIsMouseDown(true);
    draggable && setIsDragging(true);
  }

  const handleMouseUp = (e) => {
    e.preventDefault();
    document.removeEventListener("mousemove", handleMouseMove);
    setIsMouseDown(false);
    // Sending initalized messages
    setModalVisible((prev) => !prev);
    draggable && setIsDragging(false);
  }

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isDragging) {
      const x = Math.max(0, Math.min(e.clientX - buttonRef.current!.offsetWidth / 2, window.innerWidth - buttonRef.current!.offsetWidth));
      const y = Math.max(0, Math.min(e.clientY - buttonRef.current!.offsetHeight / 2, window.innerHeight - buttonRef.current!.offsetHeight));
      setButtonPosition({ x, y });
    }
  }


  return (
    <div className={styles.wrapper}
          style={
            // Default position
            buttonPosition.x == -1 ? {
              position: "fixed",
              right: "50px",
              bottom: "100px"
            }:
            { 
              position: "fixed",
              left: buttonPosition.x,
              top: buttonPosition.y,
            }}
          ref = {buttonRef}
    >
      <ChatbotModal
        visible={modalVisiable}
        messageList = {[]}  // Used to cache dialogs
        ></ChatbotModal>
        <img className={
          [
            styles.imageIcon,
            isMouseDown && `${styles.mouseDown}`,
          ].filter(Boolean).
          join(' ')
          }
          src={question}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={draggable ? handleMouseMove : ()=>{}}
        />
    </div>
  )
}

export default ChatBot
