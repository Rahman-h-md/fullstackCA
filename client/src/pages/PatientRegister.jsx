import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PatientRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: 'Male',
        address: '',
        contactNumber: '',
        abhaId: '',
        isPregnant: false,
        lmp: '', // Last Menstrual Period for pregnant women
        dateOfBirth: '', // For children (immunization tracking)
        trackImmunization: false
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Use ASHA API endpoint to ensure patient is assigned to ASHA worker
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/asha/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to register patient');

            const data = await response.json();
            const patientId = data._id;
            alert('Patient Registered Successfully!');
            // Redirect to patient details page
            navigate(`/asha/patients/${patientId}`);
        } catch (error) {
            console.error(error);
            alert('Failed to register patient');
        } finally {
            setLoading(false);
        }
    };

    // Show pregnancy fields only for females
    const showPregnancyOption = formData.gender === 'Female' && parseInt(formData.age) >= 15 && parseInt(formData.age) <= 50;

    // Show immunization option for children (0-5 years)
    const showImmunizationOption = parseInt(formData.age) <= 5;

    return (
        <div className="max-w-2xl mx-auto p-4 mt-8 bg-white rounded shadow-lg border-t-4 border-[#9c1f6e]">
            <h2 className="text-2xl font-bold mb-6 text-[#1B365D]">Register New Patient</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Full Name *</label>
                    <input
                        id="patient-name"
                        name="fullName"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Age *</label>
                        <input
                            id="patient-age"
                            name="age"
                            type="number"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Gender *</label>
                        <select
                            id="patient-gender"
                            name="gender"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e] bg-white"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Address</label>
                    <input
                        id="patient-address"
                        name="address"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Contact Number</label>
                    <input
                        id="patient-contact"
                        name="contactNumber"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">ABHA ID (Optional)</label>
                    <input
                        id="patient-abha"
                        name="abhaId"
                        onChange={handleChange}
                        placeholder="XX-XXXX-XXXX-XXXX"
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]"
                    />
                </div>

                {/* Pregnancy Tracking Section */}
                {showPregnancyOption && (
                    <div className="border-t pt-4 mt-4">
                        <h3 className="text-lg font-semibold text-[#1B365D] mb-3">🤰 Pregnancy Tracking</h3>
                        <div className="bg-pink-50 p-4 rounded border border-pink-200">
                            <div className="flex items-center gap-2 mb-3">
                                <input
                                    type="checkbox"
                                    id="isPregnant"
                                    name="isPregnant"
                                    checked={formData.isPregnant}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-pink-600 rounded focus:ring-2 focus:ring-pink-500"
                                />
                                <label htmlFor="isPregnant" className="text-sm font-medium text-gray-900">
                                    This patient is currently pregnant
                                </label>
                            </div>

                            {formData.isPregnant && (
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Last Menstrual Period (LMP) *
                                    </label>
                                    <input
                                        type="date"
                                        name="lmp"
                                        value={formData.lmp}
                                        onChange={handleChange}
                                        required={formData.isPregnant}
                                        max={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-pink-500"
                                    />
                                    <p className="text-xs text-gray-600 mt-1">
                                        This will automatically create a pregnancy tracking record with ANC schedule
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Immunization Tracking Section */}
                {showImmunizationOption && (
                    <div className="border-t pt-4 mt-4">
                        <h3 className="text-lg font-semibold text-[#1B365D] mb-3">💉 Immunization Tracking</h3>
                        <div className="bg-purple-50 p-4 rounded border border-purple-200">
                            <div className="flex items-center gap-2 mb-3">
                                <input
                                    type="checkbox"
                                    id="trackImmunization"
                                    name="trackImmunization"
                                    checked={formData.trackImmunization}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                                />
                                <label htmlFor="trackImmunization" className="text-sm font-medium text-gray-900">
                                    Track immunization for this child
                                </label>
                            </div>

                            {formData.trackImmunization && (
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        required={formData.trackImmunization}
                                        max={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-500"
                                    />
                                    <p className="text-xs text-gray-600 mt-1">
                                        This will automatically create an immunization record with complete vaccine schedule
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <button
                    id="submit-patient"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#9c1f6e] text-white font-bold rounded hover:bg-[#7a1855] transition mt-4"
                >
                    {loading ? 'Registering...' : 'Register Patient & Generate QR'}
                </button>
            </form>
        </div>
    );
};

export default PatientRegister;
