import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateDeliveryPersonnelMutation } from '../../../features/deliveries/deliveryAPI';
import { toast } from 'react-toastify';

const AddDeliveryPersonnel = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [location, setLocation] = useState('');
  const [createDelivery, { isLoading }] = useCreateDeliveryPersonnelMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deliveryData = {
      name,
      email,
      contactInfo,
      location,
    };

    try {
      await createDelivery(deliveryData).unwrap();
      toast.success('Delivery personnel created successfully');
      navigate('/Manager-dashboard/assign-delivery');
    } catch (err) {
      toast.error(`Error: ${err.message || 'Unable to create delivery personnel'}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center">Add Delivery Personnel</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="contactInfo" className="block text-sm sm:text-base font-medium text-gray-700">
            Contact Info
          </label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm sm:text-base font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Delivery Personnel...' : 'Add Delivery Personnel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDeliveryPersonnel;
