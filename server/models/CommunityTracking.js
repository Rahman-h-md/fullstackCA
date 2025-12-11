import mongoose from 'mongoose';

const communityTrackingSchema = new mongoose.Schema({
    ashaWorkerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    area: { type: String, required: true }, // Village/Ward name
    eligibleCouples: [{
        husbandName: { type: String, required: true },
        wifeName: { type: String, required: true },
        husbandAge: { type: Number },
        wifeAge: { type: Number },
        address: { type: String },
        contactNumber: { type: String },
        familyPlanningMethod: {
            type: String,
            enum: ['None', 'Condom', 'Oral Pills', 'IUD', 'Injection', 'Sterilization', 'Natural', 'Other']
        },
        numberOfChildren: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now },
        notes: { type: String }
    }],
    newPregnancies: [{
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
        motherName: { type: String, required: true },
        detectedDate: { type: Date, required: true },
        registered: { type: Boolean, default: false },
        registrationDate: { type: Date },
        lmp: { type: Date },
        notes: { type: String }
    }],
    tbPatients: [{
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
        patientName: { type: String, required: true },
        tbType: { type: String, enum: ['Pulmonary', 'Extra-Pulmonary'] },
        treatmentStartDate: { type: Date, required: true },
        treatmentRegimen: { type: String },
        dotsCompliance: { type: Number, min: 0, max: 100 }, // Percentage
        lastDoseDate: { type: Date },
        missedDoses: { type: Number, default: 0 },
        treatmentStatus: {
            type: String,
            enum: ['Ongoing', 'Completed', 'Default', 'Transferred', 'Died']
        },
        notes: { type: String }
    }],
    chronicDiseases: [{
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
        patientName: { type: String, required: true },
        disease: {
            type: String,
            enum: ['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Kidney Disease', 'Cancer', 'Other']
        },
        diagnosisDate: { type: Date },
        underTreatment: { type: Boolean, default: false },
        lastCheckupDate: { type: Date },
        medications: [{ type: String }],
        notes: { type: String }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Auto-update timestamp
communityTrackingSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Index for faster queries
communityTrackingSchema.index({ ashaWorkerId: 1, area: 1 });

export default mongoose.model('CommunityTracking', communityTrackingSchema);
