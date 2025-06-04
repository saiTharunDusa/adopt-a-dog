import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <Link 
          to="/" 
          className="mt-6 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Go back to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;