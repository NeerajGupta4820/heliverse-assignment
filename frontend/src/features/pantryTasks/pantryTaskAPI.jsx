import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/pantry`;

export const pantryTaskAPI = createApi({
  reducerPath: 'pantryTaskAPI',
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
  tagTypes: ['PantryTasks'],
  endpoints: (builder) => ({
    fetchPantryStaff: builder.query({
      query: () => '/all',
      providesTags: ['PantryTasks'],
    }),
    createPantryStaff: builder.mutation({
      query: (staffData) => ({
        url: '/create',
        method: 'POST',
        body: staffData,
      }),
      invalidatesTags: ['PantryTasks'],
    }),
    updatePantryStaff: builder.mutation({
      query: ({ pantryStaffId, staffData }) => ({
        url: `/update/${pantryStaffId}`,
        method: 'PUT',
        body: staffData,
      }),
      invalidatesTags: ['PantryTasks'],
    }),
    assignTask: builder.mutation({
      query: (taskData) => ({
        url: '/assign-task',
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['PantryTasks'],
    }),
    fetchPreparationTasks: builder.query({
      query: (pantryStaffId) => `/tasks/${pantryStaffId}`,
      providesTags: ['PantryTasks'],
    }),
    updateMealStatus: builder.mutation({
      query: ({ taskId, updates }) => ({
        url: 'update-mealStatus',
        method: 'POST',
        body: { taskId, updates },
      }),
      invalidatesTags: ['PantryTasks'],
    }),
  }),
});

export const {
  useFetchPantryStaffQuery,
  useCreatePantryStaffMutation,
  useUpdatePantryStaffMutation,
  useAssignTaskMutation,
  useFetchPreparationTasksQuery,
  useUpdateMealStatusMutation,
} = pantryTaskAPI;
