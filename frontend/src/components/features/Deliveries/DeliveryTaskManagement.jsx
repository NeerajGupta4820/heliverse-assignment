import { useState } from "react";
import { useAssignDeliveryTaskMutation } from "../../../features/deliveries/deliveryAPI";
import { useFetchPatientsQuery } from "../../../features/patients/patientAPI";
import { useFetchDietChartsQuery } from "../../../features/dietCharts/dietChartAPI";
import { useFetchDeliveryPersonnelQuery } from "../../../features/deliveries/deliveryAPI";
import { toast } from "react-toastify";

const DeliveryTaskManagement = () => {
  const { data: patients, isLoading: isPatientsLoading } =
    useFetchPatientsQuery();
  const { data: dietCharts, isLoading: isDietChartsLoading } =
    useFetchDietChartsQuery();
  const { data: deliveryPersonnel, isLoading: isDeliveryPersonnelLoading } =
    useFetchDeliveryPersonnelQuery();
  const [assignDeliveryTask] = useAssignDeliveryTaskMutation();

  const [newTask, setNewTask] = useState({
    description: "",
    personnelId: "",
    patientId: "",
    dietChartId: "",
    deliveryTimes: {
      morning: { preparedBy: null, status: "Pending" },
      evening: { preparedBy: null, status: "Pending" },
      night: { preparedBy: null, status: "Pending" },
    },
  });

  const handleAssignTask = () => {
    if (
      !newTask.personnelId ||
      !newTask.patientId ||
      !newTask.dietChartId ||
      !newTask.description
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const filteredDeliveryTimes = Object.keys(newTask.deliveryTimes).reduce(
      (acc, time) => {
        const timeData = newTask.deliveryTimes[time];
        if (timeData.preparedBy) acc[time] = timeData;
        return acc;
      },
      {}
    );

    const payload = {
      ...newTask,
      deliveryTimes: filteredDeliveryTimes,
    };

    assignDeliveryTask(payload)
      .unwrap()
      .then(() => {
        toast.success("Delivery task assigned successfully!");
        setNewTask({
          description: "",
          personnelId: "",
          patientId: "",
          dietChartId: "",
          deliveryTimes: {
            morning: { preparedBy: null, status: "Pending" },
            evening: { preparedBy: null, status: "Pending" },
            night: { preparedBy: null, status: "Pending" },
          },
        });
      })
      .catch((error) => {
        toast.error("Failed to assign task: " + error.message);
      });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setNewTask((prevState) => {
      const updatedDeliveryTimes = { ...prevState.deliveryTimes };

      if (checked) {
        updatedDeliveryTimes[name] = {
          status: "Pending",
          preparedBy: deliveryPersonnel?.[0]?._id || null,
        };
      } else {
        updatedDeliveryTimes[name] = { preparedBy: null, status: "Pending" };
      }

      return {
        ...prevState,
        deliveryTimes: updatedDeliveryTimes,
      };
    });
  };

  if (isPatientsLoading || isDietChartsLoading || isDeliveryPersonnelLoading)
    return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Delivery Task Management
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Task Description"
          className="w-full p-2 border rounded-md"
        />
        <select
          value={newTask.personnelId}
          onChange={(e) =>
            setNewTask({ ...newTask, personnelId: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Delivery Personnel</option>
          {deliveryPersonnel?.flatMap((person) =>
            person.staff.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}(Id:{staff._id})
              </option>
            ))
          )}
        </select>

        <select
          value={newTask.patientId}
          onChange={(e) =>
            setNewTask({ ...newTask, patientId: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Patient</option>
          {patients?.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name}
            </option>
          ))}
        </select>
        <select
          value={newTask.dietChartId}
          onChange={(e) =>
            setNewTask({ ...newTask, dietChartId: e.target.value })
          }
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Diet Chart</option>
          {isDietChartsLoading ? (
            <option>Loading Diet Charts...</option>
          ) : Array.isArray(dietCharts?.data) && dietCharts.data.length > 0 ? (
            dietCharts.data.map((chart) => (
              <option key={chart._id} value={chart._id}>
                {chart._id}
              </option>
            ))
          ) : (
            <option>No Diet Charts Available</option>
          )}
        </select>

        <div>
          <h3 className="font-semibold">Delivery Times:</h3>
          {["morning", "evening", "night"].map((time) => (
            <div key={time} className="flex items-center">
              <input
                type="checkbox"
                name={time}
                checked={newTask.deliveryTimes[time].preparedBy !== null}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label>{time.charAt(0).toUpperCase() + time.slice(1)}</label>
            </div>
          ))}
        </div>
        <button
          onClick={handleAssignTask}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Assign Task
        </button>
      </div>
    </div>
  );
};

export default DeliveryTaskManagement;
