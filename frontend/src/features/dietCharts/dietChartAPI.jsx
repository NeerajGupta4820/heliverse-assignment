import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dietChartAPI = createApi({
  reducerPath: 'dietChartAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/diets`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['DietCharts'],
  endpoints: (builder) => ({
    fetchDietCharts: builder.query({
      query: () => '/dietCharts',
      providesTags: ['DietCharts'],
    }),
    fetchDietChartById: builder.query({
      query: (id) => `/dietCharts/${id}`,
      providesTags: ['DietCharts'],
    }),
    createDietChart: builder.mutation({
      query: (dietChartData) => ({
        url: '/create',
        method: 'POST',
        body: dietChartData,
      }),
      invalidatesTags: ['DietCharts'],
    }),
    updateDietChart: builder.mutation({
      query: ({ dietChartId, dietChartData }) => ({
        url: `/dietCharts/${dietChartId}`,
        method: 'PUT',
        body: dietChartData,
      }),
      invalidatesTags: ['DietCharts'],
    }),
    deleteDietChart: builder.mutation({
      query: (id) => ({
        url: `/dietCharts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DietCharts'],
    }),
  }),
});

export const {
  useFetchDietChartsQuery,
  useFetchDietChartByIdQuery,
  useCreateDietChartMutation,
  useUpdateDietChartMutation,
  useDeleteDietChartMutation,
} = dietChartAPI;
