import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AshaPatientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatientDetails();
    }, [id]);

    const fetchPatientDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/asha/patients/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching patient details:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading patient details...</div>
            </div>
        );
    }

    if (!data || !data.patient) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient not found</h3>
                    <Link to="/asha/patients" className="text-blue-600 hover:underline">
                        ← Back to Patients
                    </Link>
                </div>
            </div>
        );
    }

    const { patient, visits, pregnancy, immunization, tasks, alerts } = data;

    const getRiskBadgeColor = (risk) => {
        switch (risk) {
            case 'High': return 'bg-red-100 text-red-800 border-red-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Low': return 'bg-green-100 text-green-800 border-green-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">Patient Details</h1>
                            <p className="text-sm text-gray-600">{patient.fullName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/asha/patients" className="text-gray-600 hover:text-gray-900">
                                ← Back to Patients
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Patient Info Card */}
                <div className={`bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 ${patient.riskLevel === 'High' ? 'border-red-500' :
                        patient.riskLevel === 'Medium' ? 'border-yellow-500' :
                            'border-green-500'
                    }`}>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{patient.fullName}</h2>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`px-3 py-1 text-sm font-semibold rounded border ${getRiskBadgeColor(patient.riskLevel)}`}>
                                    {patient.riskLevel} Risk
                                </span>
                                {patient.isPregnant && (
                                    <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm font-semibold rounded border border-pink-300">
                                        Pregnant
                                    </span>
                                )}
                                {patient.hasChronicDisease && (
                                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-semibold rounded border border-orange-300">
                                        Chronic Disease
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                to={`/asha/health-visits/new?patientId=${patient._id}`}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Log Visit
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Age & Gender</p>
                            <p className="text-lg font-medium text-gray-900">{patient.age} years • {patient.gender}</p>
                        </div>
                        {patient.contactNumber && (
                            <div>
                                <p className="text-sm text-gray-600">Contact Number</p>
                                <p className="text-lg font-medium text-gray-900">{patient.contactNumber}</p>
                            </div>
                        )}
                        {patient.abhaId && (
                            <div>
                                <p className="text-sm text-gray-600">ABHA ID</p>
                                <p className="text-lg font-medium text-gray-900">{patient.abhaId}</p>
                            </div>
                        )}
                        {patient.address && (
                            <div className="md:col-span-3">
                                <p className="text-sm text-gray-600">Address</p>
                                <p className="text-lg font-medium text-gray-900">{patient.address}</p>
                            </div>
                        )}
                    </div>

                    {patient.chronicDiseases && patient.chronicDiseases.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Chronic Conditions:</p>
                            <div className="flex flex-wrap gap-2">
                                {patient.chronicDiseases.map((disease, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded">
                                        {disease}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Active Alerts */}
                {alerts && alerts.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-red-600">⚠️</span> Active Alerts
                        </h3>
                        <div className="space-y-3">
                            {alerts.map((alert) => (
                                <div key={alert._id} className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-red-900">{alert.alertType}</p>
                                            <p className="text-sm text-red-800 mt-1">{alert.message}</p>
                                            {alert.actionRequired && (
                                                <p className="text-sm text-blue-600 mt-2">
                                                    <strong>Action:</strong> {alert.actionRequired}
                                                </p>
                                            )}
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${alert.priority === 'Critical' ? 'bg-red-200 text-red-900' :
                                                alert.priority === 'High' ? 'bg-orange-200 text-orange-900' :
                                                    'bg-yellow-200 text-yellow-900'
                                            }`}>
                                            {alert.priority}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pending Tasks */}
                {tasks && tasks.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Tasks</h3>
                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div key={task._id} className="p-4 bg-gray-50 rounded border border-gray-200">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900">{task.title}</p>
                                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded ${task.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                                                        task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                    {task.taskType}
                                                </span>
                                                <span className="text-xs text-gray-600">
                                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Visits */}
                {visits && visits.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Visits</h3>
                        <div className="space-y-4">
                            {visits.map((visit) => (
                                <div key={visit._id} className="p-4 bg-gray-50 rounded border border-gray-200">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded">
                                                {visit.visitType}
                                            </span>
                                            <span className="ml-2 text-sm text-gray-600">
                                                {new Date(visit.visitDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    {visit.vitals && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                            {visit.vitals.bloodPressure && (
                                                <div>
                                                    <p className="text-xs text-gray-600">BP</p>
                                                    <p className="text-sm font-medium">{visit.vitals.bloodPressure}</p>
                                                </div>
                                            )}
                                            {visit.vitals.weight && (
                                                <div>
                                                    <p className="text-xs text-gray-600">Weight</p>
                                                    <p className="text-sm font-medium">{visit.vitals.weight} kg</p>
                                                </div>
                                            )}
                                            {visit.vitals.hemoglobin && (
                                                <div>
                                                    <p className="text-xs text-gray-600">Hemoglobin</p>
                                                    <p className="text-sm font-medium">{visit.vitals.hemoglobin} g/dL</p>
                                                </div>
                                            )}
                                            {visit.vitals.temperature && (
                                                <div>
                                                    <p className="text-xs text-gray-600">Temperature</p>
                                                    <p className="text-sm font-medium">{visit.vitals.temperature}°F</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {visit.notes && (
                                        <p className="text-sm text-gray-700 mt-2">
                                            <strong>Notes:</strong> {visit.notes}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pregnancy Info */}
                {pregnancy && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-pink-500">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Pregnancy Tracking</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">LMP</p>
                                <p className="text-lg font-medium">{new Date(pregnancy.lmp).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">EDD</p>
                                <p className="text-lg font-medium">{new Date(pregnancy.edd).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Trimester</p>
                                <p className="text-lg font-medium">{pregnancy.currentTrimester}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">ANC Visits: {pregnancy.ancVisits?.length || 0}</p>
                            <p className="text-sm text-gray-600">PNC Visits: {pregnancy.pncVisits?.length || 0}</p>
                        </div>
                    </div>
                )}

                {/* Immunization Info */}
                {immunization && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Immunization Record</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Date of Birth: {new Date(immunization.dateOfBirth).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                            Vaccines Completed: {immunization.vaccines?.filter(v => v.status === 'Completed').length || 0} / {immunization.vaccines?.length || 0}
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {!visits?.length && !pregnancy && !immunization && !tasks?.length && !alerts?.length && (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No records yet</h3>
                        <p className="text-gray-600 mb-4">Start by logging a health visit for this patient</p>
                        <Link
                            to={`/asha/health-visits/new?patientId=${patient._id}`}
                            className="inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Log First Visit
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AshaPatientDetails;
