// service/auth.js
// import "../config"
import { SERVER_ENDPOINT } from '../config'
const backendUrl = SERVER_ENDPOINT

export const authenticate = async (token) => {
  if (!token) {
    console.error('Token is missing!')
  }

  try {
    const response = await fetch(`${backendUrl}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    })

    const data = await response.json()
    if (data.authenticated) {
      localStorage.setItem('isAuthenticated', 'true')
      console.log('authenticated')
      return true
    } else {
      localStorage.setItem('isAuthenticated', 'false')
      return false
    }
  } catch (error) {
    console.error('Authentication error:', error)
    localStorage.setItem('isAuthenticated', 'false')
    return false
  }
}
