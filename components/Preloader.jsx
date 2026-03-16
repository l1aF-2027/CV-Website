"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete, onExitStart }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            if (onExitStart) onExitStart();
            setTimeout(() => {
                onComplete();
            }, 1200); 
        }, 1800);

        return () => clearTimeout(timer);
    }, [onComplete, onExitStart]);

    const doorEase = [0.85, 0, 0.15, 1];

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Top Side: Door + Top Half of Name */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1/2 bg-[#0a0a14] z-20 flex items-end justify-center overflow-hidden"
                initial={{ y: 0 }}
                animate={isExiting ? { y: "-100%" } : { y: 0 }}
                transition={{ duration: 1.2, ease: doorEase, delay: 0.1 }}
            >
                <div className="h-[100vh] flex items-center translate-y-1/2">
                    <motion.h1
                        className="font-heading font-black text-accent whitespace-nowrap"
                        style={{ fontSize: "clamp(3rem, 12vw, 10rem)", lineHeight: "0.8", letterSpacing: "-0.05em" }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        Ha Huy Hoang
                    </motion.h1>
                </div>
            </motion.div>

            {/* Bottom Side: Door + Bottom Half of Name */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0a0a14] z-20 flex items-start justify-center overflow-hidden"
                initial={{ y: 0 }}
                animate={isExiting ? { y: "100%" } : { y: 0 }}
                transition={{ duration: 1.2, ease: doorEase, delay: 0.1 }}
            >
                <div className="h-[100vh] flex items-center -translate-y-1/2">
                    <motion.h1
                        className="font-heading font-black text-accent whitespace-nowrap"
                        style={{ fontSize: "clamp(3rem, 12vw, 10rem)", lineHeight: "0.8", letterSpacing: "-0.05em" }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        Ha Huy Hoang
                    </motion.h1>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
