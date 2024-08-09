/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import LandingPage from '@/pages/LandingPage/LandingPage'
import CardPaymentPage from '@/pages/CardPaymentPage/CardPaymentPage'
import InterviewCopilotPage from './pages/InterviewCopilotPage/InterviewCopilotPage'
import CopilotApplicationPage from './pages/CopilotApplicationPage/CopilotApplicationPage'
import NavigatePage from './pages/NavigatePage/NavigatePage'
import CommonSnackbar from './components/ComoonSnackbar/CommonSnackbar'
import { ThemeProvider } from '@mui/material'
import theme from '@/lib/theme'
import { selectInterview, useSelector, useUserQuery } from './store'
import { MediaStreamProvider } from './MediaStreamContext'
import LandingPageV2 from './pages/LandingPageV2/LandingPageV2'
import enLandingPage from './locales/en/enLandingPage.json'
import enInterviewCopilotPage from './locales/en/enInterViewCopilotPage.json'
import enCopilotApplicationPage from './locales/en/enCopilotApplicationPage.json'
import zhLandingPage from './locales/zh/zhLandingPage.json'
import zhInterviewPage from './locales/zh/zhInterViewCopilotPage.json'
import zhCopilotApplicationPage from './locales/zh/zhCopilotApplicationPage.json'
import { IntlProvider } from 'react-intl'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

const messages = {
  en: {
    ...enLandingPage,
    ...enInterviewCopilotPage,
    ...enCopilotApplicationPage,
  },
  zh: {
    ...zhLandingPage,
    ...zhInterviewPage,
    ...zhCopilotApplicationPage,
  },
}

function App() {
  const {
    data: user,
    isError: userIsError,
    error: userError,
    refetch: userRefetch,
  } = useUserQuery()
  useEffect(() => {
    console.info('🚀[App->user]', user)
    if (userIsError) {
      console.warn('🚀[App->userError]', userError)
    }
  }, [user, userIsError, userError])

  useEffect(() => {
    userRefetch()
  }, [userRefetch])

  const { locale } = useSelector(selectInterview)

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <MediaStreamProvider>
        <ThemeProvider theme={theme}>
          <CommonSnackbar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NavigatePage />} />
              <Route path="/home" element={<LandingPageV2 />} />
              <Route path="/home/:coupon_id" element={<LandingPageV2 />} />
              <Route path="/cardPayment" element={<CardPaymentPage />} />
              <Route
                path="/interviewCopilot"
                element={<InterviewCopilotPage />}
              />
              <Route
                path="/copilotApplication"
                element={<CopilotApplicationPage />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </MediaStreamProvider>
    </IntlProvider>
  )
}

export default App
