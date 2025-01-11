import { useState } from "react";
import {
  useFetchTasksForPersonnelQuery,
  useUpdateDeliveryTaskStatusMutation,
} from "../../../features/deliveries/deliveryAPI.jsx";
import { toast } from "react-toastify";
import { FaSearch, FaTimes } from "react-icons/fa";

const UpdateDeliveryTaskStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const deliveryPersonnelId = user ? user.id : null;

  const {
    data: tasks,
    isLoading,
    isError,
  } = useFetchTasksForPersonnelQuery(deliveryPersonnelId);

  const [updateDeliveryTaskStatus] = useUpdateDeliveryTaskStatusMutation();

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setSelectedMeal("");
    setStatus("");
    setIsModalOpen(false);
  };

  const handleChangeMeal = (meal) => {
    setSelectedMeal(meal);
    setStatus("");
  };

  const handleStatusChange = () => {
    if (selectedMeal && selectedTask) {
      const currentStatus = selectedTask.deliveryTimes[selectedMeal]?.status;

      let newStatus = "";
      if (currentStatus === "Pending") {
        newStatus = "In Progress";
      } else if (currentStatus === "In Progress") {
        newStatus = "Completed";
      } else {
        toast.error("No valid status change available.");
        return;
      }

      setStatus(newStatus);
    }
  };

  const handleConfirmChange = async (newStatus) => {
    if (!selectedMeal || !newStatus) {
      toast.error("Please select a meal and status.");
      return;
    }
    try {
      await updateDeliveryTaskStatus({
        deliveryId: selectedTask._id,
        updates: { [selectedMeal]: newStatus },
      }).unwrap();
      toast.success("Delivery task status updated successfully.");
      closeModal();
    } catch (error) {
      toast.error("Error updating delivery task status.",error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks?.deliveriesData?.filter(
    (task) =>
      task._id.includes(searchQuery) ||
      task.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <p className="text-center">Loading tasks...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching tasks.</p>;

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold text-gray-800 mb-6">
        Update Delivery Task Status
      </h1>
      <div className="mb-6 flex justify-center">
        <div className="relative w-full sm:w-2/3 lg:w-1/3">
          <input
            type="text"
            placeholder="Search by Task ID, Patient Name, or Description"
            className="w-full p-3 pl-10 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
            <tr>
              <th className="px-4 py-3 border text-sm sm:text-base">Task ID</th>
              <th className="px-4 py-3 border text-sm sm:text-base">Patient ID</th>
              <th className="px-4 py-3 border text-sm sm:text-base">Description</th>
              <th className="px-4 py-3 border text-sm sm:text-base">Delivery Status</th>
              <th className="px-4 py-3 border text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks?.map((task, index) => (
              <tr
                key={task._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"
                } hover:bg-blue-100`}
              >
                <td className="px-4 py-4 border text-sm sm:text-base">{task._id}</td>
                <td className="px-4 py-4 border text-sm sm:text-base">{task.patient}</td>
                <td className="px-4 py-4 border text-sm sm:text-base">{task.description}</td>
                <td className="px-4 py-4 border text-sm sm:text-base">
                  {task.deliveryTimes.morning.status} / {task.deliveryTimes.evening.status}
                </td>
                <td className="px-4 py-4 border text-sm sm:text-base">
                  <button
                    onClick={() => openModal(task)}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-11/12 sm:w-2/3 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                Update Delivery Task Status
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500"
              >
                <FaTimes />
              </button>
            </div>
            <p>
              <strong>Task:</strong> {selectedTask.description}
            </p>
            <p>
              <strong>Patient ID:</strong> {selectedTask.patient}
            </p>
            <div className="my-2">
              <label className="block font-semibold">Meal:</label>
              <select
                value={selectedMeal}
                onChange={(e) => handleChangeMeal(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Meal</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </select>
            </div>

            {selectedMeal && (
              <div className="my-2">
                <label className="block font-semibold">Status:</label>
                <p className="text-blue-500">
                  {status || (selectedMeal && selectedTask.deliveryTimes?.[selectedMeal]?.status) || "No status available"}
                </p>

                <button
                  onClick={handleStatusChange}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Change Status
                </button>
              </div>
            )}

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => handleConfirmChange(status)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDeliveryTaskStatus;
