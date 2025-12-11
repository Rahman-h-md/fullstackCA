import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="flex flex-col w-full">
            {/* Top Bar - Logos & Title */}
            <div className="bg-white py-4 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center border-b-2 border-orange-500">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="National Emblem" className="h-16" />
                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Ministry of Health and Family Welfare</h1>
                        <p className="text-sm font-semibold text-gray-600">Government of India</p>
                    </div>
                </div>

                {/* Right side logos - SwasthyaSetu Generated Logo */}
                <div className="flex gap-4">
                    <img src="/logo.png" alt="SwasthyaSetu Logo" className="h-16 object-contain" />
                </div>
            </div>

            {/* Navigation Bar - Magenta */}
            <nav className="bg-[#9c1f6e] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <ul className="flex flex-wrap justify-center md:justify-start">
                        <li>
                            <Link to="/" className="block px-6 py-3 hover:bg-black/20 font-medium border-r border-white/20">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="block px-6 py-3 hover:bg-black/20 font-medium border-r border-white/20">About Us</Link>
                        </li>
                        <li>
                            <Link to="/services" className="block px-6 py-3 hover:bg-black/20 font-medium border-r border-white/20">Services</Link>
                        </li>
                        <li>
                            <Link to="/schemes" className="block px-6 py-3 hover:bg-black/20 font-medium border-r border-white/20">Schemes</Link>
                        </li>

                        {user ? (
                            <>
                                <li>
                                    <Link to="/dashboard" className="block px-6 py-3 hover:bg-black/20 font-medium border-r border-white/20">Dashboard</Link>
                                </li>
                                <li className="ml-auto">
                                    <button onClick={logout} className="block px-6 py-3 hover:bg-red-700 font-medium">Logout ({user.name})</button>
                                </li>
                            </>
                        ) : (
                            <li className="ml-auto">
                                <Link to="/login" className="block px-6 py-3 hover:bg-black/20 font-medium flex items-center gap-2">
                                    <span>Login</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Marquee / Ticker */}
            <div className="bg-yellow-100 text-[#9c1f6e] py-1 px-4 text-sm font-semibold border-b border-gray-200">
                <marquee behavior="scroll" direction="left">
                    Welcome to SwasthyaSetu - Bridging the gap in rural healthcare. Pulse Polio Immunization drive on 10th Dec.
                </marquee>
            </div>
        </header>
    );
};

export default Header;
