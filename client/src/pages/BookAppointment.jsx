import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        doctorId: '', date: '', timeSlot: '', reason: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await api.get('/appointments/doctors');
                setDoctors(res.data);
            } catch (error) {
                console.error("Error fetching doctors", error);
            }
        };
        fetchDoctors();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/appointments', formData);
            alert('Appointment Booked Successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to book appointment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-6 text-[#1B365D]">Book an Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Select Doctor</label>
                    <select name="doctorId" onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]">
                        <option value="">-- Choose a Doctor --</option>
                        {doctors.map(doc => (
                            <option key={doc._id} value={doc._id}>{doc.name} ({doc.assignedArea || 'General'})</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Date</label>
                    <input type="date" name="date" onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Time Slot</label>
                    <select name="timeSlot" onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]">
                        <option value="">-- Select Time --</option>
                        <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                        <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                        <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                        <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                        <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Reason for Visit</label>
                    <textarea name="reason" onChange={handleChange} required rows="3" className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-[#9c1f6e]"></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 bg-[#9c1f6e] text-white font-bold rounded hover:bg-[#7a1855] transition mt-4">
                    {loading ? 'Booking...' : 'Confirm Appointment'}
                </button>
            </form>
        </div>
    );
};

export default BookAppointment;
