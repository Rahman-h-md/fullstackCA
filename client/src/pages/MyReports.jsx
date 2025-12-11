import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MyReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                // Fetching appointments which essentially act as interaction reports
                const res = await api.get('/appointments/my');
                setReports(res.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    if (loading) return <div className="p-8 text-center text-lg">Loading Reports...</div>;

    return (
        <div className="container mx-auto p-4 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold text-[#1B365D] mb-6 border-b pb-2">My Health Reports</h2>

            {reports.length === 0 && (
                <div className="text-center p-8 bg-white rounded shadow">
                    <p className="text-gray-500 text-lg">No health records found.</p>
                    <p className="text-sm text-gray-400 mt-2">Book an appointment to consult a doctor.</p>
                </div>
            )}

            <div className="grid gap-6">
                {reports.map((record) => (
                    <div key={record._id} className="bg-white p-6 rounded shadow hover:shadow-md border-l-4 border-[#1B365D] transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {record.doctorName || (record.doctorId && (record.doctorId.name || record.doctorId.fullName)) || 'Doctor'}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {new Date(record.date).toLocaleDateString()} at {record.timeSlot}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded text-sm font-bold 
                                ${record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    record.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {record.status}
                            </span>
                        </div>

                        <div className="mt-4 border-t pt-4">
                            <p className="text-gray-700"><strong>Reason for Visit:</strong> {record.reason}</p>

                            {/* Join Video Call Button for Confirmed Appointments */}
                            {record.status === 'Confirmed' && (
                                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-blue-900 mb-1">📹 Video Consultation Ready</h4>
                                            <p className="text-sm text-blue-700">Your doctor is waiting. Click to join the video call.</p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/consultation/${record._id}`)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md flex items-center gap-2"
                                        >
                                            <span className="text-xl">🎥</span>
                                            <span>Join Video Call</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {record.status === 'Completed' && record.prescription ? (
                                <div className="mt-4 bg-green-50 p-4 rounded border border-green-200">
                                    <h4 className="font-bold text-green-900 mb-2">📋 Medical Prescription</h4>

                                    <p className="text-gray-800 mb-2"><span className="font-semibold">Diagnosis:</span> {record.prescription.diagnosis}</p>

                                    <div className="mb-2">
                                        <p className="font-semibold text-sm text-gray-700">Medicines:</p>
                                        <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                            {record.prescription.medicines.map((med, idx) => (
                                                <li key={idx}>
                                                    <span className="font-medium">{med.name}</span> - {med.dosage} ({med.frequency}) for {med.duration}
                                                    {med.instructions && <span className="italic text-gray-500"> ({med.instructions})</span>}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {record.prescription.testsRecommended && record.prescription.testsRecommended.length > 0 && (
                                        <div className="mb-2">
                                            <p className="font-semibold text-sm text-gray-700">Recommended Tests:</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {record.prescription.testsRecommended.map((test, idx) => (
                                                    <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200">
                                                        {test}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {record.prescription.advice && (
                                        <p className="text-sm text-gray-700 mt-2 bg-white p-2 rounded">
                                            <strong>Advice:</strong> {record.prescription.advice}
                                        </p>
                                    )}
                                </div>
                            ) : record.status === 'Completed' ? (
                                <div className="mt-2 text-sm text-gray-500">
                                    <p>Visit completed. Prescription pending processing.</p>
                                </div>
                            ) : record.status === 'Pending' ? (
                                <p className="text-sm text-gray-400 mt-2 italic">Waiting for doctor confirmation.</p>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReports;
