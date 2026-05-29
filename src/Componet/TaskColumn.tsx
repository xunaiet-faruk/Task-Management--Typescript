import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task, TaskStatus } from '../Types/task';
import TaskCard from './TaskCard';

interface TaskColumnProps {
    id: TaskStatus;
    title: string;
    icon: string;
    tasks: Task[];
    color: string;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskColumn = ({
    id, title, icon, tasks, color,
    onEdit, onDelete, onStatusChange
}: TaskColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    // কলাম এন্ট্রি অ্যানিমেশন
    const columnVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    // হেডার অ্যানিমেশন
    const headerVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.02,
            transition: { type: "spring", stiffness: 300 }
        }
    };

    return (
        <motion.div
            variants={columnVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-xl"
        >
            <motion.div
                className={`p-4 border-b ${color} bg-black/20 cursor-pointer`}
                variants={headerVariants}
                whileHover="hover"
            >
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <motion.span
                        animate={{
                            rotate: [0, 10, -10, 5, -5, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    >
                        {icon}
                    </motion.span>
                    {title}
                    <motion.span
                        className="text-sm text-gray-400"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        ({tasks.length})
                    </motion.span>
                </h3>
            </motion.div>

            <div
                ref={setNodeRef}
                className={`p-4 space-y-3 min-h-[500px] max-h-[600px] overflow-y-auto transition-all duration-300 ${isOver ? 'bg-blue-500/20' : ''
                    }`}
            >
                <SortableContext
                    items={tasks.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <AnimatePresence mode="popLayout">
                        {tasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{
                                    duration: 0.2,
                                    delay: index * 0.05
                                }}
                                layout
                            >
                                <TaskCard
                                    task={task}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onStatusChange={onStatusChange}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </SortableContext>

                {tasks.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring" }}
                        className="text-center text-gray-500 py-12"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="text-4xl mb-2"
                        >
                            {icon}
                        </motion.div>
                        No tasks<br />Drag & drop here
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default TaskColumn;