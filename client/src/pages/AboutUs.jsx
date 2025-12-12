import { Link } from 'react-router-dom';
import { Users, Heart, Award, Target, Shield, Zap, Globe, TrendingUp } from 'lucide-react';

const AboutUs = () => {
    const stats = [
        { icon: Users, value: '50K+', label: 'ASHA Workers', color: 'from-orange-500 to-orange-600' },
        { icon: Heart, value: '2M+', label: 'Lives Touched', color: 'from-green-500 to-green-600' },
        { icon: Award, value: '1000+', label: 'Health Centers', color: 'from-blue-500 to-blue-600' },
        { icon: TrendingUp, value: '4.8★', label: 'User Rating', color: 'from-purple-500 to-purple-600' }
    ];

    const features = [
        {
            icon: Shield,
            title: 'Secure & Reliable',
            description: 'End-to-end encrypted consultations with HIPAA-compliant data storage',
            color: 'blue'
        },
        {
            icon: Zap,
            title: 'Fast & Efficient',
            description: 'Instant appointment booking and real-time video consultations',
            color: 'orange'
        },
        {
            icon: Globe,
            title: 'Pan-India Coverage',
            description: 'Reaching every corner of India, from metros to remote villages',
            color: 'green'
        },
        {
            icon: Heart,
            title: 'Patient-Centric',
            description: 'Designed with empathy, focusing on patient comfort and care',
            color: 'purple'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-orange-600 via-white to-green-600 text-gray-900 py-20">
                <div className="absolute inset-0 bg-white/80"></div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/atmanirbhar-bharat-logo.png"
                            alt="Atmanirbhar Bharat"
                            className="h-24 w-24 object-contain"
                        />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                            About SwasthyaSetu
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                        Empowering India's Healthcare Through Self-Reliance
                    </p>
                    <div className="mt-6 inline-block bg-gradient-to-r from-orange-100 to-green-100 px-6 py-3 rounded-full border-2 border-orange-300">
                        <p className="text-orange-700 font-bold">🇮🇳 Part of Atmanirbhar Bharat Initiative</p>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-20">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 text-center transform hover:scale-105 transition-transform">
                                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                    <Icon className="text-white" size={28} />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-orange-500">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="text-orange-600" size={32} />
                            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            To provide accessible, affordable, and quality healthcare to all citizens of India through
                            indigenous technology solutions. We strive to create a robust healthcare infrastructure that
                            reaches every corner of the nation, with special focus on rural and underserved communities.
                        </p>
                        <div className="mt-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                            <p className="text-orange-900 font-semibold">
                                "Healthcare is not a privilege, it's a fundamental right for every Indian."
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-green-500">
                        <div className="flex items-center gap-3 mb-4">
                            <Award className="text-green-600" size={32} />
                            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            To create a healthy, self-reliant India where every citizen has access to quality healthcare
                            services, regardless of their geographical location or economic status. We envision a future
                            where technology and traditional healthcare work hand-in-hand.
                        </p>
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <p className="text-green-900 font-semibold">
                                "Building a healthier tomorrow through innovation and inclusivity."
                            </p>
                        </div>
                    </div>
                </div>

                {/* About SwasthyaSetu */}
                <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-10 shadow-xl mb-16 border border-orange-200">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                        What is <span className="text-orange-600">SwasthyaSetu</span>?
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6 text-center max-w-4xl mx-auto">
                        SwasthyaSetu is a comprehensive digital health platform designed to bridge the healthcare gap in India.
                        Built under the Atmanirbhar Bharat initiative, our platform empowers ASHA workers, connects patients
                        with qualified doctors, and provides essential health services through cutting-edge indigenous technology.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                            <div className="text-3xl mb-3">🎥</div>
                            <h3 className="font-bold text-gray-900 mb-2">Remote Consultations</h3>
                            <p className="text-sm text-gray-600">Connect with qualified healthcare professionals from anywhere</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                            <div className="text-3xl mb-3">📋</div>
                            <h3 className="font-bold text-gray-900 mb-2">Digital Health Records</h3>
                            <p className="text-sm text-gray-600">Secure, centralized management of medical history</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                            <div className="text-3xl mb-3">👩‍⚕️</div>
                            <h3 className="font-bold text-gray-900 mb-2">ASHA Empowerment</h3>
                            <p className="text-sm text-gray-600">Digital tools for community health workers</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                            <div className="text-3xl mb-3">🩸</div>
                            <h3 className="font-bold text-gray-900 mb-2">Blood Bank Network</h3>
                            <p className="text-sm text-gray-600">Real-time blood availability information</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                            <div className="text-3xl mb-3">🏥</div>
                            <h3 className="font-bold text-gray-900 mb-2">Government Schemes</h3>
                            <p className="text-sm text-gray-600">Easy access to health programs and benefits</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-pink-500">
                            <div className="text-3xl mb-3">🤰</div>
                            <h3 className="font-bold text-gray-900 mb-2">Maternal Care</h3>
                            <p className="text-sm text-gray-600">Comprehensive mother and child health tracking</p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Why Choose SwasthyaSetu?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const colorMap = {
                                blue: 'from-blue-500 to-blue-600',
                                orange: 'from-orange-500 to-orange-600',
                                green: 'from-green-500 to-green-600',
                                purple: 'from-purple-500 to-purple-600'
                            };
                            return (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[feature.color]} rounded-lg flex items-center justify-center mb-4`}>
                                        <Icon className="text-white" size={24} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-2xl p-12 text-center text-white shadow-2xl">
                    <h2 className="text-4xl font-bold mb-4">Join the Healthcare Revolution</h2>
                    <p className="text-xl mb-8 text-orange-50">Be part of India's self-reliant healthcare ecosystem</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/register" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-lg">
                            Register Now
                        </Link>
                        <Link to="/contact" className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-colors border-2 border-white">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-orange-900 via-gray-900 to-green-900 text-white mt-12 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Atmanirbhar Bharat Banner */}
                    <div className="flex items-center justify-center gap-4 mb-8 pb-6 border-b border-white/20">
                        <img
                            src="/atmanirbhar-bharat-logo.png"
                            alt="Atmanirbhar Bharat"
                            className="h-12 w-12 object-contain"
                        />
                        <div className="text-center">
                            <p className="text-lg font-bold">आत्मनिर्भर भारत</p>
                            <p className="text-sm text-gray-300">Self-Reliant India Healthcare Initiative</p>
                        </div>
                    </div>

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
                        <p className="mt-1">Part of Atmanirbhar Bharat Initiative | Best viewed in Chrome, Firefox, Safari and Edge</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
