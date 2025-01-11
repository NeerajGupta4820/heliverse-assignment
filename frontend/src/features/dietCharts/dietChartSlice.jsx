import { createSlice } from '@reduxjs/toolkit';
import { dietChartAPI } from './dietChartAPI';

const dietSlice = createSlice({
  name: 'diets',
  initialState: {
    diets: [],
    currentDiet: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentDiet: (state, action) => {
      state.currentDiet = action.payload;
    },
    clearCurrentDiet: (state) => {
      state.currentDiet = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        dietChartAPI.endpoints.fetchDietCharts.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        dietChartAPI.endpoints.fetchDietCharts.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.diets = action.payload.data;
        }
      )
      .addMatcher(
        dietChartAPI.endpoints.fetchDietCharts.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        dietChartAPI.endpoints.createDietChart.matchFulfilled,
        (state, action) => {
          state.diets.push(action.payload.data);
        }
      )
      .addMatcher(
        dietChartAPI.endpoints.updateDietChart.matchFulfilled,
        (state, action) => {
          const updatedDiet = action.payload.data;
          const index = state.diets.findIndex(diet => diet._id === updatedDiet._id);
          if (index !== -1) {
            state.diets[index] = updatedDiet;
          }
        }
      )
      .addMatcher(
        dietChartAPI.endpoints.deleteDietChart.matchFulfilled,
        (state, action) => {
          state.diets = state.diets.filter(diet => diet._id !== action.meta.arg);
        }
      );
  },
});

export const { setCurrentDiet, clearCurrentDiet } = dietSlice.actions;

export default dietSlice.reducer;
