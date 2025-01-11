import { useState } from "react";
import { useFetchPatientsQuery } from "../../../features/patients/patientAPI";

const PatientList = () => {
  const { data: patients = [], isLoading, isError } = useFetchPatientsQuery();
  const [columns, setColumns] = useState([
    { name: "Name", field: "name", visible: true },
    { name: "Diseases", field: "diseases", visible: true },
    { name: "Allergies", field: "allergies", visible: true },
    { name: "Room Number", field: "roomNumber", visible: true },
    { name: "Bed Number", field: "bedNumber", visible: true },
    { name: "Floor Number", field: "floorNumber", visible: true },
    { name: "Age", field: "age", visible: true },
    { name: "Gender", field: "gender", visible: true },
    { name: "Contact Info", field: "contactInfo", visible: true },
    { name: "Emergency Contact", field: "emergencyContact", visible: true },
  ]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showManageColumns, setShowManageColumns] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading patients</p>;

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedPatients = [...patients].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleColumn = (field) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.field === field ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    setShowPopup(true);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedPatient.name}?`
    );
    if (confirmDelete) {
      setShowPopup(false);
    }
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700">
          Patient List
        </h1>
        <button
          onClick={() => setShowManageColumns(!showManageColumns)}
          className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-blue-600 transition text-sm sm:text-base"
        >
          Manage Columns
        </button>
      </div>

      {showManageColumns && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-80 sm:w-96">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">
              Select Columns
            </h2>
            <div className="space-y-2">
              {columns.map((col) => (
                <label key={col.field} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={col.visible}
                    onChange={() => toggleColumn(col.field)}
                  />
                  {col.name}
                </label>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowManageColumns(false)}
                className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopup && selectedPatient && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClosePopup}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-80 sm:w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg sm:text-xl"
              onClick={handleClosePopup}
            >
              ✖
            </button>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-700">
              Patient Details
            </h2>
            <div className="space-y-2">
              {columns
                .filter((col) => col.visible)
                .map((col) => (
                  <p key={col.field} className="text-gray-800 text-sm sm:text-base">
                    <strong>{col.name}:</strong> {selectedPatient[col.field]}
                  </p>
                ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 text-white px-3 py-2 sm:px-4 rounded-md hover:bg-blue-600 transition text-sm"
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-2 sm:px-4 rounded-md hover:bg-red-600 transition text-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg shadow-md">
        <table className="min-w-full bg-white border">
          <thead className="bg-blue-500 text-white sticky top-0 text-sm sm:text-base">
            <tr>
              {columns
                .filter((col) => col.visible)
                .map((col) => (
                  <th
                    key={col.field}
                    className="text-left p-2 sm:p-3 font-medium cursor-pointer"
                    onClick={() => handleSort(col.field)}
                  >
                    {col.name}
                    {sortField === col.field && (
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm">
                        {sortOrder === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            {sortedPatients.map((patient, index) => (
              <tr
                key={patient._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                } hover:bg-blue-100 cursor-pointer`}
                onClick={() => handleRowClick(patient)}
              >
                {columns
                  .filter((col) => col.visible)
                  .map((col) => (
                    <td key={col.field} className="p-2 sm:p-3 text-gray-700">
                      {Array.isArray(patient[col.field])
                        ? patient[col.field].join(", ")
                        : patient[col.field]}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
