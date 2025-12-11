import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AshaPregnancyTracking = () => {
    const { user } = useAuth();
    const [pregnancies, setPregnancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddANC, setShowAddANC] = useState(false);
    const [showAddPNC, setShowAddPNC] = useState(false);
    const [selectedPregnancy, setSelectedPregnancy] = useState(null);
    const [ancData, setAncData] = useState({
        visitNumber: 1,
        date: new Date().toISOString().split('T')[0],
        weight: '',
        bp: '',
        hemoglobin: '',
        tetanusToxoid: false,
        ifaTabletsGiven: 0,
        complications: '',
        notes: ''
    });
    const [pncData, setPncData] = useState({
        visitNumber: 1,
        date: new Date().toISOString().split('T')[0],
        motherCondition: '',
        motherWeight: '',
        motherBP: '',
        babyCondition: '',
        babyWeight: '',
        breastfeedingStatus: 'Exclusive',
        complications: '',
        notes: ''
    });

    useEffect(() => {
        fetchPregnancies();
    }, []);

    const fetchPregnancies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/mch/pregnancies', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPregnancies(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pregnancies:', error);
            setLoading(false);
        }
    };

    const handleAddANC = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/mch/pregnancy/${selectedPregnancy._id}/anc`,
                ancData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowAddANC(false);
            setSelectedPregnancy(null);
            setAncData({
                visitNumber: 1,
                date: new Date().toISOString().split('T')[0],
                weight: '',
                bp: '',
                hemoglobin: '',
                tetanusToxoid: false,
                ifaTabletsGiven: 0,
                complications: '',
                notes: ''
            });
            fetchPregnancies();
            alert('ANC visit added successfully!');
        } catch (error) {
            console.error('Error adding ANC visit:', error);
            alert('Error adding ANC visit');
        }
    };

    const handleAddPNC = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/mch/pregnancy/${selectedPregnancy._id}/pnc`,
                pncData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowAddPNC(false);
            setSelectedPregnancy(null);
            setPncData({
                visitNumber: 1,
                date: new Date().toISOString().split('T')[0],
                motherCondition: '',
                motherWeight: '',
                motherBP: '',
                babyCondition: '',
                babyWeight: '',
                breastfeedingStatus: 'Exclusive',
                complications: '',
                notes: ''
            });
            fetchPregnancies();
            alert('PNC visit added successfully!');
        } catch (error) {
            console.error('Error adding PNC visit:', error);
            alert('Error adding PNC visit');
        }
    };

    const getTrimesterLabel = (trimester) => {
        switch (trimester) {
            case 1: return '1st Trimester';
            case 2: return '2nd Trimester';
            case 3: return '3rd Trimester';
            default: return 'Unknown';
        }
    };

    const getRiskColor = (risk) => {
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
                            <h1 className="text-2xl font-bold text-[#1B365D]">Pregnancy Tracking</h1>
                            <p className="text-sm text-gray-600">{pregnancies.length} active pregnancies</p>
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
                {/* Pregnancies List */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading pregnancies...</p>
                    </div>
                ) : pregnancies.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                        <div className="text-6xl mb-4">🤰</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No active pregnancies</h3>
                        <p className="text-gray-600">No pregnant women currently assigned to you.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {pregnancies.map((pregnancy) => (
                            <div
                                key={pregnancy._id}
                                className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${pregnancy.riskLevel === 'High' ? 'border-red-500' :
                                        pregnancy.riskLevel === 'Medium' ? 'border-yellow-500' :
                                            'border-green-500'
                                    }`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                                            {pregnancy.patientId?.fullName}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {pregnancy.patientId?.age} years • {pregnancy.patientId?.contactNumber}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded border ${getRiskColor(pregnancy.riskLevel)}`}>
                                        {pregnancy.riskLevel} Risk
                                    </span>
                                </div>

                                {/* Pregnancy Details */}
                                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded">
                                    <div>
                                        <p className="text-xs text-gray-600">LMP</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Date(pregnancy.lmp).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">EDD</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Date(pregnancy.edd).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Trimester</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {getTrimesterLabel(pregnancy.currentTrimester)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Status</p>
                                        <p className="text-sm font-medium text-gray-900">{pregnancy.status}</p>
                                    </div>
                                </div>

                                {/* Risk Factors */}
                                {pregnancy.riskFactors && pregnancy.riskFactors.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-600 mb-2">Risk Factors:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {pregnancy.riskFactors.map((factor, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                                                    {factor}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* ANC Visits */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-semibold text-gray-900">
                                            ANC Visits ({pregnancy.ancVisits?.length || 0}/4)
                                        </h4>
                                        {pregnancy.status === 'Active' && (
                                            <button
                                                onClick={() => {
                                                    setSelectedPregnancy(pregnancy);
                                                    setAncData({ ...ancData, visitNumber: (pregnancy.ancVisits?.length || 0) + 1 });
                                                    setShowAddANC(true);
                                                }}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                + Add ANC
                                            </button>
                                        )}
                                    </div>
                                    {pregnancy.ancVisits && pregnancy.ancVisits.length > 0 ? (
                                        <div className="space-y-2">
                                            {pregnancy.ancVisits.slice(-3).map((visit, idx) => (
                                                <div key={idx} className="text-xs bg-blue-50 p-2 rounded">
                                                    <div className="flex justify-between">
                                                        <span className="font-medium">Visit {visit.visitNumber}</span>
                                                        <span className="text-gray-600">{new Date(visit.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="text-gray-600 mt-1">
                                                        {visit.weight && `Weight: ${visit.weight}kg`}
                                                        {visit.bp && ` • BP: ${visit.bp}`}
                                                        {visit.hemoglobin && ` • Hb: ${visit.hemoglobin}g/dL`}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-500">No ANC visits recorded</p>
                                    )}
                                </div>

                                {/* PNC Visits */}
                                {pregnancy.status === 'Delivered' && (
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                PNC Visits ({pregnancy.pncVisits?.length || 0}/4)
                                            </h4>
                                            <button
                                                onClick={() => {
                                                    setSelectedPregnancy(pregnancy);
                                                    setPncData({ ...pncData, visitNumber: (pregnancy.pncVisits?.length || 0) + 1 });
                                                    setShowAddPNC(true);
                                                }}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                + Add PNC
                                            </button>
                                        </div>
                                        {pregnancy.pncVisits && pregnancy.pncVisits.length > 0 ? (
                                            <div className="space-y-2">
                                                {pregnancy.pncVisits.slice(-3).map((visit, idx) => (
                                                    <div key={idx} className="text-xs bg-pink-50 p-2 rounded">
                                                        <div className="flex justify-between">
                                                            <span className="font-medium">Visit {visit.visitNumber}</span>
                                                            <span className="text-gray-600">{new Date(visit.date).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="text-gray-600 mt-1">
                                                            {visit.breastfeedingStatus && `BF: ${visit.breastfeedingStatus}`}
                                                            {visit.babyWeight && ` • Baby: ${visit.babyWeight}kg`}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-500">No PNC visits recorded</p>
                                        )}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link
                                        to={`/asha/patients/${pregnancy.patientId?._id}`}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm text-center rounded hover:bg-blue-700"
                                    >
                                        View Patient
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add ANC Modal */}
                {showAddANC && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Add ANC Visit - {selectedPregnancy?.patientId?.fullName}
                            </h2>
                            <form onSubmit={handleAddANC}>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Visit Number</label>
                                        <input
                                            type="number"
                                            required
                                            value={ancData.visitNumber}
                                            onChange={(e) => setAncData({ ...ancData, visitNumber: parseInt(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={ancData.date}
                                            onChange={(e) => setAncData({ ...ancData, date: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={ancData.weight}
                                            onChange={(e) => setAncData({ ...ancData, weight: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                                        <input
                                            type="text"
                                            placeholder="120/80"
                                            value={ancData.bp}
                                            onChange={(e) => setAncData({ ...ancData, bp: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hemoglobin (g/dL)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={ancData.hemoglobin}
                                            onChange={(e) => setAncData({ ...ancData, hemoglobin: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">IFA Tablets Given</label>
                                        <input
                                            type="number"
                                            value={ancData.ifaTabletsGiven}
                                            onChange={(e) => setAncData({ ...ancData, ifaTabletsGiven: parseInt(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={ancData.tetanusToxoid}
                                            onChange={(e) => setAncData({ ...ancData, tetanusToxoid: e.target.checked })}
                                            className="w-4 h-4 text-blue-600 rounded"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Tetanus Toxoid Given</span>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Complications</label>
                                    <textarea
                                        rows={2}
                                        value={ancData.complications}
                                        onChange={(e) => setAncData({ ...ancData, complications: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                    <textarea
                                        rows={2}
                                        value={ancData.notes}
                                        onChange={(e) => setAncData({ ...ancData, notes: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddANC(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Add ANC Visit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add PNC Modal */}
                {showAddPNC && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Add PNC Visit - {selectedPregnancy?.patientId?.fullName}
                            </h2>
                            <form onSubmit={handleAddPNC}>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Visit Number</label>
                                        <input
                                            type="number"
                                            required
                                            value={pncData.visitNumber}
                                            onChange={(e) => setPncData({ ...pncData, visitNumber: parseInt(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={pncData.date}
                                            onChange={(e) => setPncData({ ...pncData, date: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mother Weight (kg)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={pncData.motherWeight}
                                            onChange={(e) => setPncData({ ...pncData, motherWeight: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mother BP</label>
                                        <input
                                            type="text"
                                            placeholder="120/80"
                                            value={pncData.motherBP}
                                            onChange={(e) => setPncData({ ...pncData, motherBP: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Baby Weight (kg)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={pncData.babyWeight}
                                            onChange={(e) => setPncData({ ...pncData, babyWeight: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Breastfeeding Status</label>
                                        <select
                                            value={pncData.breastfeedingStatus}
                                            onChange={(e) => setPncData({ ...pncData, breastfeedingStatus: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Exclusive">Exclusive</option>
                                            <option value="Partial">Partial</option>
                                            <option value="None">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mother Condition</label>
                                    <textarea
                                        rows={2}
                                        value={pncData.motherCondition}
                                        onChange={(e) => setPncData({ ...pncData, motherCondition: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Baby Condition</label>
                                    <textarea
                                        rows={2}
                                        value={pncData.babyCondition}
                                        onChange={(e) => setPncData({ ...pncData, babyCondition: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Complications</label>
                                    <textarea
                                        rows={2}
                                        value={pncData.complications}
                                        onChange={(e) => setPncData({ ...pncData, complications: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                    <textarea
                                        rows={2}
                                        value={pncData.notes}
                                        onChange={(e) => setPncData({ ...pncData, notes: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddPNC(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                                    >
                                        Add PNC Visit
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

export default AshaPregnancyTracking;
