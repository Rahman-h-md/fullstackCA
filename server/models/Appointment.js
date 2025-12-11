import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // e.g., "10:00 AM - 10:30 AM"
    reason: { type: String },
    notes: { type: String }, // Doctor's internal notes
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Appointment', appointmentSchema);
