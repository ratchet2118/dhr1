import Header from './components/Header/Header'
import styles from './InterviewCopilotPage.module.less'
import TitleComponent from './components/TitleComponent/TitleComponent'
import TokenComponent from './components/TokenComponent/TokenComponent'
import InformationComponent from './components/InformationComponent/InformationComponent'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import discordImg from '../../assets/images/Icon-discord.svg'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectInterview, setStatus } from '@/store/index'

// Using redux
function InterviewCopilotPage() {
  const { status } = useSelector(selectInterview)
  const [platform, setPlatform] = useState('')
  const [searchParams] = useSearchParams()
  const couponId = searchParams.get('coupon_id')

  const handleGoDiscord = () => {
    window.open('https://discord.gg/knbNRJfczS')
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <div
        className={`${styles.subWrapper} w-full p-3 bg-[#eee] overflow-x-hidden flex flex-col flex-1`}
      >
        <div className={`${styles.subHeader} bg-white`}>
          <Button className={styles.button} onClick={handleGoDiscord}>
            <img src={discordImg} className="w-5 h-5 cursor-pointer ml-2 " />
            <span className={styles.buttonText}>Get Help</span>
          </Button>
        </div>

        <div className={`${styles.content} w-full bg-white pt-6 flex-1`}>
          <TitleComponent platform={platform} />
          {status === 'token' && (
            <TokenComponent setStatus={setStatus} couponId={couponId} />
          )}
          {status === 'information' && (
            <InformationComponent
              platform={platform}
              setPlatform={setPlatform}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default InterviewCopilotPage
