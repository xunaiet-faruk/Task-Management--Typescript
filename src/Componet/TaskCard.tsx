import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiEdit2, FiTrash2, FiCheck, FiClock, FiList } from 'react-icons/fi';
import { useState } from 'react';
import type { Task, TaskStatus } from '../Types/task';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition: isDragging ? 'none' : transition,
        opacity: isDragging ? 0.9 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 9999 : 1,
        willChange: 'transform',
        position: 'relative' as const,
        touchAction: 'none'
    };

    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case 'todo': return 'bg-gray-600/50 text-gray-300';
            case 'in-progress': return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
            case 'done': return 'bg-green-500/20 text-green-300 border border-green-500/30';
        }
    };

    const getStatusIcon = (status: TaskStatus) => {
        switch (status) {
            case 'todo': return <FiList className="inline mr-1" size={12} />;
            case 'in-progress': return <FiClock className="inline mr-1" size={12} />;
            case 'done': return <FiCheck className="inline mr-1" size={12} />;
        }
    };

    // ফিক্সড - variants সরিয়ে সরাসরি animate ব্যবহার করছি
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
        },
        hover: {
            scale: 1.03,
            y: -5,
        },
        tap: {
            scale: 0.98,
        }
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            {...attributes}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-blue-500/20"
        >
            {/* ড্র্যাগ হ্যান্ডেল */}
            <div
                {...listeners}
                className="cursor-grab active:cursor-grabbing px-4 pt-3 pb-1 select-none bg-white/5"
            >
                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                    <motion.span
                        className="text-lg"
                        animate={{ rotate: isHovered ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        ⋮⋮
                    </motion.span>
                    <motion.span
                        animate={{ opacity: isHovered ? 1 : 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        Drag to move
                    </motion.span>
                    <motion.span
                        className="text-lg"
                        animate={{ rotate: isHovered ? -90 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        ⋮⋮
                    </motion.span>
                </div>
            </div>

            <div className="p-4 pt-2">
                <div className="flex justify-between items-start mb-2">
                    <motion.h4
                        className="font-semibold text-white flex-1 pr-2"
                        animate={{
                            color: isHovered ? '#60A5FA' : '#FFFFFF',
                            x: isHovered ? 5 : 0
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {task.title}
                    </motion.h4>

                    <div className="flex gap-2">
                        {/* এডিট বাটন - variants সরিয়ে দিয়েছি */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onEdit(task);
                            }}
                            className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/20 transition-all duration-200"
                        >
                            <FiEdit2 size={16} />
                        </motion.button>

                        {/* ডিলিট বাটন - variants সরিয়ে দিয়েছি */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDelete(task.id);
                            }}
                            className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                        >
                            <FiTrash2 size={16} />
                        </motion.button>
                    </div>
                </div>

                {/* ডেসক্রিপশন */}
                <motion.p
                    className="text-gray-400 text-sm mb-3 cursor-pointer"
                    animate={{
                        opacity: isHovered ? 0.9 : 0.7
                    }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    transition={{ duration: 0.3 }}
                >
                    {task.description.length > 100 && !isExpanded
                        ? task.description.substring(0, 100) + '...'
                        : task.description}
                    {task.description.length > 100 && (
                        <motion.span
                            className="text-blue-400 text-xs ml-1"
                            animate={{ x: isHovered ? 3 : 0 }}
                        >
                            {isExpanded ? ' See less' : ' See more'}
                        </motion.span>
                    )}
                </motion.p>

                <div className="flex justify-between items-center">
                    {/* স্ট্যাটাস ব্যাজ */}
                    <motion.span
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${getStatusColor(task.status)}`}
                        whileHover={{ scale: 1.05 }}
                        animate={{
                            boxShadow: isHovered ? '0 0 10px rgba(59,130,246,0.3)' : 'none'
                        }}
                    >
                        {getStatusIcon(task.status)}
                        {task.status === 'todo' ? 'Todo' : task.status === 'in-progress' ? 'In Progress' : 'Done'}
                    </motion.span>

                    {/* স্ট্যাটাস ড্রপডাউন */}
                    <select
                        value={task.status}
                        onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onStatusChange(task.id, e.target.value as TaskStatus);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500 cursor-pointer hover:bg-white/20 transition-all duration-200"
                    >
                        <option value="todo">📋 Todo</option>
                        <option value="in-progress">⚡ In Progress</option>
                        <option value="done">✅ Done</option>
                    </select>
                </div>
            </div>

            {/* হোভার ইফেক্টের জন্য গ্লো এফেক্ট */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={{
                    boxShadow: isHovered
                        ? 'inset 0 0 20px rgba(59,130,246,0.1), 0 0 20px rgba(59,130,246,0.2)'
                        : 'inset 0 0 0px rgba(59,130,246,0)'
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

export default TaskCard;