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
        console.log('Current nutrition documents count:', count);

        // Clear existing data to allow re-seeding
        if (count > 0) {
            await Nutrition.deleteMany({});
            console.log('Cleared existing nutrition data');
        }

        const samplePlans = [
            {
                title: "Diabetes Management Plan",
                description: "A comprehensive diet and exercise plan to manage blood sugar levels effectively.",
                type: "Diet Plan",
                category: "Diabetes",
                recommendedItems: ["Whole grains", "Leafy vegetables", "Nuts", "Legumes", "Fish", "Low-fat dairy"],
                avoidItems: ["White rice", "Sugary drinks", "Processed foods", "White bread", "Fried foods"],
                mealPlan: {
                    breakfast: ["Oats with nuts", "Boiled egg", "Green tea"],
                    lunch: ["Brown rice", "Dal", "Mixed vegetables", "Salad"],
                    dinner: ["Roti (2)", "Grilled chicken/paneer", "Vegetable soup"],
                    snacks: ["Roasted chana", "Cucumber slices", "Buttermilk"]
                },
                exercises: ["Brisk walking 30 mins daily", "Yoga", "Swimming", "Cycling", "Light weight training"]
            },
            {
                title: "Hypertension Control Plan",
                description: "Low-sodium diet plan to manage high blood pressure naturally.",
                type: "Diet Plan",
                category: "Hypertension",
                recommendedItems: ["Bananas", "Leafy greens", "Berries", "Oats", "Garlic", "Beetroot", "Low-fat yogurt"],
                avoidItems: ["Salt", "Pickles", "Processed meats", "Canned foods", "Alcohol", "Caffeine"],
                mealPlan: {
                    breakfast: ["Oatmeal with berries", "Banana", "Herbal tea"],
                    lunch: ["Brown rice", "Steamed vegetables", "Dal without salt", "Salad"],
                    dinner: ["Roti", "Grilled fish", "Beetroot salad"],
                    snacks: ["Fresh fruits", "Unsalted nuts", "Coconut water"]
                },
                exercises: ["Walking 40 mins", "Meditation", "Deep breathing exercises", "Light aerobics", "Yoga"]
            },
            {
                title: "Iron-Rich Diet for Anemia",
                description: "A diet plan focused on increasing hemoglobin levels naturally.",
                type: "Diet Plan",
                category: "Anemia",
                recommendedItems: ["Spinach", "Red meat", "Lentils", "Pomegranate", "Dates", "Beetroot", "Liver"],
                avoidItems: ["Coffee with meals", "Tea with meals", "Calcium supplements with iron-rich meals"],
                mealPlan: {
                    breakfast: ["Poha with peanuts", "Glass of milk", "Orange juice"],
                    lunch: ["Spinach dal", "Rice", "Beetroot salad", "Jaggery"],
                    dinner: ["Roti", "Mixed vegetable curry", "Pomegranate"],
                    snacks: ["Dates", "Jaggery and peanuts", "Raisins"]
                },
                exercises: ["Light walking", "Yoga", "Breathing exercises", "Avoid strenuous exercise initially"]
            },
            {
                title: "Weight Management for Obesity",
                description: "Balanced calorie-controlled diet with exercise for healthy weight loss.",
                type: "Diet Plan",
                category: "Obesity",
                recommendedItems: ["Vegetables", "Fruits", "Lean protein", "Whole grains", "Green tea", "Water"],
                avoidItems: ["Fast food", "Sugary drinks", "Fried foods", "Processed snacks", "White bread", "Desserts"],
                mealPlan: {
                    breakfast: ["Vegetable upma", "Boiled egg whites", "Green tea"],
                    lunch: ["Small portion brown rice", "Dal", "Lots of vegetables", "Salad"],
                    dinner: ["Vegetable soup", "Grilled chicken/paneer", "Salad"],
                    snacks: ["Fruits", "Roasted makhana", "Buttermilk"]
                },
                exercises: ["Brisk walking 45 mins", "Jogging", "Swimming", "Cycling", "Strength training", "Zumba"]
            },
            {
                title: "Heart-Healthy Diet Plan",
                description: "Nutrition plan to support cardiovascular health and prevent heart disease.",
                type: "Diet Plan",
                category: "Heart Disease",
                recommendedItems: ["Oats", "Fatty fish", "Nuts", "Olive oil", "Berries", "Leafy greens", "Avocado"],
                avoidItems: ["Trans fats", "Red meat", "Processed foods", "Excess salt", "Fried foods", "Butter"],
                mealPlan: {
                    breakfast: ["Oatmeal with berries", "Walnuts", "Green tea"],
                    lunch: ["Brown rice", "Grilled fish", "Steamed vegetables", "Salad"],
                    dinner: ["Quinoa", "Vegetable curry", "Salad with olive oil"],
                    snacks: ["Almonds", "Apple", "Low-fat yogurt"]
                },
                exercises: ["Moderate walking 30 mins", "Swimming", "Cycling", "Yoga", "Tai Chi"]
            },
            {
                title: "Thyroid Balance Diet",
                description: "Nutritional support for thyroid function and hormone balance.",
                type: "Diet Plan",
                category: "Thyroid",
                recommendedItems: ["Iodized salt", "Fish", "Eggs", "Nuts", "Whole grains", "Fruits", "Vegetables"],
                avoidItems: ["Excessive soy", "Raw cruciferous vegetables", "Processed foods", "Excess caffeine"],
                mealPlan: {
                    breakfast: ["Whole wheat toast", "Boiled egg", "Milk"],
                    lunch: ["Brown rice", "Fish curry", "Cooked vegetables", "Salad"],
                    dinner: ["Roti", "Dal", "Cooked spinach", "Curd"],
                    snacks: ["Brazil nuts", "Fruits", "Yogurt"]
                },
                exercises: ["Walking", "Yoga", "Swimming", "Light cardio", "Strength training"]
            },
            {
                title: "PCOD/PCOS Management Plan",
                description: "Hormone-balancing diet to manage PCOD/PCOS symptoms naturally.",
                type: "Diet Plan",
                category: "PCOD/PCOS",
                recommendedItems: ["Whole grains", "Leafy greens", "Fatty fish", "Nuts", "Berries", "Cinnamon", "Turmeric"],
                avoidItems: ["Refined carbs", "Sugary foods", "Processed foods", "Red meat", "Dairy (if sensitive)"],
                mealPlan: {
                    breakfast: ["Oats with cinnamon", "Boiled egg", "Green tea"],
                    lunch: ["Brown rice", "Fish", "Lots of vegetables", "Salad"],
                    dinner: ["Quinoa", "Grilled chicken", "Vegetable soup"],
                    snacks: ["Nuts", "Berries", "Herbal tea"]
                },
                exercises: ["Brisk walking 40 mins", "Yoga", "Strength training", "HIIT (moderate)", "Pilates"]
            },
            {
                title: "Arthritis Relief Diet",
                description: "Anti-inflammatory diet to reduce joint pain and improve mobility.",
                type: "Diet Plan",
                category: "Arthritis",
                recommendedItems: ["Fatty fish", "Turmeric", "Ginger", "Berries", "Leafy greens", "Nuts", "Olive oil"],
                avoidItems: ["Fried foods", "Processed foods", "Sugar", "Red meat", "Refined carbs", "Alcohol"],
                mealPlan: {
                    breakfast: ["Oatmeal with berries", "Walnuts", "Turmeric milk"],
                    lunch: ["Brown rice", "Fish curry with turmeric", "Vegetables", "Salad"],
                    dinner: ["Roti", "Dal", "Ginger-garlic vegetables"],
                    snacks: ["Almonds", "Fruits", "Ginger tea"]
                },
                exercises: ["Swimming", "Water aerobics", "Gentle yoga", "Tai Chi", "Light stretching"]
            },
            {
                title: "Balanced Diet for Pregnancy",
                description: "Nutritious meal plan for expecting mothers and baby's development.",
                type: "Diet Plan",
                category: "Pregnancy",
                recommendedItems: ["Milk", "Eggs", "Green leafy vegetables", "Fruits", "Nuts", "Whole grains", "Lentils"],
                avoidItems: ["Raw papaya", "Excess caffeine", "Raw eggs", "Unpasteurized dairy", "Alcohol"],
                mealPlan: {
                    breakfast: ["Oatmeal with fruits", "Boiled egg", "Milk"],
                    lunch: ["Roti", "Dal", "Curd", "Green vegetables", "Salad"],
                    dinner: ["Brown rice", "Fish/chicken", "Vegetable soup"],
                    snacks: ["Roasted chana", "Fruit chat", "Nuts", "Dates"]
                },
                exercises: ["Prenatal yoga", "Walking", "Swimming", "Pelvic floor exercises", "Breathing exercises"]
            },
            {
                title: "Nutrition Plan for Malnutrition",
                description: "High-calorie, nutrient-dense diet to combat malnutrition.",
                type: "Diet Plan",
                category: "Malnutrition",
                recommendedItems: ["Eggs", "Milk", "Nuts", "Bananas", "Sweet potato", "Lentils", "Chicken", "Ghee"],
                avoidItems: ["Empty calories", "Junk food", "Excessive fiber initially"],
                mealPlan: {
                    breakfast: ["Banana shake with nuts", "Paratha with ghee", "Boiled eggs"],
                    lunch: ["Rice", "Dal with ghee", "Chicken curry", "Vegetables"],
                    dinner: ["Roti with ghee", "Paneer curry", "Sweet potato", "Milk"],
                    snacks: ["Nuts", "Dates", "Banana", "Peanut butter sandwich"]
                },
                exercises: ["Light walking", "Gentle stretching", "Gradually increase activity", "Avoid strenuous exercise initially"]
            }
        ];

        console.log('Inserting', samplePlans.length, 'nutrition plans');
        const result = await Nutrition.insertMany(samplePlans);
        console.log('Successfully inserted', result.length, 'plans');

        res.json({
            message: "Seeded nutrition data successfully",
            count: result.length,
            categories: result.map(p => p.category)
        });
    } catch (error) {
        console.error('Seed Error:', error);
        res.status(500).json({ message: "Seed Error", error: error.message });
    }
};
