import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'Patient', phone: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    if (success) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h2 className="text-2xl font-bold text-gray-800">Registration Successful</h2>
                    <p className="text-gray-600">Please login with your new credentials.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-[#9c1f6e]">
                <div className="text-center mb-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="h-10 mx-auto mb-2 opacity-80" />
                    <h2 className="text-2xl font-bold text-[#1B365D]">New Registration</h2>
                    <p className="text-sm text-gray-500">Create an account to avail health benefits</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                        <input name="name" type="text" onChange={handleChange} required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9c1f6e] focus:border-transparent outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input name="email" type="email" onChange={handleChange} required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9c1f6e] focus:border-transparent outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input name="phone" type="text" onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9c1f6e] focus:border-transparent outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input name="password" type="password" onChange={handleChange} required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9c1f6e] focus:border-transparent outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Register As</label>
                        <select name="role" onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9c1f6e] focus:border-transparent outline-none bg-white">
                            <option value="Patient">Citizen / Patient</option>
                            <option value="ASHA">ASHA Worker</option>
                            <option value="Doctor">Doctor / Specialist</option>
                            <option value="Admin">Hospital Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#9c1f6e] text-white font-bold rounded hover:bg-[#7a1855] transition shadow-md">
                        Complete Registration
                    </button>
                </form>

                <div className="mt-6 text-center border-t pt-4">
                    <p className="text-gray-600 text-sm mb-2">Already have an account?</p>
                    <Link to="/login" className="text-[#9c1f6e] font-bold hover:underline">
                        Login Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
