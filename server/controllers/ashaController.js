import Patient from '../models/Patient.js';
import HealthVisit from '../models/HealthVisit.js';
import PregnancyTracking from '../models/PregnancyTracking.js';
import Immunization from '../models/Immunization.js';
import Task from '../models/Task.js';
import Alert from '../models/Alert.js';

// Get ASHA dashboard summary
export const getDashboardSummary = async (req, res) => {
    try {
        const ashaWorkerId = req.user.id;

        // Get counts
        const totalPatients = await Patient.countDocuments({ assignedAshaWorker: ashaWorkerId });
        const highRiskPatients = await Patient.countDocuments({
            assignedAshaWorker: ashaWorkerId,
            riskLevel: 'High'
        });
        const pregnantWomen = await Patient.countDocuments({
            assignedAshaWorker: ashaWorkerId,
            isPregnant: true
        });

        const pendingTasks = await Task.countDocuments({
            ashaWorkerId,
            status: { $in: ['Pending', 'In Progress'] }
        });

        const activeAlerts = await Alert.countDocuments({
            ashaWorkerId,
            status: 'Active'
        });

        // Get upcoming visits (next 7 days)
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const upcomingVisits = await Patient.countDocuments({
            assignedAshaWorker: ashaWorkerId,
            nextVisitDate: { $gte: today, $lte: nextWeek }
        });

        // Get recent visits (last 7 days)
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        const recentVisits = await HealthVisit.countDocuments({
            ashaWorkerId,
            visitDate: { $gte: lastWeek }
        });

        // Get critical alerts
        const criticalAlerts = await Alert.find({
            ashaWorkerId,
            status: 'Active',
            priority: 'Critical'
        })
            .populate('patientId', 'fullName contactNumber')
            .limit(5);

        // Get today's tasks
        const todayStart = new Date(today.setHours(0, 0, 0, 0));
        const todayEnd = new Date(today.setHours(23, 59, 59, 999));

        const todaysTasks = await Task.find({
            ashaWorkerId,
            dueDate: { $gte: todayStart, $lte: todayEnd },
            status: { $in: ['Pending', 'In Progress'] }
        })
            .populate('patientId', 'fullName contactNumber')
            .sort({ priority: -1 })
            .limit(10);

        res.json({
            summary: {
                totalPatients,
                highRiskPatients,
                pregnantWomen,
                pendingTasks,
                activeAlerts,
                upcomingVisits,
                recentVisits
            },
            criticalAlerts,
            todaysTasks
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard summary', error: error.message });
    }
};

// Get all assigned patients
export const getAssignedPatients = async (req, res) => {
    try {
        const { search, riskLevel, isPregnant } = req.query;

        const filter = { assignedAshaWorker: req.user.id };

        if (riskLevel) filter.riskLevel = riskLevel;
        if (isPregnant !== undefined) filter.isPregnant = isPregnant === 'true';

        if (search) {
            filter.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { contactNumber: { $regex: search, $options: 'i' } },
                { abhaId: { $regex: search, $options: 'i' } }
            ];
        }

        const patients = await Patient.find(filter)
            .sort({ riskLevel: -1, fullName: 1 })
            .limit(100);

        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error: error.message });
    }
};

// Get high-risk patients
export const getHighRiskPatients = async (req, res) => {
    try {
        const patients = await Patient.find({
            assignedAshaWorker: req.user.id,
            riskLevel: 'High'
        }).sort({ fullName: 1 });

        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching high-risk patients', error: error.message });
    }
};

// Get patient details with related records
export const getPatientDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patient.findOne({
            _id: id,
            assignedAshaWorker: req.user.id
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Get related records
        const visits = await HealthVisit.find({ patientId: id })
            .sort({ visitDate: -1 })
            .limit(10);

        const pregnancy = await PregnancyTracking.findOne({
            patientId: id,
            status: 'Active'
        });

        const immunization = await Immunization.findOne({ childId: id });

        const tasks = await Task.find({
            patientId: id,
            status: { $in: ['Pending', 'In Progress'] }
        }).sort({ dueDate: 1 });

        const alerts = await Alert.find({
            patientId: id,
            status: 'Active'
        }).sort({ priority: -1 });

        res.json({
            patient,
            visits,
            pregnancy,
            immunization,
            tasks,
            alerts
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient details', error: error.message });
    }
};

// Add new patient
export const addPatient = async (req, res) => {
    try {
        const patientData = {
            ...req.body,
            assignedAshaWorker: req.user.id,
            registeredBy: req.user.id
        };

        const patient = new Patient(patientData);
        await patient.save();

        // Auto-create pregnancy tracking if patient is pregnant
        if (req.body.isPregnant && req.body.lmp) {
            try {
                const PregnancyTracking = (await import('../models/PregnancyTracking.js')).default;
                const Task = (await import('../models/Task.js')).default;

                const pregnancy = new PregnancyTracking({
                    patientId: patient._id,
                    ashaWorkerId: req.user.id,
                    lmp: new Date(req.body.lmp),
                    status: 'Active'
                });
                await pregnancy.save();

                // Create ANC visit tasks
                const ancTasks = [];
                const lmp = new Date(req.body.lmp);

                // Schedule 4 ANC visits
                for (let i = 1; i <= 4; i++) {
                    let weeksFromLMP;
                    if (i === 1) weeksFromLMP = 12;
                    else if (i === 2) weeksFromLMP = 20;
                    else if (i === 3) weeksFromLMP = 28;
                    else weeksFromLMP = 36;

                    const dueDate = new Date(lmp);
                    dueDate.setDate(dueDate.getDate() + (weeksFromLMP * 7));

                    ancTasks.push({
                        ashaWorkerId: req.user.id,
                        taskType: 'ANC Checkup',
                        priority: 'High',
                        patientId: patient._id,
                        title: `ANC Visit ${i}`,
                        description: `Scheduled ANC visit ${i} at ${weeksFromLMP} weeks`,
                        dueDate,
                        autoGenerated: true,
                        relatedRecordId: pregnancy._id,
                        relatedRecordType: 'PregnancyTracking'
                    });
                }

                await Task.insertMany(ancTasks);
                console.log(`Created pregnancy tracking and ${ancTasks.length} ANC tasks for patient ${patient._id}`);
            } catch (error) {
                console.error('Error creating pregnancy tracking:', error);
                // Don't fail the whole request if pregnancy tracking fails
            }
        }

        // Auto-create immunization tracking if requested
        if (req.body.trackImmunization && req.body.dateOfBirth) {
            try {
                const Immunization = (await import('../models/Immunization.js')).default;
                const Task = (await import('../models/Task.js')).default;

                // Standard immunization schedule (in days from birth)
                const VACCINE_SCHEDULE = {
                    'BCG': 0,
                    'OPV-0': 0,
                    'Hepatitis B-0': 0,
                    'OPV-1': 42,
                    'Pentavalent-1': 42,
                    'Rotavirus-1': 42,
                    'PCV-1': 42,
                    'OPV-2': 70,
                    'Pentavalent-2': 70,
                    'Rotavirus-2': 70,
                    'PCV-2': 70,
                    'OPV-3': 98,
                    'Pentavalent-3': 98,
                    'Rotavirus-3': 98,
                    'PCV-3': 98,
                    'IPV': 98,
                    'Measles-1': 270,
                    'Vitamin A-1': 270,
                    'DPT Booster-1': 540,
                    'OPV Booster': 540,
                    'Measles-2': 540,
                    'Vitamin A-2': 540,
                    'DPT Booster-2': 1825
                };

                // Generate vaccine schedule
                const dateOfBirth = new Date(req.body.dateOfBirth);
                const vaccines = Object.entries(VACCINE_SCHEDULE).map(([name, daysFromBirth]) => {
                    const scheduledDate = new Date(dateOfBirth);
                    scheduledDate.setDate(scheduledDate.getDate() + daysFromBirth);

                    return {
                        name,
                        scheduledDate,
                        status: 'Pending'
                    };
                });

                const immunization = new Immunization({
                    childId: patient._id,
                    ashaWorkerId: req.user.id,
                    dateOfBirth,
                    vaccines
                });

                await immunization.save();

                // Create tasks for upcoming vaccines (next 30 days)
                const today = new Date();
                const thirtyDaysLater = new Date(today);
                thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

                const upcomingVaccines = vaccines.filter(v =>
                    v.scheduledDate >= today && v.scheduledDate <= thirtyDaysLater
                );

                const tasks = upcomingVaccines.map(vaccine => ({
                    ashaWorkerId: req.user.id,
                    taskType: 'Vaccination Follow-up',
                    priority: 'High',
                    patientId: patient._id,
                    title: `${vaccine.name} Vaccination`,
                    description: `Administer ${vaccine.name} vaccine`,
                    dueDate: vaccine.scheduledDate,
                    autoGenerated: true,
                    relatedRecordId: immunization._id,
                    relatedRecordType: 'Immunization'
                }));

                if (tasks.length > 0) {
                    await Task.insertMany(tasks);
                }

                console.log(`Created immunization tracking with ${vaccines.length} vaccines and ${tasks.length} tasks for patient ${patient._id}`);
            } catch (error) {
                console.error('Error creating immunization tracking:', error);
                // Don't fail the whole request if immunization tracking fails
            }
        }

        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error adding patient', error: error.message });
    }
};


// Update patient
export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patient.findOneAndUpdate(
            { _id: id, assignedAshaWorker: req.user.id },
            req.body,
            { new: true }
        );

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
};
