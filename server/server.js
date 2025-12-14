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
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
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
    console.log('🔌 User Connected:', socket.id);

    // WebRTC Signaling Events
    socket.on('join-room', (data) => {
        // Handle both old format (just roomId string) and new format (object with roomId and isInitiator)
        const roomId = typeof data === 'string' ? data : data.roomId;
        const isInitiator = typeof data === 'object' ? data.isInitiator : false;

        console.log(`🚪 User ${socket.id} joining room ${roomId} as ${isInitiator ? 'INITIATOR' : 'RECEIVER'}`);

        // Get current room members before joining
        const room = io.sockets.adapter.rooms.get(roomId);
        const currentMembers = room ? room.size : 0;
        console.log(`   Current members in room: ${currentMembers}`);

        socket.join(roomId);

        // Notify others in the room that someone joined
        socket.to(roomId).emit('user-joined', socket.id);

        // If this is the second person, emit 'ready' to both
        if (currentMembers === 1) {
            console.log(`   ✅ Room ${roomId} is now ready with 2 members`);
            io.to(roomId).emit('ready');
        }

        console.log(`   ✅ User ${socket.id} joined room ${roomId}`);
    });

    socket.on('offer', ({ roomId, offer }) => {
        console.log(`📤 Offer from ${socket.id} in room ${roomId}`);
        socket.to(roomId).emit('offer', offer);
        console.log(`   ✅ Offer relayed to room ${roomId}`);
    });

    socket.on('answer', ({ roomId, answer }) => {
        console.log(`📤 Answer from ${socket.id} in room ${roomId}`);
        socket.to(roomId).emit('answer', answer);
        console.log(`   ✅ Answer relayed to room ${roomId}`);
    });

    socket.on('ice-candidate', ({ roomId, candidate }) => {
        console.log(`📤 ICE candidate from ${socket.id} in room ${roomId}`);
        socket.to(roomId).emit('ice-candidate', candidate);
    });

    socket.on('leave-room', (roomId) => {
        console.log(`🚪 User ${socket.id} leaving room ${roomId}`);
        socket.leave(roomId);
        socket.to(roomId).emit('user-left', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('🔌 User Disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


export default httpServer;
