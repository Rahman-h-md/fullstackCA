import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AshaAlerts = () => {
    const { user } = useAuth();
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('Active');
    const [filterPriority, setFilterPriority] = useState('');

    useEffect(() => {
        fetchAlerts();
    }, [filterStatus, filterPriority]);

    const fetchAlerts = async () => {
        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams();
            if (filterStatus) params.append('status', filterStatus);
            if (filterPriority) params.append('priority', filterPriority);

            const response = await axios.get(`http://localhost:5000/api/alerts?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAlerts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching alerts:', error);
            setLoading(false);
        }
    };

    const handleResolveAlert = async (alertId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/alerts/${alertId}/resolve`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchAlerts();
        } catch (error) {
            console.error('Error resolving alert:', error);
        }
    };

    const handleAcknowledgeAlert = async (alertId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/alerts/${alertId}/acknowledge`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchAlerts();
        } catch (error) {
            console.error('Error acknowledging alert:', error);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
            case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Low': return 'bg-gray-100 text-gray-800 border-gray-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'Critical': return '🚨';
            case 'High': return '⚠️';
            case 'Medium': return '⚡';
            case 'Low': return 'ℹ️';
            default: return '📌';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">Alerts & Notifications</h1>
                            <p className="text-sm text-gray-600">{alerts.length} alerts</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/asha/dashboard" className="text-gray-600 hover:text-gray-900">
                                ← Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Acknowledged">Acknowledged</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Dismissed">Dismissed</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Priorities</option>
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Alerts List */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading alerts...</p>
                    </div>
                ) : alerts.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                        <div className="text-6xl mb-4">🔔</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No alerts found</h3>
                        <p className="text-gray-600">All clear! No alerts matching your filters.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {alerts.map((alert) => (
                            <div
                                key={alert._id}
                                className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${alert.priority === 'Critical' ? 'border-red-500' :
                                        alert.priority === 'High' ? 'border-orange-500' :
                                            alert.priority === 'Medium' ? 'border-yellow-500' :
                                                'border-gray-300'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {/* Header */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-3xl">{getPriorityIcon(alert.priority)}</span>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded border ${getPriorityColor(alert.priority)}`}>
                                                        {alert.priority}
                                                    </span>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                                                        {alert.alertType}
                                                    </span>
                                                    <span className={`px-2 py-1 text-xs rounded ${alert.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                            alert.status === 'Acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                                                                alert.status === 'Resolved' ? 'bg-gray-100 text-gray-800' :
                                                                    'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {alert.status}
                                                    </span>
                                                    {alert.autoGenerated && (
                                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                                            Auto-generated
                                                        </span>
                                                    )}
                                                </div>
                                                {alert.patientId && (
                                                    <p className="text-sm font-medium text-gray-900 mt-2">
                                                        Patient: {alert.patientId.fullName}
                                                        {alert.patientId.age && ` (${alert.patientId.age} years)`}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <p className="text-gray-900 font-medium mb-2">{alert.message}</p>

                                        {alert.details && (
                                            <p className="text-sm text-gray-600 mb-2">{alert.details}</p>
                                        )}

                                        {alert.actionRequired && (
                                            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                                                <p className="text-sm text-blue-900">
                                                    <strong>Action Required:</strong> {alert.actionRequired}
                                                </p>
                                            </div>
                                        )}

                                        {/* Timestamps */}
                                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
                                            <span>Created: {new Date(alert.createdAt).toLocaleString()}</span>
                                            {alert.acknowledgedAt && (
                                                <span>Acknowledged: {new Date(alert.acknowledgedAt).toLocaleString()}</span>
                                            )}
                                            {alert.resolvedAt && (
                                                <span>Resolved: {new Date(alert.resolvedAt).toLocaleString()}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 ml-4">
                                        {alert.status === 'Active' && (
                                            <>
                                                <button
                                                    onClick={() => handleAcknowledgeAlert(alert._id)}
                                                    className="px-4 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 whitespace-nowrap"
                                                >
                                                    Acknowledge
                                                </button>
                                                <button
                                                    onClick={() => handleResolveAlert(alert._id)}
                                                    className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 whitespace-nowrap"
                                                >
                                                    Resolve
                                                </button>
                                            </>
                                        )}
                                        {alert.status === 'Acknowledged' && (
                                            <button
                                                onClick={() => handleResolveAlert(alert._id)}
                                                className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 whitespace-nowrap"
                                            >
                                                Resolve
                                            </button>
                                        )}
                                        {alert.patientId && (
                                            <Link
                                                to={`/asha/patients/${alert.patientId._id}`}
                                                className="px-4 py-2 bg-blue-600 text-white text-sm text-center rounded hover:bg-blue-700 whitespace-nowrap"
                                            >
                                                View Patient
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AshaAlerts;
