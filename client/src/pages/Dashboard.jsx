import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import AppointmentNotification from '../components/AppointmentNotification';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-primary">SwasthyaSetu Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Welcome, {user?.name} ({user?.role})</span>
                    <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </nav>

            <main className="p-8">
                {/* Appointment Notifications for Patients */}
                {user?.role === 'Patient' && <AppointmentNotification />}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Role-Specific Dashboard Widgets */}

                    {/* ASHA Worker Dashboard Card */}
                    {['ASHA'].includes(user?.role) && (
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition border-l-4 border-[#9c1f6e]">
                            <h3 className="text-lg font-semibold mb-2">ASHA Worker Dashboard</h3>
                            <p className="text-gray-500">Patient management, health visits, MCH tracking & more.</p>
                            <Link to="/asha/dashboard" className="text-[#9c1f6e] hover:underline mt-2 block font-bold">Go to Dashboard →</Link>
                        </div>
                    )}

                    {/* Doctor and Admin specific widgets */}
                    {['Doctor', 'Admin'].includes(user?.role) && (
                        <>
                        </>
                    )}

                </div>

                {/* Key Services for Patients */}
                {user?.role === 'Patient' && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold text-[#1B365D] mb-6 border-b pb-2">Explore Health Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {/* New services from home page */}
                            <Link to="/patient/health-records" className="bg-white p-6 rounded shadow-sm hover:shadow-md border-t-4 border-[#1B365D] transition text-center group cursor-pointer block">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">📋</div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">ASHA Reporting</h4>
                                <p className="text-sm text-gray-600">Digital data collection for health workers</p>
                            </Link>

                            <Link to="/blood-banks" className="bg-white p-6 rounded shadow-sm hover:shadow-md border-t-4 border-red-500 transition text-center group cursor-pointer block">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🩸</div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Blood Bank</h4>
                                <p className="text-sm text-gray-600">Real-time blood stock availability</p>
                            </Link>

                            <Link to="/appointments/new" className="bg-white p-6 rounded shadow-sm hover:shadow-md border-t-4 border-[#9c1f6e] transition text-center group cursor-pointer block">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">👨‍⚕️</div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Tele-Consult</h4>
                                <p className="text-sm text-gray-600">Connect with specialist doctors</p>
                            </Link>

                            <Link to="/health-schemes" className="bg-white p-6 rounded shadow-sm hover:shadow-md border-t-4 border-purple-500 transition text-center group cursor-pointer block">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🏥</div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Health Schemes</h4>
                                <p className="text-sm text-gray-600">Information on Gov health schemes</p>
                            </Link>

                            {/* Original services - kept */}
                            <Link to="/nutrition" className="bg-white p-6 rounded shadow-sm hover:shadow-md border-t-4 border-green-500 transition text-center group cursor-pointer block">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🥗</div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Nutrition</h4>
                                <p className="text-sm text-gray-600">Personalized diet plans & tips</p>
                            </Link>

                            <Link to="/my-reports" className="bg-white p-6 rounded shadow-sm hover:shadow-md border-t-4 border-blue-500 transition text-center group cursor-pointer block">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">📄</div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">My Reports</h4>
                                <p className="text-sm text-gray-600">View history & prescriptions</p>
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
