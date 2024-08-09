import { meetingCopilotSlice } from './root'

const interviewApi = meetingCopilotSlice.injectEndpoints({
  endpoints: (builder) => ({
    postInitModel: builder.mutation({
      query: (data) => ({
        path: '/init_model',
        method: 'POST',
        data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { usePostInitModelMutation } = interviewApi
