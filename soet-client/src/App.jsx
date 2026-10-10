import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Activities from './pages/Activities';
import Announcements from './pages/Announcements';
import Contact from './pages/Contact';
import Facilities from './pages/Facilities';
import Syllabus from './pages/Syllabus';
import NotFound from './pages/NotFound';

import Login from './pages/Login';
import Register from './pages/Register';
import AwaitingApproval from './pages/AwaitingApproval';
import ProfileCompletion from './pages/ProfileCompletion';
import VerificationPending from './pages/VerificationPending';

import AdminDashboard from './pages/AdminDashboard';
import HodDashboard from './pages/HodDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import StudentDocs from './pages/StudentDocs';
import StudentPortfolio from './pages/StudentPortfolio';
import TpoDashboard from './pages/TpoDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import AlumniProfileCompletion from './pages/AlumniProfileCompletion';
import AlumniDirectory from './pages/AlumniDirectory';
import JobReferrals from './pages/JobReferrals';
import MentorshipRequests from './pages/MentorshipRequests';
import SuccessStories from './pages/SuccessStories';
import ManageAnnouncements from './pages/ManageAnnouncements';
import ManageSyllabus from './pages/ManageSyllabus';
import AuditLog from './pages/AuditLog';
import NotificationsPage from './pages/NotificationsPage';
import SendNotificationPage from './pages/SendNotificationPage';
import ChatPage from './pages/ChatPage';
import ChatModeration from './pages/ChatModeration';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Toaster position="top-right" />
          <Routes>
          {/* Public Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<Navigate to="/login" replace />} />
          <Route path="/register/:role" element={<Register />} />
          <Route path="/awaiting-approval" element={<AwaitingApproval />} />

          {/* Student Profile Flow */}
          <Route path="/student/profile-completion" element={<ProtectedRoute allowedRoles={['student']}><ProfileCompletion /></ProtectedRoute>} />
          <Route path="/student/verification-pending" element={<ProtectedRoute allowedRoles={['student']}><VerificationPending /></ProtectedRoute>} />

          {/* Protected Dashboard Routes */}
          <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/hod-dashboard" element={<ProtectedRoute allowedRoles={['hod']}><HodDashboard /></ProtectedRoute>} />
          <Route path="/teacher-dashboard" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/docs" element={<ProtectedRoute allowedRoles={['student']}><StudentDocs /></ProtectedRoute>} />
          <Route path="/student/portfolio" element={<ProtectedRoute allowedRoles={['student']}><StudentPortfolio /></ProtectedRoute>} />
          <Route path="/tpo-dashboard" element={<ProtectedRoute allowedRoles={['tpo']}><TpoDashboard /></ProtectedRoute>} />
          <Route path="/alumni/*" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniDashboard /></ProtectedRoute>} />
          <Route path="/alumni/profile-completion" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniProfileCompletion /></ProtectedRoute>} />
          <Route path="/manage-announcements" element={<ProtectedRoute allowedRoles={['admin', 'hod', 'tpo']}><ManageAnnouncements /></ProtectedRoute>} />
          <Route path="/manage-syllabus" element={<ProtectedRoute allowedRoles={['admin', 'hod']}><ManageSyllabus /></ProtectedRoute>} />
          <Route path="/syllabus" element={<ProtectedRoute allowedRoles={['admin', 'hod', 'teacher', 'student']}><Syllabus /></ProtectedRoute>} />
          <Route path="/audit-logs" element={<ProtectedRoute allowedRoles={['admin']}><AuditLog /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute allowedRoles={['admin', 'hod', 'teacher', 'student', 'tpo', 'alumni']}><NotificationsPage /></ProtectedRoute>} />
          <Route path="/notifications/send" element={<ProtectedRoute allowedRoles={['admin', 'hod', 'tpo']}><SendNotificationPage /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute allowedRoles={['admin', 'hod', 'teacher', 'student', 'tpo', 'alumni']}><ChatPage /></ProtectedRoute>} />
          <Route path="/admin/chat-moderation" element={<ProtectedRoute allowedRoles={['admin']}><ChatModeration /></ProtectedRoute>} />

          {/* Cross-role Alumni Features */}
          <Route path="/alumni-directory" element={<ProtectedRoute allowedRoles={['admin', 'hod', 'tpo', 'student', 'alumni']}><AlumniDirectory /></ProtectedRoute>} />
          <Route path="/job-referrals" element={<ProtectedRoute allowedRoles={['student', 'tpo', 'alumni']}><JobReferrals /></ProtectedRoute>} />
          <Route path="/mentorship-requests" element={<ProtectedRoute allowedRoles={['student', 'alumni']}><MentorshipRequests /></ProtectedRoute>} />
          <Route path="/success-stories" element={<Layout><SuccessStories /></Layout>} />

          
          {/* Legacy redirects */}
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/pages/about.html" element={<Navigate to="/about" replace />} />
          <Route path="/about.html" element={<Navigate to="/about" replace />} />
        </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
