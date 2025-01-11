import about  from "../assets/about.webp"
const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            Our mission is to revolutionize the food delivery system in hospitals, ensuring patients receive nutritious and timely meals tailored to their needs.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center space-y-8 sm:space-y-0">
          <div className="w-full sm:w-1/2 text-center sm:text-left px-4">
            <p className="text-lg text-gray-700 mb-6">
              We are committed to providing hospitals with an efficient and effective food management system. Our platform helps hospital food managers create personalized diet charts for patients, manage meal preparation, and ensure timely delivery to patient rooms.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We believe in supporting healthcare providers by offering a seamless, integrated system that allows food managers, pantry staff, and delivery personnel to collaborate efficiently, ensuring that patients receive the right meals based on their dietary needs.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our goal is to improve the hospital food delivery process through innovation, transparency, and a focus on patient satisfaction.
            </p>
          </div>

          <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
            <img
              src={about}
              alt="Hospital Food Delivery"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="text-center mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 mx-auto max-w-2xl">
            <li>Patient-Centered Care</li>
            <li>Timely and Accurate Food Delivery</li>
            <li>Collaboration and Teamwork</li>
            <li>Integrity and Transparency</li>
            <li>Commitment to Quality and Innovation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
