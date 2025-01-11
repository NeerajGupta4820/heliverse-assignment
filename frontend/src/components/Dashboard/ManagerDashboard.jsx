import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PatientList from "../features/Patients/PatientList";
import PatientForm from "../features/Patients/PatientForm";
import DietChartList from "../features/DietChart/DietChartList";
import CreateDietChart from "../features/DietChart/CreateDietChart";
import DeliveryList from "../features/Deliveries/DeliveryList";
import PantryTaskManagement from "../features/Pantry/PantryTaskManagement";
import TaskList from "../features/Pantry/TaskList";
import ManagerSidebar from "../Sidebar/Managersidebar";
import CreatePantryStaff from "../features/Pantry/CreatePantryStaff";
import { FaBars } from "react-icons/fa";

const ManagerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block absolute md:relative w-55 bg-white shadow-lg z-20 h-full`}
      >
        <ManagerSidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col p-4 md:p-6 max-h-screen overflow-y-scroll hide-scrollbar">
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            Hospital Food Manager
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
            {/* Default route redirect */}
            <Route path="/" element={<Navigate to="/Manager-dashboard/patients" />} />
            
            {/* Manager routes */}
            <Route path="/patients" element={<PatientList />} />
            <Route path="/add-patient" element={<PatientForm />} />
            <Route path="/diet-charts" element={<DietChartList />} />
            <Route path="/create-diet-chart" element={<CreateDietChart />} />
            <Route path="/create-pantryStaff" element={<CreatePantryStaff />} />
            <Route path="/pantry-task-management" element={<TaskList />} />
            <Route path="/assign-pantry-task" element={<PantryTaskManagement />} />
            <Route path="/delivery-management" element={<DeliveryList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
