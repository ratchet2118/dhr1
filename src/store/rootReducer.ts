import {
    appSlice,
    apiSlice,
    interviewSlice
} from './slice';
import { meetingCopilotSlice } from './slice/apiSlice/root';


export const reducer = {
    app: appSlice.reducer,
    interview: interviewSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [meetingCopilotSlice.reducerPath]: meetingCopilotSlice.reducer
};
