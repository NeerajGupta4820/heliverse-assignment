import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const patientAPI = createApi({
  reducerPath: 'patientAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl :`${import.meta.env.VITE_SERVER_URL}/api/patients`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Patients'],
  endpoints: (builder) => ({
    fetchPatients: builder.query({
      query: () => '/all-patients',
      providesTags: ['Patients'],
    }),
    createPatient: builder.mutation({
      query: (patientData) => ({
        url: '/create',
        method: 'POST',
        body: patientData,
      }),
    }),
    updatePatient: builder.mutation({
      query: ({ patientId, patientData }) => ({
        url: `/update/${patientId}`,
        method: 'PUT',
        body: patientData,
      }),
    }),
    deletePatient: builder.mutation({
      query: (patientId) => ({
        url: `/delete/${patientId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchPatientsQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientAPI;
