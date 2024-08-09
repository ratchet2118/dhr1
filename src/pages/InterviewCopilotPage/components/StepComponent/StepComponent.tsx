/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './StepComponent.module.less'
import { useIntl } from 'react-intl'
interface StepComponentProps {
  platform: string
}

const shareScreenGuide =
  'https://storage.googleapis.com/datalynn-datasets/interview-challenge/technology/interview_copilot/ShareScreenGuide.jpeg'
const shareScreenWindows =
  'https://storage.googleapis.com/datalynn-datasets/interview-challenge/technology/interview_copilot/share_screen.png'

const userAgent = window.navigator.userAgent

const renderNormalStep = () => {
  const intl = useIntl()
  return (
    <>
      <div className={styles.stepContainer}>
        <div className={styles.left}>
          <div className={styles.circle} />
          <div className={styles.line} />
        </div>
        <div className={styles.right}>
        <div className={`${styles.title}`}>
          {intl.formatMessage({ id: 'ic.stepcomponent.title1' })}
        </div>
        <ul className={styles.detail}>
              <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-1' })}</li>
              <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-2' })}</li>
              <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-3' })}</li>
            </ul>
        </div>
      </div>
      <div className={styles.stepContainer}>
        <div className={styles.left}>
          <div
            className={styles.circle}
            style={{ backgroundColor: '#00BFA5' }}
          />
          <div className={styles.line} />
        </div>
        <div className={styles.right}>
          <div className={styles.title} style={{ color: '#00BFA5' }}>
          {intl.formatMessage({ id: 'ic.stepcomponent.title2' })}
          </div>
          <ul className={styles.detail}>
            <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-1' })}</li>
            <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-2' })}</li>
            <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-3' })}</li>
            <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-4' })}</li>
            <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-5' })}</li>
          </ul>
        </div>
      </div>
      <div className={styles.stepContainer}>
        <div className={styles.left}>
          <div
            className={styles.circle}
            style={{ backgroundColor: '#0091EA' }}
          />
          <div className={styles.line} />
        </div>
        <div className={styles.right}>
          <div className={styles.title} style={{ color: '#0091EA' }}>
          {intl.formatMessage({ id: 'ic.stepcomponent.title3' })}
          </div>
          <ul className={styles.detail}>
            <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail3-1' })}</li>
            <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail3-2' })}</li>
            <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail3-3' })}</li>
                </ul>
        </div>
      </div>
    </>
  )
}

const renderSelectStep = (platform: string) => {
  const webPlatformMatch = platform.match(/Web Meeting Software (.+)/)
  const webPlatformName = webPlatformMatch ? webPlatformMatch[1] : ''
  const localPlatformMatch = platform.match(/Local Meeting Software (.+)/)
  const localPlatformName = localPlatformMatch ? localPlatformMatch[1] : ''
  const intl = useIntl()

  return (
    <>
      {/Windows/.test(userAgent) && (
        <>
          <div className={styles.stepContainer}>
            <div className={styles.left}>
              <div className={styles.circle} />
              <div className={styles.line} />
            </div>
            <div className={styles.right}>
              <div className={styles.title} style={{ color: '#00BFA5' }}>
              {intl.formatMessage({ id: 'ic.stepcomponent.title1-1' })}
              </div>

              <ul className={styles.detail}>
                <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-11' })}</li>
                <li>
                {intl.formatMessage({ id: 'ic.stepcomponent.detail1-12' })}
                </li>
                <li>
                {intl.formatMessage({ id: 'ic.stepcomponent.detail1-13' })}
                </li>
                <div className="flex justify-center w-full my-2">
                  <img src={shareScreenWindows} className="w-2/3" />
                </div>
                <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-14' })}</li>
                <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-15' })} </li>
              </ul>
            </div>
          </div>

          <div className={styles.stepContainer}>
            <div className={styles.left}>
              <div
                className={styles.circle}
                style={{ backgroundColor: '#00BFA5' }}
              />
              <div className={styles.line} />
            </div>
            <div className={styles.right}>
              <div className={styles.title} style={{ color: '#00BFA5' }}>
              {intl.formatMessage({ id: 'ic.stepcomponent.title1-2' })}
              </div>
              <ul className={styles.detail}>
                <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-11' })}</li>
                <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-12' })}</li>
                <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-13' })}</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {!/Windows/.test(userAgent) &&
        platform.includes('Web Meeting Software') && (
          <>
            <div className={styles.stepContainer}>
              <div className={styles.left}>
                <div className={styles.circle} />
                <div className={styles.line} />
              </div>
              <div className={styles.right}>
                <div className={styles.title}>{intl.formatMessage({ id: 'ic.stepcomponent.title2-1' })} </div>
                <ul className={styles.detail}>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-111' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-112' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-113-select-1' })}
                    "{intl.formatMessage({ id: `ic.stepcomponent.platform.${webPlatformName}` })}"
                    {intl.formatMessage({ id: 'ic.stepcomponent.detail1-113-select-2' })}
                  </li>
                  <div className="flex justify-center w-full my-2">
                    <img src={shareScreenGuide} className="w-2/3" />
                  </div>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-114' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-115' })}</li>
                </ul>
              </div>
            </div>
            <div className={styles.stepContainer}>
              <div className={styles.left}>
                <div
                  className={styles.circle}
                  style={{ backgroundColor: '#00BFA5' }}
                />
                <div className={styles.line} />
              </div>
              <div className={styles.right}>
                <div className={styles.title} style={{ color: '#00BFA5' }}>
                {intl.formatMessage({ id: 'ic.stepcomponent.title2-2' })}
                </div>
                <ul className={styles.detail}>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-111' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-112' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-113' })}</li>
                </ul>
              </div>
            </div>
          </>
        )}

      {!/Windows/.test(userAgent) &&
        platform.includes('Local Meeting Software') && (
          <>
            <div className={styles.stepContainer}>
              <div className={styles.left}>
                <div className={styles.circle} />
                <div className={styles.line} />
              </div>
              <div className={styles.right}>
                <div className={styles.title}> {intl.formatMessage({ id: 'ic.stepcomponent.title3-1' })}</div>
                <ul className={styles.detail}>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-1111' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-1112' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-113-select-1' })}
                    "{intl.formatMessage({ id: `ic.stepcomponent.platform.${localPlatformName}` })}"
                    {intl.formatMessage({ id: 'ic.stepcomponent.detail1-113-select-2' })}
                  </li>

                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-1114' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-1115' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail1-1116' })}</li>
                </ul>
              </div>
            </div>
            <div className={styles.stepContainer}>
              <div className={styles.left}>
                <div
                  className={styles.circle}
                  style={{ backgroundColor: '#00BFA5' }}
                />
                <div className={styles.line} />
              </div>
              <div className={styles.right}>
                <div className={styles.title} style={{ color: '#00BFA5' }}>
                {intl.formatMessage({ id: 'ic.stepcomponent.title3-2' })}
                </div>
                <ul className={styles.detail}>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-1111' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-1112' })}</li>
                  <li>{intl.formatMessage({ id: 'ic.stepcomponent.detail2-1113' })}</li>
                </ul>
              </div>
            </div>
          </>
        )}
    </>
  )
}
export default function StepComponent(props: StepComponentProps) {
  const { platform } = props
  return (
    <div className={styles.container}>
      {platform ? renderSelectStep(platform) : renderNormalStep()}
    </div>
  )
}
