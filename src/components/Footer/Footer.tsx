import styles from './Footer.module.less'
import linkedInIcon from '@/assets/images/icon-linkedIn.svg'
import youtubeIcon from '@/assets/images/icon-youTube.svg'
import twitterIcon from '@/assets/images/icon-twitter.svg'
import instagramIcon from '@/assets/images/icon-instagram.svg'
import facebookIcon from '@/assets/images/icon-facebook.svg'
import discordIcon from '../../assets/images/Icon-discord.svg'
import mailIcon from '../../assets/images/Icon-email.svg'
import { Typography } from '@mui/material'

const handleGoDiscord = () => {
  window.open('https://discord.gg/SujGfmgY')
}

function Footer() {
  return (
    <div
      className={`${styles.wrapper} w-full max-w-[1024px] lg:px-6 lg:pt-16 lg:pb-10 flex flex-col gap-10 xs:py-10 xs:px-4`}
    >
      <div className={`${styles.topContent} flex flex-col gap-4`}>
        <Typography className={`${styles.title} text-custom-primary`}>
          Interview Copilot
        </Typography>
        <Typography variant="body2" className="tetx-custom-primary">
          Evolve Your Interview Skill!
        </Typography>
        <div className="flex gap-4">
          <img src={mailIcon} className="w-8 h-8 cursor-pointer" />
          <button
            onClick={handleGoDiscord}
            className="w-8 h-8 cursor-pointer rounded"
          >
            <img src={discordIcon} className="w-full h-full" alt="Discord" />
          </button>
          <img src={linkedInIcon} className="w-8 h-8 cursor-pointer" />
          <img src={youtubeIcon} className="w-8 h-8 cursor-pointer" />
          <img src={twitterIcon} className="w-8 h-8 cursor-pointer" />
          <img src={instagramIcon} className="w-8 h-8 cursor-pointer" />
          <img src={facebookIcon} className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
      <div className={`py-6 border-t border-solid border-custom-divider`}>
        <Typography variant="body2" className="text-custom-secondary">
          © 2024 DataLynn. All Rights Reserved.
        </Typography>
      </div>
    </div>
  )
}

export default Footer
