import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading dashboard...</div>
            </div>
        );
    }

    const summary = dashboardData?.summary || {};
    const criticalAlerts = dashboardData?.criticalAlerts || [];
    const todaysTasks = dashboardData?.todaysTasks || [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">ASHA Worker Dashboard</h1>
                            <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                                Main Dashboard
                            </Link>
                            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                                <p className="text-3xl font-bold text-gray-900">{summary.totalPatients || 0}</p>
                            </div>
                            <div className="text-4xl">👥</div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">High-Risk Cases</p>
                                <p className="text-3xl font-bold text-red-600">{summary.highRiskPatients || 0}</p>
                            </div>
                            <div className="text-4xl">⚠️</div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-pink-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Pregnant Women</p>
                                <p className="text-3xl font-bold text-pink-600">{summary.pregnantWomen || 0}</p>
                            </div>
                            <div className="text-4xl">🤰</div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Pending Tasks</p>
                                <p className="text-3xl font-bold text-green-600">{summary.pendingTasks || 0}</p>
                            </div>
                            <div className="text-4xl">📋</div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">🔔</div>
                            <div>
                                <p className="text-sm text-gray-600">Active Alerts</p>
                                <p className="text-2xl font-bold text-orange-600">{summary.activeAlerts || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">📅</div>
                            <div>
                                <p className="text-sm text-gray-600">Upcoming Visits (7 days)</p>
                                <p className="text-2xl font-bold text-blue-600">{summary.upcomingVisits || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">✅</div>
                            <div>
                                <p className="text-sm text-gray-600">Recent Visits (7 days)</p>
                                <p className="text-2xl font-bold text-green-600">{summary.recentVisits || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link to="/asha/patients" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center border-t-4 border-blue-500">
                            <div className="text-4xl mb-2">👥</div>
                            <h3 className="font-semibold text-gray-900">My Patients</h3>
                            <p className="text-sm text-gray-600 mt-1">View & manage patients</p>
                        </Link>

                        <Link to="/asha/health-visits/new" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center border-t-4 border-green-500">
                            <div className="text-4xl mb-2">🏠</div>
                            <h3 className="font-semibold text-gray-900">Log Visit</h3>
                            <p className="text-sm text-gray-600 mt-1">Record home visit</p>
                        </Link>

                        <Link to="/asha/pregnancies" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center border-t-4 border-pink-500">
                            <div className="text-4xl mb-2">🤰</div>
                            <h3 className="font-semibold text-gray-900">Pregnancies</h3>
                            <p className="text-sm text-gray-600 mt-1">Track ANC/PNC</p>
                        </Link>

                        <Link to="/asha/immunizations" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center border-t-4 border-purple-500">
                            <div className="text-4xl mb-2">💉</div>
                            <h3 className="font-semibold text-gray-900">Immunizations</h3>
                            <p className="text-sm text-gray-600 mt-1">Vaccine schedule</p>
                        </Link>

                        <Link to="/asha/tasks" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center border-t-4 border-yellow-500">
                            <div className="text-4xl mb-2">📋</div>
                            <h3 className="font-semibold text-gray-900">Tasks</h3>
                            <p className="text-sm text-gray-600 mt-1">Daily activities</p>
                        </Link>

                        <Link to="/asha/alerts" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center border-t-4 border-orange-500">
                            <div className="text-4xl mb-2">🔔</div>
                            <h3 className="font-semibold text-gray-900">Alerts</h3>
                            <p className="text-sm text-gray-600 mt-1">Notifications</p>
                        </Link>

                        <Link to="/asha/community" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center border-t-4 border-teal-500">
                            <div className="text-4xl mb-2">🏘️</div>
                            <h3 className="font-semibold text-gray-900">Community</h3>
                            <p className="text-sm text-gray-600 mt-1">Area tracking</p>
                        </Link>

                        <Link to="/asha/records" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center border-t-4 border-indigo-500">
                            <div className="text-4xl mb-2">📄</div>
                            <h3 className="font-semibold text-gray-900">Records</h3>
                            <p className="text-sm text-gray-600 mt-1">Documents</p>
                        </Link>

                        <Link to="/blood-banks" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center border-t-4 border-red-500">
                            <div className="text-4xl mb-2">🩸</div>
                            <h3 className="font-semibold text-gray-900">Blood Bank</h3>
                            <p className="text-sm text-gray-600 mt-1">Stock availability</p>
                        </Link>
                    </div>
                </div>

                {/* Critical Alerts */}
                {criticalAlerts.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-red-600">⚠️</span> Critical Alerts
                        </h2>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {criticalAlerts.map((alert) => (
                                <div key={alert._id} className="p-4 border-b border-gray-200 hover:bg-gray-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                                                    {alert.alertType}
                                                </span>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {alert.patientId?.fullName}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700">{alert.message}</p>
                                            {alert.actionRequired && (
                                                <p className="text-sm text-blue-600 mt-1">
                                                    <strong>Action:</strong> {alert.actionRequired}
                                                </p>
                                            )}
                                        </div>
                                        <Link to={`/asha/alerts`} className="text-sm text-blue-600 hover:underline">
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
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Tasks</h2>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {todaysTasks.map((task) => (
                                <div key={task._id} className="p-4 border-b border-gray-200 hover:bg-gray-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded ${task.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                                                    task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                                <span className="text-sm font-medium text-gray-900">{task.title}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{task.description}</p>
                                            {task.patientId && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Patient: {task.patientId.fullName}
                                                </p>
                                            )}
                                        </div>
                                        <Link to={`/asha/tasks`} className="text-sm text-blue-600 hover:underline">
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
