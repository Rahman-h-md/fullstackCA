import Nutrition from '../models/Nutrition.js';

// Get all nutrition plans (optionally filter by category)
export const getNutritionPlans = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category) {
            query.category = category;
        }

        const plans = await Nutrition.find(query);
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Create a new nutrition plan (Admin/Doctor only)
export const createNutritionPlan = async (req, res) => {
    try {
        const newPlan = new Nutrition({
            ...req.body,
            createdBy: req.user.id
        });
        await newPlan.save();
        res.status(201).json(newPlan);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Seed initial data if empty (Helper for demo)
export const seedNutritionData = async (req, res) => {
    try {
        const count = await Nutrition.countDocuments();
        if (count > 0) return res.json({ message: "Data already exists" });

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
            }
        ];

        await Nutrition.insertMany(samplePlans);
        res.json({ message: "Seeded nutrition data" });
    } catch (error) {
        res.status(500).json({ message: "Seed Error", error: error.message });
    }
};
