import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/delivery`;

export const deliveryAPI = createApi({
  reducerPath: 'deliveryAPI',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Deliveries', 'Personnel'],
  endpoints: (builder) => ({
    fetchDeliveryPersonnel: builder.query({
      query: () => '/all-personnel',
      providesTags: ['Personnel'],
    }),
    createDeliveryPersonnel: builder.mutation({
      query: (personnelData) => ({
        url: '/create-personnel',
        method: 'POST',
        body: personnelData,
      }),
      invalidatesTags: ['Personnel'],
    }),
    updateDeliveryPersonnel: builder.mutation({
      query: ({ personnelId, updateData }) => ({
        url: `/update-personnel/${personnelId}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Personnel'],
    }),
    assignDeliveryTask: builder.mutation({
      query: (taskData) => ({
        url: '/assign-task',
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['Deliveries'],
    }),
    fetchTasksForPersonnel: builder.query({
      query: (deliveryPersonnelId) => `/track-deliveries/${deliveryPersonnelId}`,
      providesTags: ['Deliveries'],
    }),
    updateDeliveryTaskStatus: builder.mutation({
      query: ({ deliveryId, updates }) => ({
        url: '/update-deliveryStatus',
        method: 'POST',
        body: { deliveryId, updates },
      }),
      invalidatesTags: ['Deliveries'],
    }),
  }),
});

export const {
  useFetchDeliveryPersonnelQuery,
  useCreateDeliveryPersonnelMutation,
  useUpdateDeliveryPersonnelMutation,
  useAssignDeliveryTaskMutation,
  useFetchTasksForPersonnelQuery,
  useUpdateDeliveryTaskStatusMutation,
} = deliveryAPI;
