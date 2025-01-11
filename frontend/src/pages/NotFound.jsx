import {Link } from "react-router-dom"
const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center text-white p-6 rounded-lg shadow-xl bg-opacity-80">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <p className="text-sm mb-8">
          It seems like you&apos;ve followed a broken link or entered a URL that doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
