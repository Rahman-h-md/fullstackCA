import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUnsyncedSurveys, db } from '../services/dexieDB';
import api from '../services/api';

const useSync = () => {
    const { user } = useAuth();
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, []);

    useEffect(() => {
        if (isOnline && user) {
            syncData();
        }
    }, [isOnline, user]);

    const syncData = async () => {
        if (isSyncing) return;
        setIsSyncing(true);

        try {
            const unsynced = await getUnsyncedSurveys();
            if (unsynced.length === 0) {
                setIsSyncing(false);
                return;
            }

            console.log(`Found ${unsynced.length} records to sync...`);

            // Bulk sync or individual
            for (const record of unsynced) {
                try {
                    // Remove local ID before sending if backend generates it, or keep it if needed
                    const { id, isSynced, ...payload } = record;
                    await api.post('/surveys', payload);

                    // Mark as synced locally or delete
                    await db.surveys.update(id, { isSynced: true });
                } catch (error) {
                    console.error("Failed to sync record:", record.id, error);
                }
            }
            console.log("Sync complete");
        } catch (err) {
            console.error("Sync Error:", err);
        } finally {
            setIsSyncing(false);
        }
    };

    return { isOnline, isSyncing, syncData };
};

export default useSync;
