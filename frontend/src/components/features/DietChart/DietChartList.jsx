import { useState } from "react";
import {
  useFetchDietChartsQuery,
  useDeleteDietChartMutation,
} from "../../../features/dietCharts/dietChartAPI";
import { FaEye, FaEdit, FaTrash, FaTimes, FaSearch } from "react-icons/fa";
import {toast} from "react-toastify"

const DietChartList = () => {
  const { data, error, isLoading } = useFetchDietChartsQuery();
  const [deleteDietChart] = useDeleteDietChartMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDietChart, setSelectedDietChart] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewClick = (dietChart) => {
    setSelectedDietChart(dietChart);
    setModalIsOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteDietChart(id);
    } catch (err) {
    toast.error("Error updating delivery task status.",err);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDietChart(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500">Error: {error.message}</p>
    );

  const filteredDietCharts = data?.data?.filter(
    (dietChart) =>
      dietChart._id.includes(searchQuery) ||
      dietChart.patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" bg-gray-50">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-gradient mb-6">
        Diet Chart List
      </h1>
      <div className="mb-6 flex justify-center">
        <div className="relative w-full sm:w-2/3 lg:w-1/3">
          <input
            type="text"
            placeholder="Search by ID or Patient Name"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm">
            <tr>
              <th className="px-2 sm:px-4 md:px-6 py-3 border text-left">
                Diet Chart ID
              </th>
              <th className="px-2 sm:px-4 md:px-6 py-3 border text-left">
                Patient Name
              </th>
              <th className="px-2 sm:px-4 md:px-6 py-3 border text-left">
                Patient ID
              </th>
              <th className="px-2 sm:px-4 md:px-6 py-3 border text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDietCharts?.map((dietChart, index) => (
              <tr
                key={dietChart._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } hover:bg-blue-100 text-xs sm:text-sm`}
              >
                <td className="px-2 sm:px-4 md:px-6 py-4 border">
                  {dietChart._id}
                </td>
                <td className="px-2 sm:px-4 md:px-6 py-4 border">
                  {dietChart.patient.name}
                </td>
                <td className="px-2 sm:px-4 md:px-6 py-4 border">
                  {dietChart.patient._id}
                </td>
                <td className="px-2 sm:px-4 md:px-6 py-4 border">
                  <button
                    onClick={() => handleViewClick(dietChart)}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    <FaEye className="inline mr-2" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalIsOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 md:p-8 rounded-lg w-11/12 sm:w-10/12 md:w-[700px] lg:w-[900px] max-h-[90vh] overflow-y-auto relative shadow-2xl">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        <FaTimes />
      </button>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center text-blue-700">
        Diet Chart Details
      </h2>
      <div className="space-y-4 text-sm sm:text-base md:text-lg lg:text-xl">
        <div>
          <strong className="font-medium">Diet Chart ID:</strong>{" "}
          {selectedDietChart?._id}
        </div>
        <div>
          <strong className="font-medium">Patient ID:</strong>{" "}
          {selectedDietChart?.patient?._id}
        </div>
        <div>
          <strong className="font-medium">Patient Name:</strong>{" "}
          {selectedDietChart?.patient?.name}
        </div>
        <div>
          <strong className="font-medium">Room Number:</strong>{" "}
          {selectedDietChart?.patient?.roomNumber}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["morning", "evening", "night"].map((meal) => (
            <div key={meal} className="p-4 bg-white rounded-lg shadow-md">
              <strong className="block font-semibold capitalize">
                {meal} Meal:
              </strong>
              <p>{selectedDietChart?.meals?.[meal]?.instructions}</p>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                <p>Ingredients:</p>
                <ul className="list-disc pl-5">
                  {selectedDietChart?.meals?.[meal]?.ingredients?.map(
                    (ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600 flex items-center justify-center text-sm sm:text-base md:text-lg">
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 flex items-center justify-center text-sm sm:text-base md:text-lg"
            onClick={() => handleDeleteClick(selectedDietChart._id)}
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default DietChartList;
