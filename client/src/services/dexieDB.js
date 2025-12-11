import Dexie from 'dexie';

export const db = new Dexie('SwasthyaSetuDB');

db.version(1).stores({
    surveys: '++id, patientId, isSynced, timestamp', // Primary key and indexed props
    offlineQueue: '++id, url, method, body, timestamp' // Queue for other offline actions
});

export const saveSurveyOffline = async (surveyData) => {
    return await db.surveys.add({
        ...surveyData,
        isSynced: false,
        timestamp: new Date()
    });
};

export const getUnsyncedSurveys = async () => {
    return await db.surveys.where('isSynced').equals(false).toArray();
};
