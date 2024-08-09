import { API_HOST } from '@/lib/config'
import Request from '../config/Request'

const request = new Request({
  baseURL: API_HOST,
  timeout: 5000,
  // interceptorHooks: transform,
})

export const postInitModelApi = async (body: any) => {
  try {
    // url will be changed
    const res = await request.post('http://127.0.0.1:3000/webhook', body)
    return res.data
  } catch(error) {
    console.error('Error initializing model:', error)
    throw error
  }
}
