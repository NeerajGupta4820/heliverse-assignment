import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './components/layouts/Footer';
import Navbar from './components/layouts/Navbar';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import DeliveryDashboard from './components/Dashboard/DeliveryDashboard';
import StaffDashboard from './components/Dashboard/StaffDashboard';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

import PatientList from './components/features/Patients/PatientList';
import PatientForm from './components/features/Patients/PatientForm';
import DietChartList from './components/features/DietChart/DietChartList';
import CreateDietChart from './components/features/DietChart/CreateDietChart';
import DeliveryList from './components/features/Deliveries/DeliveryList';
import PantryTaskManagement from './components/features/Pantry/PantryTaskManagement';
import CreatePantryStaff from './components/features/Pantry/CreatePantryStaff';
import TaskList from './components/features/Pantry/TaskList';
import ViewPreparationTask from './components/features/Pantry/ViewPreparationTask';
import UpdateMealStatus from './components/features/DietChart/UpdateMealStatus';
import UpdateMealDeliveryStatus from './components/features/Deliveries/UpdateMealStatus';
import AddDeliveryPersonnel from './components/features/Deliveries/AddDeliveryPersonnel';
import DeliveryTaskManagement from './components/features/Deliveries/DeliveryTaskManagement';
import TrackDeliveries from './components/features/Deliveries/TrackDeliveries';
import TrackMealToDelivery from './components/features/Deliveries/TrackMealToDelivery';

const App = () => {
  const { token } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/Manager-dashboard" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>}>
          <Route path="patients" element={<PatientList />} />
          <Route path="add-patient" element={<PatientForm />} />
          <Route path="diet-charts" element={<DietChartList />} />
          <Route path="create-diet-chart" element={<CreateDietChart />} />
          <Route path="pantry-task-management" element={<TaskList />} />
          <Route path="create-pantryStaff" element={<CreatePantryStaff />} />
          <Route path="assign-pantry-task" element={<PantryTaskManagement />} />
          <Route path="delivery-management" element={<DeliveryList />} />
        </Route>

        <Route path="/staff-dashboard" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>}>
          <Route path="view-assigntask/:pantrystaffId" element={<ViewPreparationTask />} />
          <Route path="update-mealStatus" element={<UpdateMealStatus />} />
          <Route path="add-deliveryPersonnel/:pantrystaffId" element={<AddDeliveryPersonnel />} />
          <Route path="assign-delivery/:pantrystaffId" element={<DeliveryTaskManagement />} />
          <Route path="track-deliveries" element={<TrackDeliveries />} />
        </Route>

        <Route path="/delivery-dashboard" element={<ProtectedRoute><DeliveryDashboard /></ProtectedRoute>} >
          <Route path="track-deliveries/:deliveryPersonnelId" element={<TrackMealToDelivery />} />
          <Route path="update-deliveryStatus/:deliveryPersonnelId" element={<UpdateMealDeliveryStatus />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
