import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/swasthya_setu')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const seedUsers = async () => {
    try {
        await User.deleteMany({ email: { $in: ['patient_demo@test.com', 'doctor_demo@test.com', 'asha_demo@test.com'] } });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const usersToCreate = [
            {
                name: 'Demo Patient',
                email: 'patient_demo@test.com',
                password: hashedPassword,
                role: 'Patient',
                phone: '1111111111'
            },
            {
                name: 'Demo Doctor',
                email: 'doctor_demo@test.com',
                password: hashedPassword,
                role: 'Doctor',
                phone: '2222222222'
            },
            {
                name: 'Demo ASHA',
                email: 'asha_demo@test.com',
                password: hashedPassword,
                role: 'ASHA',
                phone: '3333333333'
            }
        ];

        for (const u of usersToCreate) {
            const user = new User(u);
            await user.save();
            console.log(`Created ${u.role}: ${u.email}`);
        }

        console.log('Users Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
