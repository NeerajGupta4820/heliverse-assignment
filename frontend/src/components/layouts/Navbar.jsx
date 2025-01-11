import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-semibold">HospitalFood</Link>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-gray-300 transition duration-200">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300 transition duration-200">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-300 transition duration-200">Contact</Link>
          
          {token ? (
            <>
              <button onClick={handleLogout} className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200">Sign Up</Link>
              <Link to="/login" className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">Login</Link>
            </>
          )}
        </div>
      </div>
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
        <Link to="/" className="block text-white py-2 px-4 hover:bg-gray-700 transition duration-200">Home</Link>
        <Link to="/about" className="block text-white py-2 px-4 hover:bg-gray-700 transition duration-200">About</Link>
        <Link to="/contact" className="block text-white py-2 px-4 hover:bg-gray-700 transition duration-200">Contact</Link>
        
        {token ? (
          <button onClick={handleLogout} className="block text-white py-2 px-4 hover:bg-gray-700 transition duration-200">Logout</button>
        ) : (
          <>
            <Link to="/signup" className="block text-white py-2 px-4 hover:bg-gray-700 transition duration-200">Sign Up</Link>
            <Link to="/login" className="block text-white py-2 px-4 hover:bg-gray-700 transition duration-200">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
