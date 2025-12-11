import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    diagnosis: { type: String, required: true },
    medicines: [{
        name: { type: String, required: true },
        dosage: { type: String, required: true }, // e.g., "500mg"
        frequency: { type: String, required: true }, // e.g., "1-0-1"
        duration: { type: String, required: true }, // e.g., "5 days"
        instructions: { type: String } // e.g., "After food"
    }],
    advice: { type: String }, // Lifestyle/Dietary advice
    testsRecommended: [{ type: String }],
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Prescription', prescriptionSchema);
