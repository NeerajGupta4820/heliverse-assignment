import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FaUsers, FaClipboardList, FaTruck, FaTasks, FaPlusCircle } from "react-icons/fa";

const ManagerSidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.includes(path)
      ? "bg-blue-100 text-blue-600"
      : "text-gray-600 hover:text-blue-600";

  return (
    <div className="bg-white text-black h-screen shadow-lg p-4 sm:p-6 rounded-lg">
      <ul className="space-y-4">
        <li>
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 text-sm sm:text-base lg:text-lg">
            <FaUsers className="text-lg sm:text-xl lg:text-2xl" />
            <span>Patient Management</span>
          </h3>
          <ul className="pl-4 space-y-2">
            <li>
              <Link
                to="patients"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-base ${isActive(
                  "patients"
                )}`}
                onClick={closeSidebar}
              >
                <FaClipboardList className="mr-2 text-sm sm:text-base lg:text-lg" /> View Patients
              </Link>
            </li>
            <li>
              <Link
                to="add-patient"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-base ${isActive(
                  "add-patient"
                )}`}
                onClick={closeSidebar}
              >
                <FaPlusCircle className="mr-2 text-sm sm:text-base lg:text-lg" /> Add Patient
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 text-sm sm:text-base lg:text-lg">
            <FaClipboardList className="text-lg sm:text-xl lg:text-2xl" />
            <span>Diet Chart Management</span>
          </h3>
          <ul className="pl-4 space-y-2">
            <li>
              <Link
                to="diet-charts"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-base ${isActive(
                  "diet-charts"
                )}`}
                onClick={closeSidebar}
              >
                <FaClipboardList className="mr-2 text-sm sm:text-base lg:text-lg" /> View Diet Charts
              </Link>
            </li>
            <li>
              <Link
                to="create-diet-chart"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-base ${isActive(
                  "create-diet-chart"
                )}`}
                onClick={closeSidebar}
              >
                <FaPlusCircle className="mr-2 text-sm sm:text-base lg:text-lg" /> Create Diet Chart
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 text-sm sm:text-base lg:text-lg">
            <FaTasks className="text-lg sm:text-xl lg:text-2xl" />
            <span>Pantry Task Management</span>
          </h3>
          <ul className="pl-4 space-y-2">
            <li>
              <Link
                to="create-pantryStaff"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-base ${isActive(
                  "create-pantryStaff"
                )}`}
                onClick={closeSidebar}
              >
                <FaPlusCircle className="mr-2 text-sm sm:text-base lg:text-lg" /> Create Pantry Staff
              </Link>
            </li>
            <li>
              <Link
                to="assign-pantry-task"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-base ${isActive(
                  "assign-pantry-task"
                )}`}
                onClick={closeSidebar}
              >
                <FaTasks className="mr-2 text-sm sm:text-base lg:text-lg" /> Assign Task
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 text-sm sm:text-base lg:text-lg">
            <FaTruck className="text-lg sm:text-xl lg:text-2xl" />
            <span>Delivery Management</span>
          </h3>
          <ul className="pl-4 space-y-2">
            <li>
              <Link
                to="pantry-task-management"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-base ${isActive(
                  "pantry-task-management"
                )}`}
                onClick={closeSidebar}
              >
                <FaClipboardList className="mr-2 text-sm sm:text-base lg:text-lg" /> Monitor Pantry Tasks
              </Link>
            </li>
            <li>
              <Link
                to="delivery-management"
                className={`flex items-center py-2 px-4 rounded-md text-xs sm:text-sm lg:text-base ${isActive(
                  "delivery-management"
                )}`}
                onClick={closeSidebar}
              >
                <FaTruck className="mr-2 text-sm sm:text-base lg:text-lg" /> Track Deliveries
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

ManagerSidebar.propTypes = {
  closeSidebar: PropTypes.func.isRequired, // Validates that closeSidebar is a function
};

export default ManagerSidebar;
