import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserData as RegisterData } from '../../components/auth/signUpForm/types';
import { UserData as LoginData } from '../../components/auth/signInForm/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: (body: LoginData) => {
        return {
          url: '/auth/login',
          method: 'post',
          body,
        };
      },
    }),
    registrationUser: builder.mutation({
      query: (body: RegisterData) => {
        return {
          url: '/auth/register',
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const { useRegistrationUserMutation, useLoginUserMutation } = authApi;
