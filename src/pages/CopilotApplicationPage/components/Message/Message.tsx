import styles from './Message.module.less'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import ReactMarkdown from 'react-markdown'
import 'katex/dist/katex.min.css'

export default function Message({ role, text }) {
  return (
    <div
      className={role === 'user' ? styles.userContainer : styles.botContainer}
    >
      {role === 'user' ? (
        <div className={styles.userMessage}>{text}</div>
      ) : (
        <ReactMarkdown
          className={styles.botMessage}
          children={text}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      )}
    </div>
  )
}
