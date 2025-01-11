
const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
