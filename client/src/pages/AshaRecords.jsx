import { Link } from 'react-router-dom';

const AshaRecords = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">Records Management</h1>
                            <p className="text-sm text-gray-600">Upload and manage documents</p>
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
                    <div className="text-6xl mb-4">📄</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Records Management</h3>
                    <p className="text-gray-600 mb-4">
                        This feature will allow you to upload documents, categorize them, and link them to patients.
                    </p>
                    <p className="text-sm text-gray-500">Coming soon...</p>
                </div>
            </main>
        </div>
    );
};

export default AshaRecords;
