/**
 * Author: David
 */

import { apiSlice } from './root';

interface UserResponse {
    userProfile: any;
}

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: ({ email, password }) => ({
                path: '/v1/api/login/login',
                method: 'POST',
                data: { email, password },
            }),
        }),
        signUp: builder.mutation({
            query: ({ firstName, lastName, email, password }) => ({
                path: '/v1/api/login/register',
                method: 'POST',
                data: { firstName, lastName, email, password },
            }),
        }),
        signOut: builder.mutation({
            query: () => ({ path: '/v1/api/login/logout' }),
        }),
        user: builder.query<UserResponse | null, void>({
            query: () => ({ path: '/v1/api/user' }),
            transformResponse: (res) => res?.userProfile ?? null,
        }),
    }),
    overrideExisting: false,
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation, useUserQuery } = userApi;
