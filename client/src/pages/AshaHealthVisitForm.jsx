import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AshaHealthVisitForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const preselectedPatientId = searchParams.get('patientId');

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        patientId: preselectedPatientId || '',
        visitType: 'General',
        visitDate: new Date().toISOString().split('T')[0],
        vitals: {
            bloodPressure: '',
            weight: '',
            temperature: '',
            hemoglobin: '',
            pulse: ''
        },
        symptoms: [],
        notes: '',
        followUpRequired: false,
        followUpDate: ''
    });
    const [symptomInput, setSymptomInput] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/asha/patients', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handleVitalChange = (field, value) => {
        setFormData({
            ...formData,
            vitals: {
                ...formData.vitals,
                [field]: value
            }
        });
    };

    const addSymptom = () => {
        if (symptomInput.trim()) {
            setFormData({
                ...formData,
                symptoms: [...formData.symptoms, symptomInput.trim()]
            });
            setSymptomInput('');
        }
    };

    const removeSymptom = (index) => {
        setFormData({
            ...formData,
            symptoms: formData.symptoms.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/health-visits',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Health visit logged successfully!');
            navigate('/asha/dashboard');
        } catch (error) {
            console.error('Error logging health visit:', error);
            alert('Error logging health visit. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">Log Health Visit</h1>
                            <p className="text-sm text-gray-600">Record home visit details</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/asha/dashboard" className="text-gray-600 hover:text-gray-900">
                                ← Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                    {/* Patient Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Patient *
                        </label>
                        <select
                            required
                            value={formData.patientId}
                            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Select Patient --</option>
                            {patients.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.fullName} - {patient.age} years - {patient.contactNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Visit Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Visit Type *
                            </label>
                            <select
                                required
                                value={formData.visitType}
                                onChange={(e) => setFormData({ ...formData, visitType: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="General">General</option>
                                <option value="ANC">ANC (Antenatal Care)</option>
                                <option value="PNC">PNC (Postnatal Care)</option>
                                <option value="Immunization">Immunization</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Follow-up">Follow-up</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Visit Date *
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.visitDate}
                                onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Vitals */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vitals</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Blood Pressure (e.g., 120/80)
                                </label>
                                <input
                                    type="text"
                                    placeholder="120/80"
                                    value={formData.vitals.bloodPressure}
                                    onChange={(e) => handleVitalChange('bloodPressure', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="65.5"
                                    value={formData.vitals.weight}
                                    onChange={(e) => handleVitalChange('weight', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Temperature (°F)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="98.6"
                                    value={formData.vitals.temperature}
                                    onChange={(e) => handleVitalChange('temperature', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hemoglobin (g/dL)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="12.5"
                                    value={formData.vitals.hemoglobin}
                                    onChange={(e) => handleVitalChange('hemoglobin', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pulse (bpm)
                                </label>
                                <input
                                    type="number"
                                    placeholder="72"
                                    value={formData.vitals.pulse}
                                    onChange={(e) => handleVitalChange('pulse', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Symptoms */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Symptoms</h3>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                placeholder="Enter symptom"
                                value={symptomInput}
                                onChange={(e) => setSymptomInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSymptom())}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={addSymptom}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                        {formData.symptoms.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.symptoms.map((symptom, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                                    >
                                        {symptom}
                                        <button
                                            type="button"
                                            onClick={() => removeSymptom(index)}
                                            className="text-blue-600 hover:text-blue-800 font-bold"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Observations & Notes
                        </label>
                        <textarea
                            rows={4}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Enter any observations, medications given, advice provided, etc."
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Follow-up */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <input
                                type="checkbox"
                                id="followUpRequired"
                                checked={formData.followUpRequired}
                                onChange={(e) => setFormData({ ...formData, followUpRequired: e.target.checked })}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor="followUpRequired" className="text-sm font-medium text-gray-700">
                                Follow-up Required
                            </label>
                        </div>
                        {formData.followUpRequired && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Follow-up Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.followUpDate}
                                    onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/asha/dashboard')}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {loading ? 'Saving...' : 'Log Visit'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AshaHealthVisitForm;
