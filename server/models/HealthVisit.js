import mongoose from 'mongoose';

const healthVisitSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    ashaWorkerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    visitType: {
        type: String,
        enum: ['ANC', 'PNC', 'Immunization', 'General', 'Emergency', 'Follow-up'],
        required: true
    },
    visitDate: { type: Date, required: true, default: Date.now },
    vitals: {
        bloodPressure: { type: String }, // e.g., "120/80"
        weight: { type: Number }, // in kg
        temperature: { type: Number }, // in °F
        hemoglobin: { type: Number }, // in g/dL
        pulse: { type: Number } // beats per minute
    },
    symptoms: [{ type: String }],
    notes: { type: String },
    photosUploaded: [{ type: String }], // File paths
    documentsUploaded: [{ type: String }], // File paths
    followUpRequired: { type: Boolean, default: false },
    followUpDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

// Index for faster queries
healthVisitSchema.index({ patientId: 1, visitDate: -1 });
healthVisitSchema.index({ ashaWorkerId: 1, visitDate: -1 });

export default mongoose.model('HealthVisit', healthVisitSchema);
