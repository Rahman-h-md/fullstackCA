import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PatientHealthRecords = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [patientData, setPatientData] = useState(null);
    const [healthVisits, setHealthVisits] = useState([]);
    const [pregnancy, setPregnancy] = useState(null);
    const [immunization, setImmunization] = useState(null);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetchPatientHealthData();
    }, []);

    const fetchPatientHealthData = async () => {
        try {
            const token = localStorage.getItem('token');

            // First, find the patient record by searching all patients
            // The user.id is the authentication ID, not the patient ID
            let patientId = null;

            try {
                // Try to find patient by user's email or name
                const patientsResponse = await axios.get('http://localhost:5000/api/patients', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Find the patient that matches the logged-in user
                const matchingPatient = patientsResponse.data.find(p =>
                    p.fullName?.toLowerCase() === user.name?.toLowerCase() ||
                    p.contactNumber === user.email ||
                    p._id === user.id
                );

                if (matchingPatient) {
                    patientId = matchingPatient._id;
                    setPatientData(matchingPatient);
                } else {
                    console.log('No patient record found for this user');
                    setLoading(false);
                    return;
                }
            } catch (error) {
                console.error('Error finding patient record:', error);
                setLoading(false);
                return;
            }

            // Now use the correct patient ID to fetch health data
            // Fetch health visits
            try {
                const visitsResponse = await axios.get(`http://localhost:5000/api/health-visits/patient/${patientId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHealthVisits(visitsResponse.data);
            } catch (error) {
                console.log('No health visits found');
            }

            // Fetch pregnancy tracking if applicable
            try {
                const pregnancyResponse = await axios.get(`http://localhost:5000/api/mch/pregnancy/patient/${patientId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPregnancy(pregnancyResponse.data);
            } catch (error) {
                console.log('No pregnancy tracking found');
            }

            // Fetch immunization if applicable
            try {
                const immunizationResponse = await axios.get(`http://localhost:5000/api/mch/immunization/child/${patientId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setImmunization(immunizationResponse.data);
            } catch (error) {
                console.log('No immunization records found');
            }

            // Fetch alerts
            try {
                const alertsResponse = await axios.get(`http://localhost:5000/api/alerts?patientId=${patientId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAlerts(alertsResponse.data);
            } catch (error) {
                console.log('No alerts found');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching patient health data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading your health records...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">My Health Records</h1>
                            <p className="text-sm text-gray-600">Managed by ASHA Worker</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                                ← Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Patient Basic Info */}
                {patientData && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Full Name</p>
                                <p className="font-medium text-gray-900">{patientData.fullName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Age</p>
                                <p className="font-medium text-gray-900">{patientData.age} years</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Gender</p>
                                <p className="font-medium text-gray-900">{patientData.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Contact Number</p>
                                <p className="font-medium text-gray-900">{patientData.contactNumber || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">ABHA ID</p>
                                <p className="font-medium text-gray-900">{patientData.abhaId || 'Not registered'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Risk Level</p>
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${patientData.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                                    patientData.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                    {patientData.riskLevel}
                                </span>
                            </div>
                        </div>
                        {patientData.assignedAshaWorker && (
                            <div className="mt-4 pt-4 border-t">
                                <p className="text-sm text-gray-600">Assigned ASHA Worker</p>
                                <p className="font-medium text-gray-900">{patientData.assignedAshaWorker.name}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Active Alerts */}
                {alerts.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">🔔 Active Alerts</h2>
                        <div className="space-y-3">
                            {alerts.slice(0, 5).map((alert) => (
                                <div
                                    key={alert._id}
                                    className={`p-4 rounded border-l-4 ${alert.priority === 'Critical' ? 'bg-red-50 border-red-500' :
                                        alert.priority === 'High' ? 'bg-orange-50 border-orange-500' :
                                            'bg-yellow-50 border-yellow-500'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{alert.message}</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {new Date(alert.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${alert.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                            alert.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {alert.priority}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Health Visits */}
                {healthVisits.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">🏠 Health Visit History</h2>
                        <div className="space-y-4">
                            {healthVisits.map((visit) => (
                                <div key={visit._id} className="border rounded-lg p-4 hover:bg-gray-50">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="font-semibold text-gray-900">{visit.visitType} Visit</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(visit.visitDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        {visit.followUpRequired && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                Follow-up Required
                                            </span>
                                        )}
                                    </div>

                                    {visit.vitals && (
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                                            {visit.vitals.bloodPressure && (
                                                <div className="bg-gray-50 p-2 rounded">
                                                    <p className="text-xs text-gray-600">BP</p>
                                                    <p className="font-medium text-sm">{visit.vitals.bloodPressure}</p>
                                                </div>
                                            )}
                                            {visit.vitals.weight && (
                                                <div className="bg-gray-50 p-2 rounded">
                                                    <p className="text-xs text-gray-600">Weight</p>
                                                    <p className="font-medium text-sm">{visit.vitals.weight} kg</p>
                                                </div>
                                            )}
                                            {visit.vitals.temperature && (
                                                <div className="bg-gray-50 p-2 rounded">
                                                    <p className="text-xs text-gray-600">Temp</p>
                                                    <p className="font-medium text-sm">{visit.vitals.temperature}°F</p>
                                                </div>
                                            )}
                                            {visit.vitals.hemoglobin && (
                                                <div className="bg-gray-50 p-2 rounded">
                                                    <p className="text-xs text-gray-600">Hemoglobin</p>
                                                    <p className="font-medium text-sm">{visit.vitals.hemoglobin} g/dL</p>
                                                </div>
                                            )}
                                            {visit.vitals.pulse && (
                                                <div className="bg-gray-50 p-2 rounded">
                                                    <p className="text-xs text-gray-600">Pulse</p>
                                                    <p className="font-medium text-sm">{visit.vitals.pulse} bpm</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {visit.symptoms && visit.symptoms.length > 0 && (
                                        <div className="mb-2">
                                            <p className="text-sm text-gray-600 mb-1">Symptoms:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {visit.symptoms.map((symptom, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                                                        {symptom}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {visit.notes && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">Notes:</p>
                                            <p className="text-sm text-gray-900">{visit.notes}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pregnancy Tracking */}
                {pregnancy && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">🤰 Pregnancy Tracking</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-pink-50 p-4 rounded">
                                <p className="text-sm text-gray-600">LMP</p>
                                <p className="font-medium text-gray-900">{new Date(pregnancy.lmp).toLocaleDateString()}</p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded">
                                <p className="text-sm text-gray-600">Expected Delivery Date</p>
                                <p className="font-medium text-gray-900">{new Date(pregnancy.edd).toLocaleDateString()}</p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded">
                                <p className="text-sm text-gray-600">Trimester</p>
                                <p className="font-medium text-gray-900">{pregnancy.currentTrimester}</p>
                            </div>
                        </div>

                        {pregnancy.ancVisits && pregnancy.ancVisits.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-900 mb-2">ANC Visits ({pregnancy.ancVisits.length}/4)</h3>
                                <div className="space-y-2">
                                    {pregnancy.ancVisits.map((visit, idx) => (
                                        <div key={idx} className="bg-blue-50 p-3 rounded">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Visit {visit.visitNumber}</span>
                                                <span className="text-sm text-gray-600">{new Date(visit.date).toLocaleDateString()}</span>
                                            </div>
                                            {visit.weight && <p className="text-sm">Weight: {visit.weight} kg</p>}
                                            {visit.bp && <p className="text-sm">BP: {visit.bp}</p>}
                                            {visit.hemoglobin && <p className="text-sm">Hemoglobin: {visit.hemoglobin} g/dL</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Immunization Records */}
                {immunization && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">💉 Immunization Records</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Date of Birth: {new Date(immunization.dateOfBirth).toLocaleDateString()}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {immunization.vaccines.map((vaccine, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded border ${vaccine.status === 'Completed' ? 'bg-green-50 border-green-200' :
                                        'bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <p className="font-medium text-sm">{vaccine.name}</p>
                                        {vaccine.status === 'Completed' && (
                                            <span className="text-green-600">✓</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {vaccine.status === 'Completed' ?
                                            `Given: ${new Date(vaccine.givenDate).toLocaleDateString()}` :
                                            `Due: ${new Date(vaccine.scheduledDate).toLocaleDateString()}`
                                        }
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Data Message */}
                {!patientData && healthVisits.length === 0 && !pregnancy && !immunization && (
                    <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Health Records Yet</h3>
                        <p className="text-gray-600">
                            Your ASHA worker hasn't recorded any health information yet.
                            Contact your assigned ASHA worker for health checkups.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PatientHealthRecords;
