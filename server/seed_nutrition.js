import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Nutrition from './models/Nutrition.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/swasthya_setu');
        console.log('MongoDB Connected');

        // Check if data exists
        const count = await Nutrition.countDocuments();
        if (count > 0) {
            console.log('Nutrition data already exists. Skipping seed.');
            process.exit();
        }

        const samplePlans = [
            {
                title: "Iron-Rich Diet for Anemia",
                description: "A diet plan focused on increasing hemoglobin levels naturally.",
                type: "Diet Plan",
                category: "Anemia",
                recommendedItems: ["Spinach", "Red Meat", "Lentils", "Pomegranate"],
                avoidItems: ["Coffee", "Tea (with meals)"],
                mealPlan: {
                    breakfast: ["Poha with peanuts", "Glass of milk"],
                    lunch: ["Spinach dal", "Rice", "Salad"],
                    dinner: ["Roti", "Mixed vegetable curry"],
                    snacks: ["Jaggery and peanuts"]
                }
            },
            {
                title: "Balanced Diet for Pregnancy",
                description: "Nutritious meal plan for expecting mothers.",
                type: "Diet Plan",
                category: "Pregnancy",
                recommendedItems: ["Milk", "Eggs", "Green Leafy Vegetables", "Fruits"],
                avoidItems: ["Raw papaya", "Excess caffeine"],
                mealPlan: {
                    breakfast: ["Oatmeal with fruits", "Boiled egg"],
                    lunch: ["Roti", "Dal", "Curd", "Green veg"],
                    dinner: ["Khichdi", "Soup"],
                    snacks: ["Roasted chana", "Fruit chat"]
                }
            },
            {
                title: "Diabetic Friendly Diet",
                description: "Low glycemic index foods to manage blood sugar.",
                type: "Diet Plan",
                category: "Diabetes",
                recommendedItems: ["Bitter gourd", "Methi", "Whole grains", "Jamun"],
                avoidItems: ["Sugar", "Sweets", "White bread", "Potatoes"],
                mealPlan: {
                    breakfast: ["Oats upma", "Black tea"],
                    lunch: ["Multigrain Roti", "Dal", "Salad"],
                    dinner: ["Light vegetable soup", "Grilled fish/paneer"],
                    snacks: ["Roasted makhana"]
                }
            }
        ];

        await Nutrition.insertMany(samplePlans);
        console.log('Nutrition data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Seed Error:', error);
        process.exit(1);
    }
};

seed();
