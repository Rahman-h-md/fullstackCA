import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SurveyForm from './pages/SurveyForm';
import BloodBank from './pages/BloodBank';
import PatientsInfo from './pages/PatientsInfo';
import PatientRegister from './pages/PatientRegister';
import DoctorDashboard from './pages/DoctorDashboard'; // Added import for DoctorDashboard
import BookAppointment from './pages/BookAppointment';
import ConsultationRoom from './pages/ConsultationRoom';
import MyReports from './pages/MyReports';
import AshaWorkerDashboard from './pages/AshaWorkerDashboard';
import AshaPatientManagement from './pages/AshaPatientManagement';
import AshaPatientDetails from './pages/AshaPatientDetails';
import AshaTaskManager from './pages/AshaTaskManager';
import AshaAlerts from './pages/AshaAlerts';
import AshaHealthVisitForm from './pages/AshaHealthVisitForm';
import AshaPregnancyTracking from './pages/AshaPregnancyTracking';
import AshaImmunizations from './pages/AshaImmunizations';
import AshaCommunity from './pages/AshaCommunity';
import AshaRecords from './pages/AshaRecords';
import PatientHealthRecords from './pages/PatientHealthRecords';
import HealthSchemes from './pages/HealthSchemes';
import Schemes from './pages/Schemes';
import Services from './pages/Services';
import Nutrition from './pages/Nutrition';
import ProtectedRoute from './components/ProtectedRoute';

import useSync from './hooks/useSync';

import Header from './components/Header';

const AppContent = () => {
  useSync(); // Trigger sync logic
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/doctor-dashboard" element={
          <ProtectedRoute>
            <DoctorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/asha/dashboard" element={
          <ProtectedRoute>
            <AshaWorkerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/asha/patients" element={
          <ProtectedRoute>
            <AshaPatientManagement />
          </ProtectedRoute>
        } />
        <Route path="/asha/patients/:id" element={
          <ProtectedRoute>
            <AshaPatientDetails />
          </ProtectedRoute>
        } />
        <Route path="/asha/tasks" element={
          <ProtectedRoute>
            <AshaTaskManager />
          </ProtectedRoute>
        } />
        <Route path="/asha/alerts" element={
          <ProtectedRoute>
            <AshaAlerts />
          </ProtectedRoute>
        } />
        <Route path="/asha/health-visits/new" element={
          <ProtectedRoute>
            <AshaHealthVisitForm />
          </ProtectedRoute>
        } />
        <Route path="/asha/pregnancies" element={
          <ProtectedRoute>
            <AshaPregnancyTracking />
          </ProtectedRoute>
        } />
        <Route path="/asha/immunizations" element={
          <ProtectedRoute>
            <AshaImmunizations />
          </ProtectedRoute>
        } />
        <Route path="/asha/community" element={
          <ProtectedRoute>
            <AshaCommunity />
          </ProtectedRoute>
        } />
        <Route path="/asha/records" element={
          <ProtectedRoute>
            <AshaRecords />
          </ProtectedRoute>
        } />
        <Route path="/survey/new" element={
          <ProtectedRoute>
            <SurveyForm />
          </ProtectedRoute>
        } />
        <Route path="/blood-banks" element={
          <BloodBank />
        } />
        <Route path="/patients" element={
          <ProtectedRoute>
            <PatientsInfo />
          </ProtectedRoute>
        } />
        <Route path="/patients/new" element={
          <ProtectedRoute>
            <PatientRegister />
          </ProtectedRoute>
        } />
        <Route path="/appointments/new" element={
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        } />
        <Route path="/consultation/:id" element={
          <ProtectedRoute>
            <ConsultationRoom />
          </ProtectedRoute>
        } />
        <Route path="/my-reports" element={
          <ProtectedRoute>
            <MyReports />
          </ProtectedRoute>
        } />
        <Route path="/patient/health-records" element={
          <ProtectedRoute>
            <PatientHealthRecords />
          </ProtectedRoute>
        } />
        <Route path="/health-schemes" element={<HealthSchemes />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/services" element={<Services />} />
        <Route path="/nutrition" element={
          <ProtectedRoute>
            <Nutrition />
          </ProtectedRoute>
        } />
      </Routes>
    </div >
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
