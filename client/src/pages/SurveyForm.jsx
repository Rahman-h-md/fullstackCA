import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveSurveyOffline } from '../services/dexieDB';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const SurveyForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        gender: 'Male',
        bloodPressure: '',
        temperature: '',
        weight: '',
        symptoms: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ type: '', text: '' });

        const surveyPayload = {
            ...formData,
            ashaId: user._id, // Assuming user is ASHA
            timestamp: new Date()
        };

        try {
            if (navigator.onLine) {
                await api.post('/surveys', surveyPayload);
                setMsg({ type: 'success', text: 'Survey uploaded successfully!' });
            } else {
                throw new Error('Offline');
            }
        } catch (err) {
            console.log('Network failed, saving offline...', err);
            try {
                await saveSurveyOffline(surveyPayload);
                setMsg({ type: 'warning', text: 'Offline: Survey saved locally. Will sync when online.' });
            } catch (dbErr) {
                setMsg({ type: 'error', text: 'Failed to save survey.' });
            }
        } finally {
            setLoading(false);
            // Optional: navigate back or clear form
            if (msg.type !== 'error') {
                setTimeout(() => navigate('/dashboard'), 2000);
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 mt-8">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-primary">New Health Survey</h2>

                {msg.text && (
                    <div className={`p-3 mb-4 rounded ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {msg.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Patient Name</label>
                            <input name="patientName" onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Age</label>
                            <input name="age" type="number" onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">BP (sys/dia)</label>
                            <input name="bloodPressure" placeholder="120/80" onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Temperature (°F)</label>
                            <input name="temperature" type="number" step="0.1" onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Symptoms</label>
                        <textarea name="symptoms" onChange={handleChange} className="w-full border p-2 rounded" rows="3"></textarea>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2 rounded hover:bg-teal-700 disabled:opacity-50">
                        {loading ? 'Submitting...' : 'Submit Survey'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SurveyForm;
