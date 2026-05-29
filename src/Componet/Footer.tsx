import React from 'react';
import { motion } from 'framer-motion';
import {
    FiHeart,
    FiGithub,
    FiTwitter,
    FiLinkedin,
    FiMail,
    FiArrowUp,
    FiCode,
    FiZap
} from 'react-icons/fi';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    // সোশ্যাল লিংকস
    const socialLinks = [
        { icon: <FiGithub />, url: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-300' },
        { icon: <FiTwitter />, url: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
        { icon: <FiLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-500' },
        { icon: <FiMail />, url: 'mailto:hello@taskflow.com', label: 'Email', color: 'hover:text-red-400' },
    ];

    // ফুটার লিংকস
    const footerLinks = [
        { name: 'About', href: '#' },
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'FAQ', href: '#' },
    ];

    return (
        <footer className="relative mt-20 overflow-hidden">
            {/* গ্লাসমরফিক ব্যাকগ্রাউন্ড */}
            <div className="bg-black/40 backdrop-blur-xl border-t border-white/10">

                {/* টপ স্ক্রল বাটন */}
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <motion.button
                        onClick={scrollToTop}
                        initial={{ y: 0 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full shadow-lg shadow-blue-500/30 text-white"
                    >
                        <FiArrowUp size={20} />
                    </motion.button>
                </div>

                <div className="container mx-auto px-6 py-12">

                    {/* মেইন ফুটার কন্টেন্ট */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                        {/* ব্র্যান্ড সেকশন */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Task<span className="text-blue-400">Flow</span>
                                </h2>
                                <p className="text-gray-400 text-sm mt-2">
                                    Streamline your workflow with our powerful task management solution.
                                </p>
                            </motion.div>

                            {/* সোশ্যাল মিডিয়া আইকন */}
                            <div className="flex gap-3 pt-2">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1, type: "spring" }}
                                        whileHover={{ scale: 1.2, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`text-gray-400 ${social.color} transition-all duration-300 text-xl bg-white/5 p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm`}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* কুইক লিংকস */}
                        <div>
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-white font-semibold text-lg mb-4 flex items-center gap-2"
                            >
                                <FiZap className="text-blue-400" />
                                Quick Links
                            </motion.h3>
                            <ul className="space-y-2">
                                {footerLinks.slice(0, 4).map((link, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* সাপোর্ট লিংকস */}
                        <div>
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-white font-semibold text-lg mb-4 flex items-center gap-2"
                            >
                                <FiCode className="text-purple-400" />
                                Support
                            </motion.h3>
                            <ul className="space-y-2">
                                {footerLinks.slice(4, 8).map((link, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.2 }}
                                    >
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-purple-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {link.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* নিউজলেটার সেকশন */}
                        <div>
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-white font-semibold text-lg mb-4"
                            >
                                Stay Updated
                            </motion.h3>
                            <p className="text-gray-400 text-sm mb-3">
                                Get the latest updates and news
                            </p>
                            <motion.div
                                className="flex gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
                                >
                                    Subscribe
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>

                    {/* কপিরাইট বার */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-8 mt-8 border-t border-white/10 text-center"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-500 text-sm flex items-center gap-1">
                                © {currentYear} TaskFlow. All rights reserved.
                            </p>

                            <p className="text-gray-500 text-sm flex items-center gap-1">
                                Made with
                                <motion.span
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        color: ['#ef4444', '#ec4899', '#ef4444']
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                >
                                    <FiHeart size={14} className="inline text-red-500" />
                                </motion.span>
                                by TaskFlow Team
                            </p>

                            {/* ভার্সন ব্যাজ */}
                            <motion.div
                                className="flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400">
                                    v2.0.0
                                </span>
                                <span className="text-xs px-2 py-1 bg-blue-500/20 rounded-full text-blue-400">
                                    Latest
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ডেকোরেটিভ ব্লার এলিমেন্ট */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-10 -z-10" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-10 -z-10" />
        </footer>
    );
};

export default Footer;