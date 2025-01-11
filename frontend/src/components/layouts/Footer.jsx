const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-3xl font-semibold text-gray-200">HospitalFood</h2>
            <p className="text-sm mt-2 text-gray-400">© 2025 HospitalFood. All rights reserved.</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-8 text-center sm:text-left">
            <a href="/" className="text-white hover:text-blue-500 transition duration-200 mt-2 sm:mt-0">Home</a>
            <a href="/about" className="text-white hover:text-blue-500 transition duration-200 mt-2 sm:mt-0">About</a>
            <a href="/contact" className="text-white hover:text-blue-500 transition duration-200 mt-2 sm:mt-0">Contact</a>
            <a href="/services" className="text-white hover:text-blue-500 transition duration-200 mt-2 sm:mt-0">Services</a>
          </div>

          <div className="flex justify-center sm:justify-end space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-white hover:text-blue-500 transition duration-200">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white hover:text-blue-500 transition duration-200">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-blue-500 transition duration-200">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
