import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Activity, Users, Building2, Heart, Search, TrendingUp } from 'lucide-react';

const Home = () => {
    const { user } = useAuth();
    const [currentSlide, setCurrentSlide] = useState(0);

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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Main Content */}
            <div>
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left Column - Hero Text */}
                        <div className="space-y-6">
                            <div className="inline-block">
                                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    🏥 Healthcare Made Accessible
                                </span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                <span className="text-gray-900">Save time.</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                                    Healthcare online
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Bridging healthcare gaps through technology-enabled health services.
                                Connect with ASHA workers, consult doctors, and access quality healthcare from anywhere.
                            </p>

                            {/* Search Bar */}
                            <div className="flex gap-3 bg-white p-2 rounded-xl shadow-lg border border-gray-100">
                                <div className="flex-1 flex items-center gap-3 px-4">
                                    <Search className="text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search for doctors, services, or health centers..."
                                        className="w-full outline-none text-gray-700"
                                    />
                                </div>
                                <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    Search
                                </button>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Link to="/login" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                    Get Started
                                    <TrendingUp size={20} />
                                </Link>
                                <Link to="/about" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border-2 border-blue-200 hover:border-blue-400">
                                    Learn More
                                </Link>
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

                    {/* Statistics Section */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon className="text-white" size={24} />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Important Days Banner */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600 hover:shadow-lg transition-all duration-300">
                            <p className="text-sm font-semibold text-blue-900">28-Jul | World Hepatitis Day</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-600 hover:shadow-lg transition-all duration-300">
                            <p className="text-sm font-semibold text-green-900">29-Jul | ORS Day</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-600 hover:shadow-lg transition-all duration-300">
                            <p className="text-sm font-semibold text-purple-900">1 to 8 Aug | World Breast Feeding Week</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-l-4 border-orange-600 hover:shadow-lg transition-all duration-300">
                            <p className="text-sm font-semibold text-orange-900">25 Aug to 8 Sept | Eye Donation Fortnight</p>
                        </div>
                    </div>

                    {/* Latest News & Updates */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-2 h-6 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full"></span>
                                Latest News
                            </h2>
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-gray-100 hover:bg-blue-50 -mx-4 px-4 py-2 rounded-lg transition-colors duration-200">
                                    <p className="text-sm text-gray-500 mb-2">December 07, 2024</p>
                                    <a href="#" className="text-blue-700 hover:text-blue-800 font-semibold">
                                        National Immunization Drive Launched
                                    </a>
                                </div>
                                <div className="pb-6 border-b border-gray-100 hover:bg-blue-50 -mx-4 px-4 py-2 rounded-lg transition-colors duration-200">
                                    <p className="text-sm text-gray-500 mb-2">December 05, 2024</p>
                                    <a href="#" className="text-blue-700 hover:text-blue-800 font-semibold">
                                        New Health Centers Inaugurated
                                    </a>
                                </div>
                                <div className="pb-6 border-b border-gray-100 hover:bg-blue-50 -mx-4 px-4 py-2 rounded-lg transition-colors duration-200">
                                    <p className="text-sm text-gray-500 mb-2">December 01, 2024</p>
                                    <a href="#" className="text-blue-700 hover:text-blue-800 font-semibold">
                                        Ayushman Bharat Expansion Announced
                                    </a>
                                </div>
                                <div className="hover:bg-blue-50 -mx-4 px-4 py-2 rounded-lg transition-colors duration-200">
                                    <p className="text-sm text-gray-500 mb-2">November 28, 2024</p>
                                    <a href="#" className="text-blue-700 hover:text-blue-800 font-semibold">
                                        Digital Health Records Initiative
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Important Links */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-2 h-6 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full"></span>
                                Important Links
                            </h2>
                            <ul className="space-y-4">
                                <li>
                                    <a href="https://eraktkosh.mohfw.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 font-medium flex items-center gap-3 hover:bg-blue-50 -mx-4 px-4 py-2 rounded-lg transition-colors duration-200">
                                        <span className="text-blue-500">→</span> e-Raktakosh
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.nhp.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 font-medium flex items-center gap-3 hover:bg-blue-50 -mx-4 px-4 py-2 rounded-lg transition-colors duration-200">
                                        <span className="text-blue-500">→</span> National Health Portal
                                    </a>
                                </li>
                                <li>
                                    <a href="https://pmjay.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 font-medium flex items-center gap-3 hover:bg-blue-50 -mx-4 px-4 py-2 rounded-lg transition-colors duration-200">
                                        <span className="text-blue-500">→</span> Ayushman Bharat
                                    </a>
                                </li>
                                <li>
                                    <a href="https://mohfw.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 font-medium flex items-center gap-3 hover:bg-blue-50 -mx-4 px-4 py-2 rounded-lg transition-colors duration-200">
                                        <span className="text-blue-500">→</span> Ministry of Health
                                    </a>
                                </li>
                            </ul>
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

export default Home;
