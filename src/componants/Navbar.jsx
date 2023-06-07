import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/"><span className="text-white text-3xl font-bold">Make Your Account</span></Link>
              
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
            <Link to="/login"  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900"> Login
              </Link>
              <Link to="/signup" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"> Signup
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;