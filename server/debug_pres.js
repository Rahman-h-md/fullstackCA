import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from './models/Appointment.js';
import Prescription from './models/Prescription.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('Connected to MongoDB');

        const appointments = await Appointment.find({ status: 'Completed' });
        console.log(`Found ${appointments.length} completed appointments.`);

        for (const apt of appointments) {
            console.log(`Checking Appointment ID: ${apt._id}`);
            const pres = await Prescription.findOne({ appointmentId: apt._id });
            if (pres) {
                console.log(`  -> Found Prescription ID: ${pres._id}`);
                console.log(`  -> Diagnosis: ${pres.diagnosis}`);
            } else {
                console.log(`  -> NO Prescription found!`);
                // Check if any prescription exists for this patient just in case
                const loosePres = await Prescription.findOne({ patientId: apt.patientId });
                if (loosePres) {
                    console.log(`  -> BUT Found a prescription for this patient (ID: ${loosePres._id}) with aptId: ${loosePres.appointmentId}`);
                    console.log(`     Match? ${loosePres.appointmentId.toString() === apt._id.toString()}`);
                }
            }
        }

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
