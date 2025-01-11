const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            We would love to hear from you. Please reach out using the form below for any inquiries or support.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-8">
          {/* First Div: Form */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg h-full">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get In Touch</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Full Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email Address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg relative h-full">
            <div className="relative z-10">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Details</h2>
              <p className="text-lg text-gray-700 mb-4">
                If you prefer to reach us directly for support, feedback, or inquiries, here are our contact details:
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Phone:</p>
                <p className="text-lg text-gray-700">(123) 456-7890</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Email:</p>
                <p className="text-lg text-gray-700">support@hospitalfooddelivery.com</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Address:</p>
                <p className="text-lg text-gray-700">456 Hospital Road, City, Country</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
