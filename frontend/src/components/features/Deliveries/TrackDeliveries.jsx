import { useState } from "react";
import { useFetchDeliveryPersonnelQuery } from "../../../features/deliveries/deliveryAPI";
import { FaEye, FaSearch, FaTimes } from "react-icons/fa";

const TrackDeliveries = () => {
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: personnelData, isLoading: isLoadingPersonnel } = useFetchDeliveryPersonnelQuery();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPersonnel = personnelData?.filter(
    (personnel) =>
      personnel.staff[0]?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      personnel.deliveries.some((delivery) =>
        delivery._id.includes(searchQuery)
      )
  );

  const closeModal = () => {
    setSelectedPersonnel(null);
  };

  const renderDeliveryTimes = (times) => {
    const timesArray = [
      { time: "morning", label: "Morning" },
      { time: "evening", label: "Evening" },
      { time: "night", label: "Night" }
    ];

    return timesArray.map((time) => (
      times[time.time]?.status && (
        <p key={time.time} className={`text-sm p-2 rounded-md ${
          times[time.time].status === "Delivered" ? "bg-green-400 text-white" :
          times[time.time].status === "Pending" ? "bg-gray-400" : "bg-red-400 text-white"
        }`}>
          <strong>{time.label} Status:</strong> {times[time.time].status}
        </p>
      )
    ));
  };

  if (isLoadingPersonnel) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 hide-scrollbar">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">
        Track Deliveries
      </h2>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full sm:w-2/3 lg:w-1/3">
          <input
            type="text"
            placeholder="Search by Delivery ID or Staff Name"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Delivery Personnel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredPersonnel?.map((personnel) =>
          personnel.deliveries.map((delivery) => (
            <div key={delivery._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-sm font-semibold text-blue-700">Delivery ID: {delivery._id}</h3>
              <p className="text-sm text-gray-600">Staff Name: {personnel.staff[0]?.name}</p>
              <p className="text-sm text-gray-600">Patient Name: {delivery.patient}</p>
              <p className="text-sm text-gray-600">Status: {delivery.status}</p>
              <button
                onClick={() => setSelectedPersonnel(personnel)}
                className="mt-4 text-blue-500 hover:text-blue-700 flex items-center"
              >
                <FaEye className="mr-2" /> View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedPersonnel && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-10/12 md:w-[700px] lg:w-[600px] max-h-[90vh] overflow-y-auto relative transform transition-transform duration-300">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={24} />
            </button>
            <h3 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
              Delivery Details
            </h3>

            {/* Grid Layout for Modal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Staff Name */}
              <div>
                <h4 className="text-xl font-medium text-blue-600">Staff Name</h4>
                <p className="text-lg text-gray-700">{selectedPersonnel.staff[0]?.name}</p>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-xl font-medium text-blue-600">Contact Info</h4>
                <p className="text-lg text-gray-700">{selectedPersonnel.staff[0]?.contactInfo}</p>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-xl font-medium text-blue-600">Location</h4>
                <p className="text-lg text-gray-700">{selectedPersonnel.location}</p>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-xl font-medium text-blue-600">Status</h4>
                <p className="text-lg text-gray-700">{selectedPersonnel.staff[0]?.status}</p>
              </div>

              {/* Deliveries Grid */}
              <div className="col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedPersonnel.deliveries.map((delivery) => (
                    <div key={delivery._id} className="p-4 bg-gray-100 rounded-lg shadow-sm space-y-2">
                      <div className="mb-4">
                        <p><strong>Diet Chart:</strong> {delivery.dietChart}</p>
                        <p><strong>Patient:</strong> {delivery.patient}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg shadow-md">
                        <h4 className="text-xl font-medium text-blue-600">Delivery Times</h4>
                        <div className="space-y-2">
                          {renderDeliveryTimes(delivery.deliveryTimes)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackDeliveries;
