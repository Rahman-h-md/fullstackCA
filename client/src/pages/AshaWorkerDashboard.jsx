import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, AlertTriangle, Baby, CheckSquare, Bell, Calendar, CheckCircle, LogOut } from 'lucide-react';

const AshaWorkerDashboard = () => {
    const { user, logout } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);


    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/asha/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDashboardData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading dashboard...</div>
            </div>
        );
    }

    const summary = dashboardData?.summary || {};
    const criticalAlerts = dashboardData?.criticalAlerts || [];
    const todaysTasks = dashboardData?.todaysTasks || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
            {/* Header */}
            <nav className="bg-gradient-to-r from-orange-600 to-green-600 shadow-lg border-b-4 border-orange-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-4">
                            <img
                                src="/atmanirbhar-bharat-logo.png"
                                alt="Atmanirbhar Bharat"
                                className="h-14 w-14 object-contain bg-white/20 rounded-lg p-1"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-white">ASHA Worker Dashboard</h1>
                                <p className="text-sm text-orange-100">Welcome, {user?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard" className="text-white hover:text-orange-100 font-medium transition">
                                Main Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition font-semibold shadow-md"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1 font-medium">Total Patients</p>
                                <p className="text-4xl font-bold text-gray-900">{summary.totalPatients || 0}</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                <Users className="text-white" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1 font-medium">High-Risk Cases</p>
                                <p className="text-4xl font-bold text-red-600">{summary.highRiskPatients || 0}</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="text-white" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-pink-500 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1 font-medium">Pregnant Women</p>
                                <p className="text-4xl font-bold text-pink-600">{summary.pregnantWomen || 0}</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                                <Baby className="text-white" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1 font-medium">Pending Tasks</p>
                                <p className="text-4xl font-bold text-green-600">{summary.pendingTasks || 0}</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                <CheckSquare className="text-white" size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl shadow-md border border-orange-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <Bell className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Active Alerts</p>
                                <p className="text-3xl font-bold text-orange-700">{summary.activeAlerts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-md border border-blue-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <Calendar className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Upcoming Visits (7 days)</p>
                                <p className="text-3xl font-bold text-blue-700">{summary.upcomingVisits || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl shadow-md border border-green-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Recent Visits (7 days)</p>
                                <p className="text-3xl font-bold text-green-700">{summary.recentVisits || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1 h-8 bg-gradient-to-b from-orange-600 to-green-600 rounded-full"></span>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/asha/patients" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center border-t-4 border-orange-500">
                            <div className="text-4xl mb-3">👥</div>
                            <h3 className="font-bold text-gray-900 mb-1">My Patients</h3>
                            <p className="text-sm text-gray-600">View & manage patients</p>
                        </Link>

                        <Link to="/asha/health-visits/new" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center border-t-4 border-green-500">
                            <div className="text-4xl mb-3">🏠</div>
                            <h3 className="font-bold text-gray-900 mb-1">Log Visit</h3>
                            <p className="text-sm text-gray-600">Record home visit</p>
                        </Link>

                        <Link to="/asha/pregnancies" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center border-t-4 border-pink-500">
                            <div className="text-4xl mb-3">🤰</div>
                            <h3 className="font-bold text-gray-900 mb-1">Pregnancies</h3>
                            <p className="text-sm text-gray-600">Track ANC/PNC</p>
                        </Link>

                        <Link to="/asha/immunizations" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center border-t-4 border-purple-500">
                            <div className="text-4xl mb-3">💉</div>
                            <h3 className="font-bold text-gray-900 mb-1">Immunizations</h3>
                            <p className="text-sm text-gray-600">Vaccine schedule</p>
                        </Link>

                        <Link to="/asha/tasks" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center border-t-4 border-yellow-500">
                            <div className="text-4xl mb-3">📋</div>
                            <h3 className="font-bold text-gray-900 mb-1">Tasks</h3>
                            <p className="text-sm text-gray-600">Daily activities</p>
                        </Link>

                        <Link to="/asha/alerts" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center border-t-4 border-orange-500">
                            <div className="text-4xl mb-3">🔔</div>
                            <h3 className="font-bold text-gray-900 mb-1">Alerts</h3>
                            <p className="text-sm text-gray-600">Notifications</p>
                        </Link>

                        <Link to="/asha/community" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center border-t-4 border-teal-500">
                            <div className="text-4xl mb-3">🏘️</div>
                            <h3 className="font-bold text-gray-900 mb-1">Community</h3>
                            <p className="text-sm text-gray-600">Area tracking</p>
                        </Link>

                        <Link to="/asha/records" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center border-t-4 border-indigo-500">
                            <div className="text-4xl mb-3">📄</div>
                            <h3 className="font-bold text-gray-900 mb-1">Records</h3>
                            <p className="text-sm text-gray-600">Documents</p>
                        </Link>

                        <Link to="/blood-banks" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center border-t-4 border-red-500">
                            <div className="text-4xl mb-3">🩸</div>
                            <h3 className="font-bold text-gray-900 mb-1">Blood Bank</h3>
                            <p className="text-sm text-gray-600">Stock availability</p>
                        </Link>
                    </div>
                </div>

                {/* Critical Alerts */}
                {criticalAlerts.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="text-red-600">⚠️</span> Critical Alerts
                        </h2>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-red-500">
                            {criticalAlerts.map((alert) => (
                                <div key={alert._id} className="p-5 border-b border-gray-200 hover:bg-red-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                                                    {alert.alertType}
                                                </span>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {alert.patientId?.fullName}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                                            {alert.actionRequired && (
                                                <p className="text-sm text-blue-600 font-medium">
                                                    <strong>Action:</strong> {alert.actionRequired}
                                                </p>
                                            )}
                                        </div>
                                        <Link to={`/asha/alerts`} className="text-sm text-blue-600 hover:underline font-medium">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Today's Tasks */}
                {todaysTasks.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-8 bg-gradient-to-b from-orange-600 to-green-600 rounded-full"></span>
                            Today's Tasks
                        </h2>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {todaysTasks.map((task) => (
                                <div key={task._id} className="p-5 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${task.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                                                        task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                                <span className="text-sm font-semibold text-gray-900">{task.title}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">{task.description}</p>
                                            {task.patientId && (
                                                <p className="text-sm text-gray-500">
                                                    Patient: {task.patientId.fullName}
                                                </p>
                                            )}
                                        </div>
                                        <Link to={`/asha/tasks`} className="text-sm text-blue-600 hover:underline font-medium">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AshaWorkerDashboard;
