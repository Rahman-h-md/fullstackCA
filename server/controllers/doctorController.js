import Appointment from '../models/Appointment.js';
import Prescription from '../models/Prescription.js';
import Patient from '../models/Patient.js';

// --- Appointments ---

export const getDoctorAppointments = async (req, res) => {
    try {
        // Assuming req.user.id is the doctor's ID
        const appointments = await Appointment.find({ doctorId: req.user.id })
            .populate('patientId', 'fullName age gender contactNumber')
            .sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
};

export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error });
    }
};

// --- Prescriptions ---

export const createPrescription = async (req, res) => {
    try {
        const { appointmentId, patientId, diagnosis, medicines, advice, testsRecommended } = req.body;

        const newPrescription = new Prescription({
            appointmentId,
            patientId,
            doctorId: req.user.id,
            diagnosis,
            medicines,
            advice,
            testsRecommended
        });

        await newPrescription.save();

        // Optionally update appointment status to Completed
        if (appointmentId) {
            await Appointment.findByIdAndUpdate(appointmentId, { status: 'Completed' });
        }

        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(500).json({ message: "Error creating prescription", error });
    }
};

export const getPatientHistory = async (req, res) => {
    try {
        const { patientId } = req.params;
        const history = await Prescription.find({ patientId })
            .populate('doctorId', 'name')
            .sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history", error });
    }
};
