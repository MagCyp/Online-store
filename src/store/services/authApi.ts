import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserData } from '../../components/auth/signUpForm/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: builder => ({
    registrationUser: builder.mutation({
      query: (body: UserData) => {
        return {
          url: '/auth/register',
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const { useRegistrationUserMutation } = authApi;
