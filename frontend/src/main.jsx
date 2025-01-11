import { StrictMode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  
import './index.css';
import App from './App.jsx';
import store from './redux/store.js'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>
);