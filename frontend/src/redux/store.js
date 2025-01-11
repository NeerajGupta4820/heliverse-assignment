import { configureStore } from '@reduxjs/toolkit';
import { deliveryAPI } from '../features/deliveries/deliveryAPI';
import { dietChartAPI } from '../features/dietCharts/dietChartAPI';
import { pantryTaskAPI } from '../features/pantryTasks/pantryTaskAPI';
import { patientAPI } from '../features/patients/patientAPI';
import deliveryReducer from '../features/deliveries/deliverySlice';
import dietChartReducer from '../features/dietCharts/dietChartSlice';
import pantryTaskReducer from '../features/pantryTasks/pantryTaskSlice';
import patientReducer from '../features/patients/patientSlice';
import authReducer from '../features/auth/authSlice.jsx';
import { apiSlice } from '../features/auth/authApi'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    deliveries: deliveryReducer,
    dietCharts: dietChartReducer,
    pantryTasks: pantryTaskReducer,
    patients: patientReducer,
    [deliveryAPI.reducerPath]: deliveryAPI.reducer,
    [dietChartAPI.reducerPath]: dietChartAPI.reducer,
    [pantryTaskAPI.reducerPath]: pantryTaskAPI.reducer,
    [patientAPI.reducerPath]: patientAPI.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      deliveryAPI.middleware,
      dietChartAPI.middleware,
      pantryTaskAPI.middleware,
      patientAPI.middleware,
      apiSlice.middleware 
    ),
});

export default store;
