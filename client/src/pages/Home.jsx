import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Activity, Users, Building2, Heart, Search, TrendingUp, X, CheckCircle, Sparkles, Rocket } from 'lucide-react';

const Home = () => {
    const { user } = useAuth();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentUpdate, setCurrentUpdate] = useState(0);

    const slides = [
        {
            image: '/uploaded_image_0_1765446839535.png',
            title: 'Maternal Health Care',
            description: 'Comprehensive care for mothers and children'
        },
        {
            image: '/uploaded_image_1_1765446839535.png',
            title: 'ASHA Worker Program',
            description: 'Empowering community health workers'
        },
        {
            image: '/uploaded_image_2_1765446839535.png',
            title: 'Community Health Initiatives',
            description: 'Building healthier communities together'
        },
        {
            image: '/uploaded_image_3_1765446839535.png',
            title: 'Health Education & Awareness',
            description: 'Promoting health literacy and awareness'
        },
        {
            image: '/uploaded_image_4_1765446839535.png',
            title: 'Healthcare Outreach',
            description: 'Reaching every corner with quality healthcare'
        }
    ];

    const updates = [
        "🦠 COVID-19 Booster Dose available for 60+ citizens - Visit nearest health center",
        "🤰 Free Antenatal Care for pregnant women under Pradhan Mantri Surakshit Matritva Abhiyan",
        "🩺 National Deworming Day on 10th February - Protect children from worm infections",
        "🏥 Ayushman Bharat scheme covers 50 crore beneficiaries - Check your eligibility today",
        "💊 Free medicines available at Jan Aushadhi Kendras - Save up to 90% on healthcare costs"
    ];

    const stats = [
        { icon: Activity, value: '2M+', label: 'Consultations', color: 'from-blue-500 to-cyan-500' },
        { icon: Users, value: '50K+', label: 'ASHA Workers', color: 'from-teal-500 to-green-500' },
        { icon: Building2, value: '1000+', label: 'Health Centers', color: 'from-purple-500 to-pink-500' },
        { icon: Heart, value: '4.8★', label: 'Satisfaction', color: 'from-orange-500 to-red-500' }
    ];

    // Auto-advance slides every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

    // Auto-advance updates every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentUpdate((prev) => (prev + 1) % updates.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [updates.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
            {/* Auto-Advancing News Updates */}
            <div className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-3 overflow-hidden">
                <div className="flex items-center justify-center gap-3 px-4">
                    <span className="bg-white text-orange-600 px-3 py-1 rounded font-bold text-sm flex-shrink-0">
                        📢 LATEST UPDATES
                    </span>
                    <div className="relative flex-1 max-w-4xl h-8 flex items-center justify-center">
                        {updates.map((update, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${currentUpdate === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <span className="text-center font-medium">{update}</span>
                            </div>
                        ))}
                    </div>
                    {/* Update Indicators */}
                    <div className="flex gap-1 flex-shrink-0">
                        {updates.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentUpdate(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentUpdate === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
                                    }`}
                                aria-label={`Go to update ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div>
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left Column - Hero Text */}
                        <div className="space-y-6">
                            {/* Atmanirbhar Bharat Badge */}
                            <div className="flex items-center gap-3">
                                <img
                                    src="/atmanirbhar-bharat-logo.png"
                                    alt="Atmanirbhar Bharat"
                                    className="h-16 w-16 object-contain"
                                />
                                <div className="inline-block">
                                    <span className="bg-gradient-to-r from-orange-100 to-green-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold border border-orange-200">
                                        🇮🇳 Atmanirbhar Bharat Initiative
                                    </span>
                                </div>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                <span className="text-gray-900">Self-Reliant.</span>
                                <br />
                                <span className="bg-gradient-to-r from-orange-600 via-white to-green-600 bg-clip-text text-transparent">
                                    Healthcare for All
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Empowering India's healthcare ecosystem through indigenous technology solutions.
                                Connect with ASHA workers, consult doctors, and access quality healthcare -
                                <span className="font-semibold text-orange-700"> Made in India, for India</span>.
                            </p>

                            {/* Search Bar */}
                            <div className="flex gap-3 bg-white p-2 rounded-xl shadow-lg border border-orange-100">
                                <div className="flex-1 flex items-center gap-3 px-4">
                                    <Search className="text-orange-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search for doctors, services, or health centers..."
                                        className="w-full outline-none text-gray-700"
                                    />
                                </div>
                                <button className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    Search
                                </button>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Link to="/login" className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                    Get Started
                                    <TrendingUp size={20} />
                                </Link>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border-2 border-orange-200 hover:border-orange-400"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Carousel */}
                        <div className="relative">
                            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl" style={{ height: '500px' }}>
                                {/* Carousel Images with Fade Effect */}
                                {slides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    >
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                                            <h3 className="text-white text-2xl font-bold mb-2">{slide.title}</h3>
                                            <p className="text-white/90 text-lg">{slide.description}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                >
                                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                >
                                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Slide Indicators */}
                                <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Floating Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-20 blur-2xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-2xl"></div>
                        </div>
                    </div>


                    {/* Latest News & Important Links - Simple Clean Design */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Latest News */}
                        <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
                                Latest News
                            </h2>
                            <ul className="space-y-4">
                                <li className="group">
                                    <a href="#" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                                        <div className="flex items-start gap-3">
                                            <span className="text-blue-600 mt-1 group-hover:translate-x-1 transition-transform">▸</span>
                                            <div className="flex-1">
                                                <p className="text-gray-900 font-medium group-hover:text-blue-700 transition-colors">
                                                    National Immunization Drive Launched
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">December 07, 2024</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="group">
                                    <a href="#" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                                        <div className="flex items-start gap-3">
                                            <span className="text-blue-600 mt-1 group-hover:translate-x-1 transition-transform">▸</span>
                                            <div className="flex-1">
                                                <p className="text-gray-900 font-medium group-hover:text-blue-700 transition-colors">
                                                    New Health Centers Inaugurated
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">December 05, 2024</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="group">
                                    <a href="#" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                                        <div className="flex items-start gap-3">
                                            <span className="text-blue-600 mt-1 group-hover:translate-x-1 transition-transform">▸</span>
                                            <div className="flex-1">
                                                <p className="text-gray-900 font-medium group-hover:text-blue-700 transition-colors">
                                                    Ayushman Bharat Expansion Announced
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">December 01, 2024</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="group">
                                    <a href="#" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                                        <div className="flex items-start gap-3">
                                            <span className="text-blue-600 mt-1 group-hover:translate-x-1 transition-transform">▸</span>
                                            <div className="flex-1">
                                                <p className="text-gray-900 font-medium group-hover:text-blue-700 transition-colors">
                                                    Digital Health Records Initiative
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">November 28, 2024</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Important Links */}
                        <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-teal-600">
                                Important Links
                            </h2>
                            <ul className="space-y-4">
                                <li className="group">
                                    <a href="https://eraktkosh.mohfw.gov.in" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-teal-600 group-hover:translate-x-1 transition-transform">▸</span>
                                            <p className="text-gray-900 font-medium group-hover:text-teal-700 transition-colors">
                                                e-Raktakosh
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li className="group">
                                    <a href="https://www.nhp.gov.in" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-teal-600 group-hover:translate-x-1 transition-transform">▸</span>
                                            <p className="text-gray-900 font-medium group-hover:text-teal-700 transition-colors">
                                                National Health Portal
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li className="group">
                                    <a href="https://pmjay.gov.in" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-teal-600 group-hover:translate-x-1 transition-transform">▸</span>
                                            <p className="text-gray-900 font-medium group-hover:text-teal-700 transition-colors">
                                                Ayushman Bharat
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li className="group">
                                    <a href="https://mohfw.gov.in" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-teal-600 group-hover:translate-x-1 transition-transform">▸</span>
                                            <p className="text-gray-900 font-medium group-hover:text-teal-700 transition-colors">
                                                Ministry of Health & Family Welfare
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li className="group">
                                    <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-teal-600 group-hover:translate-x-1 transition-transform">▸</span>
                                            <p className="text-gray-900 font-medium group-hover:text-teal-700 transition-colors">
                                                World Health Organization
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
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

            {/* Project Information Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-green-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <img
                                    src="/atmanirbhar-bharat-logo.png"
                                    alt="Atmanirbhar Bharat"
                                    className="h-12 w-12 object-contain bg-white/20 rounded-lg p-1"
                                />
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">About SwasthyaSetu</h2>
                                    <p className="text-orange-100">Atmanirbhar Bharat Healthcare Initiative</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-8">
                            {/* Project Overview */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Sparkles className="text-blue-600" size={28} />
                                    Project Overview
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    SwasthyaSetu is a comprehensive digital healthcare platform designed to bridge the gap between healthcare providers and citizens.
                                    Our mission is to make quality healthcare accessible to everyone, especially in rural and underserved areas, by leveraging
                                    technology and empowering ASHA workers as the first point of contact.
                                </p>
                            </div>

                            {/* Key Features */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <CheckCircle className="text-green-600" size={28} />
                                    What Makes Us Different
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-l-4 border-blue-600">
                                        <h4 className="font-bold text-blue-900 mb-2">🎥 Real-Time Video Consultations</h4>
                                        <p className="text-sm text-gray-700">Built-in WebRTC video calling for seamless doctor-patient consultations without third-party apps</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-5 rounded-xl border-l-4 border-teal-600">
                                        <h4 className="font-bold text-teal-900 mb-2">👩‍⚕️ ASHA Worker Integration</h4>
                                        <p className="text-sm text-gray-700">Dedicated portal for ASHA workers to manage community health, track patients, and coordinate care</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-l-4 border-purple-600">
                                        <h4 className="font-bold text-purple-900 mb-2">📱 Mobile-First Design</h4>
                                        <p className="text-sm text-gray-700">Responsive interface optimized for smartphones, making it accessible even in low-bandwidth areas</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl border-l-4 border-orange-600">
                                        <h4 className="font-bold text-orange-900 mb-2">💊 Digital Prescriptions</h4>
                                        <p className="text-sm text-gray-700">Instant digital prescriptions accessible from anywhere, reducing paper waste and improving record-keeping</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-l-4 border-green-600">
                                        <h4 className="font-bold text-green-900 mb-2">🏥 Multi-Role Support</h4>
                                        <p className="text-sm text-gray-700">Separate dashboards for patients, doctors, and ASHA workers with role-specific features</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-xl border-l-4 border-pink-600">
                                        <h4 className="font-bold text-pink-900 mb-2">📊 Health Analytics</h4>
                                        <p className="text-sm text-gray-700">Track health metrics, appointment history, and medical records in one centralized location</p>
                                    </div>
                                </div>
                            </div>

                            {/* Comparison with Existing Systems */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">How We're Different from Existing Platforms</h3>
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-green-500 text-white rounded-full p-1 mt-1">
                                                <CheckCircle size={16} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Integrated Video Consultations</p>
                                                <p className="text-sm text-gray-600">Unlike traditional platforms that redirect to external apps, we provide built-in video calling</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-green-500 text-white rounded-full p-1 mt-1">
                                                <CheckCircle size={16} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">ASHA Worker Empowerment</p>
                                                <p className="text-sm text-gray-600">First platform to give ASHA workers their own digital workspace for community health management</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-green-500 text-white rounded-full p-1 mt-1">
                                                <CheckCircle size={16} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Simplified User Experience</p>
                                                <p className="text-sm text-gray-600">Clean, intuitive interface designed for users with varying levels of digital literacy</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-green-500 text-white rounded-full p-1 mt-1">
                                                <CheckCircle size={16} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Real-Time Appointment Management</p>
                                                <p className="text-sm text-gray-600">Instant booking confirmations and notifications, no waiting for manual approval</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Future Roadmap */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Rocket className="text-purple-600" size={28} />
                                    Future Enhancements
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                                        <h4 className="font-bold text-blue-900 mb-1">🤖 AI-Powered Symptom Checker</h4>
                                        <p className="text-sm text-gray-600">Preliminary diagnosis assistance using machine learning to help patients understand their symptoms</p>
                                    </div>
                                    <div className="bg-white border-2 border-teal-200 rounded-lg p-4 hover:border-teal-400 transition-colors">
                                        <h4 className="font-bold text-teal-900 mb-1">🗣️ Multi-Language Support</h4>
                                        <p className="text-sm text-gray-600">Support for regional languages to make the platform accessible to non-English speakers</p>
                                    </div>
                                    <div className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:border-purple-400 transition-colors">
                                        <h4 className="font-bold text-purple-900 mb-1">📱 Mobile App (iOS & Android)</h4>
                                        <p className="text-sm text-gray-600">Native mobile applications for better performance and offline capabilities</p>
                                    </div>
                                    <div className="bg-white border-2 border-orange-200 rounded-lg p-4 hover:border-orange-400 transition-colors">
                                        <h4 className="font-bold text-orange-900 mb-1">💳 Online Payment Integration</h4>
                                        <p className="text-sm text-gray-600">Secure payment gateway for consultation fees and medicine orders</p>
                                    </div>
                                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors">
                                        <h4 className="font-bold text-green-900 mb-1">🏪 Medicine Delivery Partnership</h4>
                                        <p className="text-sm text-gray-600">Integration with pharmacies for home delivery of prescribed medicines</p>
                                    </div>
                                    <div className="bg-white border-2 border-pink-200 rounded-lg p-4 hover:border-pink-400 transition-colors">
                                        <h4 className="font-bold text-pink-900 mb-1">📊 Advanced Health Analytics Dashboard</h4>
                                        <p className="text-sm text-gray-600">Comprehensive health insights, trends, and personalized recommendations</p>
                                    </div>
                                    <div className="bg-white border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition-colors">
                                        <h4 className="font-bold text-indigo-900 mb-1">🔔 Smart Reminders & Alerts</h4>
                                        <p className="text-sm text-gray-600">Automated medication reminders, appointment notifications, and health check-up alerts</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 text-center text-white">
                                <h3 className="text-2xl font-bold mb-3">Ready to Experience Better Healthcare?</h3>
                                <p className="mb-6 text-blue-100">Join thousands of users already benefiting from our platform</p>
                                <div className="flex gap-4 justify-center">
                                    <Link
                                        to="/register"
                                        onClick={() => setShowModal(false)}
                                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                    >
                                        Get Started Now
                                    </Link>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Home;
