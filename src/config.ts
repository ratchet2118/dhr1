// -----------------------------Production-----------------------------
export const API_HOST = 'https://api.datalynn.com'
export const ENV = 'product'

// -----------------------------Online Development-----------------------------
// export const API_HOST = 'https://dev-api.datalynn.com';
// export const ENV = 'develop';

// -----------------------------Local Development-----------------------------
// export const API_HOST = 'http://localhost:4242';
// export const ENV = 'develop';

const prodApi = 'https://meetingcopilotbackend.uc.r.appspot.com'
// const localApi = 'http://localhost:8000'
const env = ENV
export const SERVER_ENDPOINT = env === 'product' ? prodApi : prodApi
