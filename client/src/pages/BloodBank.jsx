import { useState } from 'react';
import { Link } from 'react-router-dom';

const BloodBank = () => {
    const [searchLocation, setSearchLocation] = useState('');

    // Check if location matches major cities
    const isInCity = (cityList) => {
        return cityList.some(city =>
            searchLocation.toLowerCase().includes(city.toLowerCase())
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-red-600">🩸 Blood Bank Availability</h1>
                            <p className="text-sm text-gray-600">Real-time blood stock information</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                                ← Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Unified Search Interface */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Search Blood Availability</h2>
                    <p className="text-gray-600 mb-6">Enter your location to find blood banks and organizations in your area</p>

                    <div className="mb-6">
                        {/* Location Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📍 Location (City/State)
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Delhi, Mumbai, Bangalore..."
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                    </div>

                    {/* Helper Text */}
                    {searchLocation && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-900">
                                <strong>💡 Showing organizations available in {searchLocation}</strong>
                            </p>
                        </div>
                    )}
                </div>

                {/* Location-Based Organizations Directory */}
                {searchLocation && (
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 mb-8 border-l-4 border-red-600">
                        <h3 className="text-xl font-bold text-red-900 mb-2">
                            🇮🇳 Blood Bank Organizations in {searchLocation}
                        </h3>
                        <p className="text-sm text-gray-700 mb-6">
                            Organizations providing blood bank services in your area
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* e-Raktakosh - Available everywhere */}
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-600">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="text-3xl">🩸</div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg text-gray-900">e-Raktakosh</h4>
                                        <p className="text-xs text-red-600 font-medium">Government Blood Banks</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Official government blood bank network covering all cities in India.
                                </p>
                                <div className="space-y-1 text-xs text-gray-700 mb-3">
                                    <p>✓ Real-time stock availability</p>
                                    <p>✓ Multiple blood banks in {searchLocation}</p>
                                    <p>✓ Free service</p>
                                </div>
                                <a
                                    href="https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/stockAvailability.cnt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                >
                                    Find in {searchLocation} →
                                </a>
                            </div>

                            {/* Indian Red Cross - Major cities */}
                            {isInCity(['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad']) && (
                                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-600">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="text-3xl">🏥</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-gray-900">Indian Red Cross</h4>
                                            <p className="text-xs text-red-600 font-medium">Blood Donation Centers</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Red Cross blood bank in {searchLocation}.
                                    </p>
                                    <div className="space-y-1 text-xs text-gray-700 mb-3">
                                        <p>✓ Voluntary blood donation</p>
                                        <p>✓ 24/7 emergency service</p>
                                        <p>✓ Component separation</p>
                                    </div>
                                    <a
                                        href="https://indianredcross.org"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                    >
                                        Contact →
                                    </a>
                                </div>
                            )}

                            {/* Friends2Support - Pan India */}
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-600">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="text-3xl">🤝</div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg text-gray-900">Friends2Support</h4>
                                        <p className="text-xs text-orange-600 font-medium">Donor Network</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Connect with voluntary donors in {searchLocation}.
                                </p>
                                <div className="space-y-1 text-xs text-gray-700 mb-3">
                                    <p>✓ {searchLocation} donor database</p>
                                    <p>✓ Emergency requests</p>
                                    <p>✓ Free matching</p>
                                </div>
                                <a
                                    href="https://www.friends2support.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-4 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                                >
                                    Find Donors →
                                </a>
                            </div>

                            {/* Sankalp India - Major cities */}
                            {isInCity(['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai']) && (
                                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-600">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="text-3xl">💝</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-gray-900">Sankalp India</h4>
                                            <p className="text-xs text-purple-600 font-medium">Blood Donation Platform</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Active donor community in {searchLocation}.
                                    </p>
                                    <div className="space-y-1 text-xs text-gray-700 mb-3">
                                        <p>✓ SMS-based alerts</p>
                                        <p>✓ Blood request posting</p>
                                        <p>✓ Donor registration</p>
                                    </div>
                                    <a
                                        href="https://www.sankalpindia.net"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                                    >
                                        Search →
                                    </a>
                                </div>
                            )}

                            {/* Rotary Blood Bank - Specific cities */}
                            {isInCity(['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata']) && (
                                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="text-3xl">⚙️</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-gray-900">Rotary Blood Bank</h4>
                                            <p className="text-xs text-blue-600 font-medium">Community Service</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Rotary Club blood bank in {searchLocation}.
                                    </p>
                                    <div className="space-y-1 text-xs text-gray-700 mb-3">
                                        <p>✓ Component separation</p>
                                        <p>✓ Blood storage</p>
                                        <p>✓ Emergency supply</p>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        📞 Contact local Rotary Club
                                    </div>
                                </div>
                            )}

                            {/* Lions Blood Bank - Specific cities */}
                            {isInCity(['Mumbai', 'Delhi', 'Pune', 'Ahmedabad']) && (
                                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-600">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="text-3xl">🦁</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-gray-900">Lions Blood Bank</h4>
                                            <p className="text-xs text-yellow-600 font-medium">Service Organization</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Lions Club blood bank in {searchLocation}.
                                    </p>
                                    <div className="space-y-1 text-xs text-gray-700 mb-3">
                                        <p>✓ Free blood for needy</p>
                                        <p>✓ Regular donation camps</p>
                                        <p>✓ Community service</p>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        📞 Contact local Lions Club
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Emergency Info */}
                <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-red-900 mb-2">🚨 Emergency Blood Requirement?</h3>
                    <p className="text-red-800 mb-3">
                        If you need blood urgently, please contact the blood bank directly or call the emergency helpline.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-red-900">National Blood Helpline:</span>
                            <span className="text-red-800">1910</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-red-900">Emergency:</span>
                            <span className="text-red-800">108</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BloodBank;
