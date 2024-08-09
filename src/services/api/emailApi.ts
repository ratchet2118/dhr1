import { API_MEETINGCOPILOT } from '@/lib/config'
import Request from '../config/Request'
// import { transform } from '../config/interceptorHooks'

const request = new Request({
  baseURL: API_MEETINGCOPILOT,
  timeout: 5000,
  // interceptorHooks: transform,
})

export const getFreeTrialApi = async (email: string) => {
  const res = await request.get('/has_tried', { params: { email } })
  return res.data
}

export const getAddContactEmailApi = async (email: string) => {
  const res = await request.get('/add_contact_email', { params: { email } })
  return res.data
}
