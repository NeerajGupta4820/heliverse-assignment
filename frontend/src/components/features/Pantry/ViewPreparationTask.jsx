import { useState } from 'react';
import { useFetchPreparationTasksQuery } from '../../../features/pantryTasks/pantryTaskAPI';
import { FaEye, FaTimes, FaSearch } from 'react-icons/fa';

const ViewPreparationTask = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const pantryStaffId = user ? user.id : null;
  const { data, error, isLoading } = useFetchPreparationTasksQuery(pantryStaffId);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewClick = (task) => {
    setSelectedTask(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTask(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <p className="text-center text-sm md:text-base">Loading...</p>;
  if (error) return <p className="text-center text-sm md:text-base text-red-500">Error: {error.message}</p>;

  const filteredTasks = data?.tasks?.filter(
    (task) =>
      task._id.includes(searchQuery) ||
      task.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tasktype.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      <h1 className="text-lg sm:text-xl md:text-2xl text-center font-bold text-gray-800 mb-4 sm:mb-6">
        Preparation Task List
      </h1>
      <div className="mb-4 sm:mb-6 flex justify-center">
        <div className="relative w-full sm:w-2/3 lg:w-1/3">
          <input
            type="text"
            placeholder="Search by Task ID, Patient Name, or Task Type"
            className="w-full p-2 sm:p-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xs sm:text-sm">
            <tr>
              <th className="px-4 py-3 border text-left">Patient Name</th>
              <th className="px-4 py-3 border text-left">Task ID</th>
              <th className="px-4 py-3 border text-left">Task Type</th>
              <th className="px-4 py-3 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks?.map((task, index) => (
              <tr
                key={task._id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'} hover:bg-blue-100 text-xs sm:text-sm`}
              >
                <td className="px-4 py-4 border">{task.patient.name}</td>
                <td className="px-4 py-4 border">{task._id}</td>
                <td className="px-4 py-4 border">{task.tasktype}</td>
                <td className="px-4 py-4 border">
                  <button
                    onClick={() => handleViewClick(task)}
                    className="text-blue-500 hover:text-blue-700 font-semibold text-xs sm:text-sm"
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

      {modalIsOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-gray-50 to-gray-200 p-6 sm:p-8 rounded-xl shadow-2xl w-11/12 sm:w-2/3 lg:w-1/2 max-h-screen overflow-auto hide-scrollbar">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Task Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500 text-lg sm:text-xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y divide-gray-300 text-sm sm:text-base">
              <div className="py-2 sm:py-4">
                <p className="text-sm sm:text-base">
                  <span className="font-semibold text-gray-600">Task ID:</span>{' '}
                  <span className="text-gray-700">{selectedTask._id}</span>
                </p>
                <p className="text-sm sm:text-base">
                  <span className="font-semibold text-gray-600">Patient Name:</span>{' '}
                  <span className="text-gray-700">{selectedTask.patient.name}</span>
                </p>
              </div>

              <div className="py-2 sm:py-4">
                <p className="text-sm sm:text-base">
                  <span className="font-semibold text-gray-600">Task Type:</span>{' '}
                  <span className="text-gray-700">{selectedTask.tasktype}</span>
                </p>
                <p className="text-sm sm:text-base">
                  <span className="font-semibold text-gray-600">Status:</span>{' '}
                  <span
                    className={`text-${
                      selectedTask.selectedTimes?.morning?.status === 'completed' ? 'green' : 'yellow'
                    }-600`}
                  >
                    {selectedTask.selectedTimes?.morning?.status || 'N/A'}
                  </span>
                </p>
              </div>

              <div className="py-2 sm:py-4 sm:col-span-2">
                <p className="text-sm sm:text-base">
                  <span className="font-semibold text-gray-600">Description:</span>
                </p>
                <p className="text-gray-700 mt-1">{selectedTask.description || 'No description available.'}</p>
              </div>

              <div className="py-2 sm:py-4 sm:col-span-2">
                <p className="text-sm sm:text-base">
                  <span className="font-semibold text-gray-600">Diet Chart:</span>{' '}
                  <span className="text-gray-700">{selectedTask.dietChart || 'N/A'}</span>
                </p>
                <p className="text-sm sm:text-base mt-2">
                  <span className="font-semibold text-gray-600">Selected Times:</span>
                </p>
                <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-4 rounded-lg shadow-md text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(selectedTask.selectedTimes || {}).map(([time, details]) => (
                    <div
                      key={time}
                      className="p-2 border border-gray-300 rounded-md bg-gray-50"
                    >
                      <p className="font-semibold capitalize text-gray-600">{time}:</p>
                      <p>Status: <span className="text-gray-700">{details.status || 'N/A'}</span></p>
                      <p>Details: <span className="text-gray-700">{details.details || 'No details available'}</span></p>
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

export default ViewPreparationTask;
