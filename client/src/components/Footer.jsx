
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Brand Section */}
          <div>
            <h1 className="text-2xl font-bold mb-2">E-Commerce</h1>
            <p className="text-sm text-gray-400">Your one-stop shop for everything!</p>
          </div>

          {/* Links Section */}
          <div className="flex items-center justify-center space-x-3">
            <a href="/" className="hover:text-gray-400 transition">Privacy Policy</a>
            <a href="/" className="hover:text-gray-400 transition">Terms of Service</a>
            <a href="/" className="hover:text-gray-400 transition">Contact Us</a>
          </div>

          {/* Social Section */}
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-400 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
          © 2024 E-commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
