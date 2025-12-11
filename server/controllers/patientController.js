import Patient from '../models/Patient.js';

// @desc    Register a new patient
// @route   POST /api/patients
// @access  Private (ASHA/Doctor)
export const registerPatient = async (req, res) => {
    try {
        const { fullName, age, gender, address, contactNumber, abhaId, medicalHistory } = req.body;

        const patient = new Patient({
            fullName,
            age,
            gender,
            address,
            contactNumber,
            abhaId,
            qrCodeHash: abhaId || new Date().getTime().toString(), // Simple hash for now
            registeredBy: req.user._id,
            medicalHistory
        });

        const createdPatient = await patient.save();
        res.status(201).json(createdPatient);
    } catch (error) {
        res.status(500).json({ message: 'Error registering patient', error: error.message });
    }
};

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Private
export const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (patient) {
            res.json(patient);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient details' });
    }
};

// @desc    Get all patients (for ASHA list)
// @route   GET /api/patients
// @access  Private
export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({}).sort({ createdAt: -1 });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients' });
    }
};
