import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import HouseholdsTable from './components/InteractiveDisplay';
import DashDashboard from './components/DashDashboard';
import Chatbot from './components/Chatbot';
import ImageGallery from './components/ImageGallery';
import ChurnPrediction from './components/ChurnPrediction';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interactive" element={<HouseholdsTable />} />
          <Route path="/dashdashboard" element={<DashDashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/mlmodel" element={<ImageGallery />} />
          <Route path="/predictions" element={<ChurnPrediction />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;