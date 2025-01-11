import { Link, useLocation } from "react-router-dom";
import {
  FaTasks,
  FaClipboardList,
  FaTruck,
  FaCheckCircle,
  FaUserPlus,
  FaClipboardCheck,
} from "react-icons/fa";
import PropTypes from "prop-types";

const StaffSidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const pantryStaffId = user ? user.id : null; 

  const isActive = (path) =>
    location.pathname.includes(path)
      ? "bg-blue-100 text-blue-600"
      : "text-gray-600 hover:text-blue-600";

  return (
    <div className="bg-white text-black h-screen shadow-lg p-4 sm:p-6 rounded-lg">
      <ul className="space-y-3">
        <li>
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 text-xs sm:text-sm lg:text-base">
            <FaClipboardList className="text-sm sm:text-base lg:text-lg" />
            <span>Meal Preparation Management</span>
          </h3>
          <ul className="pl-6 space-y-4 mb-4">
            <li>
              <Link
                to={`view-assigntask/${pantryStaffId}`} 
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-sm ${isActive("view-assigntask")}`}
                onClick={closeSidebar}
              >
                <FaTasks className="mr-2 text-sm sm:text-base lg:text-lg" />
                View Preparation Tasks
              </Link>
            </li>
            <li>
              <Link
                to={'update-mealStatus'} 
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-sm ${isActive("update-mealStatus")}`}
                onClick={closeSidebar}
              >
                <FaClipboardCheck className="mr-2 text-sm sm:text-base lg:text-lg" />
                Update Meal Preparation Status
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 text-xs sm:text-sm lg:text-base">
            <FaUserPlus className="text-sm sm:text-base lg:text-lg" />
            <span>Delivery Personnel Management</span>
          </h3>
          <ul className="pl-6 space-y-4 mb-4">
            <li>
              <Link
                to={`add-DeliveryPersonnel/${pantryStaffId}`} 
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-sm ${isActive("add-DeliveryPersonnel")}`}
                onClick={closeSidebar}
              >
                <FaUserPlus className="mr-2 text-sm sm:text-base lg:text-lg" />
                Add Delivery Personnel
              </Link>
            </li>
            <li>
              <Link
                to={`assign-delivery/${pantryStaffId}`} 
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-sm ${isActive("assign-delivery")}`}
                onClick={closeSidebar}
              >
                <FaTasks className="mr-2 text-sm sm:text-base lg:text-lg" />
                Assign Meals to Delivery Personnel
              </Link>
            </li>
          </ul>
        </li>

        {/* Meal Delivery Tracking Section */}
        <li>
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 text-xs sm:text-sm lg:text-base">
            <FaTruck className="text-sm sm:text-base lg:text-lg" />
            <span>Meal Delivery Tracking</span>
          </h3>
          <ul className="pl-6 space-y-4 mb-4">
            <li>
              <Link
                to="track-deliveries"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-sm ${isActive("track-deliveries")}`}
                onClick={closeSidebar}
              >
                <FaClipboardList className="mr-2 text-sm sm:text-base lg:text-lg" />
                Track Meal Deliveries
              </Link>
            </li>
            <li>
              <Link
                to="mark-meal-delivered"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-sm ${isActive("mark-meal-delivered")}`}
                onClick={closeSidebar}
              >
                <FaCheckCircle className="mr-2 text-sm sm:text-base lg:text-lg" />
                Mark Meal as Delivered
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

StaffSidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
};

export default StaffSidebar;
