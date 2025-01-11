import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import {toast} from "react-toastify"
import { useLoginMutation } from '../features/auth/authApi';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import imageurl from "../assets/doctor.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(setCredentials(user));
      navigate('/');
    } catch (err) {
      toast.error("Error in login.",err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4 sm:px-0">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-1/2 hidden sm:flex justify-center items-center">
          <img
            src={imageurl}
            alt="Background"
            className="object-contain"
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          />
        </div>
        <div className="w-full sm:w-1/2 p-10">
          <div className="text-center mb-2">
            <h2 className="text-4xl font-semibold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-6">Please login to your account to continue.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">Do not have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
