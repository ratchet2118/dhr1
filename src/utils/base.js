import { API_HOST } from '../config'

export function setDocumentTitle(title) {
  if (typeof title === 'string') {
    document.title = `DataLynn | ${title}`
  }
  if (Array.isArray(title)) {
    document.title = `DataLynn | ${title.join(' | ')}`
  }
}

export function goGoogleOneKeySign() {
  window.location.href = `${API_HOST}/v1/api/login/auth/google`
}
