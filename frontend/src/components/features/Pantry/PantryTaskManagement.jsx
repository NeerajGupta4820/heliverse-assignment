import { useState } from "react";
import { useAssignTaskMutation } from "../../../features/pantryTasks/pantryTaskAPI";
import { useFetchPatientsQuery } from "../../../features/patients/patientAPI";
import { useFetchDietChartsQuery } from "../../../features/dietCharts/dietChartAPI";
import { useFetchPantryStaffQuery } from "../../../features/pantryTasks/pantryTaskAPI";
import { toast } from "react-toastify";

const PantryTaskManagement = () => {
  const { data: patients, isLoading: isPatientLoading } = useFetchPatientsQuery();
  const { data: dietCharts, isLoading: isDietChartLoading } = useFetchDietChartsQuery();
  const { data: pantryStaff, isLoading: isPantryStaffLoading } = useFetchPantryStaffQuery();

  const [newPantryTask, setNewPantryTask] = useState({
    tasktype: "",
    description: "",
    patientId: "",
    dietChartId: "",
    pantryStaffId: "",
    selectedTimes: {
      morning: { preparedBy: null, status: 'Pending' },
      evening: { preparedBy: null, status: 'Pending' },
      night: { preparedBy: null, status: 'Pending' },
    },
  });

  const [assignTask] = useAssignTaskMutation();

  const handleCreatePantryTask = () => {
    if (!newPantryTask.pantryStaffId || !newPantryTask.tasktype || !newPantryTask.description) {
      toast.error("Please fill in all fields.");
      return;
    }
    const filteredTimes = Object.keys(newPantryTask.selectedTimes).reduce((acc, key) => {
      const selectedTime = newPantryTask.selectedTimes[key];
      if (selectedTime.preparedBy) {
        acc[key] = selectedTime;
      }
      return acc;
    }, {});

    const taskPayload = {
      ...newPantryTask,
      selectedTimes: filteredTimes,
    };

    assignTask(taskPayload)
      .unwrap()
      .then(() => {
        toast.success("Task assigned successfully!");
        setNewPantryTask({
          tasktype: "",
          description: "",
          patientId: "",
          dietChartId: "",
          pantryStaffId: "",
          selectedTimes: {
            morning: { preparedBy: null, status: 'Pending' },
            evening: { preparedBy: null, status: 'Pending' },
            night: { preparedBy: null, status: 'Pending' },
          },
        });
      })
      .catch((error) => {
        toast.error("Failed to assign task: " + error.message);
      });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setNewPantryTask((prevState) => {
      const updatedSelectedTimes = { ...prevState.selectedTimes };

      if (checked) {
        updatedSelectedTimes[name] = {
          status: 'Pending',
          preparedBy: pantryStaff?.[0]?._id || null, // Example: assign the first pantry staff as default
        };
      } else {
        updatedSelectedTimes[name] = { preparedBy: null, status: 'Pending' }; // Reset when unchecked
      }

      return {
        ...prevState,
        selectedTimes: updatedSelectedTimes,
      };
    });
  };

  if (isPatientLoading || isDietChartLoading || isPantryStaffLoading)
    return <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>;

  const availableStaff = pantryStaff?.flatMap((staffItem) =>
    staffItem.staff.filter((staff) => staff.status === "Available")
  );

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-center text-indigo-600">Pantry Task Management</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <select
              onChange={(e) => setNewPantryTask({ ...newPantryTask, pantryStaffId: e.target.value })}
              value={newPantryTask.pantryStaffId}
              className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base lg:text-lg"
            >
              <option value="">Select Pantry Staff</option>
              {availableStaff?.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.name} (ID: {staff._id})
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newPantryTask.tasktype}
              onChange={(e) => setNewPantryTask({ ...newPantryTask, tasktype: e.target.value })}
              placeholder="Task Type"
              className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base lg:text-lg"
            />
          </div>
          <textarea
            value={newPantryTask.description}
            onChange={(e) => setNewPantryTask({ ...newPantryTask, description: e.target.value })}
            placeholder="Task Description"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base lg:text-lg"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <select
                onChange={(e) => setNewPantryTask({ ...newPantryTask, patientId: e.target.value })}
                value={newPantryTask.patientId}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base lg:text-lg"
              >
                <option value="">Select Patient</option>
                {patients?.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name} (ID: {patient.patientId})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                onChange={(e) => setNewPantryTask({ ...newPantryTask, dietChartId: e.target.value })}
                value={newPantryTask.dietChartId}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base lg:text-lg"
              >
                <option value="">Select Diet Chart</option>
                {dietCharts?.data?.map((dietChart) => (
                  <option key={dietChart._id} value={dietChart._id}>
                    Diet Chart ID: {dietChart._id}
                  </option>
                ))}
              </select>
              {newPantryTask.dietChartId && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="morning"
                      checked={newPantryTask.selectedTimes.morning.preparedBy !== null}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <label className="ml-2 text-gray-700 text-sm md:text-base lg:text-lg">Morning</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="evening"
                      checked={newPantryTask.selectedTimes.evening.preparedBy !== null}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <label className="ml-2 text-gray-700 text-sm md:text-base lg:text-lg">Evening</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="night"
                      checked={newPantryTask.selectedTimes.night.preparedBy !== null}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <label className="ml-2 text-gray-700 text-sm md:text-base lg:text-lg">Night</label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleCreatePantryTask}
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base lg:text-lg"
          >
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default PantryTaskManagement;
