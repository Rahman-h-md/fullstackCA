import mongoose from 'mongoose';

const pregnancyTrackingSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, unique: true },
    ashaWorkerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lmp: { type: Date, required: true }, // Last Menstrual Period
    edd: { type: Date }, // Expected Delivery Date (auto-calculated)
    currentTrimester: { type: Number, min: 1, max: 3 },
    ancVisits: [{
        visitNumber: { type: Number, required: true },
        date: { type: Date, required: true },
        weight: { type: Number }, // in kg
        bp: { type: String }, // Blood Pressure
        hemoglobin: { type: Number }, // in g/dL
        tetanusToxoid: { type: Boolean, default: false },
        ifaTabletsGiven: { type: Number, default: 0 }, // Iron and Folic Acid tablets
        complications: { type: String },
        notes: { type: String }
    }],
    pncVisits: [{
        visitNumber: { type: Number, required: true },
        date: { type: Date, required: true },
        motherCondition: { type: String },
        motherWeight: { type: Number },
        motherBP: { type: String },
        babyCondition: { type: String },
        babyWeight: { type: Number }, // in kg
        breastfeedingStatus: { type: String, enum: ['Exclusive', 'Partial', 'None'] },
        complications: { type: String },
        notes: { type: String }
    }],
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    riskFactors: [{ type: String }],
    deliveryDate: { type: Date },
    deliveryOutcome: {
        type: String,
        enum: ['Live Birth', 'Stillbirth', 'Miscarriage', 'Abortion', 'Ongoing']
    },
    deliveryPlace: {
        type: String,
        enum: ['Hospital', 'PHC', 'Home', 'Other']
    },
    babyGender: { type: String, enum: ['Male', 'Female'] },
    babyWeight: { type: Number }, // Birth weight in kg
    status: {
        type: String,
        enum: ['Active', 'Delivered', 'Terminated'],
        default: 'Active'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Auto-calculate EDD (280 days from LMP)
pregnancyTrackingSchema.pre('save', function (next) {
    if (this.lmp && !this.edd) {
        const eddDate = new Date(this.lmp);
        eddDate.setDate(eddDate.getDate() + 280);
        this.edd = eddDate;
    }

    // Calculate current trimester based on LMP
    if (this.lmp && this.status === 'Active') {
        const today = new Date();
        const daysSinceLMP = Math.floor((today - this.lmp) / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(daysSinceLMP / 7);

        if (weeks <= 12) this.currentTrimester = 1;
        else if (weeks <= 26) this.currentTrimester = 2;
        else this.currentTrimester = 3;
    }

    this.updatedAt = Date.now();
    next();
});

// Index for faster queries
pregnancyTrackingSchema.index({ patientId: 1 });
pregnancyTrackingSchema.index({ ashaWorkerId: 1, status: 1 });

export default mongoose.model('PregnancyTracking', pregnancyTrackingSchema);
