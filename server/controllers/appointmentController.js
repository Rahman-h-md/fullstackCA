import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import Prescription from '../models/Prescription.js';

// Get list of all doctors
export const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'Doctor' }).select('name email phone assignedArea');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors", error });
    }
};

// Book an appointment
export const bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, timeSlot, reason } = req.body;

        // Basic validation
        if (!doctorId || !date || !timeSlot) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAppointment = new Appointment({
            patientId: req.user.id, // Logged in user
            doctorId,
            date,
            timeSlot,
            reason
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: "Error booking appointment", error });
    }
};

// Get Patient's own appointments
export const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user.id })
            .populate('doctorId', 'name phone')
            .populate('patientId', 'name email phone')
            .sort({ date: -1 });

        const appointmentsWithPrescriptions = await Promise.all(appointments.map(async (apt) => {
            if (apt.status === 'Completed') {
                const prescription = await Prescription.findOne({ appointmentId: apt._id });
                return { ...apt.toObject(), prescription };
            }
            return apt.toObject();
        }));

        res.json(appointmentsWithPrescriptions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
};
