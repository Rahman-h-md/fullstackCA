import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useWebRTC from '../hooks/useWebRTC';
import VideoCallControls from '../components/VideoCallControls';
import { useAuth } from '../context/AuthContext';

const ConsultationRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    // Determine if user is initiator (doctor initiates, patient joins)
    const isDoctor = user?.role === 'Doctor';

    // WebRTC Hook
    const {
        localStream,
        remoteStream,
        isCallActive,
        isConnecting,
        isMuted,
        isVideoOff,
        error: callError,
        startCall,
        endCall,
        toggleMute,
        toggleVideo,
        socketStatus,
        connectionState,
        iceConnectionState
    } = useWebRTC(id, isDoctor); // Doctor is the initiator

    const [prescription, setPrescription] = useState({
        diagnosis: '',
        advice: '',
        testsRecommended: '',
        medicines: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
    });

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                // Try doctor endpoint first
                let res = await api.get('/doctor/appointments');
                let apt = res.data.find(a => a._id === id);

                // If not found, try patient endpoint
                if (!apt) {
                    res = await api.get('/appointments/my');
                    apt = res.data.find(a => a._id === id);
                }

                if (apt) {
                    setAppointment(apt);
                } else {
                    alert('Appointment not found');
                }
            } catch (error) {
                console.error(error);
                // If doctor endpoint fails, try patient endpoint
                try {
                    const res = await api.get('/appointments/my');
                    const apt = res.data.find(a => a._id === id);
                    if (apt) {
                        setAppointment(apt);
                    } else {
                        alert('Appointment not found');
                    }
                } catch (err) {
                    console.error('Error fetching appointment:', err);
                    alert('Failed to load appointment');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchAppointment();
    }, [id]);

    // Auto-start video call for patients (only on Chrome/Edge, not Firefox)
    useEffect(() => {
        // Detect if browser is Firefox
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

        if (!isDoctor && appointment && !isCallActive && !isConnecting && !isFirefox) {
            // Small delay to ensure component is fully mounted
            const timer = setTimeout(() => {
                startCall();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [appointment, isDoctor, isCallActive, isConnecting, startCall]);

    // Update video elements when streams change
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const handlePrescriptionChange = (e) => {
        setPrescription({ ...prescription, [e.target.name]: e.target.value });
    };

    const handleMedicineChange = (index, field, value) => {
        const newMedicines = [...prescription.medicines];
        newMedicines[index][field] = value;
        setPrescription({ ...prescription, medicines: newMedicines });
    };

    const addMedicine = () => {
        setPrescription({
            ...prescription,
            medicines: [...prescription.medicines, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
        });
    };

    const removeMedicine = (index) => {
        const newMedicines = prescription.medicines.filter((_, i) => i !== index);
        setPrescription({ ...prescription, medicines: newMedicines });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                appointmentId: id,
                patientId: appointment.patientId._id,
                diagnosis: prescription.diagnosis,
                advice: prescription.advice,
                testsRecommended: prescription.testsRecommended.split(',').map(t => t.trim()),
                medicines: prescription.medicines
            };
            await api.post('/doctor/prescribe', payload);
            console.log('Consultation Completed & Prescription Sent!');

            // End call if active
            if (isCallActive) {
                endCall();
            }

            navigate('/doctor-dashboard');
        } catch (error) {
            console.error('Prescription Error', error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Consultation Room...</div>;
    if (!appointment) return <div className="p-8 text-center">Appointment not found.</div>;

    return (
        <div className="container mx-auto p-4 min-h-screen bg-gray-50 flex flex-col md:flex-row gap-6">
            {/* Left: Patient Info & Video */}
            <div className="w-full md:w-1/3 space-y-4">
                <div className="bg-white p-4 rounded shadow border-l-4 border-[#1B365D]">
                    <h2 className="text-xl font-bold text-[#1B365D]">Patient Details</h2>
                    <div className="mt-2 text-sm text-gray-700 space-y-1">
                        <p><span className="font-semibold">Name:</span> {appointment.patientId?.name || appointment.patientId?.fullName}</p>
                        <p><span className="font-semibold">Age/Gender:</span> {appointment.patientId?.age} / {appointment.patientId?.gender}</p>
                        <p><span className="font-semibold">Contact:</span> {appointment.patientId?.contactNumber || 'N/A'}</p>
                        <p><span className="font-semibold">Reason:</span> {appointment.reason}</p>
                    </div>
                </div>

                {/* Video Call Section */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6">
                    <div className="text-center mb-4">
                        <div className="text-5xl mb-3">📹</div>
                        <h3 className="text-white text-xl font-bold mb-2">Video Consultation</h3>
                        <p className="text-white/80 text-sm mb-4">WebRTC One-to-One Call</p>
                    </div>

                    {/* Video Streams */}
                    {!isCallActive ? (
                        <div className="space-y-3">
                            <button
                                onClick={startCall}
                                disabled={isConnecting}
                                className="w-full bg-white hover:bg-gray-100 text-blue-700 font-semibold py-3 px-4 rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isConnecting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                                        <span>Connecting...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-2xl">🎥</span>
                                        <span>Start Video Call</span>
                                    </div>
                                )}
                            </button>

                            {callError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                                    {callError}
                                </div>
                            )}

                            <div className="bg-white/10 rounded p-3">
                                <p className="text-white text-xs">
                                    <strong>💡 Instructions:</strong><br />
                                    1. Click "Start Video Call"<br />
                                    2. Allow camera and microphone access<br />
                                    3. Wait for patient to join<br />
                                    4. Use controls to mute/unmute during call
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {/* Remote Video (Patient) */}
                            <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                {remoteStream ? (
                                    <>
                                        <video
                                            ref={remoteVideoRef}
                                            autoPlay
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                            Patient
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white">
                                        <div className="text-center">
                                            <div className="animate-pulse text-4xl mb-2">⏳</div>
                                            <p className="text-sm">Waiting for patient to join...</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Local Video (Doctor) */}
                            <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover mirror"
                                />
                                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    You ({isDoctor ? 'Doctor' : 'Patient'})
                                </div>
                                {isVideoOff && (
                                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <div className="text-4xl mb-2">📷</div>
                                            <p className="text-sm">Camera Off</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Call Controls */}
                            <VideoCallControls
                                isMuted={isMuted}
                                isVideoOff={isVideoOff}
                                onToggleMute={toggleMute}
                                onToggleVideo={toggleVideo}
                                onEndCall={endCall}
                                isCallActive={isCallActive}
                            />

                            {/* Connection Status */}
                            <div className="bg-white/10 rounded p-2 text-center">
                                <div className="flex items-center justify-center gap-2 text-white text-xs">
                                    <div className={`w-2 h-2 rounded-full ${remoteStream ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                                    <span>{remoteStream ? 'Connected' : 'Connecting...'}</span>
                                </div>
                            </div>

                            {/* Debug Panel */}
                            <div className="bg-red-900/50 rounded p-3 text-white text-xs">
                                <div className="font-bold mb-1">Debug Info:</div>
                                <div>Room ID: {id}</div>
                                <div>Socket: {socketStatus}</div>
                                <div>URL: {import.meta.env.VITE_SOCKET_URL || 'Localhost'}</div>
                                <div>ICE State: {iceConnectionState || 'New'}</div>
                                <div>Conn State: {connectionState || 'New'}</div>
                                <div>Local Stream: {localStream ? '✅ Active' : '❌ None'}</div>
                                <div>Remote Stream: {remoteStream ? '✅ Active' : '❌ None'}</div>
                                <div>Call Active: {isCallActive ? 'Yes' : 'No'}</div>
                                <div>Role: {isDoctor ? 'Doctor (Initiator)' : 'Patient (Receiver)'}</div>
                                {callError && <div className="text-red-300 mt-1">Error: {callError}</div>}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Clinical Notes & Prescription (Doctor Only) OR Patient Info */}
            <div className="w-full md:w-2/3 bg-white p-6 rounded shadow">
                {isDoctor ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-[#9c1f6e]">Clinical Notes & Prescription</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Diagnosis / Findings</label>
                                <textarea
                                    name="diagnosis"
                                    value={prescription.diagnosis}
                                    onChange={handlePrescriptionChange}
                                    required
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e] h-24"
                                    placeholder="e.g. Acute Viral Fever"
                                ></textarea>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold">Medicines</label>
                                    <button type="button" onClick={addMedicine} className="text-xs bg-[#1B365D] text-white px-2 py-1 rounded hover:bg-[#142847]">+ Add Med</button>
                                </div>
                                {prescription.medicines.map((med, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2 bg-gray-50 p-2 rounded">
                                        <input placeholder="Name" value={med.name} onChange={(e) => handleMedicineChange(index, 'name', e.target.value)} required className="border p-1 rounded text-sm md:col-span-1" />
                                        <input placeholder="Dosage (500mg)" value={med.dosage} onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)} required className="border p-1 rounded text-sm" />
                                        <input placeholder="Freq (1-0-1)" value={med.frequency} onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)} required className="border p-1 rounded text-sm" />
                                        <input placeholder="Duration (5 days)" value={med.duration} onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)} required className="border p-1 rounded text-sm" />
                                        <div className="flex gap-1 md:col-span-1">
                                            <input placeholder="Instr." value={med.instructions} onChange={(e) => handleMedicineChange(index, 'instructions', e.target.value)} className="border p-1 rounded text-sm w-full" />
                                            {index > 0 && <button type="button" onClick={() => removeMedicine(index)} className="text-red-500 font-bold p-1">×</button>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Recommended Tests (Comma separated)</label>
                                <input
                                    name="testsRecommended"
                                    value={prescription.testsRecommended}
                                    onChange={handlePrescriptionChange}
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]"
                                    placeholder="e.g. CBC, Malaria Parasite"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Advice / Notes</label>
                                <textarea
                                    name="advice"
                                    value={prescription.advice}
                                    onChange={handlePrescriptionChange}
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e] h-20"
                                    placeholder="e.g. Drink plenty of water, rest."
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full py-3 bg-[#9c1f6e] text-white font-bold rounded hover:bg-[#7a1855] transition text-lg shadow-lg">
                                End Consultation & Save
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-[#1B365D]">Consultation Information</h2>
                        <div className="space-y-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-bold text-blue-900 mb-2">📋 Appointment Details</h3>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-semibold">Doctor:</span> {appointment?.doctorId?.name || appointment?.doctorId?.fullName || 'Doctor'}</p>
                                    <p><span className="font-semibold">Date:</span> {new Date(appointment?.date).toLocaleDateString()}</p>
                                    <p><span className="font-semibold">Time:</span> {appointment?.timeSlot}</p>
                                    <p><span className="font-semibold">Reason:</span> {appointment?.reason}</p>
                                </div>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 className="font-bold text-green-900 mb-2">💡 During the Consultation</h3>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li>✓ Explain your symptoms clearly to the doctor</li>
                                    <li>✓ Mention any medications you're currently taking</li>
                                    <li>✓ Ask questions if you don't understand something</li>
                                    <li>✓ The doctor will provide a prescription after the consultation</li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h3 className="font-bold text-yellow-900 mb-2">⚠️ Important Notes</h3>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li>• Keep your camera and microphone on during the call</li>
                                    <li>• Ensure you're in a quiet, well-lit environment</li>
                                    <li>• Your prescription will be available in "My Reports" after the consultation</li>
                                </ul>
                            </div>

                            {isCallActive && (
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                    <h3 className="font-bold text-purple-900 mb-2">🎥 Call Active</h3>
                                    <p className="text-sm text-gray-700">You are currently in a video consultation with your doctor. Use the controls below the video to mute/unmute or turn your camera on/off.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <style>{`
                .mirror {
                    transform: scaleX(-1);
                }
            `}</style>
        </div>
    );
};

export default ConsultationRoom;
