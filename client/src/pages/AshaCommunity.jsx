import { Link } from 'react-router-dom';

const AshaCommunity = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">Community Tracking</h1>
                            <p className="text-sm text-gray-600">Area-wise health statistics</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/asha/dashboard" className="text-gray-600 hover:text-gray-900">
                                ← Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                    <div className="text-6xl mb-4">🏘️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Tracking</h3>
                    <p className="text-gray-600 mb-4">
                        This feature will display area-wise health statistics, community health metrics, and disease outbreak tracking.
                    </p>
                    <p className="text-sm text-gray-500">Coming soon...</p>
                </div>
            </main>
        </div>
    );
};

export default AshaCommunity;
