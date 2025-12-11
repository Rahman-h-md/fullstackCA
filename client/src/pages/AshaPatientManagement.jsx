import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AshaPatientManagement = () => {
    const { user } = useAuth();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterRisk, setFilterRisk] = useState('');
    const [filterPregnant, setFilterPregnant] = useState('');

    useEffect(() => {
        fetchPatients();
    }, [filterRisk, filterPregnant]);

    const fetchPatients = async () => {
        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (filterRisk) params.append('riskLevel', filterRisk);
            if (filterPregnant) params.append('isPregnant', filterPregnant);

            const response = await axios.get(`http://localhost:5000/api/asha/patients?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPatients(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPatients();
    };

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
                            <h1 className="text-2xl font-bold text-[#1B365D]">My Patients</h1>
                            <p className="text-sm text-gray-600">{patients.length} patients assigned</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/asha/dashboard" className="text-gray-600 hover:text-gray-900">
                                ← Back to Dashboard
                            </Link>
                            <Link to="/patients/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                + Add Patient
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by name, phone, or ABHA ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={filterRisk}
                            onChange={(e) => setFilterRisk(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Risk Levels</option>
                            <option value="High">High Risk</option>
                            <option value="Medium">Medium Risk</option>
                            <option value="Low">Low Risk</option>
                        </select>
                        <select
                            value={filterPregnant}
                            onChange={(e) => setFilterPregnant(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Patients</option>
                            <option value="true">Pregnant Only</option>
                            <option value="false">Non-Pregnant</option>
                        </select>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Patient List */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading patients...</p>
                    </div>
                ) : patients.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No patients found</h3>
                        <p className="text-gray-600 mb-4">Start by adding your first patient</p>
                        <Link to="/patients/new" className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                            + Add Patient
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patients.map((patient) => (
                            <div
                                key={patient._id}
                                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden border-l-4 ${patient.riskLevel === 'High' ? 'border-red-500' :
                                        patient.riskLevel === 'Medium' ? 'border-yellow-500' :
                                            'border-green-500'
                                    }`}
                            >
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {patient.fullName}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {patient.age} years • {patient.gender}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded border ${getRiskBadgeColor(patient.riskLevel)}`}>
                                                {patient.riskLevel} Risk
                                            </span>
                                            {patient.isPregnant && (
                                                <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs font-semibold rounded border border-pink-300">
                                                    Pregnant
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-2 mb-4">
                                        {patient.contactNumber && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <span>📞</span>
                                                <span>{patient.contactNumber}</span>
                                            </div>
                                        )}
                                        {patient.address && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <span>📍</span>
                                                <span className="line-clamp-1">{patient.address}</span>
                                            </div>
                                        )}
                                        {patient.abhaId && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <span>🆔</span>
                                                <span>{patient.abhaId}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Visit Info */}
                                    {patient.lastVisitDate && (
                                        <div className="mb-4 p-3 bg-gray-50 rounded">
                                            <p className="text-xs text-gray-600">Last Visit</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(patient.lastVisitDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}

                                    {/* Chronic Diseases */}
                                    {patient.hasChronicDisease && patient.chronicDiseases?.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-xs text-gray-600 mb-1">Chronic Conditions:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {patient.chronicDiseases.map((disease, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                                                        {disease}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/asha/patients/${patient._id}`}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm text-center rounded hover:bg-blue-700"
                                        >
                                            View Details
                                        </Link>
                                        <Link
                                            to={`/asha/health-visits/new?patientId=${patient._id}`}
                                            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                            title="Log Visit"
                                        >
                                            🏠
                                        </Link>
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

export default AshaPatientManagement;
