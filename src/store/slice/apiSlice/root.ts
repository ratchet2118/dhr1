import { createApi, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import axios, { AxiosResponse } from 'axios'
import { API_HOST } from '../../../config'
import { API_MEETINGCOPILOT } from '@/lib/config'

type AxiosBaseQuery = ({
  baseUrl,
}: {
  baseUrl?: string
}) => ({
  path,
  method,
  ...args
}: {
  path: string
  method?: string
  [key: string]: any
}) => Promise<{ data: any } | { error: FetchBaseQueryError }>

const axiosBaseQuery: AxiosBaseQuery =
  ({ baseUrl } = {}) =>
  //@ts-ignore
  async ({ path, method = 'GET', ...args }) => {
    try {
      const result: AxiosResponse = await axios({
        url: baseUrl + path,
        method,
        // withCredentials: true,
        ...args,
      })
      const { data: axiosData } = result
      const { code, data } = axiosData
      if (code !== 0 && path !== '/v1/api/user')
        throw { response: axiosData, isApiErr: true }
        return { data }
    } catch (error: any) {
      if (error.isApiErr) {
        return {
          error: {
            status: 'CUSTOM_ERROR',
            data: error.response,
          },
        }
      }
      return {
        error: {
          status: error.response?.status || 'FETCH_ERROR',
          data: error.response?.data || error.message,
        },
      }
    }
  }

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: API_HOST }),
  endpoints: () => ({}),
})

export const meetingCopilotSlice = createApi({
  reducerPath: 'copilotApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_MEETINGCOPILOT }),
  endpoints: () => ({}),
})
