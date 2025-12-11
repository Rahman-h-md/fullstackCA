import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AshaImmunizations = () => {
    const { user } = useAuth();
    const [immunizations, setImmunizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRecordVaccine, setShowRecordVaccine] = useState(false);
    const [selectedImmunization, setSelectedImmunization] = useState(null);
    const [selectedVaccine, setSelectedVaccine] = useState(null);
    const [vaccineData, setVaccineData] = useState({
        givenDate: new Date().toISOString().split('T')[0],
        batchNumber: '',
        administeredBy: user?.name || '',
        administeredAt: '',
        adverseReaction: '',
        notes: ''
    });

    useEffect(() => {
        fetchImmunizations();
    }, []);

    const fetchImmunizations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/mch/immunizations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setImmunizations(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching immunizations:', error);
            setLoading(false);
        }
    };

    const handleRecordVaccine = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/mch/immunization/${selectedImmunization._id}/vaccine`,
                {
                    vaccineName: selectedVaccine.name,
                    ...vaccineData
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowRecordVaccine(false);
            setSelectedImmunization(null);
            setSelectedVaccine(null);
            setVaccineData({
                givenDate: new Date().toISOString().split('T')[0],
                batchNumber: '',
                administeredBy: user?.name || '',
                administeredAt: '',
                adverseReaction: '',
                notes: ''
            });
            fetchImmunizations();
            alert('Vaccine recorded successfully!');
        } catch (error) {
            console.error('Error recording vaccine:', error);
            alert('Error recording vaccine');
        }
    };

    const getVaccineStatus = (vaccine) => {
        const today = new Date();
        const scheduledDate = new Date(vaccine.scheduledDate);

        if (vaccine.status === 'Completed') return { label: 'Completed', color: 'bg-green-100 text-green-800' };
        if (vaccine.status === 'Overdue') return { label: 'Overdue', color: 'bg-red-100 text-red-800' };
        if (scheduledDate < today) return { label: 'Overdue', color: 'bg-red-100 text-red-800' };

        const daysUntil = Math.ceil((scheduledDate - today) / (1000 * 60 * 60 * 24));
        if (daysUntil <= 7) return { label: `Due in ${daysUntil} days`, color: 'bg-yellow-100 text-yellow-800' };

        return { label: 'Scheduled', color: 'bg-blue-100 text-blue-800' };
    };

    const getDueVaccines = (immunization) => {
        const today = new Date();
        return immunization.vaccines.filter(v => {
            const scheduledDate = new Date(v.scheduledDate);
            const daysUntil = Math.ceil((scheduledDate - today) / (1000 * 60 * 60 * 24));
            return v.status !== 'Completed' && daysUntil <= 30;
        });
    };

    const getOverdueVaccines = (immunization) => {
        const today = new Date();
        return immunization.vaccines.filter(v => {
            const scheduledDate = new Date(v.scheduledDate);
            return v.status !== 'Completed' && scheduledDate < today;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">Immunization Management</h1>
                            <p className="text-sm text-gray-600">{immunizations.length} children tracked</p>
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
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Children</p>
                                <p className="text-3xl font-bold text-gray-900">{immunizations.length}</p>
                            </div>
                            <div className="text-4xl">👶</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Due This Month</p>
                                <p className="text-3xl font-bold text-yellow-600">
                                    {immunizations.reduce((sum, imm) => sum + getDueVaccines(imm).length, 0)}
                                </p>
                            </div>
                            <div className="text-4xl">📅</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Overdue</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {immunizations.reduce((sum, imm) => sum + getOverdueVaccines(imm).length, 0)}
                                </p>
                            </div>
                            <div className="text-4xl">⚠️</div>
                        </div>
                    </div>
                </div>

                {/* Immunizations List */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading immunization records...</p>
                    </div>
                ) : immunizations.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                        <div className="text-6xl mb-4">💉</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No immunization records</h3>
                        <p className="text-gray-600">No children with immunization tracking.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {immunizations.map((immunization) => {
                            const dueVaccines = getDueVaccines(immunization);
                            const overdueVaccines = getOverdueVaccines(immunization);

                            return (
                                <div key={immunization._id} className="bg-white rounded-lg shadow-sm p-6">
                                    {/* Child Header */}
                                    <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {immunization.childId?.fullName}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                DOB: {new Date(immunization.dateOfBirth).toLocaleDateString()} •
                                                Age: {immunization.childId?.age} months •
                                                {immunization.childId?.gender}
                                            </p>
                                        </div>
                                        <Link
                                            to={`/asha/patients/${immunization.childId?._id}`}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                        >
                                            View Child
                                        </Link>
                                    </div>

                                    {/* Overdue Vaccines Alert */}
                                    {overdueVaccines.length > 0 && (
                                        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-red-600 font-semibold">⚠️ {overdueVaccines.length} Overdue Vaccine(s)</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {overdueVaccines.map((vaccine, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => {
                                                            setSelectedImmunization(immunization);
                                                            setSelectedVaccine(vaccine);
                                                            setShowRecordVaccine(true);
                                                        }}
                                                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                                    >
                                                        {vaccine.name} - Record Now
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Due Vaccines */}
                                    {dueVaccines.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                                Due Soon ({dueVaccines.length})
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {dueVaccines.map((vaccine, idx) => {
                                                    const status = getVaccineStatus(vaccine);
                                                    return (
                                                        <div key={idx} className="flex items-center justify-between p-3 bg-yellow-50 rounded border border-yellow-200">
                                                            <div className="flex-1">
                                                                <p className="font-medium text-gray-900">{vaccine.name}</p>
                                                                <p className="text-xs text-gray-600">
                                                                    Due: {new Date(vaccine.scheduledDate).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedImmunization(immunization);
                                                                    setSelectedVaccine(vaccine);
                                                                    setShowRecordVaccine(true);
                                                                }}
                                                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                                            >
                                                                Record
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* All Vaccines */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                            Vaccination Schedule ({immunization.vaccines.filter(v => v.status === 'Completed').length}/{immunization.vaccines.length} Completed)
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                            {immunization.vaccines.map((vaccine, idx) => {
                                                const status = getVaccineStatus(vaccine);
                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`p-3 rounded border ${vaccine.status === 'Completed' ? 'bg-green-50 border-green-200' :
                                                                status.color.includes('red') ? 'bg-red-50 border-red-200' :
                                                                    status.color.includes('yellow') ? 'bg-yellow-50 border-yellow-200' :
                                                                        'bg-gray-50 border-gray-200'
                                                            }`}
                                                    >
                                                        <div className="flex items-start justify-between mb-1">
                                                            <p className="font-medium text-sm text-gray-900">{vaccine.name}</p>
                                                            <span className={`px-2 py-0.5 text-xs rounded ${status.color}`}>
                                                                {vaccine.status === 'Completed' ? '✓' : status.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-600">
                                                            {vaccine.status === 'Completed' ?
                                                                `Given: ${new Date(vaccine.givenDate).toLocaleDateString()}` :
                                                                `Due: ${new Date(vaccine.scheduledDate).toLocaleDateString()}`
                                                            }
                                                        </p>
                                                        {vaccine.status !== 'Completed' && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedImmunization(immunization);
                                                                    setSelectedVaccine(vaccine);
                                                                    setShowRecordVaccine(true);
                                                                }}
                                                                className="mt-2 text-xs text-blue-600 hover:underline"
                                                            >
                                                                Record vaccination
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Record Vaccine Modal */}
                {showRecordVaccine && selectedVaccine && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Record {selectedVaccine.name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Child: {selectedImmunization?.childId?.fullName}
                            </p>
                            <form onSubmit={handleRecordVaccine}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date Given *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={vaccineData.givenDate}
                                            onChange={(e) => setVaccineData({ ...vaccineData, givenDate: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Batch Number
                                        </label>
                                        <input
                                            type="text"
                                            value={vaccineData.batchNumber}
                                            onChange={(e) => setVaccineData({ ...vaccineData, batchNumber: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Administered By
                                        </label>
                                        <input
                                            type="text"
                                            value={vaccineData.administeredBy}
                                            onChange={(e) => setVaccineData({ ...vaccineData, administeredBy: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Location/Facility
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., PHC, Anganwadi"
                                            value={vaccineData.administeredAt}
                                            onChange={(e) => setVaccineData({ ...vaccineData, administeredAt: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Adverse Reaction (if any)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={vaccineData.adverseReaction}
                                            onChange={(e) => setVaccineData({ ...vaccineData, adverseReaction: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={vaccineData.notes}
                                            onChange={(e) => setVaccineData({ ...vaccineData, notes: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowRecordVaccine(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Record Vaccine
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AshaImmunizations;
