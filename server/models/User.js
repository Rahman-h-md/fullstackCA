import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['ASHA', 'Doctor', 'Admin', 'Patient'],
        default: 'Patient'
    },
    phone: { type: String },
    assignedArea: { type: String }, // For ASHA workers
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
