import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    address: { type: String },
    contactNumber: { type: String },
    abhaId: { type: String, unique: true }, // Ayushman Bharat Health Account
    qrCodeHash: { type: String },
    registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ASHA worker ID
    medicalHistory: [{
        condition: String,
        diagnosedDate: Date,
        status: String
    }],
    // ASHA-specific fields
    assignedAshaWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    isPregnant: { type: Boolean, default: false },
    hasChronicDisease: { type: Boolean, default: false },
    chronicDiseases: [{ type: String }],
    lastVisitDate: { type: Date },
    nextVisitDate: { type: Date },
    familyMembers: [{
        name: String,
        relation: String,
        age: Number,
        gender: String
    }],
    createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('Patient', patientSchema);
