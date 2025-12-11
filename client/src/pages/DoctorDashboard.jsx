import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('appointments');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get('/doctor/appointments');
            setAppointments(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/doctor/appointments/${id}/status`, { status });
            fetchAppointments();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    // Patient History Logic
    const [viewingPatient, setViewingPatient] = useState(null);
    const [patientHistory, setPatientHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const handleViewPatient = async (patient) => {
        setViewingPatient(patient);
        setHistoryLoading(true);
        try {
            const res = await api.get(`/doctor/patient/${patient._id}/history`);
            setPatientHistory(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setHistoryLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4 bg-white p-4 rounded shadow md:h-screen sticky top-4">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center text-2xl">👨‍⚕️</div>
                    <h2 className="font-bold text-lg text-[#1B365D]">Dr. Dashboard</h2>
                    <p className="text-sm text-gray-500">General Physician</p>
                </div>

                <nav className="flex flex-col space-y-2">
                    <button
                        onClick={() => setActiveTab('appointments')}
                        className={`p-3 rounded text-left ${activeTab === 'appointments' ? 'bg-[#9c1f6e] text-white shadow' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                        📅 Appointments
                    </button>
                    <button
                        onClick={() => setActiveTab('patients')}
                        className={`p-3 rounded text-left ${activeTab === 'patients' ? 'bg-[#9c1f6e] text-white shadow' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                        👥 My Patients
                    </button>
                    <button
                        onClick={() => window.location.href = '/blood-banks'}
                        className="p-3 rounded text-left hover:bg-gray-100 text-gray-700"
                    >
                        🩸 Blood Bank
                    </button>
                    <button
                        onClick={() => window.location.href = '/patients'}
                        className="p-3 rounded text-left hover:bg-gray-100 text-gray-700"
                    >
                        📋 Patient Records
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="w-full md:w-3/4 bg-white p-6 rounded shadow min-h-screen">
                {activeTab === 'appointments' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#1B365D]">Upcoming Appointments</h2>
                        {loading ? <p>Loading...</p> : (
                            <div className="space-y-4">
                                {appointments.length === 0 && <p className="text-gray-500">No appointments scheduled.</p>}
                                {appointments.map(apt => (
                                    <div key={apt._id} className="border p-4 rounded hover:shadow-md flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-lg">{apt.patientId?.name || "Unknown Patient"}</p>
                                            <p className="text-sm text-gray-600">📅 {new Date(apt.date).toLocaleDateString()} at {apt.timeSlot}</p>
                                            <p className="text-sm italic text-gray-500">Reason: {apt.reason}</p>
                                            <span className={`inline-block px-2 py-1 text-xs rounded mt-2 
                                                ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                    apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {apt.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            {apt.status === 'Pending' && (
                                                <>
                                                    <button onClick={() => handleStatusUpdate(apt._id, 'Confirmed')} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Accept</button>
                                                    <button onClick={() => handleStatusUpdate(apt._id, 'Cancelled')} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Reject</button>
                                                </>
                                            )}
                                            {apt.status === 'Confirmed' && (
                                                <button onClick={() => navigate(`/consultation/${apt._id}`)} className="bg-[#1B365D] text-white px-3 py-1 rounded text-sm hover:bg-[#142847]">Start Consult</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'patients' && (
                    <div>
                        {!viewingPatient ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4 text-[#1B365D]">My Patients</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Derive unique patients from appointments */}
                                    {[...new Map(appointments.map(item => [item.patientId?._id, item.patientId])).values()]
                                        .filter(p => p) // Filter out nulls
                                        .map(patient => (
                                            <div key={patient._id} className="border p-4 rounded hover:shadow-md bg-gray-50 cursor-pointer" onClick={() => handleViewPatient(patient)}>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-[#1B365D] text-white rounded-full flex items-center justify-center font-bold text-xl">
                                                        {patient.name?.charAt(0) || patient.fullName?.charAt(0) || 'P'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-lg">{patient.name || patient.fullName}</p>
                                                        <p className="text-sm text-gray-600">{patient.age} Y / {patient.gender}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    {appointments.length === 0 && <p className="text-gray-500">No patients found associated with your appointments.</p>}
                                </div>
                            </>
                        ) : (
                            <div>
                                <button onClick={() => setViewingPatient(null)} className="mb-4 text-[#9c1f6e] hover:underline">← Back to Patients</button>
                                <div className="bg-white p-6 rounded shadow border-t-4 border-[#1B365D] mb-6">
                                    <h2 className="text-2xl font-bold text-[#1B365D]">{viewingPatient.name || viewingPatient.fullName}</h2>
                                    <div className="flex gap-6 mt-2 text-sm text-gray-600">
                                        <p><strong>Age:</strong> {viewingPatient.age}</p>
                                        <p><strong>Gender:</strong> {viewingPatient.gender}</p>
                                        <p><strong>Contact:</strong> {viewingPatient.contactNumber}</p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-800">Medical History & Prescriptions</h3>
                                {historyLoading ? <p>Loading history...</p> : (
                                    <div className="space-y-4">
                                        {patientHistory.length === 0 && <p className="text-gray-500">No medical history found for this patient.</p>}
                                        {patientHistory.map(record => (
                                            <div key={record._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="font-bold text-[#1B365D]">{new Date(record.createdAt).toLocaleDateString()}</p>
                                                        <p className="text-sm text-gray-800 font-semibold">Prescribed by: {record.doctorId?.name || 'Unknown Doctor'}</p>
                                                        <p className="text-sm text-gray-500">Diagnosis: <span className="text-gray-900 font-medium">{record.diagnosis}</span></p>
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <p className="text-sm font-semibold text-gray-700">Medicines:</p>
                                                    <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                                                        {record.medicines.map((med, idx) => (
                                                            <li key={idx}>{med.name} - {med.dosage} ({med.frequency}) for {med.duration}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {record.testsRecommended && record.testsRecommended.length > 0 && (
                                                    <div className="mt-2">
                                                        <p className="text-sm font-semibold text-gray-700">Tests:</p>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {record.testsRecommended.map((test, idx) => (
                                                                <span key={idx} className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs border border-purple-200">
                                                                    {test}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {record.advice && (
                                                    <div className="mt-2 bg-yellow-50 p-2 rounded text-sm text-gray-700">
                                                        <strong>Advice:</strong> {record.advice}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'prescriptions' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#1B365D]">Create Prescription</h2>
                        <p className="text-gray-600">Select an appointment to prescribe.</p>
                    </div>
                )}

                {activeTab === 'consultation' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#1B365D]">Tele-Consultation</h2>
                        <div className="aspect-video bg-gray-900 rounded flex items-center justify-center text-white">
                            <p>Video Feed Placeholder</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DoctorDashboard;
