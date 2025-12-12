import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Nutrition = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const resultsRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [nutritionData, setNutritionData] = useState([]);
    const [filteredDiseases, setFilteredDiseases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seeding, setSeeding] = useState(false);

    const diseases = [
        'Diabetes',
        'Hypertension',
        'Anemia',
        'Obesity',
        'Heart Disease',
        'Thyroid',
        'PCOD/PCOS',
        'Arthritis',
        'Pregnancy',
        'Malnutrition'
    ];

    useEffect(() => {
        fetchNutritionData();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = diseases.filter(disease =>
                disease.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredDiseases(filtered);
        } else {
            setFilteredDiseases([]);
        }
    }, [searchTerm]);

    const fetchNutritionData = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching nutrition data...');
            const response = await fetch('http://localhost:5000/api/nutrition', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log('Nutrition data received:', data);
            console.log('Number of plans:', data.length);

            if (data.length === 0) {
                setError('No nutrition data found. Please seed the database first.');
            }

            setNutritionData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching nutrition data:', error);
            setError('Failed to load nutrition data. Please try again.');
            setLoading(false);
        }
    };

    const handleSeedDatabase = async () => {
        setSeeding(true);
        try {
            console.log('Seeding database...');
            const response = await fetch('http://localhost:5000/api/nutrition/seed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log('Seed result:', result);
            alert('Database seeded successfully! Refreshing data...');
            await fetchNutritionData();
            setError(null);
        } catch (error) {
            console.error('Error seeding database:', error);
            alert('Failed to seed database. Please try again.');
        } finally {
            setSeeding(false);
        }
    };

    const handleDiseaseSelect = (disease) => {
        console.log('=== Disease Selected ===');
        console.log('Disease:', disease);
        console.log('Available nutrition data:', nutritionData);
        console.log('Categories in data:', nutritionData.map(item => item.category));

        setSearchTerm(disease);
        setFilteredDiseases([]);

        const plan = nutritionData.find(item => item.category === disease);
        console.log('Found plan:', plan);

        if (!plan) {
            console.error('No plan found for disease:', disease);
            alert(`No nutrition plan found for ${disease}. Available categories: ${nutritionData.map(item => item.category).join(', ')}`);
        } else {
            console.log('Setting selected disease:', plan.title);
        }

        setSelectedDisease(plan);

        // Scroll to results after a short delay to ensure DOM is updated
        setTimeout(() => {
            if (resultsRef.current) {
                resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const handleSearch = () => {
        console.log('=== Search Triggered ===');
        console.log('Search term:', searchTerm);
        console.log('Available data:', nutritionData.length, 'plans');

        if (!searchTerm.trim()) {
            alert('Please enter a disease name');
            return;
        }

        const plan = nutritionData.find(item =>
            item.category.toLowerCase() === searchTerm.toLowerCase()
        );

        console.log('Search result:', plan);

        if (!plan) {
            console.error('No plan found for search term:', searchTerm);
            alert(`No nutrition plan found for "${searchTerm}". Try selecting from the available conditions below.`);
        } else {
            console.log('Found plan:', plan.title);
        }

        setSelectedDisease(plan);
        setFilteredDiseases([]);

        // Scroll to results
        setTimeout(() => {
            if (resultsRef.current) {
                resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mb-4 text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
                    >
                        ← Back to Dashboard
                    </button>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">🥗 Nutrition & Exercise Guide</h1>
                            <p className="text-gray-600">Get personalized nutrition and exercise recommendations based on your health condition</p>
                        </div>
                        {error && (
                            <button
                                onClick={handleSeedDatabase}
                                disabled={seeding}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
                            >
                                {seeding ? 'Seeding...' : '🌱 Seed Database'}
                            </button>
                        )}
                    </div>
                    {error && (
                        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                            <p className="text-sm text-yellow-800">
                                <strong>⚠️ {error}</strong> Click the "Seed Database" button above to populate nutrition data.
                            </p>
                        </div>
                    )}
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Search for Your Condition</h2>
                    <div className="relative">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Type a disease name (e.g., Diabetes, Hypertension)..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                onClick={handleSearch}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                            >
                                Search
                            </button>
                        </div>

                        {/* Autocomplete Dropdown */}
                        {filteredDiseases.length > 0 && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredDiseases.map((disease, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleDiseaseSelect(disease)}
                                        className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    >
                                        <span className="font-medium text-gray-800">{disease}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Available Diseases */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Available conditions:</p>
                        <div className="flex flex-wrap gap-2">
                            {diseases.map((disease, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDiseaseSelect(disease)}
                                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition"
                                >
                                    {disease}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div ref={resultsRef}>
                    {loading ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading nutrition data...</p>
                        </div>
                    ) : selectedDisease ? (
                        <div className="space-y-6">
                            {/* Plan Header */}
                            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-md p-6 text-white">
                                <h2 className="text-2xl font-bold mb-2">{selectedDisease.title}</h2>
                                <p className="text-green-50">{selectedDisease.description}</p>
                                <div className="mt-4 inline-block bg-white/20 px-4 py-2 rounded-full">
                                    <span className="font-semibold">Category: {selectedDisease.category}</span>
                                </div>
                            </div>

                            {/* Recommended & Avoid Foods */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Recommended Foods */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                                        ✅ Recommended Foods
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedDisease.recommendedItems.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-green-600 mt-1">•</span>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Foods to Avoid */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2">
                                        ❌ Foods to Avoid
                                    </h3>
                                    <ul className="space-y-2">
                                        {selectedDisease.avoidItems.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-red-600 mt-1">•</span>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Meal Plan */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    🍽️ Daily Meal Plan
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Breakfast */}
                                    <div className="border-l-4 border-yellow-500 pl-4">
                                        <h4 className="font-semibold text-yellow-700 mb-2">Breakfast</h4>
                                        <ul className="space-y-1">
                                            {selectedDisease.mealPlan.breakfast.map((item, index) => (
                                                <li key={index} className="text-sm text-gray-700">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Lunch */}
                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <h4 className="font-semibold text-orange-700 mb-2">Lunch</h4>
                                        <ul className="space-y-1">
                                            {selectedDisease.mealPlan.lunch.map((item, index) => (
                                                <li key={index} className="text-sm text-gray-700">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Dinner */}
                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h4 className="font-semibold text-purple-700 mb-2">Dinner</h4>
                                        <ul className="space-y-1">
                                            {selectedDisease.mealPlan.dinner.map((item, index) => (
                                                <li key={index} className="text-sm text-gray-700">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Snacks */}
                                    <div className="border-l-4 border-pink-500 pl-4">
                                        <h4 className="font-semibold text-pink-700 mb-2">Snacks</h4>
                                        <ul className="space-y-1">
                                            {selectedDisease.mealPlan.snacks.map((item, index) => (
                                                <li key={index} className="text-sm text-gray-700">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Exercise Recommendations */}
                            {selectedDisease.exercises && selectedDisease.exercises.length > 0 && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                                        🏃‍♂️ Recommended Exercises
                                    </h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {selectedDisease.exercises.map((exercise, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                                <span className="text-blue-600 text-xl">💪</span>
                                                <span className="text-gray-700">{exercise}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Disclaimer */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                <p className="text-sm text-yellow-800">
                                    <strong>⚠️ Disclaimer:</strong> This information is for educational purposes only.
                                    Always consult with your healthcare provider before making significant changes to your diet or exercise routine.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Search for a Condition</h3>
                            <p className="text-gray-600">
                                Select a disease from the list above or type in the search bar to get personalized nutrition and exercise recommendations.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Nutrition;
