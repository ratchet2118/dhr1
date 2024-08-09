import styles from './VideoCard.module.less'
interface VideoCardProps {
  video: string
  enlarge: boolean
}

const VideoCard: React.FC<VideoCardProps> = ({ video, enlarge }) => {
  return (
    <div className={enlarge ? styles.videoContainer2 : styles.videoContainer}>
      <video controls={enlarge ? true : false} className={styles.video}>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  )
}

export default VideoCard
