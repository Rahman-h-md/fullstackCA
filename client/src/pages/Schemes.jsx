import { Link } from 'react-router-dom';
import { FileText, Users, Heart, Baby, Shield, Stethoscope, Eye, Pill } from 'lucide-react';

const Schemes = () => {
    const schemes = [
        {
            icon: Heart,
            name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
            description: "World's largest health insurance scheme providing coverage of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.",
            benefits: [
                "Cashless treatment at empanelled hospitals",
                "Covers over 1,500 medical procedures",
                "No cap on family size and age",
                "Pre and post-hospitalization expenses covered"
            ],
            eligibility: "Socio-Economic Caste Census (SECC) database beneficiaries",
            color: "from-red-500 to-pink-500"
        },
        {
            icon: Baby,
            name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
            description: "Maternity benefit program providing cash incentive of ₹5,000 in three installments to pregnant and lactating mothers.",
            benefits: [
                "₹5,000 direct benefit transfer",
                "Partial compensation for wage loss",
                "Promotes institutional delivery",
                "Encourages proper nutrition and rest"
            ],
            eligibility: "All pregnant women and lactating mothers (excluding government employees)",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: Users,
            name: "Rashtriya Swasthya Bima Yojana (RSBY)",
            description: "Health insurance scheme for Below Poverty Line (BPL) families providing coverage up to ₹30,000 per family per year.",
            benefits: [
                "Smart card based cashless treatment",
                "Coverage for hospitalization expenses",
                "Pre-existing diseases covered from day one",
                "Maternity benefit up to ₹5,000"
            ],
            eligibility: "BPL families identified by state governments",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Stethoscope,
            name: "National Health Mission (NHM)",
            description: "Comprehensive health program to strengthen healthcare delivery systems in rural and urban areas.",
            benefits: [
                "Free essential drugs and diagnostics",
                "Improved healthcare infrastructure",
                "Mobile Medical Units for remote areas",
                "Telemedicine services"
            ],
            eligibility: "All citizens, especially in rural and underserved areas",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Shield,
            name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
            description: "Accident insurance scheme providing coverage of ₹2 lakhs for accidental death and disability.",
            benefits: [
                "₹2 lakh coverage for accidental death",
                "₹2 lakh for total permanent disability",
                "₹1 lakh for partial permanent disability",
                "Annual premium of just ₹12"
            ],
            eligibility: "Citizens aged 18-70 years with bank account",
            color: "from-orange-500 to-amber-500"
        },
        {
            icon: Eye,
            name: "National Programme for Control of Blindness (NPCB)",
            description: "Aims to reduce the prevalence of blindness through prevention and treatment of eye diseases.",
            benefits: [
                "Free cataract surgeries",
                "Distribution of free spectacles",
                "Eye screening camps",
                "Treatment for diabetic retinopathy"
            ],
            eligibility: "All citizens, priority to rural and economically weaker sections",
            color: "from-purple-500 to-violet-500"
        },
        {
            icon: Pill,
            name: "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)",
            description: "Provides quality generic medicines at affordable prices through dedicated Janaushadhi Kendras.",
            benefits: [
                "Medicines at 50-90% lower prices",
                "Over 1,500 generic drugs available",
                "Quality assured by Bureau of Pharma PSUs",
                "Surgical instruments and consumables"
            ],
            eligibility: "All citizens can purchase from Janaushadhi Kendras",
            color: "from-teal-500 to-cyan-500"
        },
        {
            icon: Baby,
            name: "Janani Suraksha Yojana (JSY)",
            description: "Safe motherhood intervention promoting institutional delivery among poor pregnant women.",
            benefits: [
                "Cash assistance for institutional delivery",
                "₹1,400 in rural areas, ₹1,000 in urban areas",
                "Free delivery and postnatal care",
                "ASHA worker incentive"
            ],
            eligibility: "Pregnant women from BPL families",
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: Heart,
            name: "National Programme for Prevention and Control of Cancer, Diabetes, CVD and Stroke (NPCDCS)",
            description: "Comprehensive program for prevention and control of non-communicable diseases.",
            benefits: [
                "Free screening for diabetes and hypertension",
                "Early detection of common cancers",
                "Treatment facilities at district level",
                "Health promotion and awareness"
            ],
            eligibility: "All citizens, especially those above 30 years",
            color: "from-red-500 to-orange-500"
        },
        {
            icon: Shield,
            name: "Ayushman Bharat Health and Wellness Centres (AB-HWCs)",
            description: "Comprehensive primary healthcare through upgraded health sub-centres and primary health centres.",
            benefits: [
                "Free essential drugs and diagnostics",
                "Screening for NCDs",
                "Maternal and child health services",
                "Teleconsultation facilities"
            ],
            eligibility: "All citizens at community level",
            color: "from-green-500 to-teal-500"
        },
        {
            icon: Users,
            name: "Mission Indradhanush",
            description: "Immunization program to ensure full immunization of all children and pregnant women.",
            benefits: [
                "Free vaccination for 12 vaccine-preventable diseases",
                "Special focus on unvaccinated children",
                "Intensified Mission Indradhanush drives",
                "Tracking through digital platforms"
            ],
            eligibility: "Children up to 2 years and pregnant women",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Stethoscope,
            name: "Pradhan Mantri National Dialysis Programme",
            description: "Provides dialysis services at affordable rates through PPP model.",
            benefits: [
                "Dialysis at subsidized rates",
                "Free dialysis for BPL families",
                "Quality assured services",
                "Accessible at district hospitals"
            ],
            eligibility: "All citizens requiring dialysis, free for BPL families",
            color: "from-blue-500 to-indigo-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#9c1f6e] to-purple-700 text-white py-12 pt-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <FileText size={48} />
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">Government Health Schemes</h1>
                            <p className="text-xl mt-2 text-purple-100">Empowering citizens with accessible and affordable healthcare</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Schemes Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Ongoing Health Schemes</h2>
                    <p className="text-lg text-gray-600">Explore the various government health schemes designed to provide comprehensive healthcare coverage to all citizens of India.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {schemes.map((scheme, index) => {
                        const Icon = scheme.icon;
                        return (
                            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                {/* Scheme Header */}
                                <div className={`bg-gradient-to-r ${scheme.color} p-6 text-white`}>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                            <Icon size={32} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-2">{scheme.name}</h3>
                                            <p className="text-white/90 text-sm">{scheme.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Scheme Details */}
                                <div className="p-6">
                                    {/* Benefits */}
                                    <div className="mb-4">
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="w-1 h-5 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full"></span>
                                            Key Benefits
                                        </h4>
                                        <ul className="space-y-2">
                                            {scheme.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-700">
                                                    <span className="text-green-500 mt-1">✓</span>
                                                    <span className="text-sm">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Eligibility */}
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                        <h4 className="font-bold text-gray-900 mb-2 text-sm">Eligibility</h4>
                                        <p className="text-gray-700 text-sm">{scheme.eligibility}</p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-4">
                                        <button className={`w-full bg-gradient-to-r ${scheme.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                                            Learn More & Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Information */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Apply for These Schemes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                            <h3 className="font-bold text-gray-900 mb-2">Visit Nearest Center</h3>
                            <p className="text-gray-700 text-sm">Visit your nearest health center, ASHA worker, or government office</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                            <h3 className="font-bold text-gray-900 mb-2">Submit Documents</h3>
                            <p className="text-gray-700 text-sm">Provide required documents like Aadhaar, income certificate, and address proof</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                            <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                            <h3 className="font-bold text-gray-900 mb-2">Get Enrolled</h3>
                            <p className="text-gray-700 text-sm">Receive your scheme card/number and start availing benefits immediately</p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-8 bg-gradient-to-r from-[#9c1f6e] to-purple-700 text-white rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-3">Need Help?</h2>
                    <p className="text-purple-100 mb-6">Contact your nearest ASHA worker or health center for assistance with scheme enrollment</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/login" className="bg-white text-[#9c1f6e] px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                            Connect with ASHA Worker
                        </Link>
                        <Link to="/contact" className="bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-white/30">
                            Contact Us
                        </Link>
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
                                <li><Link to="/" className="hover:underline">Home</Link></li>
                                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                                <li><Link to="/schemes" className="hover:underline">Health Schemes</Link></li>
                                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-3">Important Links</h3>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li><a href="https://pmjay.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Ayushman Bharat</a></li>
                                <li><a href="https://www.nhp.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">National Health Portal</a></li>
                                <li><a href="https://mohfw.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Ministry of Health</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/20 pt-6 text-center text-sm text-gray-300">
                        <p>© 2025 SwasthyaSetu - Health & Family Welfare Department, Government of India</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Schemes;
