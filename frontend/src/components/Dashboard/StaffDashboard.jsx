import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PantryTaskManagement from "../features/Pantry/PantryTaskManagement";
import TaskList from "../features/Pantry/TaskList";
import { FaBars } from "react-icons/fa";
import StaffSidebar from "../Sidebar/Staffsidebar";
import ViewPreparationTask from "../features/Pantry/ViewPreparationTask";
import UpdateMealStatus from "../features/DietChart/UpdateMealStatus";
import AddDeliveryPersonnel from "../features/Deliveries/AddDeliveryPersonnel";
import DeliveryTaskManagement from "../features/Deliveries/DeliveryTaskManagement";
import TrackDeliveries from "../features/Deliveries/TrackDeliveries";

const StaffDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block absolute md:relative w-55 bg-white shadow-lg z-20 h-full`}
      >
        <StaffSidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col p-4 md:p-4 max-h-screen overflow-y-scroll hide-scrollbar">
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            Staff Dashboard
          </h1>
          <button
            className="text-gray-800 text-2xl focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg flex-1">
          <Routes>
            {/* Redirect to the first default route */}
            <Route
              path=""
              element={<Navigate to={`view-assigntask/${localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : ""}`} />}
            />
            <Route path="/view-assigntask/:pantrystaffId" element={<ViewPreparationTask />} />
            <Route path="/update-mealStatus" element={<UpdateMealStatus />} />
            <Route path="/add-deliveryPersonnel/:pantrystaffId" element={<AddDeliveryPersonnel />} />
            <Route path="/assign-delivery/:pantrystaffId" element={<DeliveryTaskManagement />} />
            <Route path="/track-deliveries" element={<TrackDeliveries />} />
            <Route path="/pantry-task-management" element={<TaskList />} />
            <Route path="/assign-task" element={<PantryTaskManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
