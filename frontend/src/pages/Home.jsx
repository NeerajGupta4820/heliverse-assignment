import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import foodDeliveryImage from '../assets/food-delivery.webp';
import managerImage from '../assets/hospital manager.webp';
import pantryImage from '../assets/pantry staff.png';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    const userRoleFromStorage = localStorage.getItem('user');

    if (userToken) {
      setIsLoggedIn(true);
      if (userRoleFromStorage) {
        const parsedUser = JSON.parse(userRoleFromStorage);
        setUserRole(parsedUser.role);
      }
    }
  }, []);

  const handleManagerClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (userRole === 'Hospital Manager') {
      navigate('/Manager-dashboard');
    } else {
      alert('Unauthorized access. Please login as a Hospital Manager.');
    }
  };

  const handleStaffClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (userRole === 'Pantry Staff') {
      navigate('/staff-dashboard');
    } else {
      alert('Unauthorized access. Please login as Pantry Staff.');
    }
  };

  const handleDeliveryClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (userRole === 'Delivery Personnel') {
      navigate('/delivery-dashboard');
    } else {
      alert('Unauthorized access. Please login as Delivery Personnel.');
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-primary mb-4">
          Welcome to Hospital Food Delivery Management
        </h1>
        <p className="text-lg text-gray-700">
          A comprehensive solution to manage patient food/diet charts, pantry tasks, and meal deliveries.
        </p>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
          onClick={handleManagerClick}
        >
          <img
            src={managerImage}
            alt="Hospital Food Manager"
            className="w-full h-38 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Hospital Food Manager</h2>
          <p className="text-gray-600 text-center">
            As a Hospital Food Manager, you can manage patient details, create meal plans, assign tasks to pantry staff, and track food deliveries.
          </p>
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
          onClick={handleStaffClick}
        >
          <img
            src={pantryImage}
            alt="Inner Pantry"
            className="w-full h-38 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Inner Pantry Staff</h2>
          <p className="text-gray-600 text-center">
            Pantry staff can manage meal preparations, assign delivery personnel, and track meal deliveries to ensure timely delivery to patients.
          </p>
        </div>
        <div
          className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
          onClick={handleDeliveryClick}
        >
          <img
            src={foodDeliveryImage}
            alt="Delivery Personnel"
            className="w-full h-38 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Delivery Personnel</h2>
          <p className="text-gray-600 text-center">
            Delivery personnel can view assigned meal boxes, mark deliveries as completed, and ensure all meals are delivered on time to patients rooms.
          </p>
        </div>
      </div>
      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Manage and Track Food Deliveries Efficiently
        </h3>
        {!isLoggedIn && (
          <>
            <p className="text-lg text-gray-700 mb-6">
              Sign in to your dashboard based on your role to manage patients, food charts, and deliveries effectively.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out hover:bg-blue-700"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
