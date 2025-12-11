import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    ashaId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vitals: {
        bloodPressure: { type: String },
        sugarLevel: { type: Number },
        spo2: { type: Number },
        temperature: { type: Number },
        weight: { type: Number },
        height: { type: Number },
        bmi: { type: Number }
    },
    symptoms: [String],
    nutritionGenera: { type: String }, // AI generated suggestions
    location: {
        lat: Number,
        lng: Number
    },
    isSynced: { type: Boolean, default: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Survey', surveySchema);
