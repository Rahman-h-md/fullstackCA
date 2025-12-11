import { useState, useEffect } from 'react';
import api from '../services/api'; // Assuming you have an api service setup
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

const PatientsInfo = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await api.get('/patients');
            setPatients(res.data);
        } catch (error) {
            console.error("Error fetching patients", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPatients = patients.filter(p =>
        p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.abhaId?.includes(searchTerm)
    );

    if (loading) return <div className="p-8 text-center">Loading patient records...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#1B365D] flex items-center gap-2">
                    <span>🏥</span> Patient Records
                </h2>
                <button
                    onClick={() => navigate('/patients/new')} // Assuming creation page exists or will be made
                    className="px-6 py-2 bg-[#9c1f6e] text-white font-bold rounded shadow hover:bg-[#7a1855] transition"
                >
                    + New Patient
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by Name or ABHA ID..."
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9c1f6e] outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map(patient => (
                    <div key={patient._id} className="bg-white rounded-lg shadow-md border-l-4 border-[#F26522] overflow-hidden hover:shadow-lg transition">
                        <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-800">{patient.fullName}</h3>
                            <p className="text-gray-500 text-sm mb-2">Age: {patient.age} | Gender: {patient.gender}</p>
                            <div className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded inline-block mb-4">
                                ABHA: {patient.abhaId || 'N/A'}
                            </div>

                            <div className="flex justify-between items-end mt-4">
                                <button className="text-[#1B365D] text-sm hover:underline">View Medical History</button>
                                <div className="flex flex-col items-center">
                                    {/* Small QR Preview */}
                                    <div className="p-1 bg-white border rounded mb-1">
                                        <QRCode value={patient.qrCodeHash || patient._id} size={48} />
                                    </div>
                                    <span className="text-[10px] text-gray-400">Scan ID</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredPatients.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded border border-dashed">
                        No patients found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientsInfo;
