import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store/index'

interface InterviewState {
  sessionId: string
  status: 'token' | 'information'
  trial: boolean
  locale: 'en' | 'zh'
}
const getInitialLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  return savedLocale === 'zh' ? 'zh' : 'en' // Default to 'en' if not 'zh'
}

const initialState: InterviewState = {
  sessionId: '',
  status: 'token',
  trial: false,
  locale: getInitialLocale(),
}
export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setTrial: (state, action) => {
      state.trial = action.payload
    },
    toggleLocale: (state) => {
      state.locale = state.locale === 'en' ? 'zh' : 'en'
      localStorage.setItem('locale', state.locale)
    },
  },
})
export const selectInterview = (state: RootState) => state.interview

export const { setSessionId, setStatus, setTrial, toggleLocale } =
  interviewSlice.actions

export default interviewSlice.reducer
