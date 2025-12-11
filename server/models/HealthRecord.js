import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recordType: {
        type: String,
        required: true,
        enum: [
            'Prescription',
            'Lab Report',
            'X-Ray',
            'Ultrasound',
            'ECG',
            'Blood Test',
            'Urine Test',
            'Vaccination Card',
            'Discharge Summary',
            'Other'
        ]
    },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: Number }, // in bytes
    mimeType: { type: String },
    description: { type: String },
    recordDate: { type: Date }, // Date of the actual medical record
    uploadDate: { type: Date, default: Date.now },
    tags: [{ type: String }],
    relatedVisitId: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthVisit' },
    relatedAppointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    isActive: { type: Boolean, default: true }, // For soft delete
    createdAt: { type: Date, default: Date.now }
});

// Index for faster queries
healthRecordSchema.index({ patientId: 1, uploadDate: -1 });
healthRecordSchema.index({ uploadedBy: 1 });
healthRecordSchema.index({ recordType: 1 });

export default mongoose.model('HealthRecord', healthRecordSchema);
