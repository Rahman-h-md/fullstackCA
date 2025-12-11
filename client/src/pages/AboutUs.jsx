import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
                <h1 className="text-4xl font-bold text-[#1B365D] mb-6">About Us</h1>

                <div className="bg-white border rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-[#1B365D] mb-4">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        The Health & Family Welfare Department is committed to providing accessible, affordable, and quality healthcare
                        to all citizens of India. We strive to create a robust healthcare infrastructure that reaches every corner of
                        the nation, with special focus on rural and underserved communities.
                    </p>
                </div>

                <div className="bg-white border rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-[#1B365D] mb-4">About SwasthyaSetu</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        SwasthyaSetu is a comprehensive digital health platform designed to bridge the healthcare gap in India.
                        Our platform empowers ASHA workers, connects patients with qualified doctors, and provides essential
                        health services through technology.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Through SwasthyaSetu, we enable:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                        <li>Remote consultations with qualified healthcare professionals</li>
                        <li>Digital health records management</li>
                        <li>ASHA worker empowerment and task management</li>
                        <li>Blood bank information and availability</li>
                        <li>Access to government health schemes and programs</li>
                        <li>Maternal and child health tracking</li>
                    </ul>
                </div>

                <div className="bg-white border rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-[#1B365D] mb-4">Our Vision</h2>
                    <p className="text-gray-700 leading-relaxed">
                        To create a healthy India where every citizen has access to quality healthcare services, regardless of
                        their geographical location or economic status. We envision a future where technology and traditional
                        healthcare work hand-in-hand to deliver comprehensive health solutions.
                    </p>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-[#1B365D] mb-4">Key Focus Areas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border-l-4 border-blue-600 bg-blue-50">
                            <h3 className="font-bold text-blue-900 mb-2">Primary Healthcare</h3>
                            <p className="text-sm text-gray-700">Strengthening primary health centers and community health initiatives</p>
                        </div>
                        <div className="p-4 border-l-4 border-green-600 bg-green-50">
                            <h3 className="font-bold text-green-900 mb-2">Maternal & Child Health</h3>
                            <p className="text-sm text-gray-700">Comprehensive care for mothers and children across all stages</p>
                        </div>
                        <div className="p-4 border-l-4 border-purple-600 bg-purple-50">
                            <h3 className="font-bold text-purple-900 mb-2">Disease Prevention</h3>
                            <p className="text-sm text-gray-700">Immunization programs and preventive healthcare measures</p>
                        </div>
                        <div className="p-4 border-l-4 border-orange-600 bg-orange-50">
                            <h3 className="font-bold text-orange-900 mb-2">Digital Health</h3>
                            <p className="text-sm text-gray-700">Leveraging technology for better healthcare delivery and management</p>
                        </div>
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
                                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                                <li><Link to="/health-schemes" className="hover:underline">Health Schemes</Link></li>
                                <li><Link to="/blood-banks" className="hover:underline">Blood Bank</Link></li>
                                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-3">Portals</h3>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li><Link to="/login" className="hover:underline">Citizen Login</Link></li>
                                <li><Link to="/login" className="hover:underline">ASHA Worker Portal</Link></li>
                                <li><Link to="/login" className="hover:underline">Doctor Portal</Link></li>
                                <li><Link to="/register" className="hover:underline">New Registration</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/20 pt-6 text-center text-sm text-gray-300">
                        <p>© 2025 SwasthyaSetu - Health & Family Welfare Department, Government of India</p>
                        <p className="mt-1">Best viewed in Chrome, Firefox, Safari and Edge</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
