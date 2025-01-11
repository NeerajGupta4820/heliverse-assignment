import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
  loading: false,
  error: null,
};

// Create the patient slice
const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    fetchPatientsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPatientsSuccess: (state, action) => {
      state.patients = action.payload;
      state.loading = false;
    },
    fetchPatientsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createPatientRequest: (state) => {
      state.loading = true;
    },
    createPatientSuccess: (state, action) => {
      state.patients.push(action.payload);
      state.loading = false;
    },
    createPatientFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  createPatientRequest,
  createPatientSuccess,
  createPatientFailure,
} = patientSlice.actions;

// Export the reducer
export default patientSlice.reducer;
