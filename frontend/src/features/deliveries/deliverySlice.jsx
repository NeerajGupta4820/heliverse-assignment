import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deliveries: [],
  loading: false,
  error: null,
};

// Create the delivery slice
const deliverySlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    fetchDeliveriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDeliveriesSuccess: (state, action) => {
      state.deliveries = action.payload;
      state.loading = false;
    },
    fetchDeliveriesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateDeliveryStatusRequest: (state) => {
      state.loading = true;
    },
    updateDeliveryStatusSuccess: (state, action) => {
      const updatedDelivery = action.payload;
      state.deliveries = state.deliveries.map((delivery) =>
        delivery.id === updatedDelivery.id ? updatedDelivery : delivery
      );
      state.loading = false;
    },
    updateDeliveryStatusFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const {
  fetchDeliveriesRequest,
  fetchDeliveriesSuccess,
  fetchDeliveriesFailure,
  updateDeliveryStatusRequest,
  updateDeliveryStatusSuccess,
  updateDeliveryStatusFailure,
} = deliverySlice.actions;

// Export the reducer
export default deliverySlice.reducer;
