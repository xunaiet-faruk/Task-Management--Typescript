import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave } from 'react-icons/fi';
import type { Task } from '../Types/task';


interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    formData: { title: string; description: string };
    setFormData: (data: any) => void;
    editingTask: Task | null;
}

const TaskModal = ({ isOpen, onClose, onSubmit, formData, setFormData, editingTask }: TaskModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                    >
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-2xl font-bold text-white">
                                    {editingTask ? '✏️ Edit Task' : '✨ Create New Task'}
                                </h3>
                                <motion.button
                                    whileHover={{ rotate: 90 }}
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <FiX size={24} />
                                </motion.button>
                            </div>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Task Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onSubmit}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <FiSave /> {editingTask ? 'Update Task' : 'Create Task'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TaskModal;