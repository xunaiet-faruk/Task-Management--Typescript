import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

interface NavbarProps {
    onAddClick: () => void;
}

const Navbar = ({ onAddClick }: NavbarProps) => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-20"
        >
            <div className="container mx-auto px-6 py-5">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Task<span className="text-blue-400">Flow</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Drag & Drop Dashboard</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onAddClick}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                        <FiPlus /> Create Task
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;