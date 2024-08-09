import styles from './Message.module.less'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import ReactMarkdown from 'react-markdown'
import 'katex/dist/katex.min.css'
import BotIcon from "../assets/Bot.png"
import Button from '@mui/material/Button';

export default function Message({index,  role, data, lastMessageIndex, handleSendMessage}) {
  const {text, type, link} = data;

  return (
    <div
      className={role === 'user' || type == "button" ? styles.userContainer : styles.botContainer}
    >
      {role === 'user' ? (
        <div className={styles.userMessage}>{text}</div>
      ) : (
        <>
        
        {
          type == "text" ? 
          <>
            <img src={BotIcon} className={styles.botIcon}></img>
            <ReactMarkdown
              className={styles.botMessage}
              children={text}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            />
          </>:
          <Button
            className={styles.botButton}
            onClick={()=>{
              handleSendMessage({displayText: text, modelInput:link});
            }}
            style = {{animationDelay: `${(index - lastMessageIndex + 1) * 0.05}s`}}
          >
            {text}
          </Button>

        }
        
        </>
      )}
    </div>
  )
}
