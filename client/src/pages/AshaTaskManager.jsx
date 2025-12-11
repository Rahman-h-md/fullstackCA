import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AshaTaskManager = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'completed'
    const [loading, setLoading] = useState(true);
    const [showAddTask, setShowAddTask] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        taskType: 'Home Visit',
        priority: 'Medium',
        dueDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchTasks();
    }, [activeTab]);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = activeTab === 'pending' ? 'pending' : 'completed';
            const response = await axios.get(`http://localhost:5000/api/tasks/${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };

    const handleCompleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/tasks/${taskId}/complete`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTasks();
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/tasks',
                newTask,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowAddTask(false);
            setNewTask({
                title: '',
                description: '',
                taskType: 'Home Visit',
                priority: 'Medium',
                dueDate: new Date().toISOString().split('T')[0]
            });
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Urgent': return 'bg-red-100 text-red-800 border-red-300';
            case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Low': return 'bg-gray-100 text-gray-800 border-gray-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1B365D]">Task Manager</h1>
                            <p className="text-sm text-gray-600">Manage your daily activities</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/asha/dashboard" className="text-gray-600 hover:text-gray-900">
                                ← Back to Dashboard
                            </Link>
                            <button
                                onClick={() => setShowAddTask(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                + Add Task
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`flex-1 px-6 py-4 text-center font-medium ${activeTab === 'pending'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Pending Tasks
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`flex-1 px-6 py-4 text-center font-medium ${activeTab === 'completed'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Completed Tasks
                        </button>
                    </div>
                </div>

                {/* Add Task Modal */}
                {showAddTask && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Task</h2>
                            <form onSubmit={handleAddTask}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Task Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newTask.title}
                                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={newTask.description}
                                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Task Type
                                        </label>
                                        <select
                                            value={newTask.taskType}
                                            onChange={(e) => setNewTask({ ...newTask, taskType: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option>Home Visit</option>
                                            <option>ANC Checkup</option>
                                            <option>PNC Checkup</option>
                                            <option>Vaccination Follow-up</option>
                                            <option>Medicine Distribution</option>
                                            <option>Health Education</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Priority
                                        </label>
                                        <select
                                            value={newTask.priority}
                                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                            <option>Urgent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Due Date *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={newTask.dueDate}
                                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddTask(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Task List */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading tasks...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {activeTab === 'pending' ? 'No pending tasks' : 'No completed tasks'}
                        </h3>
                        <p className="text-gray-600">
                            {activeTab === 'pending' ? 'All caught up! Add a new task to get started.' : 'Complete some tasks to see them here.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {activeTab === 'pending' && (
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleCompleteTask(task._id)}
                                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                            )}
                                            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                                        </div>
                                        {task.description && (
                                            <p className="text-gray-600 mb-3 ml-8">{task.description}</p>
                                        )}
                                        <div className="flex flex-wrap gap-2 ml-8">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded border ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                                                {task.taskType}
                                            </span>
                                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                                Due: {new Date(task.dueDate).toLocaleDateString()}
                                            </span>
                                            {task.autoGenerated && (
                                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                                    Auto-generated
                                                </span>
                                            )}
                                        </div>
                                        {task.patientId && (
                                            <p className="text-sm text-gray-600 mt-2 ml-8">
                                                Patient: <span className="font-medium">{task.patientId.fullName}</span>
                                            </p>
                                        )}
                                        {task.completedDate && (
                                            <p className="text-sm text-green-600 mt-2 ml-8">
                                                ✓ Completed on {new Date(task.completedDate).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AshaTaskManager;
