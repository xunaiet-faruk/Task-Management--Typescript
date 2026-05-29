import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsCardProps {
    title: string;
    count: number;
    icon: ReactNode;
    color: string;
    delay: number;
}

const StatsCard = ({ title, count, icon, color, delay }: StatsCardProps) => {
    const iconVariants = {
        initial: { scale: 1, rotate: 0 },
        hover: {
            scale: 1.2,
            rotate: [0, -10, 10, -5, 5, 0],
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        },
        tap: { scale: 0.9 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm">{title}</p>
                    <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
                        className={`text-4xl font-bold mt-2 ${color}`}
                    >
                        {count}
                    </motion.p>
                </div>

                <motion.div
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="text-5xl opacity-70"
                >
                    {icon}
                </motion.div>
            </div>

            {/* প্রগ্রেস বার */}
            <motion.div
                className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: delay + 0.3, duration: 0.8 }}
            >
                <motion.div
                    className={`h-full ${color.replace('text', 'bg')}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / 100) * 100}%` }}
                    transition={{ delay: delay + 0.5, duration: 1 }}
                />
            </motion.div>
        </motion.div>
    );
};

export default StatsCard;