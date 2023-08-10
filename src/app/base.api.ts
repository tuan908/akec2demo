import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { baseApiUrl } from './api.helper'

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl
})

export default createApi({
  reducerPath: 'baseApi',
  baseQuery,
  refetchOnMountOrArgChange: 900,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({})
})
