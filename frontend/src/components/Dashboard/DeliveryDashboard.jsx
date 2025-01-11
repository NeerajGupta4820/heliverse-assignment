import { Link } from "react-router-dom";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";  // Import Navigate to redirect
import { FaTasks, FaClipboardCheck } from "react-icons/fa";
import UpdateMealStatus from "../features/Deliveries/UpdateMealStatus";
import TrackMealToDelivery from "../features/Deliveries/TrackMealToDelivery";

const DeliveryDashboard = () => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const deliveryPersonnelId = user ? user.id : null;
  const location = useLocation();
  
  const isActive = (path) =>
    location.pathname.includes(path)
      ? "bg-blue-100 text-blue-600"
      : "text-gray-600 hover:text-blue-600";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white text-black p-3 shadow-lg rounded-md mx mt-1 mb-6">
        <h3 className="font-semibold text-lg text-center mb-2 text-black">Delivery Management</h3>
        <ul className="flex space-x-6 justify-center">
          <li>
            <Link
              to={`track-deliveries/${deliveryPersonnelId}`}
              className={`flex items-center py-2 px-4 rounded-md text-sm ${isActive("track-deliveries")}`}
            >
              <FaTasks className="mr-2 text-lg" />
              View Assigned Meal Box
            </Link>
          </li>
          <li>
            <Link
              to={`update-deliverystatus/${deliveryPersonnelId}`}
              className={`flex items-center py-2 px-4 rounded-md text-sm ${isActive("update-deliverystatus")}`}
            >
              <FaClipboardCheck className="mr-2 text-lg" />
              Update Delivery Status
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow bg-white p-6">
        <Routes>
          <Route path="/track-deliveries/:deliveryPersonnelId" element={<TrackMealToDelivery />} />
          <Route path="/update-deliverystatus/:deliveryPersonnelId" element={<UpdateMealStatus />} />
          {/* Add a default route to redirect to the first link */}
          <Route path="/" element={<Navigate to={`/delivery-dashboard/track-deliveries/${deliveryPersonnelId}`} />} />
        </Routes>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
