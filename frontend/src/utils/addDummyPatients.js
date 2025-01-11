import axios from 'axios';

const dummyPatients = Array.from({ length: 20 }, (_, i) => ({
  name: `Patient ${i + 1}`,
  diseases: ['Disease1', 'Disease2'],
  allergies: ['Allergy1', 'Allergy2'],
  roomNumber: `${i + 1}`,
  bedNumber: `${i + 1}`,
  floorNumber: `${Math.ceil((i + 1) / 5)}`,
  age: 20 + i,
  gender: i % 2 === 0 ? 'Male' : 'Female',
  contactInfo: `123456789${i}`,
  emergencyContact: `987654321${i}`,
}));

export const addDummyPatients = async () => {
    const token = localStorage.getItem('token');
  const baseUrl = 'http://localhost:5000/api/patients/create';

  try {
    for (const patient of dummyPatients) {
      const response = await axios.post(baseUrl, patient, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Added: ${response.data.patient.name}`);
    }
    console.log('All dummy patients added successfully.');
  } catch (error) {
    console.error('Error adding dummy patients:', error.response?.data || error.message);
  }
};
