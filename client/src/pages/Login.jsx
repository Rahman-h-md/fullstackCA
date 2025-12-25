import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showWelcome, setShowWelcome] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            const res = await login(email, password);

            // Show Welcome Message
            setShowWelcome(true);

            // Delay redirect to show the message and redirect based on role
            setTimeout(() => {
                const userRole = res.data?.user?.role || res.user?.role;

                if (userRole === 'Doctor') {
                    navigate('/doctor-dashboard');
                } else if (userRole === 'ASHA Worker') {
                    navigate('/asha/dashboard');
                } else {
                    navigate('/dashboard');
                }
            }, 1500);

        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
    };

    if (showWelcome) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-2xl text-center animate-bounce-in">
                    <div className="text-5xl mb-4">🙏</div>
                    <h2 className="text-3xl font-bold text-[#9c1f6e] mb-2">Welcome to SwasthyaSetu</h2>
                    <p className="text-gray-600">Redirecting you to the portal...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-[#9c1f6e]">
                <div className="text-center mb-8">
                    <img src="/national-emblem.png" alt="Emblem" className="h-12 mx-auto mb-2 opacity-80" />
                    <h2 className="text-2xl font-bold text-[#1B365D]">Citizen Login</h2>
                    <p className="text-sm text-gray-500">Enter your credentials to access services</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email / User ID</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gov-primary focus:border-transparent outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. citizen@india.gov.in"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gov-primary focus:border-transparent outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#9c1f6e] text-white font-bold rounded hover:bg-[#7a1855] transition shadow-md">
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center border-t pt-4">
                    <p className="text-gray-600 text-sm mb-2">New to the platform?</p>
                    <Link to="/register" className="inline-block px-6 py-2 border border-[#9c1f6e] text-[#9c1f6e] font-semibold rounded hover:bg-purple-50 transition w-full">
                        Register New User
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
