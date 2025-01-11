import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pantryTasks: [],
  loading: false,
  error: null,
};

// Create the pantry task slice
const pantryTaskSlice = createSlice({
  name: 'pantryTasks',
  initialState,
  reducers: {
    fetchPantryTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPantryTasksSuccess: (state, action) => {
      state.pantryTasks = action.payload;
      state.loading = false;
    },
    fetchPantryTasksFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createPantryTaskRequest: (state) => {
      state.loading = true;
    },
    createPantryTaskSuccess: (state, action) => {
      state.pantryTasks.push(action.payload);
      state.loading = false;
    },
    createPantryTaskFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const {
  fetchPantryTasksRequest,
  fetchPantryTasksSuccess,
  fetchPantryTasksFailure,
  createPantryTaskRequest,
  createPantryTaskSuccess,
  createPantryTaskFailure,
} = pantryTaskSlice.actions;

// Export the reducer
export default pantryTaskSlice.reducer;
