import React, { useState, useEffect, useRef } from 'react'
import styles from './Header.module.less'
import datalynnLogo from '@/assets/images/img-logo.png'
import datalynnIcon from '@/assets/images/img-icon-blue.png'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'
import Menu from './Menu'
import Login from './Login'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { toggleLocale } from '@/store/index'
import TranslateIcon from '@mui/icons-material/Translate'
import { useIntl } from 'react-intl'

interface HeaderProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = (props: HeaderProps) => {
  const { isVisible, setIsVisible } = props
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [menuTop, setMenuTop] = useState<number>(0)
  const menuIconRef = useRef<HTMLDivElement>(null)
  const topnavRef = useRef<HTMLDivElement>(null) // Reference to the topnav container
  const intl = useIntl()

  const handleClose = (): void => {
    setIsVisible(false)
  }

  const handleResize = (): void => {
    setIsMobile(window.innerWidth < 768)
    if (window.innerWidth >= 768) {
      setIsMenuOpen(false)
    }
  }

  const toggleMenu = (): void => {
    if (topnavRef.current) {
      const rect = topnavRef.current.getBoundingClientRect()
      setMenuTop(rect.height) // Set menuTop to the height of the topnav container
    }
    setIsMenuOpen(!isMenuOpen)
  }

  const dispatch = useDispatch()
  const handleChangeLanguage = () => {
    dispatch(toggleLocale())
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const navigate = useNavigate()

  return (
    <div className={`${styles.wrapper}`} ref={topnavRef}>
      {isVisible && (
        <div className={`${styles.alert}`}>
          <div style={{ flex: 1 }}></div>
          <div className="alert-text">
            {intl.formatMessage({ id: 'lp.header.advertisement' })}
            <a
              href="https://datalynn-affiliate-client.web.app/"
              style={{ textDecoration: 'underline' }}
            >
              {intl.formatMessage({ id: 'lp.header.sale' })}
            </a>
          </div>
          <div style={{ flex: 1 }}></div>
          <CloseIcon
            className="close-icon"
            onClick={handleClose}
            style={{ cursor: 'pointer' }}
          />
        </div>
      )}

      <div className={`${styles.topnav}`}>
        <div className={styles.logoContainer}>
          <img
            src={isMobile ? datalynnIcon : datalynnLogo}
            onClick={() => navigate('/home')}
            className={`${styles.logo}`}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {isMobile ? (
          <div className={styles.rightContainer}>
            <div ref={menuIconRef}>
              <MenuIcon className={styles.menuIcon} onClick={toggleMenu} />
            </div>
            {isMenuOpen && (
              <div
                className={styles.dropdownMenu}
                style={{ top: `${menuTop}px` }}
              >
                <Menu isMobile={true} />
              </div>
            )}
          </div>
        ) : (
          <div className={styles.rightContainer}>
            <div className={styles.menuContainer}>
              <Menu isMobile={false} />
            </div>

            <Button
              className={`${styles.langButton}`}
              onClick={handleChangeLanguage}
              startIcon={<TranslateIcon />}
            >
              EN/CN
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              className={styles.divider}
            />
            <Login />
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
