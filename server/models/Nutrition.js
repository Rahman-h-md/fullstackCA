import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
        type: String,
        enum: ['Diet Plan', 'Supplement', 'General Advice'],
        default: 'Diet Plan'
    },
    category: {
        type: String,
        required: true,
        enum: ['Anemia', 'Diabetes', 'Pregnancy', 'Hypertension', 'Malnutrition', 'General']
    },
    recommendedItems: [{ type: String }], /* e.g., ["Spinach", "Red Meat"] */
    avoidItems: [{ type: String }],
    mealPlan: {
        breakfast: [String],
        lunch: [String],
        dinner: [String],
        snacks: [String]
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Nutrition', nutritionSchema);
