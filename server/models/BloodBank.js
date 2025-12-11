import mongoose from 'mongoose';

const bloodBankSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    stock: {
        'A+': { type: Number, default: 0 },
        'A-': { type: Number, default: 0 },
        'B+': { type: Number, default: 0 },
        'B-': { type: Number, default: 0 },
        'AB+': { type: Number, default: 0 },
        'AB-': { type: Number, default: 0 },
        'O+': { type: Number, default: 0 },
        'O-': { type: Number, default: 0 },
    },
    lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('BloodBank', bloodBankSchema);
