import { API_MEETINGCOPILOT } from '@/lib/config'
import Request from '../config/Request'
// import { transform } from '../config/interceptorHooks'

const request = new Request({
  baseURL: API_MEETINGCOPILOT,
  timeout: 5000,
  // interceptorHooks: transform,
})

export const postInitModelApi = async (body: any) => {
  try {
    const res = await request.post('/init_model', body)
    return res.data
  } catch(error) {
    console.error('Error initializing model:', error)
    throw error
  }
}
