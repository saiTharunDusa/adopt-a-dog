import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/protectedRoute'
import { AuthProvider } from './context/AuthContext'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dogs/search"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
