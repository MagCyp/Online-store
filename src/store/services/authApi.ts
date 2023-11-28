import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserLoginData, UserRegisterData } from '../../models/models';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: (body: UserLoginData) => {
        return {
          url: '/auth/login',
          method: 'post',
          body,
        };
      },
    }),
    registrationUser: builder.mutation({
      query: (body: UserRegisterData) => {
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
