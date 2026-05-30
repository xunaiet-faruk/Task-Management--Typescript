import { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { FiList, FiCheckCircle, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import StatsCard from './StatsCard';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import { mockTasks } from '../Data/MockData';
import type { Task, TaskStatus } from '../Types/task';

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '' });

    // Stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const pendingTasks = tasks.filter(t => t.status !== 'done').length;

    // Filter tasks by status
    const getTasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status);

    // Add Task
    const addTask = () => {
        if (!formData.title) return;
        const newTask: Task = {
            id: Date.now().toString(),
            title: formData.title,
            description: formData.description,
            status: 'todo',
            createdAt: new Date()
        };
        setTasks([newTask, ...tasks]);
        setFormData({ title: '', description: '' });
        setShowModal(false);
    };

    // Edit Task
    const editTask = (task: Task) => {
        setEditingTask(task);
        setFormData({ title: task.title, description: task.description });
        setShowModal(true);
    };

    const updateTask = () => {
        if (!editingTask || !formData.title) return;
        setTasks(tasks.map(task =>
            task.id === editingTask.id
                ? { ...task, title: formData.title, description: formData.description }
                : task
        ));
        setFormData({ title: '', description: '' });
        setEditingTask(null);
        setShowModal(false);
    };

    // Delete Task
    const deleteTask = (id: string) => {
        if (confirm('Delete this task?')) {
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    // Change Status
    const changeStatus = (id: string, newStatus: TaskStatus) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        ));
    };

    // Drag & Drop Handler - এখানে any ব্যবহার করো সমস্যা সমাধানের জন্য
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as TaskStatus;

        const task = tasks.find(t => t.id === taskId);
        if (task && task.status !== newStatus) {
            setTasks(tasks.map(t =>
                t.id === taskId ? { ...t, status: newStatus } : t
            ));
        }
    };

    const columns = [
        { id: 'todo' as const, title: 'Todo', icon: '📋', color: 'border-gray-500' },
        { id: 'in-progress' as const, title: 'In Progress', icon: '⚡', color: 'border-blue-500' },
        { id: 'done' as const, title: 'Done', icon: '✅', color: 'border-green-500' }
    ];

    const handleModalSubmit = () => {
        if (editingTask) {
            updateTask();
        } else {
            addTask();
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
            </div>

            <Navbar onAddClick={() => {
                setEditingTask(null);
                setFormData({ title: '', description: '' });
                setShowModal(true);
            }} />

            <div className="container mx-auto px-6 py-8 relative z-10">

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatsCard
                        title="Total Tasks"
                        count={totalTasks}
                        icon={<FiList />}
                        color="text-blue-400"
                        delay={0.1}
                    />
                    <StatsCard
                        title="Completed"
                        count={completedTasks}
                        icon={<FiCheckCircle />}
                        color="text-green-400"
                        delay={0.2}
                    />
                    <StatsCard
                        title="Pending"
                        count={pendingTasks}
                        icon={<FiClock />}
                        color="text-yellow-400"
                        delay={0.3}
                    />
                </div>

                {/* Drag & Drop Columns */}
                <DndContext
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {columns.map((col, index) => (
                            <motion.div
                                key={col.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <TaskColumn
                                    id={col.id}
                                    title={col.title}
                                    icon={col.icon}
                                    tasks={getTasksByStatus(col.id)}
                                    color={col.color}
                                    onEdit={editTask}
                                    onDelete={deleteTask}
                                    onStatusChange={changeStatus}
                                />
                            </motion.div>
                        ))}
                    </div>
                </DndContext>
            </div>

            {/* Modal */}
            <TaskModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingTask(null);
                    setFormData({ title: '', description: '' });
                }}
                onSubmit={handleModalSubmit}
                formData={formData}
                setFormData={setFormData}
                editingTask={editingTask}
            />
        </div>
    );
};

export default Dashboard;