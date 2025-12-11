import { Link } from 'react-router-dom';

const HealthSchemes = () => {
    const schemes = [
        {
            id: 1,
            name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
            icon: "🏥",
            category: "Health Insurance",
            eligibility: "Economically vulnerable families (bottom 40% as per SECC data)",
            benefits: [
                "₹5 lakh health cover per family per year",
                "Covers hospitalization expenses",
                "1,393 procedures covered",
                "Cashless and paperless treatment",
                "Pre and post-hospitalization expenses covered"
            ],
            howToApply: "Visit nearest Ayushman Mitra or Common Service Centre (CSC) with Ration Card and Aadhaar",
            website: "https://pmjay.gov.in",
            color: "blue"
        },
        {
            id: 2,
            name: "Janani Suraksha Yojana (JSY)",
            icon: "🤰",
            category: "Maternal Health",
            eligibility: "Pregnant women from BPL families",
            benefits: [
                "Cash assistance for institutional delivery",
                "₹1,400 for rural areas, ₹1,000 for urban areas",
                "Free delivery in government hospitals",
                "Post-delivery care for mother and child",
                "ASHA worker incentive for facilitation"
            ],
            howToApply: "Register at nearest Anganwadi Centre or Primary Health Centre during pregnancy",
            website: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
            color: "pink"
        },
        {
            id: 3,
            name: "Rashtriya Bal Swasthya Karyakram (RBSK)",
            icon: "👶",
            category: "Child Health",
            eligibility: "All children from 0-18 years",
            benefits: [
                "Free health screening for 4 'D's - Defects at birth, Diseases, Deficiencies, Development delays",
                "Early detection and treatment",
                "Free spectacles, hearing aids, and surgery",
                "Referral services for specialized treatment",
                "Follow-up care"
            ],
            howToApply: "Available at all government schools and Anganwadi centres",
            website: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1132&lid=607",
            color: "purple"
        },
        {
            id: 4,
            name: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
            icon: "🩺",
            category: "Maternal Health",
            eligibility: "All pregnant women",
            benefits: [
                "Free antenatal checkup on 9th of every month",
                "Minimum 4 ANC checkups guaranteed",
                "High-risk pregnancy identification",
                "Free ultrasound and blood tests",
                "Specialist consultation"
            ],
            howToApply: "Visit nearest government health facility on 9th of any month",
            website: "https://pmsma.nhp.gov.in",
            color: "green"
        },
        {
            id: 5,
            name: "Mission Indradhanush",
            icon: "💉",
            category: "Immunization",
            eligibility: "Children under 2 years and pregnant women",
            benefits: [
                "Free vaccination against 12 vaccine-preventable diseases",
                "Diphtheria, Pertussis, Tetanus, Polio, Measles, Rubella, etc.",
                "Intensified immunization drives",
                "Door-to-door vaccination in remote areas",
                "Vaccination tracking"
            ],
            howToApply: "Contact ASHA worker or visit nearest Sub-Centre/PHC",
            website: "https://www.nhp.gov.in/mission-indradhanush",
            color: "orange"
        },
        {
            id: 6,
            name: "Pradhan Mantri National Dialysis Programme",
            icon: "🏥",
            category: "Kidney Care",
            eligibility: "All citizens, especially poor and vulnerable",
            benefits: [
                "Free dialysis services",
                "Available at district hospitals",
                "No cost for BPL families",
                "Quality dialysis equipment",
                "Trained staff"
            ],
            howToApply: "Visit nearest district hospital with medical reports",
            website: "https://nhm.gov.in",
            color: "red"
        },
        {
            id: 7,
            name: "Janani Shishu Suraksha Karyakram (JSSK)",
            icon: "👶",
            category: "Maternal & Child Health",
            eligibility: "All pregnant women and sick newborns",
            benefits: [
                "Free delivery in public health institutions",
                "Free C-section if required",
                "Free medicines and diagnostics",
                "Free diet during hospital stay",
                "Free transport from home to facility",
                "Free care for sick newborns up to 30 days"
            ],
            howToApply: "Visit any government hospital during pregnancy or childbirth",
            website: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=842&lid=309",
            color: "teal"
        },
        {
            id: 8,
            name: "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)",
            icon: "💊",
            category: "Affordable Medicines",
            eligibility: "All citizens",
            benefits: [
                "Generic medicines at 50-90% lower prices",
                "1,500+ Jan Aushadhi Kendras across India",
                "Quality medicines at affordable rates",
                "Surgical instruments and devices",
                "Same quality as branded medicines"
            ],
            howToApply: "Visit nearest Jan Aushadhi Kendra",
            website: "https://janaushadhi.gov.in",
            color: "indigo"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: "border-blue-500 bg-blue-50 hover:bg-blue-100",
            pink: "border-pink-500 bg-pink-50 hover:bg-pink-100",
            purple: "border-purple-500 bg-purple-50 hover:bg-purple-100",
            green: "border-green-500 bg-green-50 hover:bg-green-100",
            orange: "border-orange-500 bg-orange-50 hover:bg-orange-100",
            red: "border-red-500 bg-red-50 hover:bg-red-100",
            teal: "border-teal-500 bg-teal-50 hover:bg-teal-100",
            indigo: "border-indigo-500 bg-indigo-50 hover:bg-indigo-100"
        };
        return colors[color] || colors.blue;
    };

    const getBadgeColor = (color) => {
        const colors = {
            blue: "bg-blue-100 text-blue-800",
            pink: "bg-pink-100 text-pink-800",
            purple: "bg-purple-100 text-purple-800",
            green: "bg-green-100 text-green-800",
            orange: "bg-orange-100 text-orange-800",
            red: "bg-red-100 text-red-800",
            teal: "bg-teal-100 text-teal-800",
            indigo: "bg-indigo-100 text-indigo-800"
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">Government Health Schemes</h1>
                            <p className="text-sm text-gray-600">Healthcare benefits for all citizens</p>
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
                {/* Introduction */}
                <div className="bg-gradient-to-r from-[#FF9933]/20 via-white to-[#138808]/20 rounded-lg p-6 mb-8 border-l-4 border-[#FF9933]">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Healthcare for All</h2>
                    <p className="text-gray-700">
                        The Government of India provides various health schemes to ensure quality healthcare
                        reaches every citizen, especially the economically vulnerable. These schemes cover
                        maternal health, child care, immunization, insurance, and affordable medicines.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        📞 For assistance, contact your ASHA worker or visit the nearest Primary Health Centre (PHC)
                    </p>
                </div>

                {/* Schemes Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {schemes.map((scheme) => (
                        <div
                            key={scheme.id}
                            className={`bg-white rounded-lg shadow-sm border-l-4 p-6 transition ${getColorClasses(scheme.color)}`}
                        >
                            {/* Header */}
                            <div className="flex items-start gap-3 mb-4">
                                <div className="text-4xl">{scheme.icon}</div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{scheme.name}</h3>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getBadgeColor(scheme.color)}`}>
                                        {scheme.category}
                                    </span>
                                </div>
                            </div>

                            {/* Eligibility */}
                            <div className="mb-3">
                                <p className="text-sm font-semibold text-gray-700 mb-1">👥 Eligibility:</p>
                                <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                            </div>

                            {/* Benefits */}
                            <div className="mb-3">
                                <p className="text-sm font-semibold text-gray-700 mb-2">✨ Key Benefits:</p>
                                <ul className="space-y-1">
                                    {scheme.benefits.map((benefit, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="text-green-600 mt-0.5">✓</span>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* How to Apply */}
                            <div className="mb-3">
                                <p className="text-sm font-semibold text-gray-700 mb-1">📝 How to Apply:</p>
                                <p className="text-sm text-gray-600">{scheme.howToApply}</p>
                            </div>

                            {/* Website */}
                            <div className="pt-3 border-t">
                                <a
                                    href={scheme.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    🔗 Visit Official Website →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Help Section */}
                <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">👩‍⚕️</div>
                            <div>
                                <p className="font-semibold text-gray-900">Contact ASHA Worker</p>
                                <p className="text-sm text-gray-600">Your local ASHA worker can help you enroll in schemes</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">🏥</div>
                            <div>
                                <p className="font-semibold text-gray-900">Visit PHC/CHC</p>
                                <p className="text-sm text-gray-600">Primary Health Centre or Community Health Centre</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">📞</div>
                            <div>
                                <p className="font-semibold text-gray-900">Helpline: 14555</p>
                                <p className="text-sm text-gray-600">Ayushman Bharat toll-free helpline</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HealthSchemes;
