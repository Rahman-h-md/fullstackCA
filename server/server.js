console.log("Server process starting...");
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';
import bloodBankRoutes from './routes/bloodBankRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import ashaRoutes from './routes/ashaRoutes.js';
import healthVisitRoutes from './routes/healthVisitRoutes.js';
import mchRoutes from './routes/mchRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import alertRoutes from './routes/alertRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["https://fullstack-ca-98bp-h4x70502f-rahmans-projects-5d6814d1.vercel.app", "https://fullstack-ca.vercel.app"],
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Share IO instance
app.set('io', io);

console.log("Connecting to MongoDB...");
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
console.log("Mounting routes...");
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/blood-banks', bloodBankRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/asha', ashaRoutes);
app.use('/api/health-visits', healthVisitRoutes);
app.use('/api/mch', mchRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/alerts', alertRoutes);


app.get('/', (req, res) => {
    res.send('SwasthyaSetu API Running');
});

io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);

    // WebRTC Signaling Events
    socket.on('join-room', (roomId) => {
        console.log(`User ${socket.id} joining room ${roomId}`);
        socket.join(roomId);
        // Notify others in the room
        socket.to(roomId).emit('user-joined', socket.id);
    });

    socket.on('offer', ({ roomId, signal }) => {
        console.log(`Offer from ${socket.id} in room ${roomId}`);
        socket.to(roomId).emit('offer', signal);
    });

    socket.on('answer', ({ roomId, signal }) => {
        console.log(`Answer from ${socket.id} in room ${roomId}`);
        socket.to(roomId).emit('answer', signal);
    });

    socket.on('ice-candidate', ({ roomId, candidate }) => {
        console.log(`ICE candidate from ${socket.id} in room ${roomId}`);
        socket.to(roomId).emit('ice-candidate', candidate);
    });

    socket.on('leave-room', (roomId) => {
        console.log(`User ${socket.id} leaving room ${roomId}`);
        socket.leave(roomId);
        socket.to(roomId).emit('user-left', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


export default httpServer;
