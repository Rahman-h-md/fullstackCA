import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppointmentNotification = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.role === 'Patient') {
            fetchUpcomingAppointments();
        }
    }, [user]);

    const fetchUpcomingAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/appointments/my', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const appointments = await response.json();

            // Filter for confirmed appointments that are today or in the future
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const confirmed = appointments.filter(apt => {
                const aptDate = new Date(apt.date);
                aptDate.setHours(0, 0, 0, 0);
                return apt.status === 'Confirmed' && aptDate >= today;
            });

            setUpcomingAppointments(confirmed);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const aptDate = new Date(dateString);
        aptDate.setHours(0, 0, 0, 0);

        if (aptDate.getTime() === today.getTime()) {
            return 'Today';
        } else if (aptDate.getTime() === today.getTime() + 86400000) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-IN', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    const handleJoinConsultation = (appointmentId) => {
        navigate(`/consultation/${appointmentId}`);
    };

    if (loading || upcomingAppointments.length === 0) {
        return null;
    }

    return (
        <div className="mb-6">
            {upcomingAppointments.map((appointment) => (
                <div
                    key={appointment._id}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-4 mb-3 animate-pulse-slow"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-full">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Upcoming Consultation</h3>
                                <p className="text-sm text-blue-100">
                                    Dr. {appointment.doctorId?.name} • {formatDate(appointment.date)} at {appointment.timeSlot}
                                </p>
                                {appointment.reason && (
                                    <p className="text-xs text-blue-100 mt-1">Reason: {appointment.reason}</p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => handleJoinConsultation(appointment._id)}
                            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Join Consultation
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AppointmentNotification;
