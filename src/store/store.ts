import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './rootReducer'
import { apiSlice } from './slice'
import { middleware } from './middleware'
import { meetingCopilotSlice } from './slice/apiSlice/root'

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(middleware)
      .concat(apiSlice.middleware)
      .concat(meetingCopilotSlice.middleware)
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { useSelector, useDispatch } from 'react-redux'

// import { configureStore } from '@reduxjs/toolkit';
// import { reducer } from './rootReducer';
// import { middleware } from './middleware';
// import { apiSlice } from './slices';
// // import { loadState, saveState } from './sessionStorage';

// // const persistedState = loadState();

// export const store = configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) => {
//         return getDefaultMiddleware().concat(middleware).concat(apiSlice.middleware);
//     },
//     // preloadedState: persistedState,
// });

// store.subscribe(() => {
//     // saveState(store.getState());
// });
