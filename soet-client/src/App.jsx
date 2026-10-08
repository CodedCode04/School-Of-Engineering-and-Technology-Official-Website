import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Activities from './pages/Activities';

import Announcements from './pages/Announcements';
import Contact from './pages/Contact';
import Facilities from './pages/Facilities';
import Syllabus from './pages/Syllabus';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Legacy redirects */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/pages/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/pages/academics.html" element={<Navigate to="/academics" replace />} />
        <Route path="/academics.html" element={<Navigate to="/academics" replace />} />
        <Route path="/pages/activities.html" element={<Navigate to="/activities" replace />} />
        <Route path="/activities.html" element={<Navigate to="/activities" replace />} />
        <Route path="/pages/announcements.html" element={<Navigate to="/announcements" replace />} />
        <Route path="/announcements.html" element={<Navigate to="/announcements" replace />} />
        <Route path="/pages/contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="/pages/facilities.html" element={<Navigate to="/facilities" replace />} />
        <Route path="/facilities.html" element={<Navigate to="/facilities" replace />} />
        <Route path="/pages/syllabus.html" element={<Navigate to="/syllabus" replace />} />
        <Route path="/syllabus.html" element={<Navigate to="/syllabus" replace />} />
        <Route path="/pages/admin-dashboard.html" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/admin-dashboard.html" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/pages/admin-login.html" element={<Navigate to="/admin-login" replace />} />
        <Route path="/admin-login.html" element={<Navigate to="/admin-login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
