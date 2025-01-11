import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateDietChartMutation } from '../../../features/dietCharts/dietChartAPI';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { setCurrentDiet } from '../../../features/dietCharts/dietChartSlice';
import { useFetchPatientsQuery } from '../../../features/patients/patientAPI';
import { useNavigate } from 'react-router-dom';

const CreateDietChart = () => {
  const [patientId, setPatientId] = useState('');
  const [meals, setMeals] = useState({
    morning: { ingredients: [], instructions: '' },
    evening: { ingredients: [], instructions: '' },
    night: { ingredients: [], instructions: '' },
  });
  const { token } = useSelector((state) => state.auth);
  const [createDietChart] = useCreateDietChartMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: patients, error, isLoading } = useFetchPatientsQuery();

  if (isLoading) {
    return <p>Loading patients...</p>;
  }

  if (error) {
    return <p>Error loading patients: {error.message}</p>;
  }

  const patientOptions = patients?.map((patient) => ({
    id: patient._id,
    name: patient.name,
  }));

  const handleCreateDietChart = async () => {
    try {
      const dietChartData = {
        patientId,
        meals,
        createdBy: token,
      };

      const response = await createDietChart(dietChartData).unwrap();

      if (response.success) {
        toast.success(response.message);
        dispatch(setCurrentDiet(response.data));
        navigate('/Manager-dashboard');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to create diet chart', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Create Diet Chart</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="patientId" className="block text-sm sm:text-base font-medium text-gray-700">
            Patient ID
          </label>
          <select
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a Patient</option>
            {patientOptions?.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name} (ID: {patient.id})
              </option>
            ))}
          </select>
        </div>

        {['morning', 'evening', 'night'].map((meal) => (
          <div key={meal}>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{meal.charAt(0).toUpperCase() + meal.slice(1)} Meal</h3>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700">Ingredients</label>
              <input
                type="text"
                value={meals[meal].ingredients.join(', ')}
                onChange={(e) =>
                  setMeals({
                    ...meals,
                    [meal]: { ...meals[meal], ingredients: e.target.value.split(', ') },
                  })
                }
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700">Instructions</label>
              <textarea
                value={meals[meal].instructions}
                onChange={(e) =>
                  setMeals({
                    ...meals,
                    [meal]: { ...meals[meal], instructions: e.target.value },
                  })
                }
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleCreateDietChart}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Diet Chart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDietChart;
