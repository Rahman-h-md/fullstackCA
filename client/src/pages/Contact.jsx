import { Link } from 'react-router-dom';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Single Row Header */}
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Left: Logo and Title */}
                        <div className="flex items-center gap-4">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                                alt="Government of India"
                                className="h-16"
                            />
                            <div>
                                <h1 className="text-xl font-bold text-[#1B365D]">Health and Family Welfare Department</h1>
                            </div>
                        </div>

                        {/* Center: Navigation Links */}
                        <nav className="flex gap-6">
                            <Link to="/" className="text-[#1B365D] hover:text-blue-600 font-medium transition">
                                Home
                            </Link>
                            <Link to="/about" className="text-[#1B365D] hover:text-blue-600 font-medium transition">
                                About Us
                            </Link>
                            <Link to="/login" className="text-[#1B365D] hover:text-blue-600 font-medium transition">
                                E-Citizen
                            </Link>
                            <Link to="/contact" className="text-blue-600 font-semibold transition">
                                Contact
                            </Link>
                        </nav>

                        {/* Right: Login and Register */}
                        <div className="flex items-center gap-4 text-sm">
                            <Link to="/login" className="text-[#1B365D] hover:underline font-medium">Login</Link>
                            <Link to="/register" className="text-[#1B365D] hover:underline font-medium">Register</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-[#1B365D] mb-6">Contact Us</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-[#1B365D] mb-4">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter subject"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your message"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#1B365D] text-white py-3 rounded-md hover:bg-[#2a4a7a] transition font-semibold"
                            >
                                Submit Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-white border rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-[#1B365D] mb-4">Contact Information</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">📍</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Address</h3>
                                        <p className="text-gray-600 text-sm">
                                            Health & Family Welfare Department<br />
                                            Ministry of Health and Family Welfare<br />
                                            Nirman Bhawan, New Delhi - 110011<br />
                                            India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">📞</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Phone</h3>
                                        <p className="text-gray-600 text-sm">
                                            Helpline: 1800-XXX-XXXX<br />
                                            Office: +91-11-XXXX-XXXX
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">✉️</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Email</h3>
                                        <p className="text-gray-600 text-sm">
                                            General Inquiries: support@swasthyasetu.gov.in<br />
                                            Technical Support: tech@swasthyasetu.gov.in
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">🕐</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Office Hours</h3>
                                        <p className="text-gray-600 text-sm">
                                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                                            Saturday: 9:00 AM - 1:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="font-bold text-blue-900 mb-2">Emergency Helpline</h3>
                            <p className="text-blue-800 text-2xl font-bold">108</p>
                            <p className="text-sm text-blue-700 mt-1">Available 24/7 for medical emergencies</p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h3 className="font-bold text-green-900 mb-2">COVID-19 Helpline</h3>
                            <p className="text-green-800 text-2xl font-bold">1075</p>
                            <p className="text-sm text-green-700 mt-1">For COVID-19 related queries and support</p>
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

export default Contact;
