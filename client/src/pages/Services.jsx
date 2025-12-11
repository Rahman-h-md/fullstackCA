import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#9c1f6e] to-purple-700 text-white py-12 pt-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl">🏥</div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
                            <p className="text-xl mt-2 text-purple-100">Quick access to essential healthcare services</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Quick Access Services</h2>
                    <p className="text-lg text-gray-600">Access essential healthcare services with just a click</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Blood Bank */}
                    <Link to="/blood-banks" className="group relative p-8 bg-white border-2 border-red-100 rounded-2xl hover:border-red-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🩸</div>
                            <h3 className="font-bold text-gray-900 text-2xl mb-2">Blood Bank</h3>
                            <p className="text-gray-600 mb-4">Find blood availability near you</p>
                            <div className="text-red-600 font-semibold flex items-center gap-2">
                                Access Now →
                            </div>
                        </div>
                    </Link>

                    {/* Health Programs */}
                    <Link to="/schemes" className="group relative p-8 bg-white border-2 border-green-100 rounded-2xl hover:border-green-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🏥</div>
                            <h3 className="font-bold text-gray-900 text-2xl mb-2">Health Schemes</h3>
                            <p className="text-gray-600 mb-4">Explore government health schemes</p>
                            <div className="text-green-600 font-semibold flex items-center gap-2">
                                Explore Schemes →
                            </div>
                        </div>
                    </Link>

                    {/* ASHA Portal */}
                    <Link to="/login" className="group relative p-8 bg-white border-2 border-purple-100 rounded-2xl hover:border-purple-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📋</div>
                            <h3 className="font-bold text-gray-900 text-2xl mb-2">ASHA Portal</h3>
                            <p className="text-gray-600 mb-4">Health worker access and management</p>
                            <div className="text-purple-600 font-semibold flex items-center gap-2">
                                Login →
                            </div>
                        </div>
                    </Link>

                    {/* Doctor Portal */}
                    <Link to="/login" className="group relative p-8 bg-white border-2 border-blue-100 rounded-2xl hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">👨‍⚕️</div>
                            <h3 className="font-bold text-gray-900 text-2xl mb-2">Doctor Portal</h3>
                            <p className="text-gray-600 mb-4">Medical professional login and consultation</p>
                            <div className="text-blue-600 font-semibold flex items-center gap-2">
                                Login →
                            </div>
                        </div>
                    </Link>

                    {/* Patient Portal */}
                    <Link to="/login" className="group relative p-8 bg-white border-2 border-teal-100 rounded-2xl hover:border-teal-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🧑‍⚕️</div>
                            <h3 className="font-bold text-gray-900 text-2xl mb-2">Patient Portal</h3>
                            <p className="text-gray-600 mb-4">Book appointments and view reports</p>
                            <div className="text-teal-600 font-semibold flex items-center gap-2">
                                Access Portal →
                            </div>
                        </div>
                    </Link>

                    {/* Health Records */}
                    <Link to="/login" className="group relative p-8 bg-white border-2 border-orange-100 rounded-2xl hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📄</div>
                            <h3 className="font-bold text-gray-900 text-2xl mb-2">Health Records</h3>
                            <p className="text-gray-600 mb-4">Access your digital health records</p>
                            <div className="text-orange-600 font-semibold flex items-center gap-2">
                                View Records →
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Additional Information */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Choose a Service</h3>
                                <p className="text-gray-600 text-sm">Select the service you need from the options above</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Login or Register</h3>
                                <p className="text-gray-600 text-sm">Create an account or login to access the service</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Get Started</h3>
                                <p className="text-gray-600 text-sm">Start using the service immediately after login</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 bg-gradient-to-r from-[#9c1f6e] to-purple-700 text-white rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-3">Need Assistance?</h2>
                    <p className="text-purple-100 mb-6">Our support team is here to help you navigate our services</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact" className="bg-white text-[#9c1f6e] px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                            Contact Support
                        </Link>
                        <Link to="/about" className="bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-white/30">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#1B365D] text-white mt-12 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                        <div>
                            <h3 className="font-bold mb-3">Contact Us</h3>
                            <p className="text-sm text-gray-300">
                                Health & Family Welfare Department<br />
                                Government of India<br />
                                Email: support@swasthyasetu.gov.in<br />
                                Helpline: 1800-XXX-XXXX
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-3">Quick Links</h3>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li><Link to="/" className="hover:underline">Home</Link></li>
                                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                                <li><Link to="/schemes" className="hover:underline">Health Schemes</Link></li>
                                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-3">Services</h3>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li><Link to="/blood-banks" className="hover:underline">Blood Bank</Link></li>
                                <li><Link to="/login" className="hover:underline">ASHA Portal</Link></li>
                                <li><Link to="/login" className="hover:underline">Doctor Portal</Link></li>
                                <li><Link to="/login" className="hover:underline">Patient Portal</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/20 pt-6 text-center text-sm text-gray-300">
                        <p>© 2025 SwasthyaSetu - Health & Family Welfare Department, Government of India</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Services;
