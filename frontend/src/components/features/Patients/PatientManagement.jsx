import PatientForm from './PatientForm';
import PatientList from './PatientList';

const PatientManagement = () => {
  return (
    <div>
      <h2>Patient Management</h2>
      <PatientForm />
      <PatientList />
    </div>
  );
};

export default PatientManagement;
