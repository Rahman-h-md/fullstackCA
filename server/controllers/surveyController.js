import Survey from '../models/Survey.js';
import Patient from '../models/Patient.js';

export const createSurvey = async (req, res) => {
    try {
        const { patientName, age, bloodPressure, temperature, symptoms, ashaId, timestamp } = req.body;

        // In a real app, you would look up or create a Patient record first
        // For now, we'll just create a dummy patient ID if not provided or simplified

        // Create new Survey
        const newSurvey = new Survey({
            patientId: "6430378b27293a3861234567", // Dummy Object ID for logic
            ashaId,
            vitals: {
                bloodPressure,
                temperature
            },
            symptoms: symptoms ? symptoms.split(',') : [],
            timestamp: timestamp || new Date()
        });

        await newSurvey.save();
        res.status(201).json({ message: "Survey saved successfully", survey: newSurvey });
    } catch (error) {
        console.error("Survey Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find().populate('ashaId', 'name');
        res.json(surveys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
