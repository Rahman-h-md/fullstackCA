import mongoose from 'mongoose';

const immunizationSchema = new mongoose.Schema({
    childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, unique: true },
    ashaWorkerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfBirth: { type: Date, required: true },
    vaccines: [{
        name: {
            type: String,
            required: true,
            enum: [
                'BCG', 'OPV-0', 'Hepatitis B-0',
                'OPV-1', 'Pentavalent-1', 'Rotavirus-1', 'PCV-1',
                'OPV-2', 'Pentavalent-2', 'Rotavirus-2', 'PCV-2',
                'OPV-3', 'Pentavalent-3', 'Rotavirus-3', 'PCV-3', 'IPV',
                'Measles-1', 'Vitamin A-1',
                'DPT Booster-1', 'OPV Booster', 'Measles-2', 'Vitamin A-2',
                'DPT Booster-2'
            ]
        },
        scheduledDate: { type: Date, required: true },
        givenDate: { type: Date },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Missed', 'Overdue'],
            default: 'Pending'
        },
        batchNumber: { type: String },
        administeredBy: { type: String },
        administeredAt: { type: String }, // Location/facility
        adverseReaction: { type: String },
        notes: { type: String }
    }],
    growthChart: [{
        date: { type: Date, required: true },
        ageInMonths: { type: Number },
        weight: { type: Number }, // in kg
        height: { type: Number }, // in cm
        headCircumference: { type: Number }, // in cm
        muac: { type: Number }, // Mid-Upper Arm Circumference in cm
        zScoreWeight: { type: Number }, // Weight-for-age Z-score
        zScoreHeight: { type: Number }, // Height-for-age Z-score
        zScoreWFH: { type: Number }, // Weight-for-height Z-score
        nutritionalStatus: {
            type: String,
            enum: ['Normal', 'Underweight', 'Severely Underweight', 'Overweight', 'Stunted', 'Wasted']
        },
        notes: { type: String }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Auto-update vaccine status based on dates
immunizationSchema.pre('save', function (next) {
    const today = new Date();

    this.vaccines.forEach(vaccine => {
        if (vaccine.givenDate) {
            vaccine.status = 'Completed';
        } else if (vaccine.scheduledDate < today && !vaccine.givenDate) {
            vaccine.status = 'Overdue';
        }
    });

    // Calculate age in months for growth chart entries
    this.growthChart.forEach(entry => {
        if (entry.date && this.dateOfBirth) {
            const months = Math.floor((entry.date - this.dateOfBirth) / (1000 * 60 * 60 * 24 * 30.44));
            entry.ageInMonths = months;
        }
    });

    this.updatedAt = Date.now();
    next();
});

// Index for faster queries
immunizationSchema.index({ childId: 1 });
immunizationSchema.index({ ashaWorkerId: 1 });

export default mongoose.model('Immunization', immunizationSchema);
