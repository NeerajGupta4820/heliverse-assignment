import { useState, useEffect } from "react";
import { useFetchPantryStaffQuery } from "../../../features/pantryTasks/pantryTaskAPI";
import { FaEye, FaTimes } from "react-icons/fa";

const PantryTaskList = () => {
  const { data, error, isLoading } = useFetchPantryStaffQuery();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPantry, setSelectedPantry] = useState(null);

  useEffect(() => {
    if (data) {
      console.log("Fetched pantry data:", data);
    }
  }, [data]);

  const handleViewClick = (pantry) => {
    setSelectedPantry(pantry);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPantry(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold text-gray-800 mb-6">
        Pantry Task List
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 border text-left text-gray-700">Staff Name</th>
              <th className="px-6 py-3 border text-left text-gray-700">Staff ID</th>
              <th className="px-6 py-3 border text-left text-gray-700">Patient Name</th>
              <th className="px-6 py-3 border text-left text-gray-700">Diet Chart ID</th>
              <th className="px-6 py-3 border text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((pantry) =>
              pantry.preparationTasks?.map((taskDetail) => (
                <tr key={taskDetail._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border">{pantry.staff[0]?.name || "No staff assigned"}</td>
                  <td className="px-6 py-4 border">{pantry.staff[0]?._id || "N/A"}</td>
                  <td className="px-6 py-4 border">{taskDetail.patient?.name || "N/A"}</td>
                  <td className="px-6 py-4 border">{taskDetail.dietChart || "N/A"}</td>
                  <td className="px-6 py-4 border">
                    <button
                      onClick={() => handleViewClick(pantry)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      <FaEye className="inline mr-2" />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalIsOpen && selectedPantry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-lg shadow-xl mx-4 p-6 relative w-full max-w-4xl overflow-y-auto max-h-[95vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center text-blue-800">
              Pantry Task Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <strong className="block text-blue-700 mb-1">Staff Name:</strong>
                <span className="text-gray-700">{selectedPantry.staff[0]?.name || "N/A"}</span>
              </div>
              <div>
                <strong className="block text-blue-700 mb-1">Staff ID:</strong>
                <span className="text-gray-700">{selectedPantry.staff[0]?._id || "N/A"}</span>
              </div>
              <div>
                <strong className="block text-blue-700 mb-1">Location:</strong>
                <span className="text-gray-700">{selectedPantry.location || "N/A"}</span>
              </div>
            </div>

            <div className="mt-4">
              <strong className="block text-blue-700 mb-2">Staff Info:</strong>
              <div className="bg-blue-50 p-4 rounded-md shadow-sm">
                {selectedPantry.staff && selectedPantry.staff.length > 0 ? (
                  <>
                    <p>
                      <strong>Name:</strong> {selectedPantry.staff[0]?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Contact Info:</strong>{" "}
                      {selectedPantry.staff[0]?.contactInfo || "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedPantry.staff[0]?.status || "N/A"}
                    </p>
                  </>
                ) : (
                  <p>No staff assigned</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <strong className="block text-blue-700 mb-2">Preparation Tasks:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedPantry.preparationTasks?.map((task, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-4 rounded-md shadow-sm border border-blue-300"
                  >
                    <p>
                      <strong>Task Name:</strong> {task.tasktype || "N/A"}
                    </p>
                    <p>
                      <strong>Description:</strong> {task.description || "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong> {task.status || "N/A"}
                    </p>
                    <p>
                      <strong>Times:</strong>
                      <div className="grid grid-cols-3 gap-2">
                        {task.selectedTimes?.morning && (
                          <div className="bg-gray-200 p-2 rounded-md">Morning</div>
                        )}
                        {task.selectedTimes?.evening && (
                          <div className="bg-gray-200 p-2 rounded-md">Evening</div>
                        )}
                        {task.selectedTimes?.night && (
                          <div className="bg-gray-200 p-2 rounded-md">Night</div>
                        )}
                      </div>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PantryTaskList;
